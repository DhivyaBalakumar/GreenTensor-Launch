/**
 * DotGrid — full-page SVG dot-grid background overlay.
 * Fixed behind all content, pointer-events: none.
 */
export default function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}
