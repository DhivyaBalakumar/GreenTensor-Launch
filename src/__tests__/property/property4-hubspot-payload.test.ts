// Feature: green-tensor-website, Property 4: buildHubSpotPayload preserves all fields and sets correct tags
import { describe, test } from "vitest";
import fc from "fast-check";
import { buildHubSpotPayload } from "@/lib/crm/hubspot";
import type { LeadFormData } from "@/lib/schemas/lead";
import { validLeadFormDataArb } from "../helpers/arbitraries";

describe("Property 4: buildHubSpotPayload preserves all fields and sets correct tags", () => {
  test("payload always contains greentensor_conversion_path matching input", () => {
    fc.assert(
      fc.property(validLeadFormDataArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        const pathField = payload.fields.find(
          (f) => f.name === "greentensor_conversion_path"
        );
        return pathField?.value === formData.conversionPath;
      }),
      { numRuns: 100 }
    );
  });

  test("payload always contains all required contact fields", () => {
    fc.assert(
      fc.property(validLeadFormDataArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        const fieldNames = payload.fields.map((f) => f.name);
        return (
          fieldNames.includes("firstname") &&
          fieldNames.includes("lastname") &&
          fieldNames.includes("email") &&
          fieldNames.includes("company") &&
          fieldNames.includes("jobtitle") &&
          fieldNames.includes("greentensor_conversion_path")
        );
      }),
      { numRuns: 100 }
    );
  });

  test("payload field values match input formData", () => {
    fc.assert(
      fc.property(validLeadFormDataArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        const getField = (name: string) =>
          payload.fields.find((f) => f.name === name)?.value;
        return (
          getField("firstname") === formData.firstName &&
          getField("lastname") === formData.lastName &&
          getField("email") === formData.email &&
          getField("company") === formData.company &&
          getField("jobtitle") === formData.role
        );
      }),
      { numRuns: 100 }
    );
  });

  test("greentensor_persona is included when personaEngaged is provided", () => {
    const withPersonaArb = validLeadFormDataArb.filter(
      (d) => d.personaEngaged !== undefined
    );
    fc.assert(
      fc.property(withPersonaArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        const personaField = payload.fields.find(
          (f) => f.name === "greentensor_persona"
        );
        return personaField?.value === formData.personaEngaged;
      }),
      { numRuns: 100 }
    );
  });

  test("greentensor_persona is absent when personaEngaged is not provided", () => {
    const withoutPersonaArb = validLeadFormDataArb.filter(
      (d) => d.personaEngaged === undefined
    );
    fc.assert(
      fc.property(withoutPersonaArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        return payload.fields.find((f) => f.name === "greentensor_persona") === undefined;
      }),
      { numRuns: 100 }
    );
  });

  test("payload always includes legalConsentOptions with consentToProcess: true", () => {
    fc.assert(
      fc.property(validLeadFormDataArb, (formData) => {
        const payload = buildHubSpotPayload(formData as LeadFormData);
        return payload.legalConsentOptions.consent.consentToProcess === true;
      }),
      { numRuns: 100 }
    );
  });
});
