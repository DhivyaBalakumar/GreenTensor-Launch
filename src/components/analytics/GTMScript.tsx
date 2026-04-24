"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import type { ConsentState } from "@/lib/consent/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * GTMScript — injects the Google Tag Manager script only after
 * the user has granted analytics consent via the CookieConsentBanner.
 *
 * Subscribes to the custom "gt:consent" event dispatched by CookieConsentBanner.
 */
export default function GTMScript() {
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

  if (!analyticsAllowed || !GTM_ID) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
