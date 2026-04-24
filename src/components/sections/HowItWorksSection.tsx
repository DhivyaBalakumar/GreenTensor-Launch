"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Zap, Code2, Play, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  code: string;
  codeLabel: string;
  accent: string;
  accentHex: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    icon: Zap,
    title: "Install",
    description:
      "One command. No configuration files, no environment setup, no dependencies beyond PyTorch.",
    code: "pip install greentensor",
    codeLabel: "Terminal",
    accent: "gt-green",
    accentHex: "#22C55E",
  },
  {
    number: "02",
    icon: Code2,
    title: "Wrap",
    description:
      "Wrap your training loop with a single context manager. GreenTensor instruments everything automatically.",
    code: "with GreenTensor() as gt:\n    # your training code here",
    codeLabel: "Python",
    accent: "gt-blue",
    accentHex: "#3B82F6",
  },
  {
    number: "03",
    icon: Play,
    title: "Train",
    description:
      "Your existing training code runs completely unchanged. GreenTensor works silently in the background.",
    code: "model.fit(train_loader)\n# ← zero changes needed",
    codeLabel: "Python",
    accent: "gt-cyan",
    accentHex: "#06B6D4",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Report",
    description:
      "Automatic carbon report with energy usage, CO₂ emissions, GPU efficiency gains, and ESG-ready data.",
    code: "# GreenTensor Report\n# CO₂: 0.000096 kg | Savings: 23%",
    codeLabel: "Output",
    accent: "gt-green",
    accentHex: "#22C55E",
  },
] as Step[];

export default function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-gt-green">
              {"// HOW IT WORKS"}
            </span>
            <h2
              id="how-it-works-heading"
              className="mt-3 text-gt-text font-bold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              From zero to carbon-aware in{" "}
              <span className="text-gt-green">4 steps</span>
            </h2>
            <p className="mt-4 text-gt-muted text-lg max-w-2xl mx-auto">
              No infrastructure changes. No rewriting your training code. Just
              install, wrap, and get instant visibility into your AI carbon
              footprint.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps grid */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[72px] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(34,197,94,0.3) 0px, rgba(34,197,94,0.3) 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.number} delay={index * 0.1}>
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { y: -4, transition: { duration: 0.2 } }
                    }
                    className="relative flex flex-col gap-4 p-6 rounded-2xl bg-gt-surface border border-gt-border hover:border-opacity-60 transition-colors"
                    style={
                      {
                        "--step-accent": step.accentHex,
                      } as React.CSSProperties
                    }
                  >
                    {/* Step number + icon */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-4xl font-extrabold font-mono leading-none"
                        style={{ color: `${step.accentHex}20` }}
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${step.accentHex}15` }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: step.accentHex }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-gt-text font-semibold text-lg">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gt-muted text-sm leading-relaxed flex-1">
                      {step.description}
                    </p>

                    {/* Code snippet */}
                    <div className="rounded-lg overflow-hidden border border-gt-border bg-gt-bg">
                      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gt-border">
                        <span className="text-gt-muted text-[10px] font-mono uppercase tracking-wider">
                          {step.codeLabel}
                        </span>
                      </div>
                      <pre className="px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto">
                        <code style={{ color: step.accentHex }}>{step.code}</code>
                      </pre>
                    </div>

                    {/* Animated connector dot — desktop */}
                    {index < STEPS.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="hidden lg:block absolute -right-2 top-[72px] w-4 h-4 rounded-full border-2 z-10"
                        style={{
                          borderColor: step.accentHex,
                          backgroundColor: "#050A0E",
                        }}
                      />
                    )}
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
