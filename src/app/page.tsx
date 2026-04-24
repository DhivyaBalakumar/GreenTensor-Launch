import HeroSection from "@/components/sections/HeroSection";
import ThreePillarsSection from "@/components/sections/ThreePillarsSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ProductShowcaseSection from "@/components/sections/ProductShowcaseSection";
import PersonaSection from "@/components/sections/PersonaSection";
import ConversionSection from "@/components/sections/ConversionSection";
import PricingSection from "@/components/sections/PricingSection";
import TrustSection from "@/components/sections/TrustSection";
import FooterCTA from "@/components/sections/FooterCTA";

export default function HomePage() {
  return (
    <>
      {/* Hero — instant comprehension above the fold */}
      <HeroSection />

      {/* Three pillars — sustainability, security, ESG */}
      <ThreePillarsSection />

      {/* Problem — why this matters */}
      <ProblemSection />

      {/* Product showcase — dashboard, SDK, API */}
      <ProductShowcaseSection />

      {/* Persona — MLOps, CISO, ESG officer */}
      <PersonaSection />

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
