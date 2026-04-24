import { ExternalLink, Globe, Link } from "lucide-react";

const footerNav = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/pricing" },
  { label: "PyPI Package", href: "https://pypi.org/project/greentensor/", external: true },
  { label: "Docs", href: "#", external: false },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Settings", href: "#cookie-settings", id: "cookie-settings-link" },
];

const socialLinks = [
  {
    label: "GreenTensor on LinkedIn",
    href: "https://www.linkedin.com/in/dhivyabalakumar04",
    icon: Link,
  },
  {
    label: "GreenTensor on GitHub",
    href: "https://github.com/greentensor",
    icon: Globe,
  },
  {
    label: "GreenTensor on Twitter",
    href: "https://twitter.com/greentensor",
    icon: ExternalLink,
  },
];

export default function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-gt-border bg-gt-surface/50 mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="/"
              aria-label="GreenTensor — home"
              className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="40" height="40" rx="8" fill="#0F1923"/>
                <text x="4" y="28" fontSize="22" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#22C55E">G</text>
                <text x="20" y="28" fontSize="22" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#3B82F6">T</text>
              </svg>
            </a>
            <p className="text-gt-muted text-sm max-w-xs">
              Making AI systems sustainable and secure by default. One platform
              for carbon monitoring, threat detection, and ESG reporting.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-gt-text font-semibold text-sm mb-4">Platform</h3>
            <ul className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gt-muted hover:text-gt-text transition-colors text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
                  >
                    {link.label}
                    {link.external && (
                      <span className="sr-only"> (opens in new tab)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h3 className="text-gt-text font-semibold text-sm mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gt-muted hover:text-gt-green transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gt-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gt-muted text-xs">
            © {new Date().getFullYear()} GreenTensor, Inc. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    id={link.id}
                    className="text-gt-muted hover:text-gt-text transition-colors text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
