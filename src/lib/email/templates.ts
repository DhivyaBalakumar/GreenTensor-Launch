import type { LeadFormData } from "@/lib/schemas/lead";

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const emailStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #050A0E; color: #F8FAFC; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
  .logo { font-size: 20px; font-weight: 700; color: #F8FAFC; margin-bottom: 32px; }
  .logo span { color: #22C55E; }
  h1 { font-size: 24px; font-weight: 700; color: #F8FAFC; margin: 0 0 16px; }
  p { font-size: 16px; line-height: 1.6; color: #94A3B8; margin: 0 0 16px; }
  .cta { display: inline-block; padding: 12px 24px; background: #22C55E; color: #050A0E; font-weight: 600; text-decoration: none; border-radius: 8px; margin: 16px 0; }
  .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #1E2D3D; font-size: 13px; color: #94A3B8; }
`;

// ─── Waitlist confirmation ────────────────────────────────────────────────────

export function waitlistConfirmationEmail(formData: LeadFormData): EmailTemplate {
  return {
    subject: "You're on the GreenTensor waitlist!",
    html: `
      <html><head><style>${emailStyles}</style></head>
      <body><div class="container">
        <div class="logo">Green<span>Tensor</span></div>
        <h1>You're on the list, ${formData.firstName}!</h1>
        <p>Thanks for joining the GreenTensor waitlist. You'll be among the first to know when we open early access.</p>
        <p>In the meantime, here's what GreenTensor does:</p>
        <ul style="color:#94A3B8;line-height:2">
          <li>Monitors your AI carbon footprint in real time</li>
          <li>Detects compute-anomaly threats before they escalate</li>
          <li>Automates GRI, TCFD, and CDP ESG reporting</li>
        </ul>
        <p>We'll be in touch soon.</p>
        <div class="footer">
          <p>GreenTensor, Inc. · <a href="https://greentensor.ai" style="color:#22C55E">greentensor.ai</a></p>
          <p>You're receiving this because you signed up at greentensor.ai.</p>
        </div>
      </div></body></html>
    `,
    text: `Hi ${formData.firstName},\n\nYou're on the GreenTensor waitlist! We'll reach out as soon as early access opens.\n\nThe GreenTensor Team\nhttps://greentensor.ai`,
  };
}

// ─── Demo confirmation ────────────────────────────────────────────────────────

export function demoConfirmationEmail(formData: LeadFormData): EmailTemplate {
  return {
    subject: "Your GreenTensor demo request is confirmed",
    html: `
      <html><head><style>${emailStyles}</style></head>
      <body><div class="container">
        <div class="logo">Green<span>Tensor</span></div>
        <h1>Demo request received, ${formData.firstName}!</h1>
        <p>Thanks for requesting a GreenTensor demo. Our team will reach out within 1 business day to schedule your 30-minute session.</p>
        <p>We'll tailor the demo to your role as <strong style="color:#F8FAFC">${formData.role}</strong> at <strong style="color:#F8FAFC">${formData.company}</strong>.</p>
        <p>In the meantime, you can explore our documentation:</p>
        <a href="https://docs.greentensor.ai" class="cta">Read the Docs</a>
        <div class="footer">
          <p>GreenTensor, Inc. · <a href="https://greentensor.ai" style="color:#22C55E">greentensor.ai</a></p>
        </div>
      </div></body></html>
    `,
    text: `Hi ${formData.firstName},\n\nThanks for requesting a GreenTensor demo. Our team will be in touch within 1 business day.\n\nThe GreenTensor Team\nhttps://greentensor.ai`,
  };
}

// ─── Trial confirmation ───────────────────────────────────────────────────────

export function trialConfirmationEmail(formData: LeadFormData): EmailTemplate {
  return {
    subject: "Welcome to GreenTensor — your free trial is ready",
    html: `
      <html><head><style>${emailStyles}</style></head>
      <body><div class="container">
        <div class="logo">Green<span>Tensor</span></div>
        <h1>Welcome, ${formData.firstName}!</h1>
        <p>Your GreenTensor free trial is now active. You have 14 days of full platform access.</p>
        <p>Get started in 3 lines of Python:</p>
        <pre style="background:#0F1923;border:1px solid #1E2D3D;border-radius:8px;padding:16px;font-family:monospace;font-size:13px;color:#22C55E;overflow-x:auto">import greentensor as gt
gt.init(api_key="gt_live_...")
with gt.track("my-model"): model.fit(data)</pre>
        <a href="https://app.greentensor.ai/dashboard" class="cta">Open Dashboard</a>
        <div class="footer">
          <p>GreenTensor, Inc. · <a href="https://greentensor.ai" style="color:#22C55E">greentensor.ai</a></p>
        </div>
      </div></body></html>
    `,
    text: `Hi ${formData.firstName},\n\nWelcome to GreenTensor! Your free trial is now active.\n\nOpen your dashboard: https://app.greentensor.ai/dashboard\n\nThe GreenTensor Team`,
  };
}

// ─── sendConfirmationEmail ────────────────────────────────────────────────────

/**
 * Selects the correct email template based on conversionPath
 * and sends it via the Resend REST API.
 */
export async function sendConfirmationEmail(formData: LeadFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping confirmation email");
    return;
  }

  let template: EmailTemplate;
  switch (formData.conversionPath) {
    case "waitlist":
      template = waitlistConfirmationEmail(formData);
      break;
    case "demo":
      template = demoConfirmationEmail(formData);
      break;
    case "trial":
      template = trialConfirmationEmail(formData);
      break;
    default:
      return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GreenTensor <hello@greentensor.ai>",
        to: [formData.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "unknown");
      console.error("[email] Resend API error:", res.status, errorText);
    }
  } catch (err) {
    console.error("[email] Resend request failed:", err);
  }
}
