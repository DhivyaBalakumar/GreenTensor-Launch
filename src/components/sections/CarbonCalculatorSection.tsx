"use client";

import { useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

type GpuType = "RTX 3090" | "A100" | "H100" | "V100";

const GPU_WATTS: Record<GpuType, number> = {
  "RTX 3090": 350,
  "A100": 400,
  "H100": 700,
  "V100": 300,
};

const GPU_OPTIONS: GpuType[] = ["RTX 3090", "A100", "H100", "V100"];

function formatNum(n: number, decimals = 1): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function CarbonCalculatorSection() {
  const shouldReduceMotion = useReducedMotion();

  const [gpuHours, setGpuHours] = useState(100);
  const [gpuType, setGpuType] = useState<GpuType>("A100");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTimer, setToastTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const watts = GPU_WATTS[gpuType];
  const monthlyEnergy = (gpuHours * watts) / 1000; // kWh
  const monthlyCO2 = monthlyEnergy * 0.4; // kg
  const annualCO2 = monthlyCO2 * 12; // kg
  const savedMonthlyCO2 = monthlyCO2 * 0.29;
  const gtMonthlyCO2 = monthlyCO2 - savedMonthlyCO2;
  const gtAnnualCO2 = annualCO2 * 0.71;
  const treesNeeded = Math.ceil(annualCO2 / 21);
  const gtTreesNeeded = Math.ceil(gtAnnualCO2 / 21);

  const handleShare = useCallback(() => {
    const tweet = `My AI workloads emit ~${Math.round(monthlyCO2)}kg CO₂/month. @GreenTensorAI reduces that by 29% automatically. pip install greentensor`;
    navigator.clipboard.writeText(tweet).catch(() => {
      // Fallback: silently fail
    });

    if (toastTimer) clearTimeout(toastTimer);
    setToastVisible(true);
    const t = setTimeout(() => setToastVisible(false), 2000);
    setToastTimer(t);
  }, [monthlyCO2, toastTimer]);

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Radial green glow from center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-gt-green">
              {"// CARBON CALCULATOR"}
            </span>
            <h2
              id="calculator-heading"
              className="mt-3 text-gt-text font-bold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              How Much Is Your AI{" "}
              <span className="text-gt-green">Costing the Planet?</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Calculator card */}
        <ScrollReveal delay={0.1}>
          <div
            className="rounded-2xl border border-gt-green/30 bg-gt-surface p-6 sm:p-8 eco-breathe"
          >
            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              {/* GPU Hours slider */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="gpu-hours-slider"
                  className="text-gt-text text-sm font-medium"
                >
                  GPU Hours / month
                  <span className="ml-2 text-gt-green font-mono font-bold">
                    {gpuHours.toLocaleString("en-US")}h
                  </span>
                </label>
                <input
                  id="gpu-hours-slider"
                  type="range"
                  min={1}
                  max={1000}
                  value={gpuHours}
                  onChange={(e) => setGpuHours(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: "#22C55E",
                    background: `linear-gradient(to right, #22C55E ${gpuHours / 10}%, #1E2D3D ${gpuHours / 10}%)`,
                  }}
                  aria-valuemin={1}
                  aria-valuemax={1000}
                  aria-valuenow={gpuHours}
                  aria-valuetext={`${gpuHours} GPU hours per month`}
                />
                <div className="flex justify-between text-gt-muted text-xs font-mono">
                  <span>1h</span>
                  <span>1,000h</span>
                </div>
              </div>

              {/* GPU Type select */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="gpu-type-select"
                  className="text-gt-text text-sm font-medium"
                >
                  GPU Type
                  <span className="ml-2 text-gt-muted font-mono text-xs">
                    ({watts}W)
                  </span>
                </label>
                <select
                  id="gpu-type-select"
                  value={gpuType}
                  onChange={(e) => setGpuType(e.target.value as GpuType)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gt-bg border border-gt-border text-gt-text text-sm font-mono focus:outline-none focus:border-gt-green/60 transition-colors"
                >
                  {GPU_OPTIONS.map((gpu) => (
                    <option key={gpu} value={gpu}>
                      {gpu} — {GPU_WATTS[gpu]}W
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Without GreenTensor */}
              <div className="rounded-xl border border-gt-border bg-gt-bg p-5 flex flex-col gap-3">
                <p className="text-gt-muted text-xs uppercase tracking-wider font-mono">
                  Without GreenTensor
                </p>
                <ResultRow
                  label="Monthly energy"
                  value={`${formatNum(monthlyEnergy)} kWh`}
                  color="text-gt-text"
                />
                <ResultRow
                  label="Monthly CO₂"
                  value={`${formatNum(monthlyCO2)} kg`}
                  color="text-gt-text"
                />
                <ResultRow
                  label="Annual CO₂"
                  value={`${formatNum(annualCO2)} kg`}
                  color="text-gt-text"
                />
                <div className="pt-2 border-t border-gt-border">
                  <p className="text-gt-muted text-xs">
                    ≈{" "}
                    <span className="text-gt-text font-semibold">
                      {treesNeeded.toLocaleString("en-US")} trees
                    </span>{" "}
                    needed to offset annually
                  </p>
                </div>
              </div>

              {/* With GreenTensor */}
              <div
                className="rounded-xl border border-gt-green/40 bg-gt-bg p-5 flex flex-col gap-3 relative overflow-hidden"
                style={{
                  boxShadow: shouldReduceMotion
                    ? undefined
                    : "0 0 30px rgba(34,197,94,0.08)",
                }}
              >
                {/* Green glow overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at top right, rgba(34,197,94,0.06) 0%, transparent 60%)",
                  }}
                />
                <p className="text-gt-green text-xs uppercase tracking-wider font-mono font-semibold relative">
                  With GreenTensor (29% savings)
                </p>
                <ResultRow
                  label="Monthly energy"
                  value={`${formatNum(monthlyEnergy * 0.71)} kWh`}
                  color="text-gt-green"
                />
                <ResultRow
                  label="Monthly CO₂"
                  value={`${formatNum(gtMonthlyCO2)} kg`}
                  color="text-gt-green"
                />
                <ResultRow
                  label="Annual CO₂"
                  value={`${formatNum(gtAnnualCO2)} kg`}
                  color="text-gt-green"
                />
                <div className="pt-2 border-t border-gt-green/20 relative">
                  <p className="text-gt-muted text-xs">
                    ≈{" "}
                    <span className="text-gt-green font-semibold">
                      {gtTreesNeeded.toLocaleString("en-US")} trees
                    </span>{" "}
                    needed to offset annually
                  </p>
                  <p className="text-gt-green text-xs font-semibold mt-1">
                    You save{" "}
                    {formatNum(savedMonthlyCO2)} kg CO₂/month
                  </p>
                </div>
              </div>
            </div>

            {/* Share button + toast */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gt-green/10 border border-gt-green/30 text-gt-green text-sm font-semibold hover:bg-gt-green/20 hover:border-gt-green/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share your result
              </button>

              {toastVisible && (
                <span
                  role="status"
                  aria-live="polite"
                  className="text-gt-green text-sm font-mono animate-pulse"
                >
                  ✓ Copied to clipboard!
                </span>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-gt-muted text-xs">{label}</span>
      <span className={`font-mono font-semibold text-sm ${color}`}>{value}</span>
    </div>
  );
}
