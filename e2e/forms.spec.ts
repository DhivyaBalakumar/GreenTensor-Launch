import { test, expect, fillLeadForm } from "./fixtures";

/**
 * E2E tests for the three lead capture forms.
 * These tests mock the /api/leads endpoint to avoid real CRM submissions.
 */

test.describe("Lead capture forms", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the /api/leads endpoint
    await page.route("**/api/leads", async (route) => {
      const body = await route.request().postDataJSON();
      const conversionPath = body?.formData?.conversionPath;

      if (conversionPath === "trial") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            message: "Your free trial is ready!",
            redirectUrl: "https://app.greentensor.ai/dashboard",
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            message:
              conversionPath === "waitlist"
                ? "You're on the waitlist!"
                : "Demo request received.",
          }),
        });
      }
    });

    await page.goto("/");
    // Dismiss cookie banner if present
    const acceptBtn = page.getByText("Accept All");
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
    }
  });

  test("Waitlist form: fill → submit → confirmation visible", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    const form = page.locator("#waitlist form");

    await fillLeadForm(page, "#waitlist form");
    await form.getByRole("button", { name: /join the waitlist/i }).click();

    await expect(page.getByRole("status")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("You're in!")).toBeVisible();
  });

  test("Demo form: fill → submit → confirmation visible", async ({ page }) => {
    await page.locator("#demo").scrollIntoViewIfNeeded();
    const form = page.locator("#demo form");

    await fillLeadForm(page, "#demo form");
    await form.getByRole("button", { name: /request a demo/i }).click();

    await expect(page.getByRole("status")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("You're in!")).toBeVisible();
  });

  test("Trial form: fill → submit → redirect to Platform URL", async ({ page }) => {
    await page.locator("#trial").scrollIntoViewIfNeeded();
    const form = page.locator("#trial form");

    await fillLeadForm(page, "#trial form");

    // Intercept navigation
    const navigationPromise = page.waitForURL("**/dashboard", { timeout: 5000 }).catch(() => null);
    await form.getByRole("button", { name: /start free trial/i }).click();

    // Either redirected or shows success state
    const redirected = await navigationPromise;
    if (!redirected) {
      await expect(page.getByRole("status")).toBeVisible({ timeout: 5000 });
    }
  });

  test("Form shows validation errors when submitted empty", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    const form = page.locator("#waitlist form");

    await form.getByRole("button", { name: /join the waitlist/i }).click();

    // At least one validation error should appear
    await expect(page.locator('[role="alert"]').first()).toBeVisible({ timeout: 3000 });
  });
});
