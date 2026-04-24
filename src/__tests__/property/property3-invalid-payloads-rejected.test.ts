// Feature: green-tensor-website, Property 3: Invalid lead payloads are always rejected
import { describe, test } from "vitest";
import fc from "fast-check";
import { leadSchema } from "@/lib/schemas/lead";
import { emailArb } from "../helpers/arbitraries";

describe("Property 3: Invalid lead payloads are always rejected", () => {
  test("empty firstName always fails validation", () => {
    fc.assert(
      fc.property(
        fc.record({
          firstName: fc.constant(""),
          lastName: fc.string({ minLength: 1 }),
          email: emailArb,
          company: fc.string({ minLength: 1 }),
          role: fc.string({ minLength: 1 }),
          conversionPath: fc.constantFrom("waitlist", "demo", "trial"),
          consentGiven: fc.constant(true),
        }),
        (payload) => leadSchema.safeParse(payload).success === false
      ),
      { numRuns: 100 }
    );
  });

  test("empty lastName always fails validation", () => {
    fc.assert(
      fc.property(
        fc.record({
          firstName: fc.string({ minLength: 1 }),
          lastName: fc.constant(""),
          email: emailArb,
          company: fc.string({ minLength: 1 }),
          role: fc.string({ minLength: 1 }),
          conversionPath: fc.constantFrom("waitlist", "demo", "trial"),
          consentGiven: fc.constant(true),
        }),
        (payload) => leadSchema.safeParse(payload).success === false
      ),
      { numRuns: 100 }
    );
  });

  test("malformed email always fails validation", () => {
    fc.assert(
      fc.property(
        fc.record({
          firstName: fc.string({ minLength: 1 }),
          lastName: fc.string({ minLength: 1 }),
          // Strings without @ are never valid emails
          email: fc.string().filter((s) => !s.includes("@")),
          company: fc.string({ minLength: 1 }),
          role: fc.string({ minLength: 1 }),
          conversionPath: fc.constantFrom("waitlist", "demo", "trial"),
          consentGiven: fc.constant(true),
        }),
        (payload) => leadSchema.safeParse(payload).success === false
      ),
      { numRuns: 100 }
    );
  });

  test("consentGiven: false always fails validation", () => {
    fc.assert(
      fc.property(
        fc.record({
          firstName: fc.string({ minLength: 1 }),
          lastName: fc.string({ minLength: 1 }),
          email: emailArb,
          company: fc.string({ minLength: 1 }),
          role: fc.string({ minLength: 1 }),
          conversionPath: fc.constantFrom("waitlist", "demo", "trial"),
          consentGiven: fc.constant(false),
        }),
        (payload) => leadSchema.safeParse(payload).success === false
      ),
      { numRuns: 100 }
    );
  });

  test("empty company always fails validation", () => {
    fc.assert(
      fc.property(
        fc.record({
          firstName: fc.string({ minLength: 1 }),
          lastName: fc.string({ minLength: 1 }),
          email: emailArb,
          company: fc.constant(""),
          role: fc.string({ minLength: 1 }),
          conversionPath: fc.constantFrom("waitlist", "demo", "trial"),
          consentGiven: fc.constant(true),
        }),
        (payload) => leadSchema.safeParse(payload).success === false
      ),
      { numRuns: 100 }
    );
  });

  test("invalid conversionPath always fails validation", () => {
    fc.assert(
      fc.property(
        fc.record({
          firstName: fc.string({ minLength: 1 }),
          lastName: fc.string({ minLength: 1 }),
          email: emailArb,
          company: fc.string({ minLength: 1 }),
          role: fc.string({ minLength: 1 }),
          conversionPath: fc.string().filter(
            (s) => !["waitlist", "demo", "trial"].includes(s)
          ),
          consentGiven: fc.constant(true),
        }),
        (payload) => leadSchema.safeParse(payload).success === false
      ),
      { numRuns: 100 }
    );
  });
});
