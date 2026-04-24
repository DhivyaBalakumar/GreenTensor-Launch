// Feature: green-tensor-website, Property 5: shouldLoadAnalytics returns correct boolean for any ConsentState
import { describe, test, expect } from "vitest";
import fc from "fast-check";
import { shouldLoadAnalytics } from "@/lib/consent/analytics";
import type { ConsentState } from "@/lib/consent/analytics";

// ─── Arbitraries ─────────────────────────────────────────────────────────────

const consentStateArb = fc.record({
  necessary: fc.constant(true as const),
  analytics: fc.boolean(),
  marketing: fc.boolean(),
  consentTimestamp: fc.constant(new Date().toISOString()),
  consentVersion: fc.string({ minLength: 1, maxLength: 10 }),
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Property 5: shouldLoadAnalytics returns correct boolean for any ConsentState", () => {
  test("shouldLoadAnalytics returns exactly consentState.analytics for any ConsentState", () => {
    fc.assert(
      fc.property(consentStateArb, (consentState: ConsentState) => {
        const result = shouldLoadAnalytics(consentState);
        return result === consentState.analytics;
      }),
      { numRuns: 100 }
    );
  });

  test("shouldLoadAnalytics returns false when analytics is false", () => {
    fc.assert(
      fc.property(
        consentStateArb.filter((s) => s.analytics === false),
        (consentState: ConsentState) => {
          return shouldLoadAnalytics(consentState) === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  test("shouldLoadAnalytics returns true when analytics is true", () => {
    fc.assert(
      fc.property(
        consentStateArb.filter((s) => s.analytics === true),
        (consentState: ConsentState) => {
          return shouldLoadAnalytics(consentState) === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test("marketing consent does not affect analytics gate", () => {
    // analytics=false, marketing=true should still return false
    fc.assert(
      fc.property(
        consentStateArb.filter((s) => s.analytics === false && s.marketing === true),
        (consentState: ConsentState) => {
          return shouldLoadAnalytics(consentState) === false;
        }
      ),
      { numRuns: 100 }
    );
  });
});
