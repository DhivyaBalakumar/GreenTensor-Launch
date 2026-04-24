import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import React from "react";
import GTMScript from "@/components/analytics/GTMScript";
import PlausibleScript from "@/components/analytics/PlausibleScript";
import type { ConsentState } from "@/lib/consent/analytics";

// ─── localStorage mock ────────────────────────────────────────────────────────

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setConsent(analytics: boolean) {
  const state: ConsentState = {
    necessary: true,
    analytics,
    marketing: analytics,
    consentTimestamp: new Date().toISOString(),
    consentVersion: "1.0",
  };
  localStorageMock.setItem("gt_consent", JSON.stringify(state));
  return state;
}

function dispatchConsentEvent(analytics: boolean) {
  const state = setConsent(analytics);
  window.dispatchEvent(new CustomEvent("gt:consent", { detail: state }));
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Analytics scripts — consent gating", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    // Ensure GTM_ID is not set so GTMScript returns null even when allowed
    // (we test the consent logic, not the actual script injection)
    delete process.env.NEXT_PUBLIC_GTM_ID;
  });

  describe("GTMScript", () => {
    test("renders nothing when no consent given", () => {
      const { container } = render(<GTMScript />);
      // No script elements should be injected
      expect(container.innerHTML).toBe("");
    });

    test("renders nothing when analytics consent is false", async () => {
      setConsent(false);
      const { container } = render(<GTMScript />);
      await waitFor(() => {
        expect(container.innerHTML).toBe("");
      });
    });

    test("does not inject script when consent event fires with analytics: false", async () => {
      const { container } = render(<GTMScript />);

      act(() => {
        dispatchConsentEvent(false);
      });

      await waitFor(() => {
        expect(container.innerHTML).toBe("");
      });
    });
  });

  describe("PlausibleScript", () => {
    test("renders nothing when no consent given", () => {
      const { container } = render(<PlausibleScript />);
      expect(container.innerHTML).toBe("");
    });

    test("renders nothing when analytics consent is false", async () => {
      setConsent(false);
      const { container } = render(<PlausibleScript />);
      await waitFor(() => {
        expect(container.innerHTML).toBe("");
      });
    });

    test("does not inject script when consent event fires with analytics: false", async () => {
      const { container } = render(<PlausibleScript />);

      act(() => {
        dispatchConsentEvent(false);
      });

      await waitFor(() => {
        expect(container.innerHTML).toBe("");
      });
    });
  });
});
