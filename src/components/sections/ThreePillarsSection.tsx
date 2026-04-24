import { Leaf, Shield, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

interface PillarCardProps {
  pillar: "sustainability" | "security" | "esg";
  headline: string;
  body: string;
  metric: string;
  metricLabel: string;
  icon: ReactNode;
  accentColor: "green" | "blue" | "cyan";
}

const accentStyles = {
  green: {
    border: "border-gt-green/20 hover:border-gt-green/50",
    glow: "hover:shadow-[0_0_24px_rgba(34,197,94,0.12)]",
    label: "text-gt-green",
    metric: "text-gt-green",
    iconBg: "bg-gt-green/10",
    iconColor: "text-gt-green",
  },
  blue: {
    border: "border-gt-blue/20 hover:border-gt-blue/50",
    glow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]",
    label: "text-gt-blue",
    metric: "text-gt-blue",
    iconBg: "bg-gt-blue/10",
    iconColor: "text-gt-blue",
  },
  cyan: {
    border: "border-gt-cyan/20 hover:border-gt-cyan/50",
    glow: "hover:shadow-[0_0_24px_rgba(6,182,212,0.12)]",
    label: "text-gt-cyan",
    metric: "text-gt-cyan",
    iconBg: "bg-gt-cyan/10",
    iconColor: "text-gt-cyan",
  },
};

function PillarCard({
  headline,
  body,
  metric,
  metricLabel,
  icon,
  accentColor,
}: PillarCardProps) {
  const styles = accentStyles[accentColor];
  return (
    <div
      className={[
        "bg-gt-surface rounded-2xl p-6 border transition-all duration-200",
        styles.border,
        styles.glow,
      ].join(" ")}
    >
      <div className={`inline-flex p-3 rounded-xl mb-4 ${styles.iconBg}`}>
        <span className={styles.iconColor} aria-hidden="true">
          {icon}
        </span>
      </div>
      <h3 className="text-gt-text font-semibold text-xl mb-2">{headline}</h3>
      <p className="text-gt-muted text-sm leading-relaxed mb-6">{body}</p>
      <div>
        <p className={`text-4xl font-extrabold ${styles.metric}`}>{metric}</p>
        <p className="text-gt-muted text-xs mt-1">{metricLabel}</p>
      </div>
    </div>
  );
}

const pillars: PillarCardProps[] = [
  {
    pillar: "sustainability",
    headline: "Cut AI Carbon Emissions",
    body: "Real-time carbon monitoring for every model run. Automatically route workloads to greener infrastructure and reduce your AI carbon footprint by up to 40%.",
    metric: "40%",
    metricLabel: "average carbon reduction",
    icon: <Leaf size={24} />,
    accentColor: "green",
  },
  {
    pillar: "security",
    headline: "Detect Threats via Carbon Spikes",
    body: "Cyberattacks leave a carbon signature. GreenTensor correlates compute anomalies with digital footprints to catch threats that traditional security tools miss.",
    metric: "< 2min",
    metricLabel: "mean time to detect",
    icon: <Shield size={24} />,
    accentColor: "blue",
  },
  {
    pillar: "esg",
    headline: "Automate ESG Reporting",
    body: "Generate GRI, TCFD, and CDP-aligned reports automatically from your AI usage data. Turn compliance from a quarterly burden into a continuous process.",
    metric: "90%",
    metricLabel: "reduction in reporting time",
    icon: <BarChart3 size={24} />,
    accentColor: "cyan",
  },
];

export default function ThreePillarsSection() {
  return (
    <>
      <CircuitDivider color="green" />
      <section
        aria-labelledby="pillars-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-gt-green">
                {"// THE THREE PILLARS"}
              </span>
              <h2
                id="pillars-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Everything Your AI Needs to Be Responsible
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                One platform. Three critical capabilities. Zero compromise on
                performance.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.pillar} delay={i * 0.1}>
                <PillarCard {...pillar} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
