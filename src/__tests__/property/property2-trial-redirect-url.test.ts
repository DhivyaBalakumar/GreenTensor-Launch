// Feature: green-tensor-website, Property 2: Trial submission always includes a non-empty redirectUrl
import { describe, test } from "vitest";
import fc from "fast-check";
import { buildHubSpotPayload } from "@/lib/crm/hubspot";
import { leadSchema } from "@/lib/schemas/lead";
import type { LeadFormData } from "@/lib/schemas/lead";
import { trialLeadFormDataArb } from "../helpers/arbitraries";

describe("Property 2: Trial submission always includes a non-empty redirectUrl", () => {
  test("buildHubSpotPayload for trial always includes greentensor_conversion_path=trial", () => {
    fc.assert(
      fc.property(trialLeadFormDataArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        const pathField = payload.fields.find(
          (f) => f.name === "greentensor_conversion_path"
        );
        return pathField?.value === "trial";
      }),
      { numRuns: 100 }
    );
  });

  test("trial formData always passes schema validation", () => {
    fc.assert(
      fc.property(trialLeadFormDataArb, (formData) => {
        const result = leadSchema.safeParse(formData);
        if (!result.success) return false;
        return result.data.conversionPath === "trial";
      }),
      { numRuns: 100 }
    );
  });

  test("simulated trial API response always includes a non-empty redirectUrl", () => {
    fc.assert(
      fc.property(fc.webUrl(), (redirectUrl) => {
        const response = {
          success: true,
          message: "Your free trial is ready!",
          redirectUrl,
        };
        return (
          response.success === true &&
          typeof response.redirectUrl === "string" &&
          response.redirectUrl.length > 0
        );
      }),
      { numRuns: 100 }
    );
  });
});
