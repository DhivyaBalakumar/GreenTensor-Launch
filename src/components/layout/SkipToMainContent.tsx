/**
 * SkipToMainContent — WCAG 2.1 AA skip link.
 * Visually hidden until focused; must be the first focusable element in the DOM.
 */
export default function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className={[
        "sr-only focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-[9999]",
        "focus:px-4 focus:py-2 focus:rounded-lg",
        "focus:bg-gt-green focus:text-gt-bg focus:font-semibold",
        "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gt-green",
        "transition-all",
      ].join(" ")}
    >
      Skip to main content
    </a>
  );
}
