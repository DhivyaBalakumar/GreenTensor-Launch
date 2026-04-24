import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for GreenTensor E2E tests.
 * Runs against a locally started Next.js dev server.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 393, height: 851 },
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      HUBSPOT_PORTAL_ID: "test",
      HUBSPOT_FORM_GUID_WAITLIST: "test",
      HUBSPOT_FORM_GUID_DEMO: "test",
      HUBSPOT_FORM_GUID_TRIAL: "test",
      HUBSPOT_ACCESS_TOKEN: "test",
      RESEND_API_KEY: "test",
      GREENTENSOR_PLATFORM_API_URL: "https://api.greentensor.ai",
      GREENTENSOR_PLATFORM_API_KEY: "test",
    },
  },
});
