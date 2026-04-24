import { z } from "zod";

// ─── Lead Form Schema ─────────────────────────────────────────────────────────

export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Job title is required"),
  conversionPath: z.enum(["waitlist", "demo", "trial"]).refine(
    (v) => ["waitlist", "demo", "trial"].includes(v),
    { message: "Please select a valid conversion path" }
  ),
  personaEngaged: z.enum(["mlops", "ciso", "esg"]).optional(),
  consentGiven: z
    .boolean()
    .refine((v) => v === true, {
      message: "You must agree to the privacy policy to continue",
    }),
});

// ─── TypeScript Types ─────────────────────────────────────────────────────────

export type LeadFormData = z.infer<typeof leadSchema>;

export interface LeadSubmissionRequest {
  formData: LeadFormData;
  pageUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  redirectUrl?: string; // Only for trial path
}
