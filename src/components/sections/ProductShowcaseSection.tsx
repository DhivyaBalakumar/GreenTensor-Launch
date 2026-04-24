"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Leaf, Shield, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

// ─── SDK Code Snippet ────────────────────────────────────────────────────────

const sdkCode = `import greentensor as gt

# Instrument your model in 3 lines
gt.init(api_key="gt_live_...")
with gt.track("gpt-finetune-v2"):
    model.fit(train_data, epochs=10)

# That's it. Carbon, threats, ESG — all tracked.`;

function SDKCodeSnippet() {
  return (
    <ScrollReveal>
      <div className="rounded-2xl overflow-hidden border border-gt-border bg-gt-bg">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gt-surface border-b border-gt-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-2 text-gt-muted text-xs font-mono">
            train.py
          </span>
          <span className="ml-auto text-gt-green text-xs font-mono">
            Python 3.11
          </span>
        </div>
        {/* Code */}
        <pre className="p-5 text-sm font-mono overflow-x-auto leading-relaxed">
          {sdkCode.split("\n").map((line, i) => {
            // Simple syntax highlighting via spans
            const highlighted = line
              .replace(
                /^(import|from|with|as)/g,
                '<span class="text-gt-blue">$1</span>'
              )
              .replace(
                /(gt\.\w+)/g,
                '<span class="text-gt-green">$1</span>'
              )
              .replace(
                /(".*?")/g,
                '<span class="text-gt-cyan">$1</span>'
              )
              .replace(
                /(#.*$)/,
                '<span class="text-gt-muted italic">$1</span>'
              );
            return (
              <div key={i} className="flex gap-4">
                <span className="text-gt-border select-none w-4 text-right shrink-0">
                  {i + 1}
                </span>
                <span
                  className="text-gt-text"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </div>
            );
          })}
        </pre>
      </div>
    </ScrollReveal>
  );
}

// ─── API Example Block ────────────────────────────────────────────────────────

const curlExample = `curl -X POST https://api.greentensor.ai/v1/runs \\
  -H "Authorization: Bearer gt_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"model": "llama-3-70b", "task": "inference"}'`;

const jsonResponse = `{
  "run_id": "run_abc123",
  "carbon_grams": 0.42,
  "threat_score": 0.02,
  "esg_impact": "low",
  "recommendations": [
    "Switch to us-west-2 for 18% lower carbon"
  ]
}`;

function APIExampleBlock() {
  return (
    <ScrollReveal delay={0.1}>
      <div className="rounded-2xl overflow-hidden border border-gt-border bg-gt-bg">
        <div className="flex items-center gap-2 px-4 py-3 bg-gt-surface border-b border-gt-border">
          <span className="text-gt-muted text-xs font-mono">REST API</span>
          <span className="ml-auto px-2 py-0.5 rounded text-xs font-mono bg-gt-green/10 text-gt-green border border-gt-green/20">
            POST /v1/runs
          </span>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-gt-muted text-xs mb-2 uppercase tracking-wider">
              Request
            </p>
            <pre className="text-xs font-mono text-gt-muted leading-relaxed overflow-x-auto">
              {curlExample}
            </pre>
          </div>
          <div className="border-t border-gt-border pt-4">
            <p className="text-gt-muted text-xs mb-2 uppercase tracking-wider">
              Response
            </p>
            <pre className="text-xs font-mono text-gt-green leading-relaxed overflow-x-auto">
              {jsonResponse}
            </pre>
          </div>
        </div>
      </div>
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
        { label: "Today", value: "2.4 kg CO₂", delta: "-18%" },
        { label: "This Month", value: "68 kg CO₂", delta: "-22%" },
        { label: "Saved vs Baseline", value: "19 kg CO₂", delta: "+40%" },
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

  // Auto-advance tabs every 4s
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
        {/* Tab bar */}
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

        {/* Tab content */}
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
            <div className="text-center mb-12">
              <span className="section-label text-gt-cyan">{"// THE PLATFORM"}</span>
              <h2
                id="product-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                One SDK. Full Visibility. Zero Friction.
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                Instrument your AI in 3 lines of code. GreenTensor handles the
                rest — carbon tracking, threat detection, and ESG reporting run
                automatically in the background.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <DashboardPreview />
            <div className="flex flex-col gap-6">
              <SDKCodeSnippet />
              <APIExampleBlock />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
