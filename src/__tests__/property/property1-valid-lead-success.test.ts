// Feature: green-tensor-website, Property 1: Valid lead submission always returns success
import { describe, test } from "vitest";
import fc from "fast-check";
import { leadSchema } from "@/lib/schemas/lead";
import { buildHubSpotPayload } from "@/lib/crm/hubspot";
import { validLeadFormDataArb } from "../helpers/arbitraries";

describe("Property 1: Valid lead submission always returns success", () => {
  test("leadSchema.safeParse succeeds for any valid LeadFormData", () => {
    fc.assert(
      fc.property(validLeadFormDataArb, (formData) => {
        const result = leadSchema.safeParse(formData);
        return result.success === true;
      }),
      { numRuns: 100 }
    );
  });

  test("buildHubSpotPayload succeeds for any valid LeadFormData", () => {
    fc.assert(
      fc.property(validLeadFormDataArb, (formData) => {
        const payload = buildHubSpotPayload(formData);
        return (
          payload !== null &&
          typeof payload === "object" &&
          Array.isArray(payload.fields) &&
          payload.fields.length > 0
        );
      }),
      { numRuns: 100 }
    );
  });
});
