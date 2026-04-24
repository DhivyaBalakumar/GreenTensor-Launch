import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gt-bg":        "var(--color-gt-bg)",
        "gt-surface":   "var(--color-gt-surface)",
        "gt-border":    "var(--color-gt-border)",
        "gt-green":     "var(--color-gt-green)",
        "gt-green-dim": "var(--color-gt-green-dim)",
        "gt-blue":      "var(--color-gt-blue)",
        "gt-blue-dim":  "var(--color-gt-blue-dim)",
        "gt-cyan":      "var(--color-gt-cyan)",
        "gt-text":      "var(--color-gt-text)",
        "gt-muted":     "var(--color-gt-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "'Courier New'", "monospace"],
      },
      fontSize: {
        "hero-h1": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", fontWeight: "800" }],
        "section-h2": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "card-h3": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "metric": ["3rem", { lineHeight: "1", fontWeight: "800" }],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "24px 24px",
      },
      animation: {
        scanline: "scanline 4s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%":   { transform: "translateY(0)", opacity: "0" },
          "10%":  { opacity: "0.4" },
          "90%":  { opacity: "0.4" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
