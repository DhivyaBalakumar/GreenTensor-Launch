"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Global AI energy: ~500 TWh/year (IEA estimate)
// Carbon intensity: ~0.4 kg CO₂/kWh
// => ~200 million kg CO₂/year = ~547,945 kg/day = ~6.34 kg/second
const KG_PER_SECOND = 6.34;

function getSecondsSinceMidnightUTC(): number {
  const now = new Date();
  const midnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  return (now.getTime() - midnight.getTime()) / 1000;
}

function formatWithCommas(n: number): string {
  return Math.floor(n).toLocaleString("en-US");
}

export default function CarbonCounter() {
  const shouldReduceMotion = useReducedMotion();

  // The "real" counter value (updated every second)
  const [baseCount, setBaseCount] = useState<number>(() => {
    return getSecondsSinceMidnightUTC() * KG_PER_SECOND;
  });

  // The displayed value (interpolated via rAF)
  const [displayCount, setDisplayCount] = useState<number>(baseCount);

  const prevBaseRef = useRef<number>(baseCount);
  const nextBaseRef = useRef<number>(baseCount);
  const interpolationStartRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Tick every second: advance by KG_PER_SECOND
    const interval = setInterval(() => {
      setBaseCount((prev) => {
        const next = prev + KG_PER_SECOND;
        prevBaseRef.current = prev;
        nextBaseRef.current = next;
        interpolationStartRef.current = performance.now();
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayCount(baseCount);
      return;
    }

    // Smoothly interpolate from prev to next over 1000ms
    const animate = (now: number) => {
      const elapsed = now - interpolationStartRef.current;
      const progress = Math.min(elapsed / 1000, 1);
      const interpolated =
        prevBaseRef.current +
        (nextBaseRef.current - prevBaseRef.current) * progress;
      setDisplayCount(interpolated);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseCount, shouldReduceMotion]);

  const formattedCount = formatWithCommas(displayCount);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gt-surface/60 border border-gt-green/20 backdrop-blur-sm">
      <span
        aria-hidden="true"
        className="w-2 h-2 rounded-full bg-gt-green animate-pulse flex-shrink-0"
      />
      <span className="text-gt-muted text-xs font-mono whitespace-nowrap">
        AI CO₂ today:
      </span>
      <span
        className="text-gt-green font-mono font-bold text-sm"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${formattedCount} kilograms of CO2 emitted by AI today`}
      >
        {formattedCount} kg
      </span>
      <span className="text-gt-muted text-xs whitespace-nowrap">
        and counting
      </span>
    </div>
  );
}
