/**
 * CircuitDivider — thin SVG path resembling a PCB trace used as a section divider.
 * Accepts a color prop to switch between green, blue, and cyan accents.
 */

type CircuitDividerProps = {
  color?: "green" | "blue" | "cyan";
  className?: string;
};

const colorMap = {
  green: "rgba(34,197,94,0.18)",
  blue:  "rgba(59,130,246,0.18)",
  cyan:  "rgba(6,182,212,0.18)",
};

export default function CircuitDivider({
  color = "green",
  className = "",
}: CircuitDividerProps) {
  const stroke = colorMap[color];

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden my-2 ${className}`}
    >
      <svg
        viewBox="0 0 1200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10"
        preserveAspectRatio="none"
      >
        {/* Main horizontal trace */}
        <path
          d="M0 20 H 200 L 220 8 H 320 L 340 20 H 500 L 520 32 H 580 L 600 20 H 800 L 820 8 H 900 L 920 20 H 1200"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Junction dots */}
        <circle cx="220" cy="8"  r="2.5" fill={stroke} />
        <circle cx="340" cy="20" r="2.5" fill={stroke} />
        <circle cx="520" cy="32" r="2.5" fill={stroke} />
        <circle cx="600" cy="20" r="2.5" fill={stroke} />
        <circle cx="820" cy="8"  r="2.5" fill={stroke} />
        <circle cx="920" cy="20" r="2.5" fill={stroke} />
        {/* Short branch traces */}
        <path d="M 340 20 V 36" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <path d="M 600 20 V 4"  stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <path d="M 820 8  V 24" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}
