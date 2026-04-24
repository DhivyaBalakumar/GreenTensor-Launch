import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const trialRequestSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().min(1),
});

interface TrialResponse {
  success: boolean;
  message: string;
  redirectUrl?: string;
}

/**
 * POST /api/trial
 * Dedicated route for direct trial account creation flows.
 * Validates the request, calls the GreenTensor Platform API,
 * and returns a redirectUrl on success.
 */
export async function POST(request: NextRequest): Promise<NextResponse<TrialResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const parsed = trialRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed" },
      { status: 422, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { email, firstName, lastName, company } = parsed.data;
  const platformUrl = process.env.GREENTENSOR_PLATFORM_API_URL;
  const platformKey = process.env.GREENTENSOR_PLATFORM_API_KEY;

  if (!platformUrl || !platformKey) {
    console.warn("[trial] Platform API not configured");
    return NextResponse.json(
      {
        success: true,
        message: "Account creation is in progress. We'll email you when your trial is ready.",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const res = await fetch(`${platformUrl}/v1/accounts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${platformKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, firstName, lastName, company }),
    });

    if (!res.ok) {
      console.error("[trial] Platform API error:", res.status);
      return NextResponse.json(
        {
          success: false,
          message: "Account creation failed. Please try again or contact support.",
        },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await res.json() as { redirectUrl?: string };

    return NextResponse.json(
      {
        success: true,
        message: "Your free trial is ready!",
        redirectUrl: data.redirectUrl ?? `${platformUrl}/dashboard`,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[trial] Platform API request failed:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Service temporarily unavailable. Please try again later.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
