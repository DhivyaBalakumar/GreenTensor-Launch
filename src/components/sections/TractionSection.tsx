"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Shield, Package, Layers, Zap, TrendingUp, FileCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type TractionCard = {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  accent: string;
  mono?: boolean;
};

const TRACTION_CARDS: TractionCard[] = [
  {
    icon: Shield,
    title: "Open Source",
    value: "MIT License",
    description: "Fully open-source and publicly available. Audit the code, fork it, contribute.",
    accent: "#22C55E",
  },
  {
    icon: Package,
    title: "PyPI Published",
    value: "pip install greentensor",
    description: "Available on the Python Package Index. Install in seconds, no sign-up required.",
    accent: "#3B82F6",
    mono: true,
  },
  {
    icon: Layers,
    title: "4 Pillars",
    value: "Carbon · Water · Security · ESG",
    description: "Carbon tracking, AquaTensor water intelligence, anomaly detection, and ESG reporting — unified in one SDK.",
    accent: "#06B6D4",
  },
  {
    icon: Zap,
    title: "Zero Config",
    value: "1 line of code",
    description: "Works with existing PyTorch training loops. No changes to your model or data pipeline.",
    accent: "#22C55E",
  },
  {
    icon: TrendingUp,
    title: "Real Savings",
    value: "29%+ energy reduction",
    description: "Measured 29% energy savings vs baseline, plus net-positive water impact via membrane distillation.",
    accent: "#3B82F6",
  },
  {
    icon: FileCheck,
    title: "ESG Ready",
    value: "GRI · TCFD · CDP",
    description: "Output maps directly to GRI, TCFD, and CDP disclosure frameworks.",
    accent: "#06B6D4",
  },
];

export default function TractionSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="traction-heading"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-gt-cyan">
              {"// TRACTION & CREDIBILITY"}
            </span>
            <h2
              id="traction-heading"
              className="mt-3 text-gt-text font-bold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Built for production.{" "}
              <span className="text-gt-cyan">Ready for investors.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Release banner */}
        <ScrollReveal delay={0.05}>
          <div className="mb-10 rounded-xl border border-gt-border bg-gt-surface px-6 py-4 flex flex-wrap gap-6 items-center justify-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-gt-green/10 border border-gt-green/30 text-gt-green text-xs font-mono font-semibold">
                v0.6.0
              </span>
              <span className="text-gt-muted text-sm">Latest stable release</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-300/30 text-blue-300 text-xs font-mono font-semibold">
                AquaTensor
              </span>
              <span className="text-gt-muted text-sm">Water intelligence built-in</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-gt-blue/10 border border-gt-blue/30 text-gt-blue text-xs font-mono font-semibold">
                MIT License
              </span>
              <span className="text-gt-muted text-sm">Free to use commercially</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-gt-cyan/10 border border-gt-cyan/30 text-gt-cyan text-xs font-mono font-semibold">
                Python 3.9+
              </span>
              <span className="text-gt-muted text-sm">Published on PyPI</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {TRACTION_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} delay={index * 0.08}>
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { y: -3, transition: { duration: 0.2 } }
                  }
                  className="flex flex-col gap-3 p-6 rounded-2xl bg-gt-surface border border-gt-border h-full"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${card.accent}15` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: card.accent }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-gt-muted text-xs uppercase tracking-wider mb-1">
                      {card.title}
                    </p>
                    <p
                      className={`font-bold text-lg ${card.mono ? "font-mono text-base" : ""}`}
                      style={{ color: card.accent }}
                    >
                      {card.value}
                    </p>
                  </div>
                  <p className="text-gt-muted text-sm leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Why Now */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-gt-green/20 bg-gt-surface p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(34,197,94,0.12)" }}
              >
                <TrendingUp className="w-5 h-5 text-gt-green" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-gt-text font-semibold text-xl mb-3">
                  Why Now
                </h3>
                <p className="text-gt-muted leading-relaxed max-w-3xl">
                  AI compute costs are exploding — training a single large model
                  can emit as much CO₂ as five cars over their lifetimes. The{" "}
                  <span className="text-gt-text">EU AI Act</span> and{" "}
                  <span className="text-gt-text">SEC climate disclosure rules</span>{" "}
                  are forcing companies to measure and report AI emissions. Yet
                  no standard tooling exists for ML teams. GreenTensor is the
                  only tool that makes carbon measurement and ESG reporting
                  automatic — dropping directly into existing PyTorch workflows
                  with a single context manager.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
