import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Extended test fixture that includes axe-core accessibility checking.
 */
export const test = base.extend<{ makeAxeBuilder: () => AxeBuilder }>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";

/**
 * Helper to fill the lead form fields.
 */
export async function fillLeadForm(
  page: import("@playwright/test").Page,
  formSelector: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    role?: string;
  } = {}
) {
  const {
    firstName = "Jane",
    lastName = "Smith",
    email = "jane@example.com",
    company = "Acme Corp",
    role = "MLOps Engineer",
  } = data;

  const form = page.locator(formSelector);
  await form.locator('input[name="firstName"]').fill(firstName);
  await form.locator('input[name="lastName"]').fill(lastName);
  await form.locator('input[name="email"]').fill(email);
  await form.locator('input[name="company"]').fill(company);
  await form.locator('input[name="role"]').fill(role);
  await form.locator('input[name="consentGiven"]').check();
}
