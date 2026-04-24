"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import CarbonCounter from "@/components/ui/CarbonCounter";

const TERMINAL_LINES = [
  { text: "$ pip install greentensor", delay: 0, type: "cmd" },
  { text: "Successfully installed greentensor-0.6.0", delay: 600, type: "success" },
  { text: "", delay: 900, type: "blank" },
  { text: "$ python train.py", delay: 1100, type: "cmd" },
  { text: "[GreenTensor] Tracking enabled", delay: 1700, type: "info" },
  { text: "[GreenTensor] Mixed precision: ON", delay: 2000, type: "info" },
  { text: "[GreenTensor] AquaTensor Water Intelligence: ON", delay: 2300, type: "aqua" },
  { text: "[GreenTensor] Carbon Anomaly Detection: ON", delay: 2600, type: "info" },
  { text: "", delay: 2900, type: "blank" },
  { text: "Epoch 1/3: 100%|████████| loss=0.342", delay: 3200, type: "epoch" },
  { text: "Epoch 2/3: 100%|████████| loss=0.198", delay: 3700, type: "epoch" },
  { text: "Epoch 3/3: 100%|████████| loss=0.091", delay: 4200, type: "epoch" },
  { text: "", delay: 4500, type: "blank" },
  { text: "+======================================+", delay: 4700, type: "report" },
  { text: "|   GreenTensor Report  v0.6.0         |", delay: 4850, type: "report-title" },
  { text: "+======================================+", delay: 5000, type: "report" },
  { text: "Runtime          : 45.23 s", delay: 5150, type: "report-data" },
  { text: "Energy Used      : 0.000412 kWh", delay: 5300, type: "report-data" },
  { text: "CO2 Emissions    : 0.000096 kg", delay: 5450, type: "report-data" },
  { text: "Energy Saved     : 29.0% vs baseline", delay: 5600, type: "report-savings" },
  { text: "-- AquaTensor Water Intelligence ----", delay: 5750, type: "report-section" },
  { text: "Water Consumed   : 0.000202 L", delay: 5900, type: "report-data" },
  { text: "Water Produced   : 0.001474 L (membrane)", delay: 6050, type: "aqua-data" },
  { text: "Net Water Impact : -0.001272 L (NET POSITIVE)", delay: 6200, type: "aqua-positive" },
  { text: "-- Carbon Anomaly Detection ---------", delay: 6350, type: "report-section" },
  { text: "Status           : CLEAN ✓", delay: 6500, type: "report-savings" },
  { text: "-- Digital Footprint ----------------", delay: 6650, type: "report-section" },
  { text: "Status           : CLEAN ✓", delay: 6800, type: "report-savings" },
  { text: "+======================================+", delay: 6950, type: "report" },
];

function getLineClass(type: string): string {
  switch (type) {
    case "cmd":          return "text-gt-green";
    case "success":      return "text-green-400";
    case "info":         return "text-gt-cyan";
    case "aqua":         return "text-blue-300";
    case "epoch":        return "text-gt-blue";
    case "report":       return "text-gt-muted";
    case "report-title": return "text-gt-green font-semibold";
    case "report-section": return "text-gt-muted";
    case "report-data":  return "text-gt-text";
    case "report-savings": return "text-gt-green font-semibold";
    case "aqua-data":    return "text-blue-300";
    case "aqua-positive": return "text-cyan-300 font-semibold";
    default:             return "text-gt-muted";
  }
}

function AnimatedTerminal() {
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleCount(TERMINAL_LINES.length);
      return;
    }

    let restartTimer: ReturnType<typeof setTimeout>;

    function startSequence() {
      const timers: ReturnType<typeof setTimeout>[] = [];

      TERMINAL_LINES.forEach((line, i) => {
        const t = setTimeout(() => {
          setVisibleCount(i + 1);
        }, line.delay);
        timers.push(t);
      });

      // After all lines shown, wait 3000ms then restart
      const lastDelay = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay;
      restartTimer = setTimeout(() => {
        setVisibleCount(0);
        // Small delay before re-running so the reset is visible
        restartTimer = setTimeout(startSequence, 200);
      }, lastDelay + 3000);

      return timers;
    }

    const timers = startSequence();

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 530);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(restartTimer);
      clearInterval(cursorInterval);
    };
  }, [shouldReduceMotion]);

  const lines = shouldReduceMotion ? TERMINAL_LINES : TERMINAL_LINES.slice(0, visibleCount);

  return (
    <div
      role="img"
      aria-label="Animated terminal showing GreenTensor installation and training output"
      className="relative rounded-2xl overflow-hidden border border-gt-border bg-gt-bg shadow-2xl"
    >
      {/* Terminal toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gt-border bg-gt-surface">
        <div className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
        <span className="ml-3 text-gt-muted text-xs font-mono">
          greentensor — python train.py
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm leading-relaxed min-h-[340px]">
        {lines.map((line, i) => (
          <div key={i} className={`${getLineClass(line.type)} whitespace-pre`}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {/* Blinking cursor */}
        {visibleCount < TERMINAL_LINES.length && !shouldReduceMotion && (
          <span
            aria-hidden="true"
            className={`inline-block w-2 h-4 bg-gt-green align-middle transition-opacity duration-100 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,197,94,0.10) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" },
        };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle green gradient overlay at top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-96 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(34,197,94,0.04) 0%, transparent 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {/* Section label */}
            <motion.div {...fadeUp(0)}>
              <span className="section-label text-gt-green font-mono text-xs uppercase tracking-widest">
                {"// CARBON-AWARE ML INFRASTRUCTURE"}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              id="hero-heading"
              {...fadeUp(0.1)}
              className="text-gt-text font-extrabold leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)" }}
            >
              The Carbon Intelligence Layer{" "}
              <span className="text-gt-green">for AI Infrastructure</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-gt-muted text-lg leading-relaxed max-w-xl"
            >
              GreenTensor is an open-source Python middleware that gives every
              AI team real-time carbon tracking, GPU optimization, water
              intelligence via <span className="text-blue-300 font-medium">AquaTensor</span>,
              and automated ESG reporting — with one line of code.
            </motion.p>

            {/* Live carbon counter */}
            <motion.div {...fadeUp(0.22)}>
              <CarbonCounter />
            </motion.div>

            {/* Live stats row */}
            <motion.div
              {...fadeUp(0.25)}
              className="flex flex-wrap gap-3 items-center"
            >
              <a
                href="https://pepy.tech/project/greentensor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PyPI download stats for greentensor"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gt-surface border border-gt-border text-gt-muted text-xs font-mono hover:border-gt-green/40 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-gt-green inline-block" aria-hidden="true" />
                PyPI Downloads
              </a>
              <a
                href="https://github.com/DhivyaBalakumar/GreenTensor-Carbon-Aware-MLOps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GreenTensor GitHub repository"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gt-surface border border-gt-border text-gt-muted text-xs font-mono hover:border-gt-blue/40 transition-colors"
              >
                <span aria-hidden="true">★</span> GitHub
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gt-surface border border-gt-green/30 text-gt-green text-xs font-mono">
                v0.6.0
              </span>
            </motion.div>

            {/* PyPI install badge */}
            <motion.div {...fadeUp(0.28)}>
              <a
                href="https://pypi.org/project/greentensor/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Install greentensor from PyPI"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gt-surface border border-gt-green/30 text-gt-green text-sm font-mono hover:border-gt-green/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green"
              >
                <span className="text-gt-muted">$</span> pip install greentensor
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-gt-green/10 border border-gt-green/20 font-sans">
                  v0.6.0
                </span>
              </a>
            </motion.div>

            {/* CTA group */}
            <motion.div
              {...fadeUp(0.32)}
              className="flex flex-wrap gap-3 mt-2"
            >
              <Button
                variant="primary"
                size="lg"
                href="#demo-section"
                aria-label="See GreenTensor live demo"
              >
                See Live Demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="https://github.com/DhivyaBalakumar/GreenTensor-Carbon-Aware-MLOps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GreenTensor on GitHub"
              >
                View on GitHub
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="#waitlist"
                aria-label="Get early access to GreenTensor"
              >
                Get Early Access
              </Button>
            </motion.div>
          </div>

          {/* Right — animated terminal */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 24 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <AnimatedTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
