import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";
import WaitlistForm from "@/components/forms/WaitlistForm";
import DemoRequestForm from "@/components/forms/DemoRequestForm";
import FreeTrialForm from "@/components/forms/FreeTrialForm";

interface FormCardProps {
  id: string;
  label: string;
  labelColor: string;
  title: string;
  description: string;
  borderColor: string;
  children: React.ReactNode;
}

function FormCard({
  id,
  label,
  labelColor,
  title,
  description,
  borderColor,
  children,
}: FormCardProps) {
  return (
    <div
      id={id}
      className={`bg-gt-surface rounded-2xl p-6 border ${borderColor} flex flex-col gap-5`}
    >
      <div>
        <span className={`section-label ${labelColor}`}>{label}</span>
        <h3 className="text-gt-text font-semibold text-xl mt-2">{title}</h3>
        <p className="text-gt-muted text-sm mt-1 leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default function ConversionSection() {
  return (
    <>
      <CircuitDivider color="blue" />
      <section
        aria-labelledby="conversion-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-gt-blue">{"// GET STARTED"}</span>
              <h2
                id="conversion-heading"
                className="text-gt-text font-bold mt-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Choose Your Path
              </h2>
              <p className="text-gt-muted mt-3 max-w-2xl mx-auto">
                Whether you want early access, a guided demo, or to start
                building right now — we&apos;ve got you covered.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <FormCard
                id="waitlist"
                label="// EARLY ACCESS"
                labelColor="text-gt-muted"
                title="Join the Waitlist"
                description="Be first to know when we launch. Get early access, exclusive updates, and founding member pricing."
                borderColor="border-gt-border hover:border-gt-border/80"
              >
                <WaitlistForm />
              </FormCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <FormCard
                id="demo"
                label="// GUIDED DEMO"
                labelColor="text-gt-blue"
                title="Request a Demo"
                description="See GreenTensor in action with your own AI workloads. A 30-minute session with our team."
                borderColor="border-gt-blue/20 hover:border-gt-blue/40"
              >
                <DemoRequestForm />
              </FormCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <FormCard
                id="trial"
                label="// FREE TRIAL"
                labelColor="text-gt-green"
                title="Start Free Trial"
                description="Instrument your first model in minutes. No credit card required. Full platform access for 14 days."
                borderColor="border-gt-green/20 hover:border-gt-green/40"
              >
                <FreeTrialForm />
              </FormCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
