import ScrollReveal from "@/components/ui/ScrollReveal";
import CircuitDivider from "@/components/ui/CircuitDivider";
import Button from "@/components/ui/Button";

export default function FooterCTA() {
  return (
    <>
      <CircuitDivider color="blue" />
      <section
        aria-labelledby="footer-cta-heading"
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="section-label text-gt-green">
              {"// READY TO START?"}
            </span>
            <h2
              id="footer-cta-heading"
              className="text-gt-text font-bold mt-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Make Your AI Sustainable and Secure Today
            </h2>
            <p className="text-gt-muted mt-4 text-lg leading-relaxed">
              Join the teams already using GreenTensor to cut carbon, catch
              threats, and automate ESG reporting. Start free — no credit card
              required.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button variant="primary" size="lg" href="#trial">
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" href="#demo">
                Request Demo
              </Button>
            </div>

            <p className="text-gt-muted text-sm mt-6">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
