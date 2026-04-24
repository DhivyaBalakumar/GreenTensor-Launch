import { Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";
import Button from "@/components/ui/Button";

interface PricingTierProps {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary" | "ghost";
  highlighted?: boolean;
}

function PricingTier({
  name,
  price,
  priceNote,
  description,
  features,
  ctaLabel,
  ctaHref,
  ctaVariant,
  highlighted,
}: PricingTierProps) {
  return (
    <div
      className={[
        "bg-gt-surface rounded-2xl p-6 border flex flex-col gap-5 relative",
        highlighted
          ? "border-gt-green/40 shadow-[0_0_32px_rgba(34,197,94,0.1)]"
          : "border-gt-border",
      ].join(" ")}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full bg-gt-green text-gt-bg text-xs font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div>
        <p className="text-gt-muted text-sm font-medium uppercase tracking-wider">
          {name}
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-gt-text text-4xl font-extrabold">{price}</span>
          <span className="text-gt-muted text-sm">{priceNote}</span>
        </div>
        <p className="text-gt-muted text-sm mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      <ul className="flex flex-col gap-2.5" aria-label={`${name} features`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-gt-muted">
            <Check
              size={16}
              className="text-gt-green mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <Button variant={ctaVariant} size="md" href={ctaHref} className="w-full">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

const tiers: PricingTierProps[] = [
  {
    name: "Starter",
    price: "Free",
    priceNote: "14-day trial",
    description:
      "Perfect for individual engineers and small teams exploring AI sustainability.",
    features: [
      "Up to 10 model runs / day",
      "Carbon monitoring dashboard",
      "Basic threat detection",
      "CSV export",
      "Community support",
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "#trial",
    ctaVariant: "ghost",
  },
  {
    name: "Growth",
    price: "Contact Us",
    priceNote: "/ month",
    description:
      "For teams running AI in production who need full visibility and compliance.",
    features: [
      "Unlimited model runs",
      "Real-time carbon + threat monitoring",
      "GRI, TCFD, CDP report generation",
      "SIEM integration (Splunk, Datadog)",
      "Slack + PagerDuty alerts",
      "Priority support",
    ],
    ctaLabel: "Request Demo",
    ctaHref: "#demo",
    ctaVariant: "secondary",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: "pricing",
    description:
      "For large organizations with complex compliance requirements and multi-cloud deployments.",
    features: [
      "Everything in Growth",
      "Custom data retention policies",
      "SSO / SAML integration",
      "Dedicated customer success manager",
      "SLA guarantees",
      "On-premise deployment option",
    ],
    ctaLabel: "Talk to Sales",
    ctaHref: "#demo",
    ctaVariant: "primary",
  },
];

export default function PricingSection() {
  return (
    <>
      <CircuitDivider color="cyan" />
      <section
        aria-labelledby="pricing-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-gt-cyan">{"// PRICING"}</span>
              <h2
                id="pricing-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Simple, Transparent Pricing
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                Start free. Scale as you grow. No hidden fees, no surprise bills.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <PricingTier {...tier} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-gt-muted text-sm mt-8">
              All plans include SOC 2 Type II compliance, GDPR data processing
              agreements, and 99.9% uptime SLA.{" "}
              <a
                href="/pricing"
                className="text-gt-green underline hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
              >
                See full feature comparison →
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
