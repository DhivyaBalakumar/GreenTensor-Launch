"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Config = {
  mixedPrecision: boolean;
  cudnnBenchmark: boolean;
  idleGpuDetection: boolean;
  batchSizeOptimizer: boolean;
};

const DEFAULT_CONFIG: Config = {
  mixedPrecision: true,
  cudnnBenchmark: true,
  idleGpuDetection: false,
  batchSizeOptimizer: false,
};

function computeSavings(config: Config): {
  gpuSavings: number;
  energySaved: number;
  co2Saved: number;
  speedup: number;
} {
  let gpuSavings = 8;
  let energySaved = 5;
  let speedup = 1.05;

  if (config.mixedPrecision) {
    gpuSavings += 10;
    energySaved += 12;
    speedup += 0.18;
  }
  if (config.cudnnBenchmark) {
    gpuSavings += 5;
    energySaved += 6;
    speedup += 0.08;
  }
  if (config.idleGpuDetection) {
    gpuSavings += 4;
    energySaved += 8;
    speedup += 0.02;
  }
  if (config.batchSizeOptimizer) {
    gpuSavings += 6;
    energySaved += 7;
    speedup += 0.05;
  }

  return {
    gpuSavings,
    energySaved,
    co2Saved: Math.round(energySaved * 0.45),
    speedup: Math.round(speedup * 100) / 100,
  };
}

function generateCode(config: Config): string {
  const lines: string[] = [
    "from greentensor import GreenTensor",
    "",
    "gt_config = {",
  ];

  lines.push(
    `    "mixed_precision": ${config.mixedPrecision ? "True" : "False"},`
  );
  lines.push(
    `    "cudnn_benchmark": ${config.cudnnBenchmark ? "True" : "False"},`
  );
  lines.push(
    `    "idle_gpu_detection": ${config.idleGpuDetection ? "True" : "False"},`
  );
  lines.push(
    `    "batch_size_optimizer": ${config.batchSizeOptimizer ? "True" : "False"},`
  );
  lines.push("}");
  lines.push("");
  lines.push("with GreenTensor(**gt_config) as gt:");
  lines.push("    train(model, train_loader, optimizer)");
  lines.push("");
  lines.push("report = gt.get_report()");
  lines.push('print(report["co2_kg"], report["gpu_savings"])');

  return lines.join("\n");
}

type DemoLine = { text: string; type: string };

function generateDemoOutput(config: Config): DemoLine[] {
  const savings = computeSavings(config);
  const lines: DemoLine[] = [
    { text: "$ python train.py", type: "cmd" },
    { text: "[GreenTensor] Initializing...", type: "info" },
  ];

  if (config.mixedPrecision) {
    lines.push({ text: "[GreenTensor] Mixed precision: ON ✓", type: "success" });
  }
  if (config.cudnnBenchmark) {
    lines.push({ text: "[GreenTensor] cuDNN benchmark: ON ✓", type: "success" });
  }
  if (config.idleGpuDetection) {
    lines.push({ text: "[GreenTensor] Idle GPU detection: ON ✓", type: "success" });
  }
  if (config.batchSizeOptimizer) {
    lines.push({ text: "[GreenTensor] Batch size optimizer: ON ✓", type: "success" });
  }

  lines.push({ text: "", type: "blank" });
  lines.push({ text: "Epoch 1/3: 100%|████████| loss=0.342", type: "epoch" });
  lines.push({ text: "Epoch 2/3: 100%|████████| loss=0.198", type: "epoch" });
  lines.push({ text: "Epoch 3/3: 100%|████████| loss=0.091", type: "epoch" });
  lines.push({ text: "", type: "blank" });
  lines.push({ text: "╔══════════════════════════════════╗", type: "border" });
  lines.push({ text: "║      GreenTensor Report          ║", type: "title" });
  lines.push({ text: "╠══════════════════════════════════╣", type: "border" });
  lines.push({ text: "║ Runtime        : 12.34 s         ║", type: "data" });
  lines.push({ text: "║ Energy Used    : 0.000412 kWh    ║", type: "data" });
  lines.push({ text: "║ CO₂ Emissions  : 0.000096 kg     ║", type: "data" });
  lines.push({
    text: `║ GPU Savings    : ${savings.gpuSavings}%             ║`,
    type: "savings",
  });
  lines.push({ text: "╚══════════════════════════════════╝", type: "border" });

  return lines;
}

function getOutputLineClass(type: string): string {
  switch (type) {
    case "cmd":
      return "text-gt-green";
    case "info":
      return "text-gt-cyan";
    case "success":
      return "text-green-400";
    case "epoch":
      return "text-gt-blue";
    case "border":
      return "text-gt-muted";
    case "title":
      return "text-gt-green font-semibold";
    case "data":
      return "text-gt-text";
    case "savings":
      return "text-gt-green font-semibold";
    default:
      return "text-gt-muted";
  }
}

type ToggleProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
};

function Toggle({ id, label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gt-border last:border-0">
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className="text-gt-text text-sm font-medium cursor-pointer"
        >
          {label}
        </label>
        <p className="text-gt-muted text-xs mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green ${
          checked ? "bg-gt-green" : "bg-gt-border"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function LiveDemoSection() {
  const shouldReduceMotion = useReducedMotion();
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleLines, setVisibleLines] = useState<DemoLine[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const outputLines = generateDemoOutput(config);
  const savings = computeSavings(config);
  const code = generateCode(config);

  const runDemo = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(true);
    setVisibleLines([]);

    if (shouldReduceMotion) {
      setVisibleLines(outputLines);
      setIsRunning(false);
      return;
    }

    outputLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (i === outputLines.length - 1) {
          setIsRunning(false);
        }
      }, i * 180);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, isRunning, shouldReduceMotion]);

  // Reset output when config changes
  useEffect(() => {
    if (hasRun) {
      setVisibleLines([]);
      setHasRun(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const updateConfig = (key: keyof Config) => (val: boolean) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <section
      id="demo-section"
      aria-labelledby="demo-heading"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-gt-blue">
              {"// LIVE DEMO"}
            </span>
            <h2
              id="demo-heading"
              className="mt-3 text-gt-text font-bold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              See GreenTensor{" "}
              <span className="text-gt-blue">in Action</span>
            </h2>
            <p className="mt-4 text-gt-muted text-lg max-w-2xl mx-auto">
              Toggle features on and off to see how the generated code and
              estimated savings change in real time.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — configurator */}
          <ScrollReveal delay={0.05}>
            <div className="rounded-2xl border border-gt-border bg-gt-surface overflow-hidden">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-gt-border">
                <h3 className="text-gt-text font-semibold">Configuration</h3>
                <p className="text-gt-muted text-xs mt-0.5">
                  Toggle features to customize your setup
                </p>
              </div>

              {/* Toggles */}
              <div className="px-6 py-2">
                <Toggle
                  id="toggle-mixed-precision"
                  label="Mixed Precision"
                  description="FP16 training reduces memory usage and speeds up GPU compute."
                  checked={config.mixedPrecision}
                  onChange={updateConfig("mixedPrecision")}
                />
                <Toggle
                  id="toggle-cudnn-benchmark"
                  label="cuDNN Benchmark"
                  description="Auto-selects the fastest convolution algorithm for your hardware."
                  checked={config.cudnnBenchmark}
                  onChange={updateConfig("cudnnBenchmark")}
                />
                <Toggle
                  id="toggle-idle-gpu"
                  label="Idle GPU Detection"
                  description="Alerts when GPUs are underutilized, preventing wasted compute."
                  checked={config.idleGpuDetection}
                  onChange={updateConfig("idleGpuDetection")}
                />
                <Toggle
                  id="toggle-batch-optimizer"
                  label="Batch Size Optimizer"
                  description="Finds the optimal batch size to maximize GPU memory utilization."
                  checked={config.batchSizeOptimizer}
                  onChange={updateConfig("batchSizeOptimizer")}
                />
              </div>

              {/* Estimated savings */}
              <div className="px-6 py-4 border-t border-gt-border bg-gt-bg">
                <p className="text-gt-muted text-xs uppercase tracking-wider mb-3">
                  Estimated Savings
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "GPU Efficiency", value: `+${savings.gpuSavings}%`, color: "#22C55E" },
                    { label: "Energy Saved", value: `~${savings.energySaved}%`, color: "#3B82F6" },
                    { label: "CO₂ Reduced", value: `~${savings.co2Saved}%`, color: "#06B6D4" },
                    { label: "Speedup", value: `${savings.speedup}×`, color: "#22C55E" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-gt-surface border border-gt-border p-3"
                    >
                      <p className="text-gt-muted text-xs mb-1">{stat.label}</p>
                      <p
                        className="text-lg font-bold font-mono"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Run button */}
              <div className="px-6 py-4 border-t border-gt-border">
                <button
                  onClick={runDemo}
                  disabled={isRunning}
                  aria-label="Run demo training session"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gt-green text-gt-bg font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green"
                >
                  {isRunning ? (
                    <>
                      <motion.span
                        animate={shouldReduceMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                        aria-hidden="true"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </motion.span>
                      Running…
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" aria-hidden="true" />
                      Run Demo
                    </>
                  )}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — code + output terminal */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-4">
              {/* Code preview */}
              <div className="rounded-2xl border border-gt-border bg-gt-bg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gt-border bg-gt-surface">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" aria-hidden="true" />
                  <span className="ml-2 text-gt-muted text-xs font-mono">
                    train.py
                  </span>
                </div>
                <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
                  <code>
                    {code.split("\n").map((line, i) => {
                      let color = "#F8FAFC";
                      if (line.startsWith("from") || line.startsWith("import")) {
                        color = "#3B82F6";
                      } else if (line.startsWith("#")) {
                        color = "#94A3B8";
                      } else if (line.includes("True") || line.includes("False")) {
                        color = "#22C55E";
                      } else if (line.startsWith("with") || line.startsWith("print")) {
                        color = "#06B6D4";
                      }
                      return (
                        <span key={i} style={{ color }} className="block">
                          {line || "\u00A0"}
                        </span>
                      );
                    })}
                  </code>
                </pre>
              </div>

              {/* Output terminal */}
              <div className="rounded-2xl border border-gt-border bg-gt-bg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gt-border bg-gt-surface">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" aria-hidden="true" />
                  <span className="ml-2 text-gt-muted text-xs font-mono">
                    output
                  </span>
                </div>
                <div
                  className="p-4 font-mono text-xs leading-relaxed min-h-[200px]"
                  aria-live="polite"
                  aria-label="Demo output terminal"
                >
                  {visibleLines.length === 0 ? (
                    <p className="text-gt-muted italic">
                      Press &quot;Run Demo&quot; to see the output…
                    </p>
                  ) : (
                    visibleLines.map((line, i) => (
                      <div
                        key={i}
                        className={`whitespace-pre ${getOutputLineClass(line.type)}`}
                      >
                        {line.text || "\u00A0"}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
