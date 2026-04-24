# GreenTensor — Marketing Website

> **Make AI Sustainable and Secure by Default**

The official marketing website for [GreenTensor](https://green-tensor-launch-d8km-98ccjvkuy-dhivyas-projects-e2b392aa.vercel.app/) — an AI sustainability and security platform that monitors carbon footprint, detects compute-anomaly threats, and automates ESG reporting.

---

## 🌐 Live URL

> **https://green-tensor-launch-d8km-98ccjvkuy-dhivyas-projects-e2b392aa.vercel.app/**

---

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 with custom design tokens |
| Animation | Framer Motion 11 |
| Forms | React Hook Form + Zod |
| CRM | HubSpot Forms API v3 (server-side) |
| Email | Resend (transactional) |
| Analytics | Google Tag Manager + Plausible (consent-gated) |
| Hosting | Vercel (Edge CDN) |
| Testing | Vitest + fast-check (property tests) + Playwright (E2E) |

---

## 🎨 Design System

- **Background**: `#050A0E` (near-black blue-black)
- **Green accent**: `#22C55E` — sustainability pillar, CTAs
- **Blue accent**: `#3B82F6` — security pillar, links
- **Cyan accent**: `#06B6D4` — ESG pillar, data
- **Text**: `#F8FAFC` headlines, `#94A3B8` body
- Dot-grid SVG overlay, glowing orbs, circuit trace dividers, hero scan-line animation

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Three Pillars, Problem, Product Showcase, Persona, Conversion, Pricing, Trust |
| `/pricing` | Full pricing page with feature comparison table and FAQ |
| `/api/leads` | Edge API route — handles waitlist, demo, trial form submissions |
| `/api/trial` | Edge API route — dedicated trial account creation |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
git clone https://github.com/DhivyaBalakumar/GreenTensor-Launch.git
cd GreenTensor-Launch/greentensor-website
npm install
```

### Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `HUBSPOT_PORTAL_ID` | Your HubSpot portal ID |
| `HUBSPOT_FORM_GUID_WAITLIST` | HubSpot form GUID for waitlist |
| `HUBSPOT_FORM_GUID_DEMO` | HubSpot form GUID for demo requests |
| `HUBSPOT_FORM_GUID_TRIAL` | HubSpot form GUID for free trial |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot private app access token |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `GREENTENSOR_PLATFORM_API_URL` | GreenTensor Platform base URL |
| `GREENTENSOR_PLATFORM_API_KEY` | GreenTensor Platform API key |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (optional) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain (optional, defaults to greentensor.ai) |

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Project Structure

```
greentensor-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, metadata, JSON-LD
│   │   ├── page.tsx            # Home page
│   │   ├── pricing/page.tsx    # Pricing page
│   │   ├── not-found.tsx       # 404 page
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # robots.txt
│   │   └── api/
│   │       ├── leads/route.ts  # Form submission handler (Edge)
│   │       └── trial/route.ts  # Trial account creation (Edge)
│   ├── components/
│   │   ├── analytics/          # GTMScript, PlausibleScript (consent-gated)
│   │   ├── forms/              # LeadForm, WaitlistForm, DemoRequestForm, FreeTrialForm
│   │   ├── layout/             # SiteHeader, SiteFooter, CookieConsentBanner, SkipToMainContent
│   │   ├── sections/           # All page sections (Hero, ThreePillars, Problem, etc.)
│   │   └── ui/                 # Button, DotGrid, GlowOrbs, CircuitDivider, ScrollReveal
│   └── lib/
│       ├── consent/            # shouldLoadAnalytics utility
│       ├── crm/                # buildHubSpotPayload utility
│       ├── email/              # Resend email templates
│       ├── schemas/            # Zod lead form schema
│       └── seo/                # JSON-LD structured data builders
├── public/
│   ├── logo.png                # GT logo (replace with actual logo)
│   └── og-image.png            # Open Graph image (1200×630)
├── .env.local.example          # Environment variable template
├── vercel.json                 # Vercel headers, caching, redirects
├── .lighthouserc.json          # Lighthouse CI thresholds (90+ desktop, 80+ mobile)
└── .github/workflows/ci.yml   # GitHub Actions — lint, test, E2E, Lighthouse
```

---

## 🧪 Testing

### Unit + Property Tests (Vitest + fast-check)

```bash
npm run test        # watch mode
npx vitest --run    # single run
```

7 correctness properties are verified with property-based testing:

| Property | Description |
|---|---|
| P1 | Valid lead submission always returns success |
| P2 | Trial submission always includes a redirect URL |
| P3 | Invalid payloads are always rejected |
| P4 | `buildHubSpotPayload` preserves all fields and tags |
| P5 | `shouldLoadAnalytics` returns correct boolean for any ConsentState |
| P6 | Structured data round-trips as valid JSON-LD |
| P7 | Form renders a labeled input for every required schema field |

### E2E Tests (Playwright)

```bash
npx playwright install chromium
npx playwright test
```

---

## ☁️ Deployment

### Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) → Import `DhivyaBalakumar/GreenTensor-Launch`
2. Set **Root Directory** to `greentensor-website`
3. Add environment variables in Vercel dashboard
4. Deploy

Or via CLI:

```bash
npx vercel login
npx vercel --prod
```

### Environment Variables on Vercel

Add all variables from `.env.local.example` in **Settings → Environment Variables**.

---

## 🔒 Security & Compliance

- HubSpot API keys are **never exposed to the client** — all CRM calls go through Next.js Edge API routes
- GDPR/CCPA cookie consent banner — analytics scripts only load after explicit user consent
- WCAG 2.1 AA accessible — skip links, ARIA labels, focus management, keyboard navigation
- SOC 2, GDPR, GRI, TCFD, CDP compliance badges

---

## 📊 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance (desktop) | ≥ 90 |
| Lighthouse Performance (mobile) | ≥ 80 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

---

## 👤 Author

**Dhivya Balakumar**
- LinkedIn: [linkedin.com/in/dhivyabalakumar04](https://www.linkedin.com/in/dhivyabalakumar04)
- GitHub: [github.com/DhivyaBalakumar](https://github.com/DhivyaBalakumar)

---

## 📝 License

Private — All rights reserved © 2026 GreenTensor, Inc.
