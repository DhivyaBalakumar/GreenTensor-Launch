import { ShieldCheck, Lock, FileCheck, Globe } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}

function Badge({ icon, label, sublabel }: BadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gt-surface border border-gt-border">
      <div className="text-gt-muted" aria-hidden="true">
        {icon}
      </div>
      <p className="text-gt-text text-sm font-semibold text-center">{label}</p>
      <p className="text-gt-muted text-xs text-center">{sublabel}</p>
    </div>
  );
}

const securityBadges: BadgeProps[] = [
  {
    icon: <ShieldCheck size={28} />,
    label: "SOC 2 Type II",
    sublabel: "Security & availability",
  },
  {
    icon: <Lock size={28} />,
    label: "GDPR Compliant",
    sublabel: "EU data protection",
  },
  {
    icon: <ShieldCheck size={28} />,
    label: "ISO 27001",
    sublabel: "Information security",
  },
];

const complianceBadges: BadgeProps[] = [
  {
    icon: <FileCheck size={28} />,
    label: "GRI Standards",
    sublabel: "Sustainability reporting",
  },
  {
    icon: <Globe size={28} />,
    label: "TCFD Aligned",
    sublabel: "Climate risk disclosure",
  },
  {
    icon: <FileCheck size={28} />,
    label: "CDP Ready",
    sublabel: "Carbon disclosure",
  },
];

export default function TrustSection() {
  return (
    <>
      <CircuitDivider color="green" />
      <section
        aria-labelledby="trust-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-gt-green">
                {"// TRUST & COMPLIANCE"}
              </span>
              <h2
                id="trust-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Built for Enterprise Security and Compliance
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                GreenTensor meets the security and reporting standards your
                organization already requires.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            <ScrollReveal>
              <div>
                <h3 className="text-gt-text font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-gt-blue" aria-hidden="true" />
                  Security Certifications
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {securityBadges.map((badge) => (
                    <Badge key={badge.label} {...badge} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="text-gt-text font-semibold mb-4 flex items-center gap-2">
                  <FileCheck size={18} className="text-gt-cyan" aria-hidden="true" />
                  ESG Reporting Frameworks
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {complianceBadges.map((badge) => (
                    <Badge key={badge.label} {...badge} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
