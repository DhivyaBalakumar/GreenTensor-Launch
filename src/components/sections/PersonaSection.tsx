import { Terminal, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

interface PersonaCardProps {
  persona: "mlops" | "ciso" | "esg";
  role: string;
  painPoint: string;
  solution: string;
  capabilities: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: ReactNode;
  accentColor: "green" | "blue" | "cyan";
}

const accentStyles = {
  green: {
    border: "border-gt-green/20 hover:border-gt-green/40",
    label: "text-gt-green",
    iconBg: "bg-gt-green/10",
    iconColor: "text-gt-green",
    bullet: "bg-gt-green",
  },
  blue: {
    border: "border-gt-blue/20 hover:border-gt-blue/40",
    label: "text-gt-blue",
    iconBg: "bg-gt-blue/10",
    iconColor: "text-gt-blue",
    bullet: "bg-gt-blue",
  },
  cyan: {
    border: "border-gt-cyan/20 hover:border-gt-cyan/40",
    label: "text-gt-cyan",
    iconBg: "bg-gt-cyan/10",
    iconColor: "text-gt-cyan",
    bullet: "bg-gt-cyan",
  },
};

function PersonaCard({
  role,
  painPoint,
  solution,
  capabilities,
  ctaLabel,
  ctaHref,
  icon,
  accentColor,
}: PersonaCardProps) {
  const styles = accentStyles[accentColor];
  return (
    <div
      className={[
        "bg-gt-surface rounded-2xl p-6 border flex flex-col gap-5",
        "transition-all duration-200 hover:-translate-y-1",
        styles.border,
      ].join(" ")}
    >
      {/* Role header */}
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${styles.iconBg}`}>
          <span className={styles.iconColor} aria-hidden="true">
            {icon}
          </span>
        </div>
        <span className={`section-label ${styles.label}`}>{role}</span>
      </div>

      {/* Pain point */}
      <div>
        <p className="text-gt-muted text-xs uppercase tracking-wider mb-1">
          The Problem
        </p>
        <p className="text-gt-text text-sm font-medium">{painPoint}</p>
      </div>

      {/* Solution */}
      <div>
        <p className="text-gt-muted text-xs uppercase tracking-wider mb-1">
          How GreenTensor Helps
        </p>
        <p className="text-gt-muted text-sm leading-relaxed">{solution}</p>
      </div>

      {/* Capabilities */}
      <ul className="flex flex-col gap-2" aria-label={`Capabilities for ${role}`}>
        {capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2 text-sm text-gt-muted">
            <span
              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${styles.bullet}`}
              aria-hidden="true"
            />
            {cap}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-2">
        <a
          href={ctaHref}
          className={[
            "inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150",
            styles.label,
            "hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded",
          ].join(" ")}
        >
          {ctaLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

const personas: PersonaCardProps[] = [
  {
    persona: "mlops",
    role: "MLOps Engineer",
    painPoint:
      "No visibility into the carbon cost of model training and inference runs.",
    solution:
      "Instrument any model in 3 lines of Python. Get per-run carbon metrics, cost attribution, and optimization recommendations automatically.",
    capabilities: [
      "PyTorch, TensorFlow, and Hugging Face SDK support",
      "Per-run carbon and cost attribution",
      "Automated workload routing to greener regions",
      "CI/CD integration for carbon budgets",
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "#trial",
    icon: <Terminal size={20} />,
    accentColor: "green",
  },
  {
    persona: "ciso",
    role: "CISO / Security Lead",
    painPoint:
      "Compute-anomaly attacks go undetected because security tools don't monitor AI infrastructure.",
    solution:
      "GreenTensor correlates carbon spikes with network anomalies to detect cryptomining, model poisoning, and data exfiltration in under 2 minutes.",
    capabilities: [
      "Real-time compute anomaly detection",
      "Carbon-digital footprint correlation engine",
      "SIEM integration (Splunk, Datadog, PagerDuty)",
      "Automated incident response playbooks",
    ],
    ctaLabel: "Request a Security Demo",
    ctaHref: "#demo",
    icon: <ShieldCheck size={20} />,
    accentColor: "blue",
  },
  {
    persona: "esg",
    role: "ESG / Sustainability Officer",
    painPoint:
      "Manually compiling AI carbon data for GRI, TCFD, and CDP reports takes weeks every quarter.",
    solution:
      "GreenTensor automatically aggregates AI usage data and generates framework-aligned reports with one click — cutting reporting time by 90%.",
    capabilities: [
      "GRI, TCFD, and CDP report generation",
      "Scope 1, 2, and 3 AI emissions tracking",
      "Export to PDF, CSV, or sustainability platforms",
      "Audit trail for regulatory compliance",
    ],
    ctaLabel: "See ESG Reporting",
    ctaHref: "#demo",
    icon: <FileText size={20} />,
    accentColor: "cyan",
  },
];

export default function PersonaSection() {
  return (
    <>
      <CircuitDivider color="green" />
      <section
        aria-labelledby="persona-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-gt-green">{"// BUILT FOR YOUR TEAM"}</span>
              <h2
                id="persona-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                The Right Tool for Every Stakeholder
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                Whether you&apos;re shipping models, securing infrastructure, or
                filing sustainability reports — GreenTensor speaks your language.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((persona, i) => (
              <ScrollReveal key={persona.persona} delay={i * 0.1}>
                <PersonaCard {...persona} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
