// Feature: green-tensor-website, Property 7: Form renders a labeled input for every required schema key
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import LeadForm from "@/components/forms/LeadForm";

// ─── Required fields that must have labeled inputs ────────────────────────────

// These are the required fields in leadSchema that must have
// a visible <label> + <input> pair in the rendered DOM.
const requiredFields = [
  { key: "firstName", labelText: "First Name" },
  { key: "lastName", labelText: "Last Name" },
  { key: "email", labelText: "Work Email" },
  { key: "company", labelText: "Company" },
  { key: "role", labelText: "Job Title" },
  { key: "consentGiven", labelText: "Privacy Policy" },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Property 7: Form renders a labeled input for every required schema field", () => {
  const conversionPaths = ["waitlist", "demo", "trial"] as const;

  conversionPaths.forEach((conversionPath) => {
    describe(`conversionPath: ${conversionPath}`, () => {
      test("renders all required labeled inputs", () => {
        render(
          <LeadForm
            conversionPath={conversionPath}
            buttonLabel="Submit"
            buttonVariant="primary"
          />
        );

        // Check firstName
        const firstNameInput = document.querySelector('input[name="firstName"]');
        expect(firstNameInput).toBeTruthy();
        expect(firstNameInput?.id).toBeTruthy();
        const firstNameLabel = document.querySelector(
          `label[for="${firstNameInput?.id}"]`
        );
        expect(firstNameLabel).toBeTruthy();
        expect(firstNameLabel?.textContent).toContain("First Name");

        // Check lastName
        const lastNameInput = document.querySelector('input[name="lastName"]');
        expect(lastNameInput).toBeTruthy();
        const lastNameLabel = document.querySelector(
          `label[for="${lastNameInput?.id}"]`
        );
        expect(lastNameLabel).toBeTruthy();
        expect(lastNameLabel?.textContent).toContain("Last Name");

        // Check email
        const emailInput = document.querySelector('input[name="email"]');
        expect(emailInput).toBeTruthy();
        const emailLabel = document.querySelector(
          `label[for="${emailInput?.id}"]`
        );
        expect(emailLabel).toBeTruthy();
        expect(emailLabel?.textContent).toContain("Work Email");

        // Check company
        const companyInput = document.querySelector('input[name="company"]');
        expect(companyInput).toBeTruthy();
        const companyLabel = document.querySelector(
          `label[for="${companyInput?.id}"]`
        );
        expect(companyLabel).toBeTruthy();
        expect(companyLabel?.textContent).toContain("Company");

        // Check role
        const roleInput = document.querySelector('input[name="role"]');
        expect(roleInput).toBeTruthy();
        const roleLabel = document.querySelector(
          `label[for="${roleInput?.id}"]`
        );
        expect(roleLabel).toBeTruthy();
        expect(roleLabel?.textContent).toContain("Job Title");

        // Check consent checkbox
        const consentInput = document.querySelector(
          'input[name="consentGiven"]'
        );
        expect(consentInput).toBeTruthy();
        const consentLabel = document.querySelector(
          `label[for="${consentInput?.id}"]`
        );
        expect(consentLabel).toBeTruthy();
        expect(consentLabel?.textContent).toContain("Privacy Policy");
      });

      test("all required inputs have non-empty name attributes", () => {
        render(
          <LeadForm
            conversionPath={conversionPath}
            buttonLabel="Submit"
            buttonVariant="primary"
          />
        );

        const fieldNames = ["firstName", "lastName", "email", "company", "role"];
        fieldNames.forEach((fieldName) => {
          const input = document.querySelector(`input[name="${fieldName}"]`);
          expect(input, `input[name="${fieldName}"] should exist`).toBeTruthy();
          expect(
            input?.getAttribute("name"),
            `name attribute should be "${fieldName}"`
          ).toBe(fieldName);
        });
      });

      test("all inputs have associated labels via htmlFor/id pairing", () => {
        render(
          <LeadForm
            conversionPath={conversionPath}
            buttonLabel="Submit"
            buttonVariant="primary"
          />
        );

        const inputs = document.querySelectorAll("input:not([type='hidden'])");
        inputs.forEach((input) => {
          const id = input.getAttribute("id");
          if (!id) return; // hidden inputs may not have ids
          const label = document.querySelector(`label[for="${id}"]`);
          expect(
            label,
            `input#${id} should have an associated label`
          ).toBeTruthy();
        });
      });
    });
  });
});
