import { NextRequest, NextResponse } from "next/server";
import {
  leadSchema,
  type LeadSubmissionRequest,
  type LeadSubmissionResponse,
} from "@/lib/schemas/lead";
import { appendLeadToSheet, ensureSheetHeaders } from "@/lib/sheets/client";
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/email/send";

export const runtime = "nodejs"; // googleapis requires Node.js runtime (not Edge)

// ─── POST /api/leads ──────────────────────────────────────────────────────────

export async function POST(
  request: NextRequest
): Promise<NextResponse<LeadSubmissionResponse>> {
  // Parse body
  let body: LeadSubmissionRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Server-side validation
  const parsed = leadSchema.safeParse(body.formData);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed. Please check your inputs." },
      { status: 422, headers: { "Cache-Control": "no-store" } }
    );
  }

  const formData = parsed.data;
  const meta = {
    pageUrl: body.pageUrl,
    utmSource: body.utmSource,
    utmMedium: body.utmMedium,
    utmCampaign: body.utmCampaign,
  };

  // Run all integrations in parallel — all non-fatal
  await Promise.allSettled([
    // 1. Write to Google Sheets
    ensureSheetHeaders().then(() => appendLeadToSheet(formData, meta)),

    // 2. Send confirmation email to the lead
    sendConfirmationEmail(formData),

    // 3. Send notification email to you
    sendNotificationEmail(formData, meta),
  ]);

  // Success messages per conversion path
  const messages: Record<string, string> = {
    waitlist:
      "You're on the waitlist! Check your email for confirmation. We'll be in touch soon.",
    demo: "Demo request received! Check your email — our team will reach out within 1 business day.",
    trial:
      "Trial request confirmed! Check your email — we'll send your access details within 24 hours.",
  };

  return NextResponse.json(
    {
      success: true,
      message: messages[formData.conversionPath] ?? "Submission received!",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
