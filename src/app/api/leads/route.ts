import { NextRequest, NextResponse } from "next/server";
import { leadSchema, type LeadSubmissionRequest, type LeadSubmissionResponse } from "@/lib/schemas/lead";
import { buildHubSpotPayload } from "@/lib/crm/hubspot";

export const runtime = "edge";

// ─── HubSpot form GUID selector ───────────────────────────────────────────────

function getHubSpotFormGuid(conversionPath: string): string {
  switch (conversionPath) {
    case "waitlist":
      return process.env.HUBSPOT_FORM_GUID_WAITLIST ?? "";
    case "demo":
      return process.env.HUBSPOT_FORM_GUID_DEMO ?? "";
    case "trial":
      return process.env.HUBSPOT_FORM_GUID_TRIAL ?? "";
    default:
      return "";
  }
}

// ─── Exponential backoff retry ────────────────────────────────────────────────

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.status >= 500) {
        // Server error — retry
        lastError = new Error(`HubSpot returned ${res.status}`);
        if (attempt < maxRetries - 1) {
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
          continue;
        }
        return res;
      }
      return res;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError ?? new Error("Max retries exceeded");
}

// ─── Resend confirmation email ────────────────────────────────────────────────

async function sendConfirmationEmail(
  formData: { email: string; firstName: string; conversionPath: string }
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const subjects: Record<string, string> = {
    waitlist: "You're on the GreenTensor waitlist!",
    demo: "Your GreenTensor demo is confirmed",
    trial: "Welcome to GreenTensor — your trial is ready",
  };

  const bodies: Record<string, string> = {
    waitlist: `Hi ${formData.firstName},\n\nYou're on the list! We'll reach out as soon as early access opens.\n\nThe GreenTensor Team`,
    demo: `Hi ${formData.firstName},\n\nThanks for requesting a demo. Our team will be in touch within 1 business day to schedule your session.\n\nThe GreenTensor Team`,
    trial: `Hi ${formData.firstName},\n\nWelcome to GreenTensor! Your free trial is now active. Check your dashboard to get started.\n\nThe GreenTensor Team`,
  };

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GreenTensor <hello@greentensor.ai>",
        to: [formData.email],
        subject: subjects[formData.conversionPath] ?? "Thanks for reaching out",
        text: bodies[formData.conversionPath] ?? "We'll be in touch soon.",
      }),
    });
  } catch (err) {
    // Email failure is non-fatal — log and continue
    console.error("[leads] Resend email failed:", err);
  }
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<LeadSubmissionResponse>> {
  // Parse request body
  let body: LeadSubmissionRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Server-side re-validation (never trust client)
  const parsed = leadSchema.safeParse(body.formData);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
      } as LeadSubmissionResponse,
      { status: 422, headers: { "Cache-Control": "no-store" } }
    );
  }

  const formData = parsed.data;
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = getHubSpotFormGuid(formData.conversionPath);

  // Submit to HubSpot
  if (portalId && formGuid) {
    const payload = buildHubSpotPayload(formData, {
      pageUri: body.pageUrl,
    });

    try {
      const hsRes = await fetchWithRetry(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (hsRes.status >= 400 && hsRes.status < 500) {
        const errorText = await hsRes.text().catch(() => "unknown");
        console.error("[leads] HubSpot 4xx:", hsRes.status, errorText);
        return NextResponse.json(
          { success: false, message: "Submission failed. Please try again." },
          { status: 502, headers: { "Cache-Control": "no-store" } }
        );
      }

      if (hsRes.status >= 500) {
        console.error("[leads] HubSpot 5xx after retries:", hsRes.status);
        return NextResponse.json(
          { success: false, message: "Service temporarily unavailable. Please try again later." },
          { status: 503, headers: { "Cache-Control": "no-store" } }
        );
      }
    } catch (err) {
      console.error("[leads] HubSpot request failed:", err);
      return NextResponse.json(
        { success: false, message: "Submission failed. Please try again." },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }
  } else {
    // No HubSpot config — log and continue (dev/staging)
    console.warn("[leads] HubSpot not configured — skipping CRM submission");
  }

  // Send confirmation email (non-fatal)
  await sendConfirmationEmail({
    email: formData.email,
    firstName: formData.firstName,
    conversionPath: formData.conversionPath,
  });

  // Trial path — create platform account
  if (formData.conversionPath === "trial") {
    const platformUrl = process.env.GREENTENSOR_PLATFORM_API_URL;
    const platformKey = process.env.GREENTENSOR_PLATFORM_API_KEY;

    if (platformUrl && platformKey) {
      try {
        const trialRes = await fetch(`${platformUrl}/v1/accounts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${platformKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company,
          }),
        });

        if (trialRes.ok) {
          const trialData = await trialRes.json() as { redirectUrl?: string };
          return NextResponse.json(
            {
              success: true,
              message: "Your free trial is ready!",
              redirectUrl: trialData.redirectUrl ?? `${platformUrl}/dashboard`,
            },
            { headers: { "Cache-Control": "no-store" } }
          );
        }
      } catch (err) {
        console.error("[leads] Platform API failed:", err);
        // Non-fatal — still capture the lead
      }
    }

    // Platform API not configured or failed — still succeed
    return NextResponse.json(
      {
        success: true,
        message:
          "Account creation is in progress. We'll email you when your trial is ready.",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  // Waitlist / demo success
  const messages: Record<string, string> = {
    waitlist: "You're on the waitlist! We'll be in touch soon.",
    demo: "Demo request received. Our team will reach out within 1 business day.",
  };

  return NextResponse.json(
    {
      success: true,
      message: messages[formData.conversionPath] ?? "Submission received.",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
