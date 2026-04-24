import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TractionSection from "@/components/sections/TractionSection";
import ThreePillarsSection from "@/components/sections/ThreePillarsSection";
import ProblemSection from "@/components/sections/ProblemSection";
import LiveDemoSection from "@/components/sections/LiveDemoSection";
import ProductShowcaseSection from "@/components/sections/ProductShowcaseSection";
import PersonaSection from "@/components/sections/PersonaSection";
import ConversionSection from "@/components/sections/ConversionSection";
import PricingSection from "@/components/sections/PricingSection";
import TrustSection from "@/components/sections/TrustSection";
import FooterCTA from "@/components/sections/FooterCTA";
import CircuitDivider from "@/components/ui/CircuitDivider";

export default function HomePage() {
  return (
    <>
      {/* Hero — carbon intelligence layer above the fold */}
      <HeroSection />

      <CircuitDivider color="green" />

      {/* How It Works — 4-step install → wrap → train → report */}
      <HowItWorksSection />

      <CircuitDivider color="blue" />

      {/* Traction — credibility numbers for investors */}
      <TractionSection />

      <CircuitDivider color="cyan" />

      {/* Three pillars — sustainability, GPU optimization, ESG */}
      <ThreePillarsSection />

      <CircuitDivider color="green" />

      {/* Problem — why this matters */}
      <ProblemSection />

      <CircuitDivider color="blue" />

      {/* Live Demo — interactive configurator */}
      <LiveDemoSection />

      <CircuitDivider color="cyan" />

      {/* Product showcase — dashboard, SDK, API */}
      <ProductShowcaseSection />

      <CircuitDivider color="green" />

      {/* Persona — MLOps, CISO, ESG officer */}
      <PersonaSection />

      <CircuitDivider color="blue" />

      {/* Conversion — waitlist, demo, trial forms */}
      <ConversionSection />

      {/* Pricing */}
      <PricingSection />

      {/* Trust & compliance badges */}
      <TrustSection />

      {/* Final CTA */}
      <FooterCTA />
    </>
  );
}
