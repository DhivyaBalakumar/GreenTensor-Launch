import { google } from "googleapis";
import type { LeadFormData } from "@/lib/schemas/lead";

// ─── Google Sheets client ─────────────────────────────────────────────────────

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) return null;

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// ─── appendLeadToSheet ────────────────────────────────────────────────────────

/**
 * Appends a lead form submission as a new row in the Google Sheet.
 * Sheet columns: Timestamp | Type | First Name | Last Name | Email | Company | Role | Persona | Page URL | UTM Source | UTM Medium | UTM Campaign
 */
export async function appendLeadToSheet(
  formData: LeadFormData,
  meta: {
    pageUrl?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }
): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getAuth();

  if (!sheetId || !auth) {
    console.warn("[sheets] Google Sheets not configured — skipping");
    return;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      new Date().toISOString(),                          // Timestamp
      formData.conversionPath,                           // Type (waitlist/demo/trial)
      formData.firstName,                                // First Name
      formData.lastName,                                 // Last Name
      formData.email,                                    // Email
      formData.company,                                  // Company
      formData.role,                                     // Role
      formData.personaEngaged ?? "",                     // Persona
      meta.pageUrl ?? "",                                // Page URL
      meta.utmSource ?? "",                              // UTM Source
      meta.utmMedium ?? "",                              // UTM Medium
      meta.utmCampaign ?? "",                            // UTM Campaign
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:L",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    console.log(`[sheets] Lead appended: ${formData.email} (${formData.conversionPath})`);
  } catch (err) {
    // Non-fatal — log and continue
    console.error("[sheets] Failed to append lead:", err);
  }
}

// ─── ensureSheetHeaders ───────────────────────────────────────────────────────

/**
 * Writes the header row if the sheet is empty.
 * Call this once during setup or on first submission.
 */
export async function ensureSheetHeaders(): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getAuth();
  if (!sheetId || !auth) return;

  try {
    const sheets = google.sheets({ version: "v4", auth });

    // Check if A1 already has content
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A1",
    });

    if (res.data.values && res.data.values.length > 0) return; // Already has headers

    const headers = [
      "Timestamp",
      "Type",
      "First Name",
      "Last Name",
      "Email",
      "Company",
      "Role",
      "Persona",
      "Page URL",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Sheet1!A1:L1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });

    console.log("[sheets] Headers written");
  } catch (err) {
    console.error("[sheets] Failed to write headers:", err);
  }
}
