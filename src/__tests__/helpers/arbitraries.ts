import fc from "fast-check";

/**
 * Email arbitrary that generates emails matching Zod v4's strict email regex:
 * /^(?!\.)(?!.*\.\.)[A-Za-z0-9_'+\-.]*[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/
 */
export const emailArb = fc
  .record({
    user: fc
      .string({ minLength: 1, maxLength: 20 })
      .filter(
        (s) =>
          /^[A-Za-z0-9][A-Za-z0-9_+\-.]*[A-Za-z0-9]$/.test(s) ||
          /^[A-Za-z0-9]$/.test(s)
      ),
    domain: fc
      .string({ minLength: 2, maxLength: 15 })
      .filter((s) => /^[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]$/.test(s) || /^[A-Za-z0-9]{2,}$/.test(s)),
    tld: fc.constantFrom("com", "org", "net", "io", "ai", "co", "dev"),
  })
  .map(({ user, domain, tld }) => `${user}@${domain}.${tld}`);

/**
 * Valid LeadFormData arbitrary for property tests.
 */
export const validLeadFormDataArb = fc.record({
  firstName: fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0),
  lastName: fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0),
  email: emailArb,
  company: fc
    .string({ minLength: 1, maxLength: 100 })
    .filter((s) => s.trim().length > 0),
  role: fc
    .string({ minLength: 1, maxLength: 100 })
    .filter((s) => s.trim().length > 0),
  conversionPath: fc.constantFrom(
    "waitlist" as const,
    "demo" as const,
    "trial" as const
  ),
  personaEngaged: fc.option(
    fc.constantFrom("mlops" as const, "ciso" as const, "esg" as const),
    { nil: undefined }
  ),
  consentGiven: fc.constant(true as const),
});

/**
 * Trial-specific LeadFormData arbitrary.
 */
export const trialLeadFormDataArb = fc.record({
  firstName: fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0),
  lastName: fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0),
  email: emailArb,
  company: fc
    .string({ minLength: 1, maxLength: 100 })
    .filter((s) => s.trim().length > 0),
  role: fc
    .string({ minLength: 1, maxLength: 100 })
    .filter((s) => s.trim().length > 0),
  conversionPath: fc.constant("trial" as const),
  personaEngaged: fc.option(
    fc.constantFrom("mlops" as const, "ciso" as const, "esg" as const),
    { nil: undefined }
  ),
  consentGiven: fc.constant(true as const),
});
