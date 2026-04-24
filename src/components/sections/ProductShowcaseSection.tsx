"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Leaf, Shield, BarChart3, Package } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

// ─── Install Banner ───────────────────────────────────────────────────────────

function InstallBanner() {
  return (
    <ScrollReveal>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gt-green/30 bg-gt-green/5 px-6 py-4 mb-8">
        <div className="flex items-center gap-3">
          <Package size={20} className="text-gt-green shrink-0" aria-hidden="true" />
          <div>
            <p className="text-gt-text font-semibold text-sm">
              Available now on PyPI
            </p>
            <p className="text-gt-muted text-xs mt-0.5">
              Real package · v0.3.0 · MIT License · Python 3.9+
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <code className="px-4 py-2 rounded-lg bg-gt-bg border border-gt-border text-gt-green font-mono text-sm">
            pip install greentensor
          </code>
          <a
            href="https://pypi.org/project/greentensor/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gt-green text-xs font-medium underline hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
          >
            View on PyPI →
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── SDK Code Snippet (real code from PyPI) ───────────────────────────────────

type CodeLine = {
  text: string;
  type: "comment" | "keyword" | "string" | "function" | "output" | "normal" | "dim";
};

const installLines: CodeLine[] = [
  { text: "pip install greentensor", type: "function" },
];

const sdkLines: CodeLine[] = [
  { text: "from greentensor import GreenTensor", type: "keyword" },
  { text: "", type: "normal" },
  { text: "# Wrap your training loop — one line", type: "comment" },
  { text: "with GreenTensor() as gt:", type: "function" },
  { text: "    with gt.mixed_precision():", type: "function" },
  { text: '        train()  # your existing code, unchanged', type: "normal" },
];

const outputLines: CodeLine[] = [
  { text: "  +======================================+", type: "dim" },
  { text: "  |        GreenTensor Report            |", type: "function" },
  { text: "  +======================================+", type: "dim" },
  { text: "  Runtime          : 12.34 s", type: "normal" },
  { text: "  Energy Used      : 0.000412 kWh", type: "normal" },
  { text: "  CO2 Emissions    : 0.000096 kg", type: "function" },
  { text: "  ======================================", type: "dim" },
];

const colorMap: Record<CodeLine["type"], string> = {
  comment:  "text-gt-muted italic",
  keyword:  "text-gt-blue",
  string:   "text-gt-cyan",
  function: "text-gt-green",
  output:   "text-gt-cyan",
  normal:   "text-gt-text",
  dim:      "text-gt-border",
};

function CodeBlock({
  title,
  lang,
  lines,
  startLine = 1,
}: {
  title: string;
  lang: string;
  lines: CodeLine[];
  startLine?: number;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gt-border bg-gt-bg">
      <div className="flex items-center gap-2 px-4 py-3 bg-gt-surface border-b border-gt-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-gt-muted text-xs font-mono">{title}</span>
        <span className="ml-auto text-gt-green text-xs font-mono">{lang}</span>
      </div>
      <pre className="p-5 text-sm font-mono overflow-x-auto leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-gt-border select-none w-5 text-right shrink-0 text-xs">
              {startLine + i}
            </span>
            <span className={colorMap[line.type]}>{line.text || "\u00A0"}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function SDKCodeSnippet() {
  return (
    <ScrollReveal>
      <div className="flex flex-col gap-3">
        {/* Install */}
        <CodeBlock title="terminal" lang="bash" lines={installLines} startLine={1} />
        {/* Usage */}
        <CodeBlock title="train.py" lang="Python 3.9+" lines={sdkLines} startLine={1} />
        {/* Output */}
        <div className="rounded-2xl overflow-hidden border border-gt-border bg-gt-bg">
          <div className="flex items-center gap-2 px-4 py-2 bg-gt-surface border-b border-gt-border">
            <span className="text-gt-muted text-xs font-mono">output</span>
            <span className="ml-auto px-2 py-0.5 rounded text-xs font-mono bg-gt-green/10 text-gt-green border border-gt-green/20">
              Real carbon report
            </span>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
            {outputLines.map((line, i) => (
              <div key={i} className={colorMap[line.type]}>{line.text}</div>
            ))}
          </pre>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── Baseline Comparison Block ────────────────────────────────────────────────

const baselineCode: CodeLine[] = [
  { text: "from greentensor import GreenTensor", type: "keyword" },
  { text: "from greentensor.core.tracker import Tracker", type: "keyword" },
  { text: "", type: "normal" },
  { text: "# 1. Measure your baseline", type: "comment" },
  { text: "tracker = Tracker()", type: "normal" },
  { text: "tracker.start()", type: "function" },
  { text: "train()  # unoptimized run", type: "normal" },
  { text: "baseline = tracker.stop()", type: "function" },
  { text: "", type: "normal" },
  { text: "# 2. Run optimized — see real savings", type: "comment" },
  { text: "with GreenTensor(baseline=baseline) as gt:", type: "function" },
  { text: "    with gt.mixed_precision():", type: "function" },
  { text: "        train()", type: "normal" },
];

function BaselineBlock() {
  return (
    <ScrollReveal delay={0.1}>
      <CodeBlock
        title="compare_baseline.py"
        lang="Python 3.9+"
        lines={baselineCode}
        startLine={1}
      />
    </ScrollReveal>
  );
}

// ─── Dashboard Tab Carousel ───────────────────────────────────────────────────

const tabs = [
  {
    id: "carbon",
    label: "Carbon Monitor",
    icon: Leaf,
    color: "text-gt-green",
    content: {
      title: "Real-Time Carbon Tracking",
      description:
        "See exactly how much CO₂ each model run produces. Compare workloads, set budgets, and get alerts when you exceed thresholds.",
      metrics: [
        { label: "Energy Used", value: "0.000412 kWh", delta: "per run" },
        { label: "CO₂ Emitted", value: "0.000096 kg", delta: "per run" },
        { label: "Saved vs Baseline", value: "40%", delta: "avg reduction" },
      ],
    },
  },
  {
    id: "security",
    label: "Threat Detection",
    icon: Shield,
    color: "text-gt-blue",
    content: {
      title: "Compute Anomaly Detection",
      description:
        "Correlate carbon spikes with network activity to identify cryptomining, model poisoning, and data exfiltration attempts.",
      metrics: [
        { label: "Threats Blocked", value: "12", delta: "this week" },
        { label: "Anomalies Flagged", value: "3", delta: "under review" },
        { label: "MTTD", value: "1.8 min", delta: "-65% vs avg" },
      ],
    },
  },
  {
    id: "esg",
    label: "ESG Reports",
    icon: BarChart3,
    color: "text-gt-cyan",
    content: {
      title: "Automated ESG Reporting",
      description:
        "Generate GRI, TCFD, and CDP-aligned reports with one click. Export to PDF, CSV, or push directly to your sustainability platform.",
      metrics: [
        { label: "Reports Generated", value: "4", delta: "this quarter" },
        { label: "Frameworks Covered", value: "GRI · TCFD · CDP", delta: "" },
        { label: "Time Saved", value: "~6 weeks", delta: "per report" },
      ],
    },
  },
];

function DashboardPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const tab = tabs[activeTab];

  return (
    <ScrollReveal>
      <div className="rounded-2xl overflow-hidden border border-gt-border bg-gt-surface">
        <div
          role="tablist"
          aria-label="Dashboard views"
          className="flex border-b border-gt-border"
        >
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const isActive = i === activeTab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setActiveTab(i)}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-3 px-2 text-xs font-medium transition-colors duration-150",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gt-green",
                  isActive
                    ? `${t.color} border-b-2 border-current bg-white/5`
                    : "text-gt-muted hover:text-gt-text",
                ].join(" ")}
              >
                <Icon size={14} aria-hidden="true" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          className="p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-gt-text font-semibold text-lg mb-2">
                {tab.content.title}
              </h3>
              <p className="text-gt-muted text-sm mb-5">
                {tab.content.description}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {tab.content.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-gt-bg rounded-xl p-3 border border-gt-border"
                  >
                    <p className="text-gt-muted text-xs mb-1">{m.label}</p>
                    <p className="text-gt-text font-bold text-sm">{m.value}</p>
                    {m.delta && (
                      <p className="text-gt-muted text-xs mt-0.5">{m.delta}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductShowcaseSection() {
  return (
    <>
      <CircuitDivider color="cyan" />
      <section
        aria-labelledby="product-heading"
        id="product"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="section-label text-gt-cyan">{"// THE PLATFORM"}</span>
              <h2
                id="product-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                One SDK. Full Visibility. Zero Friction.
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                Install in one command. Wrap your training loop. GreenTensor
                tracks carbon, detects threats, and generates ESG reports
                automatically — no infrastructure changes needed.
              </p>
            </div>
          </ScrollReveal>

          {/* PyPI install banner */}
          <InstallBanner />

          <div className="grid lg:grid-cols-2 gap-8">
            <DashboardPreview />
            <div className="flex flex-col gap-6">
              <SDKCodeSnippet />
              <BaselineBlock />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
