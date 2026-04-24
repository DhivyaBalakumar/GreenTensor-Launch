// ─── JSON-LD structured data builders ────────────────────────────────────────

/**
 * Builds the Organization JSON-LD schema for GreenTensor.
 *
 * Property 6: The returned object must round-trip through JSON.parse(JSON.stringify())
 * and contain @context, @type, name, and description fields.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GreenTensor",
    url: "https://greentensor.ai",
    logo: "https://greentensor.ai/logo.png",
    description:
      "AI sustainability and security platform for enterprise workloads.",
    sameAs: [
      "https://linkedin.com/company/greentensor",
      "https://github.com/greentensor",
    ],
  };
}

/**
 * Builds the SoftwareApplication JSON-LD schema for the GreenTensor Platform.
 *
 * Property 6: The returned object must round-trip through JSON.parse(JSON.stringify())
 * and contain @context, @type, name, and description fields.
 */
export function buildSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GreenTensor Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
    },
    description:
      "Monitor AI carbon footprint, detect compute-anomaly threats, and automate ESG reporting.",
    featureList: [
      "Carbon footprint monitoring",
      "AI threat detection",
      "ESG report automation",
      "Cloud provider integration",
      "SDK for PyTorch, TensorFlow, Hugging Face",
    ],
  };
}
