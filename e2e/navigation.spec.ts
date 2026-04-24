import { test, expect } from "./fixtures";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Dismiss cookie banner if present
    const acceptBtn = page.getByText("Accept All");
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
    }
  });

  test("Mobile nav: hamburger opens → links visible → close works", async ({
    page,
  }) => {
    // Only run on mobile viewport
    test.skip(
      page.viewportSize()?.width !== undefined &&
        page.viewportSize()!.width > 768,
      "Mobile nav test — skip on desktop"
    );

    // Open menu
    const menuButton = page.getByRole("button", { name: /open navigation menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Menu should be open
    const nav = page.getByRole("dialog", { name: /navigation menu/i });
    await expect(nav).toBeVisible({ timeout: 2000 });

    // Links should be visible
    await expect(nav.getByText("Product")).toBeVisible();
    await expect(nav.getByText("Pricing")).toBeVisible();

    // Close menu
    const closeButton = page.getByRole("button", { name: /close navigation menu/i });
    await closeButton.click();

    // Menu should be hidden
    await expect(nav).not.toBeVisible({ timeout: 2000 });
  });

  test("Skip-to-content: Tab → skip link visible → Enter → focus on #main-content", async ({
    page,
  }) => {
    // Tab to the first focusable element (skip link)
    await page.keyboard.press("Tab");

    const skipLink = page.getByText("Skip to main content");
    await expect(skipLink).toBeVisible({ timeout: 2000 });

    // Press Enter to activate the skip link
    await page.keyboard.press("Enter");

    // Focus should be on #main-content
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeVisible();
    // Verify the URL hash changed or focus moved
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe("main-content");
  });

  test("Keyboard navigation: Tab through interactive elements in logical order", async ({
    page,
  }) => {
    // Tab through the first several focusable elements
    const focusedElements: string[] = [];

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el
          ? `${el.tagName.toLowerCase()}[${el.getAttribute("href") || el.getAttribute("aria-label") || el.textContent?.trim().slice(0, 30) || ""}]`
          : "none";
      });
      focusedElements.push(focused);
    }

    // Should have focused at least some interactive elements
    expect(focusedElements.filter((e) => e !== "none").length).toBeGreaterThan(3);

    // No element should appear twice in sequence (no focus traps outside menus)
    for (let i = 0; i < focusedElements.length - 1; i++) {
      expect(focusedElements[i]).not.toBe(focusedElements[i + 1]);
    }
  });
});
