import { Zap, AlertTriangle, FileWarning } from "lucide-react";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

interface ProblemCardProps {
  icon: ReactNode;
  stat: string;
  statSource: string;
  headline: string;
  body: string;
}

function ProblemCard({ icon, stat, statSource, headline, body }: ProblemCardProps) {
  return (
    <div className="bg-gt-surface rounded-2xl p-6 border border-gt-border flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-white/5 text-gt-muted shrink-0" aria-hidden="true">
          {icon}
        </div>
        <div>
          <p className="text-3xl font-extrabold text-gt-text">{stat}</p>
          <p className="text-gt-muted text-xs mt-0.5">{statSource}</p>
        </div>
      </div>
      <div>
        <h3 className="text-gt-text font-semibold text-lg mb-2">{headline}</h3>
        <p className="text-gt-muted text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

const problems: ProblemCardProps[] = [
  {
    icon: <Zap size={22} />,
    stat: "~$1M+",
    statSource: "annual energy cost for large AI workloads (IEA, 2024)",
    headline: "AI Training Is Burning Your Budget and the Planet",
    body: "A single large model training run can emit as much CO₂ as five cars over their lifetime. Most teams have no visibility into this cost — until the cloud bill arrives.",
  },
  {
    icon: <AlertTriangle size={22} />,
    stat: "73%",
    statSource: "of AI infrastructure attacks go undetected for >24h (Gartner, 2024)",
    headline: "Attackers Hide in Your Compute Noise",
    body: "Cryptomining, model poisoning, and data exfiltration all cause abnormal compute spikes. Traditional security tools don't correlate these signals — GreenTensor does.",
  },
  {
    icon: <FileWarning size={22} />,
    stat: "6 weeks",
    statSource: "average time to produce a single ESG report (Deloitte, 2023)",
    headline: "ESG Compliance Is a Manual Nightmare",
    body: "Sustainability teams spend weeks manually collecting AI usage data, reconciling cloud bills, and formatting reports for GRI, TCFD, and CDP frameworks. There's a better way.",
  },
];

export default function ProblemSection() {
  return (
    <>
      <CircuitDivider color="blue" />
      <section
        aria-labelledby="problem-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-gt-blue">{"// THE PROBLEM"}</span>
              <h2
                id="problem-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                AI Is Growing Faster Than Its Guardrails
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                Every team running AI faces the same three blind spots. Most
                don&apos;t know it until it&apos;s too late.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <ScrollReveal key={problem.headline} delay={i * 0.1}>
                <ProblemCard {...problem} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
