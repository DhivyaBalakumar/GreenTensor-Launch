import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import AnimatedParticles from "@/components/ui/AnimatedParticles";
import GlowOrbs from "@/components/ui/GlowOrbs";
import SkipToMainContent from "@/components/layout/SkipToMainContent";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import GTMScript from "@/components/analytics/GTMScript";
import PlausibleScript from "@/components/analytics/PlausibleScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greentensor.ai"),
  title: {
    default: "GreenTensor — Sustainable, Secure AI by Default",
    template: "%s | GreenTensor",
  },
  description:
    "Monitor AI carbon footprint, detect compute-anomaly threats, and automate ESG reporting. One platform for sustainable, secure AI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greentensor.ai",
    siteName: "GreenTensor",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "GreenTensor Platform" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenTensor — Sustainable, Secure AI by Default",
    description:
      "Monitor AI carbon footprint, detect compute-anomaly threats, and automate ESG reporting.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://greentensor.ai",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GreenTensor",
  url: "https://greentensor.ai",
  logo: "https://greentensor.ai/logo.png",
  description: "AI sustainability and security platform for enterprise workloads.",
  sameAs: [
    "https://www.linkedin.com/in/dhivyabalakumar04",
    "https://github.com/greentensor",
  ],
};

const softwareAppSchema = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-software-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className="antialiased bg-gt-bg text-gt-text font-sans relative">
        {/* Analytics — consent-gated, loads after user accepts */}
        <GTMScript />
        <PlausibleScript />

        {/* Fixed background layers */}
        <AnimatedParticles />
        <GlowOrbs />

        {/* Accessibility */}
        <SkipToMainContent />

        {/* Cookie consent (renders before analytics scripts) */}
        <CookieConsentBanner />

        {/* Site chrome */}
        <SiteHeader />

        <main id="main-content" className="relative z-10">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
