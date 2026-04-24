/**
 * GlowOrbs — two large radial-gradient blobs behind the hero.
 * Pure CSS, no images, fixed positioning.
 */
export default function GlowOrbs() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Green orb — top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Blue orb — top-right */}
      <div
        className="absolute -top-20 -right-40 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
