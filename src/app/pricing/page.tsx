import type { Metadata } from "next";
import React from "react";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for AI sustainability and security. Start free, scale as you grow.",
};

// ─── Feature comparison table ─────────────────────────────────────────────────

const features = [
  {
    category: "Carbon Monitoring",
    items: [
      { name: "Real-time carbon tracking", starter: true, growth: true, enterprise: true },
      { name: "Per-run attribution", starter: true, growth: true, enterprise: true },
      { name: "Carbon budget alerts", starter: false, growth: true, enterprise: true },
      { name: "Automated workload routing", starter: false, growth: true, enterprise: true },
      { name: "Multi-cloud carbon aggregation", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Security",
    items: [
      { name: "Compute anomaly detection", starter: "Basic", growth: true, enterprise: true },
      { name: "Threat scoring", starter: false, growth: true, enterprise: true },
      { name: "SIEM integration", starter: false, growth: true, enterprise: true },
      { name: "Automated incident response", starter: false, growth: false, enterprise: true },
      { name: "Custom detection rules", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "ESG Reporting",
    items: [
      { name: "CSV export", starter: true, growth: true, enterprise: true },
      { name: "GRI report generation", starter: false, growth: true, enterprise: true },
      { name: "TCFD report generation", starter: false, growth: true, enterprise: true },
      { name: "CDP report generation", starter: false, growth: true, enterprise: true },
      { name: "Custom report templates", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "Platform",
    items: [
      { name: "Model runs / day", starter: "10", growth: "Unlimited", enterprise: "Unlimited" },
      { name: "Team members", starter: "1", growth: "Up to 25", enterprise: "Unlimited" },
      { name: "Data retention", starter: "30 days", growth: "1 year", enterprise: "Custom" },
      { name: "SSO / SAML", starter: false, growth: false, enterprise: true },
      { name: "On-premise deployment", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    items: [
      { name: "Community support", starter: true, growth: true, enterprise: true },
      { name: "Email support", starter: false, growth: true, enterprise: true },
      { name: "Priority support", starter: false, growth: true, enterprise: true },
      { name: "Dedicated CSM", starter: false, growth: false, enterprise: true },
      { name: "SLA guarantee", starter: false, growth: false, enterprise: true },
    ],
  },
];

type CellValue = boolean | string;

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return <Check size={16} className="text-gt-green mx-auto" aria-label="Included" />;
  }
  if (value === false) {
    return <X size={16} className="text-gt-muted/40 mx-auto" aria-label="Not included" />;
  }
  return <span className="text-gt-muted text-sm">{value}</span>;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Do I need a credit card to start the free trial?",
    a: "No. The 14-day free trial requires no credit card. You only need to provide payment details if you decide to upgrade to a paid plan.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Your account moves to a read-only state. Your data is preserved for 30 days. You can upgrade at any time to restore full access.",
  },
  {
    q: "Can I use GreenTensor with any cloud provider?",
    a: "Yes. GreenTensor supports AWS, Google Cloud, Microsoft Azure, and on-premise deployments. The Python SDK works with any infrastructure.",
  },
  {
    q: "How does the carbon measurement work?",
    a: "GreenTensor instruments your model runs via our SDK and correlates compute usage with regional carbon intensity data from electricity grid operators. We follow the GHG Protocol Scope 2 methodology.",
  },
  {
    q: "Is my data shared with third parties?",
    a: "No. Your model data, carbon metrics, and usage patterns are never shared with third parties. We are SOC 2 Type II certified and GDPR compliant.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-gt-border rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer text-gt-text font-medium hover:bg-white/5 transition-colors list-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gt-green">
        {q}
        <span
          className="text-gt-muted transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4"
          aria-hidden="true"
        >
          ▾
        </span>
      </summary>
      <div className="px-5 pb-5 text-gt-muted text-sm leading-relaxed border-t border-gt-border pt-4">
        {a}
      </div>
    </details>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section
        aria-labelledby="pricing-page-heading"
        className="py-16 px-4 sm:px-6 lg:px-8 text-center"
      >
        <ScrollReveal>
          <span className="section-label text-gt-cyan">{"// PRICING"}</span>
          <h1
            id="pricing-page-heading"
            className="text-gt-text font-bold mt-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="text-gt-muted mt-4 text-lg max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees, no surprise bills.
          </p>
        </ScrollReveal>
      </section>

      {/* Pricing cards */}
      <section
        aria-label="Pricing tiers"
        className="px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "Free",
              note: "14-day trial",
              cta: "Start Free Trial",
              href: "#trial",
              variant: "ghost" as const,
            },
            {
              name: "Growth",
              price: "Contact Us",
              note: "/ month",
              cta: "Request Demo",
              href: "#demo",
              variant: "secondary" as const,
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              note: "pricing",
              cta: "Talk to Sales",
              href: "#demo",
              variant: "primary" as const,
            },
          ].map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.1}>
              <div
                className={[
                  "bg-gt-surface rounded-2xl p-6 border relative",
                  tier.highlighted
                    ? "border-gt-green/40 shadow-[0_0_32px_rgba(34,197,94,0.1)]"
                    : "border-gt-border",
                ].join(" ")}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-gt-green text-gt-bg text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <p className="text-gt-muted text-sm font-medium uppercase tracking-wider">
                  {tier.name}
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-gt-text text-3xl font-extrabold">
                    {tier.price}
                  </span>
                  <span className="text-gt-muted text-sm">{tier.note}</span>
                </div>
                <div className="mt-4">
                  <Button
                    variant={tier.variant}
                    size="md"
                    href={tier.href}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CircuitDivider color="blue" />

      {/* Feature comparison table */}
      <section
        aria-labelledby="comparison-heading"
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2
              id="comparison-heading"
              className="text-gt-text font-bold text-2xl mb-8 text-center"
            >
              Full Feature Comparison
            </h2>
          </ScrollReveal>

          <div className="overflow-x-auto rounded-2xl border border-gt-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gt-border bg-gt-surface">
                  <th className="text-left p-4 text-gt-muted font-medium w-1/2">
                    Feature
                  </th>
                  <th className="text-center p-4 text-gt-text font-semibold">
                    Starter
                  </th>
                  <th className="text-center p-4 text-gt-green font-semibold">
                    Growth
                  </th>
                  <th className="text-center p-4 text-gt-text font-semibold">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((group) => (
                  <React.Fragment key={group.category}>
                    <tr
                      className="bg-gt-bg/50 border-b border-gt-border"
                    >
                      <td
                        colSpan={4}
                        className="p-3 px-4 text-gt-muted text-xs font-semibold uppercase tracking-wider"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.items.map((item) => (
                      <tr
                        key={item.name}
                        className="border-b border-gt-border/50 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-3 px-4 text-gt-muted">{item.name}</td>
                        <td className="p-3 text-center">
                          <Cell value={item.starter} />
                        </td>
                        <td className="p-3 text-center">
                          <Cell value={item.growth} />
                        </td>
                        <td className="p-3 text-center">
                          <Cell value={item.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CircuitDivider color="cyan" />

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2
              id="faq-heading"
              className="text-gt-text font-bold text-2xl mb-8 text-center"
            >
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <FAQItem {...faq} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        aria-label="Get started"
        className="py-16 px-4 sm:px-6 lg:px-8 text-center"
      >
        <ScrollReveal>
          <h2 className="text-gt-text font-bold text-2xl mb-4">
            Ready to get started?
          </h2>
          <p className="text-gt-muted mb-8">
            Join the teams already making their AI sustainable and secure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/#trial">
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" href="/#demo">
              Request Demo
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
