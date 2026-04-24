import type { LeadFormData } from "@/lib/schemas/lead";

const FROM = "GreenTensor <hello@greentensor.ai>";
const RESEND_API = "https://api.resend.com/emails";

// ─── Email templates ──────────────────────────────────────────────────────────

function baseHtml(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>GreenTensor</title>
</head>
<body style="margin:0;padding:0;background:#050A0E;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#050A0E;padding:40px 0;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#0F1923;border-radius:16px;border:1px solid #1E2D3D;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="padding:28px 32px;border-bottom:1px solid #1E2D3D;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#0F1923;border-radius:8px;padding:6px 10px;border:1px solid #1E2D3D;">
                <span style="font-size:18px;font-weight:800;color:#22C55E;">G</span><span style="font-size:18px;font-weight:800;color:#3B82F6;">T</span>
              </td>
              <td style="padding-left:12px;">
                <span style="font-size:16px;font-weight:600;color:#F8FAFC;">GreenTensor</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Content -->
      <tr><td style="padding:32px;">${content}</td></tr>
      <!-- Footer -->
      <tr>
        <td style="padding:20px 32px;border-top:1px solid #1E2D3D;">
          <p style="margin:0;font-size:12px;color:#94A3B8;">
            GreenTensor, Inc. · <a href="https://greentensor.ai" style="color:#22C55E;text-decoration:none;">greentensor.ai</a>
            · <a href="https://pypi.org/project/greentensor/" style="color:#22C55E;text-decoration:none;">pip install greentensor</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function waitlistHtml(firstName: string) {
  return baseHtml(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#F8FAFC;">You're on the list, ${firstName}! 🌱</h1>
    <p style="margin:0 0 16px;font-size:16px;color:#94A3B8;line-height:1.6;">
      Thanks for joining the GreenTensor waitlist. You'll be among the first to know when we open early access.
    </p>
    <p style="margin:0 0 24px;font-size:16px;color:#94A3B8;line-height:1.6;">
      In the meantime, you can try our Python SDK right now:
    </p>
    <div style="background:#050A0E;border-radius:12px;border:1px solid #1E2D3D;padding:16px;margin-bottom:24px;">
      <code style="font-family:'Courier New',monospace;font-size:14px;color:#22C55E;">pip install greentensor</code>
    </div>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#22C55E;border-radius:8px;padding:12px 24px;">
          <a href="https://pypi.org/project/greentensor/" style="color:#050A0E;font-weight:600;font-size:14px;text-decoration:none;">
            View on PyPI →
          </a>
        </td>
      </tr>
    </table>
  `);
}

function demoHtml(firstName: string, company: string, role: string) {
  return baseHtml(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#F8FAFC;">Demo request received, ${firstName}!</h1>
    <p style="margin:0 0 16px;font-size:16px;color:#94A3B8;line-height:1.6;">
      Thanks for requesting a GreenTensor demo. Our team will reach out within <strong style="color:#F8FAFC;">1 business day</strong> to schedule your 30-minute session.
    </p>
    <div style="background:#050A0E;border-radius:12px;border:1px solid #1E2D3D;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;color:#94A3B8;text-transform:uppercase;letter-spacing:0.1em;">Your details</p>
      <p style="margin:0 0 4px;font-size:14px;color:#F8FAFC;"><strong>Role:</strong> ${role}</p>
      <p style="margin:0;font-size:14px;color:#F8FAFC;"><strong>Company:</strong> ${company}</p>
    </div>
    <p style="margin:0 0 24px;font-size:14px;color:#94A3B8;">
      We'll tailor the demo to your specific use case. If you have any questions before then, just reply to this email.
    </p>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#3B82F6;border-radius:8px;padding:12px 24px;">
          <a href="https://pypi.org/project/greentensor/" style="color:#F8FAFC;font-weight:600;font-size:14px;text-decoration:none;">
            Try the SDK while you wait →
          </a>
        </td>
      </tr>
    </table>
  `);
}

function trialHtml(firstName: string) {
  return baseHtml(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#F8FAFC;">Welcome to GreenTensor, ${firstName}! 🚀</h1>
    <p style="margin:0 0 16px;font-size:16px;color:#94A3B8;line-height:1.6;">
      Your free trial request is confirmed. Our team will set up your account and send you access details within <strong style="color:#F8FAFC;">24 hours</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:#94A3B8;line-height:1.6;">
      Get a head start with the Python SDK — it works right now:
    </p>
    <div style="background:#050A0E;border-radius:12px;border:1px solid #1E2D3D;padding:16px;margin-bottom:8px;">
      <code style="font-family:'Courier New',monospace;font-size:13px;color:#22C55E;">pip install greentensor</code>
    </div>
    <div style="background:#050A0E;border-radius:12px;border:1px solid #1E2D3D;padding:16px;margin-bottom:24px;">
      <code style="font-family:'Courier New',monospace;font-size:13px;color:#94A3B8;">from greentensor import GreenTensor<br/><br/>with GreenTensor() as gt:<br/>&nbsp;&nbsp;&nbsp;&nbsp;with gt.mixed_precision():<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;train()&nbsp;&nbsp;# your existing code</code>
    </div>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#22C55E;border-radius:8px;padding:12px 24px;">
          <a href="https://pypi.org/project/greentensor/" style="color:#050A0E;font-weight:600;font-size:14px;text-decoration:none;">
            View on PyPI →
          </a>
        </td>
      </tr>
    </table>
  `);
}

function notificationHtml(formData: LeadFormData, meta: { pageUrl?: string; utmSource?: string }) {
  const typeColors: Record<string, string> = {
    waitlist: "#94A3B8",
    demo: "#3B82F6",
    trial: "#22C55E",
  };
  const color = typeColors[formData.conversionPath] ?? "#94A3B8";

  return baseHtml(`
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#F8FAFC;">New lead: ${formData.firstName} ${formData.lastName}</h1>
    <p style="margin:0 0 24px;">
      <span style="display:inline-block;padding:4px 12px;border-radius:20px;background:${color}20;border:1px solid ${color}40;color:${color};font-size:12px;font-weight:600;text-transform:uppercase;">
        ${formData.conversionPath}
      </span>
    </p>
    <div style="background:#050A0E;border-radius:12px;border:1px solid #1E2D3D;padding:20px;margin-bottom:16px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ["Email", formData.email],
          ["Company", formData.company],
          ["Role", formData.role],
          ["Persona", formData.personaEngaged ?? "—"],
          ["Page", meta.pageUrl ?? "—"],
          ["UTM Source", meta.utmSource ?? "—"],
          ["Time", new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC"],
        ].map(([label, value]) => `
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#94A3B8;width:100px;">${label}</td>
            <td style="padding:6px 0;font-size:13px;color:#F8FAFC;">${value}</td>
          </tr>
        `).join("")}
      </table>
    </div>
  `);
}

// ─── sendEmail ────────────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping");
    return;
  }

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [to], subject, html, text }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "unknown");
      console.error("[email] Resend error:", res.status, err);
    }
  } catch (err) {
    console.error("[email] Resend request failed:", err);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function sendConfirmationEmail(formData: LeadFormData): Promise<void> {
  const { firstName, email, company, role, conversionPath } = formData;

  const templates: Record<string, { subject: string; html: string; text: string }> = {
    waitlist: {
      subject: "You're on the GreenTensor waitlist! 🌱",
      html: waitlistHtml(firstName),
      text: `Hi ${firstName},\n\nYou're on the GreenTensor waitlist! We'll reach out as soon as early access opens.\n\nIn the meantime: pip install greentensor\n\nThe GreenTensor Team\nhttps://greentensor.ai`,
    },
    demo: {
      subject: "GreenTensor demo request confirmed",
      html: demoHtml(firstName, company, role),
      text: `Hi ${firstName},\n\nThanks for requesting a demo. Our team will reach out within 1 business day.\n\nThe GreenTensor Team\nhttps://greentensor.ai`,
    },
    trial: {
      subject: "Welcome to GreenTensor — your trial is being set up 🚀",
      html: trialHtml(firstName),
      text: `Hi ${firstName},\n\nYour free trial request is confirmed. We'll send access details within 24 hours.\n\npip install greentensor\n\nThe GreenTensor Team\nhttps://greentensor.ai`,
    },
  };

  const template = templates[conversionPath];
  if (!template) return;

  await sendEmail(email, template.subject, template.html, template.text);
}

export async function sendNotificationEmail(
  formData: LeadFormData,
  meta: { pageUrl?: string; utmSource?: string }
): Promise<void> {
  const notifyEmail = process.env.NOTIFICATION_EMAIL;
  if (!notifyEmail) return;

  const subject = `[GreenTensor] New ${formData.conversionPath} — ${formData.firstName} ${formData.lastName} (${formData.company})`;
  const html = notificationHtml(formData, meta);
  const text = `New ${formData.conversionPath} lead:\n${formData.firstName} ${formData.lastName}\n${formData.email}\n${formData.company}\n${formData.role}`;

  await sendEmail(notifyEmail, subject, html, text);
}
