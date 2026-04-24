import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";

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

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  test("appears on first visit (no gt_consent in localStorage)", async () => {
    render(<CookieConsentBanner />);
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy();
    });
    expect(screen.getByText("We use cookies")).toBeTruthy();
  });

  test("does not appear when consent already given", async () => {
    // Pre-set consent in localStorage
    localStorageMock.setItem(
      "gt_consent",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        consentTimestamp: new Date().toISOString(),
        consentVersion: "1.0",
      })
    );

    render(<CookieConsentBanner />);

    // Banner should not be visible
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  test("Accept All button writes consent to localStorage", async () => {
    render(<CookieConsentBanner />);

    await waitFor(() => {
      expect(screen.getByText("Accept All")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Accept All"));

    await waitFor(() => {
      const stored = localStorageMock.getItem("gt_consent");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.analytics).toBe(true);
      expect(parsed.marketing).toBe(true);
      expect(parsed.necessary).toBe(true);
    });
  });

  test("Reject Non-Essential writes analytics: false to localStorage", async () => {
    render(<CookieConsentBanner />);

    await waitFor(() => {
      expect(screen.getByText("Reject Non-Essential")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Reject Non-Essential"));

    await waitFor(() => {
      const stored = localStorageMock.getItem("gt_consent");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.analytics).toBe(false);
      expect(parsed.marketing).toBe(false);
    });
  });

  test("Accept All dispatches gt:consent custom event", async () => {
    const eventSpy = vi.fn();
    window.addEventListener("gt:consent", eventSpy);

    render(<CookieConsentBanner />);

    await waitFor(() => {
      expect(screen.getByText("Accept All")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Accept All"));

    await waitFor(() => {
      expect(eventSpy).toHaveBeenCalledOnce();
      const event = eventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.analytics).toBe(true);
    });

    window.removeEventListener("gt:consent", eventSpy);
  });

  test("banner disappears after accepting", async () => {
    render(<CookieConsentBanner />);

    await waitFor(() => {
      expect(screen.getByText("Accept All")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Accept All"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });
});
