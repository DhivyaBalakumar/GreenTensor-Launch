// Feature: green-tensor-website, Property 7: Form renders a labeled input for every required schema key
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import LeadForm from "@/components/forms/LeadForm";

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

        const fields = [
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Work Email" },
          { name: "company", label: "Company" },
          { name: "role", label: "Job Title" },
          { name: "consentGiven", label: "Privacy Policy" },
        ];

        fields.forEach(({ name, label }) => {
          const input = document.querySelector(`input[name="${name}"]`);
          expect(input, `input[name="${name}"] should exist`).toBeTruthy();
          const labelEl = document.querySelector(`label[for="${input?.id}"]`);
          expect(labelEl, `label for ${name} should exist`).toBeTruthy();
          expect(labelEl?.textContent).toContain(label);
        });
      });

      test("all required inputs have non-empty name attributes", () => {
        render(
          <LeadForm
            conversionPath={conversionPath}
            buttonLabel="Submit"
            buttonVariant="primary"
          />
        );

        ["firstName", "lastName", "email", "company", "role"].forEach((fieldName) => {
          const input = document.querySelector(`input[name="${fieldName}"]`);
          expect(input, `input[name="${fieldName}"] should exist`).toBeTruthy();
          expect(input?.getAttribute("name")).toBe(fieldName);
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

        document.querySelectorAll("input:not([type='hidden'])").forEach((input) => {
          const id = input.getAttribute("id");
          if (!id) return;
          const label = document.querySelector(`label[for="${id}"]`);
          expect(label, `input#${id} should have an associated label`).toBeTruthy();
        });
      });
    });
  });
});
