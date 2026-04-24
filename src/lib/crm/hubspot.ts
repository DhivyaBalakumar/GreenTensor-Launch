import type { LeadFormData } from "@/lib/schemas/lead";

// ─── HubSpot payload types ────────────────────────────────────────────────────

interface HubSpotField {
  name: string;
  value: string;
}

interface HubSpotLegalConsentOptions {
  consent: {
    consentToProcess: boolean;
    text: string;
    communications: Array<{
      value: boolean;
      subscriptionTypeId: number;
      text: string;
    }>;
  };
}

export interface HubSpotPayload {
  fields: HubSpotField[];
  context: {
    pageUri?: string;
    hutk?: string;
  };
  legalConsentOptions: HubSpotLegalConsentOptions;
}

// ─── buildHubSpotPayload ──────────────────────────────────────────────────────

/**
 * Maps LeadFormData to a HubSpot Forms API v3 submission payload.
 * All field names match the HubSpot contact property schema.
 */
export function buildHubSpotPayload(
  formData: LeadFormData,
  context?: { pageUri?: string; hutk?: string }
): HubSpotPayload {
  const fields: HubSpotField[] = [
    { name: "firstname", value: formData.firstName },
    { name: "lastname", value: formData.lastName },
    { name: "email", value: formData.email },
    { name: "company", value: formData.company },
    { name: "jobtitle", value: formData.role },
    { name: "greentensor_conversion_path", value: formData.conversionPath },
  ];

  // Only include persona if provided
  if (formData.personaEngaged) {
    fields.push({
      name: "greentensor_persona",
      value: formData.personaEngaged,
    });
  }

  return {
    fields,
    context: {
      pageUri: context?.pageUri,
      hutk: context?.hutk,
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to allow GreenTensor to store and process my personal data.",
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text: "I agree to receive marketing communications from GreenTensor.",
          },
        ],
      },
    },
  };
}
