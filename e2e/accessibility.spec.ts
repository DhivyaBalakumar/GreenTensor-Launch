import { test, expect } from "./fixtures";

test.describe("Accessibility — axe-core", () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss cookie banner before running axe to avoid false positives
    await page.goto("/");
    const acceptBtn = page.getByText("Accept All");
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
    }
    // Wait for page to settle
    await page.waitForLoadState("networkidle");
  });

  test("Home page (/) has zero axe violations", async ({ page, makeAxeBuilder }) => {
    const results = await makeAxeBuilder().analyze();
    expect(results.violations).toEqual([]);
  });

  test("Pricing page (/pricing) has zero axe violations", async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");
    const results = await makeAxeBuilder().analyze();
    expect(results.violations).toEqual([]);
  });

  test("All images have descriptive alt text", async ({ page }) => {
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      const ariaHidden = await img.getAttribute("aria-hidden");
      // Images that are not aria-hidden must have non-empty alt text
      if (ariaHidden !== "true") {
        expect(alt, `Image should have alt text`).toBeTruthy();
        expect(alt!.length, `Alt text should not be empty`).toBeGreaterThan(0);
      }
    }
  });

  test("All form inputs have associated labels", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();

    const inputs = await page
      .locator('input:not([type="hidden"]):not([aria-hidden="true"])')
      .all();

    for (const input of inputs) {
      const id = await input.getAttribute("id");
      if (!id) continue;

      const label = page.locator(`label[for="${id}"]`);
      const hasLabel = await label.count() > 0;
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      expect(
        hasLabel || ariaLabel || ariaLabelledBy,
        `Input #${id} should have an associated label`
      ).toBeTruthy();
    }
  });
});
