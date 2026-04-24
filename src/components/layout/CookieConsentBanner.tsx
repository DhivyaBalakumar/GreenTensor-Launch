"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Button from "@/components/ui/Button";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  consentTimestamp: string;
  consentVersion: string;
}

const CONSENT_KEY = "gt_consent";
const CONSENT_VERSION = "1.0";

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.consentVersion !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState) {
  const json = JSON.stringify(state);
  localStorage.setItem(CONSENT_KEY, json);
  // Also write a first-party cookie for server-side reading
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(json)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  // Dispatch event so GTM / analytics scripts can react
  window.dispatchEvent(new CustomEvent("gt:consent", { detail: state }));
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);
  }, []);

  const acceptAll = () => {
    writeConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      consentTimestamp: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
    });
    setVisible(false);
  };

  const rejectNonEssential = () => {
    writeConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      consentTimestamp: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
    });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9998] bg-gt-surface border border-gt-border rounded-xl p-5 shadow-2xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <Cookie
              size={20}
              className="text-gt-green mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-gt-text font-semibold text-sm mb-1">
                We use cookies
              </p>
              <p className="text-gt-muted text-xs leading-relaxed">
                We use analytics and marketing cookies to improve your experience
                and understand how you use our site. You can manage your
                preferences at any time.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={acceptAll}
              className="flex-1"
            >
              Accept All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={rejectNonEssential}
              className="flex-1"
            >
              Reject Non-Essential
            </Button>
          </div>

          <p className="text-gt-muted text-xs mt-3 text-center">
            <a
              href="/privacy"
              className="underline hover:text-gt-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
            >
              Privacy Policy
            </a>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
