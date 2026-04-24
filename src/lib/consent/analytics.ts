// ─── ConsentState ─────────────────────────────────────────────────────────────

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  consentTimestamp: string;
  consentVersion: string;
}

// ─── shouldLoadAnalytics ──────────────────────────────────────────────────────

/**
 * Returns true only when the user has explicitly consented to analytics.
 * This is the single source of truth for gating analytics script injection.
 *
 * Property 5: For any ConsentState where analytics is false,
 * shouldLoadAnalytics returns false; and for any ConsentState where
 * analytics is true, shouldLoadAnalytics returns true.
 */
export function shouldLoadAnalytics(consentState: ConsentState): boolean {
  return consentState.analytics === true;
}
