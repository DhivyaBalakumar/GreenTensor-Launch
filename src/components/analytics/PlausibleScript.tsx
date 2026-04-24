"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import type { ConsentState } from "@/lib/consent/analytics";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "greentensor.ai";

/**
 * PlausibleScript — injects the Plausible analytics script only after
 * the user has granted analytics consent via the CookieConsentBanner.
 *
 * Subscribes to the custom "gt:consent" event dispatched by CookieConsentBanner.
 */
export default function PlausibleScript() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    // Check existing consent on mount
    try {
      const raw = localStorage.getItem("gt_consent");
      if (raw) {
        const state = JSON.parse(raw) as ConsentState;
        if (state.analytics) setAnalyticsAllowed(true);
      }
    } catch {
      // Ignore parse errors
    }

    // Listen for consent updates
    const handleConsent = (e: Event) => {
      const state = (e as CustomEvent<ConsentState>).detail;
      setAnalyticsAllowed(state.analytics === true);
    };

    window.addEventListener("gt:consent", handleConsent);
    return () => window.removeEventListener("gt:consent", handleConsent);
  }, []);

  if (!analyticsAllowed) return null;

  return (
    <Script
      id="plausible-script"
      strategy="afterInteractive"
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
    />
  );
}
