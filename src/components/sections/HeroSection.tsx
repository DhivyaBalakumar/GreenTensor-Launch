"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

const socialProofLogos = [
  { name: "AWS", abbr: "AWS" },
  { name: "Google Cloud", abbr: "GCP" },
  { name: "Microsoft Azure", abbr: "Azure" },
  { name: "Hugging Face", abbr: "HF" },
];

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
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {/* Section label */}
            <motion.div {...fadeUp(0)}>
              <span className="section-label text-gt-green">
                {"// AI SUSTAINABILITY & SECURITY"}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              id="hero-heading"
              {...fadeUp(0.1)}
              className="text-gt-text font-extrabold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Make Your AI{" "}
              <span className="text-gt-green">Sustainable</span> and{" "}
              <span className="text-gt-blue">Secure</span> by Default
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-gt-muted text-lg leading-relaxed max-w-xl"
            >
              GreenTensor monitors your AI carbon footprint, detects
              compute-anomaly threats in real time, and automates ESG
              reporting — all from one platform. Available now on PyPI.
            </motion.p>

            {/* PyPI badge */}
            <motion.div {...fadeUp(0.25)}>
              <a
                href="https://pypi.org/project/greentensor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gt-surface border border-gt-green/30 text-gt-green text-sm font-mono hover:border-gt-green/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green"
              >
                <span className="text-gt-muted">$</span> pip install greentensor
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-gt-green/10 border border-gt-green/20 font-sans">
                  v0.3.0
                </span>
              </a>
            </motion.div>

            {/* CTA group */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap gap-3 mt-2"
            >
              <Button variant="primary" size="lg" href="#trial">
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" href="#demo">
                Request Demo
              </Button>
              <Button variant="ghost" size="lg" href="#waitlist">
                Join Waitlist
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div {...fadeUp(0.4)} className="mt-4">
              <p className="text-gt-muted text-xs mb-3 uppercase tracking-widest">
                Trusted by teams running AI on
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                {socialProofLogos.map((logo) => (
                  <span
                    key={logo.name}
                    className="px-3 py-1.5 rounded-md bg-gt-surface border border-gt-border text-gt-muted text-xs font-mono"
                    aria-label={logo.name}
                  >
                    {logo.abbr}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — hero visual */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard mockup container */}
            <div className="relative rounded-2xl overflow-hidden border border-gt-border bg-gt-surface shadow-2xl">
              {/* Scan-line overlay */}
              <div
                aria-hidden="true"
                className="scanline absolute inset-x-0 top-0 h-0.5 bg-gt-green z-10 pointer-events-none"
                style={{ opacity: 0 }}
              />

              {/* Dashboard placeholder */}
              <div className="aspect-[16/10] bg-gt-surface flex flex-col">
                {/* Fake toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gt-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-gt-muted text-xs font-mono">
                    greentensor.ai/dashboard
                  </span>
                </div>

                {/* Fake dashboard content */}
                <div className="flex-1 p-4 grid grid-cols-3 gap-3">
                  {/* Metric cards */}
                  {[
                    { label: "Carbon Saved", value: "40%", color: "text-gt-green" },
                    { label: "Threats Blocked", value: "12", color: "text-gt-blue" },
                    { label: "ESG Score", value: "A+", color: "text-gt-cyan" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="bg-gt-bg rounded-lg p-3 border border-gt-border"
                    >
                      <p className="text-gt-muted text-xs mb-1">{m.label}</p>
                      <p className={`text-2xl font-extrabold ${m.color}`}>
                        {m.value}
                      </p>
                    </div>
                  ))}

                  {/* Fake chart area */}
                  <div className="col-span-3 bg-gt-bg rounded-lg p-3 border border-gt-border">
                    <p className="text-gt-muted text-xs mb-2">
                      Carbon Footprint — Last 30 Days
                    </p>
                    <div className="flex items-end gap-1 h-16">
                      {[60, 45, 70, 55, 40, 35, 50, 30, 25, 20, 28, 22].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-gt-green/30"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative glow behind the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
