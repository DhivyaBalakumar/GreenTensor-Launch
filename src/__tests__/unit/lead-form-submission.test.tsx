import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import LeadForm from "@/components/forms/LeadForm";

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("LeadForm — submission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows success state after successful form submission", async () => {
    // Mock fetch to return success
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        message: "You're on the waitlist!",
      }),
    });

    render(
      <LeadForm
        conversionPath="waitlist"
        buttonLabel="Join the Waitlist"
        buttonVariant="ghost"
      />
    );

    // Fill in all required fields
    fireEvent.change(document.querySelector('input[name="firstName"]')!, {
      target: { value: "Jane" },
    });
    fireEvent.change(document.querySelector('input[name="lastName"]')!, {
      target: { value: "Smith" },
    });
    fireEvent.change(document.querySelector('input[name="email"]')!, {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(document.querySelector('input[name="company"]')!, {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(document.querySelector('input[name="role"]')!, {
      target: { value: "MLOps Engineer" },
    });
    fireEvent.click(document.querySelector('input[name="consentGiven"]')!);

    // Submit the form
    fireEvent.click(screen.getByText("Join the Waitlist"));

    // Wait for success state
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeTruthy();
    });

    expect(screen.getByText("You're in!")).toBeTruthy();
  });

  test("shows error message on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({
        success: false,
        message: "Submission failed. Please try again.",
      }),
    });

    render(
      <LeadForm
        conversionPath="demo"
        buttonLabel="Request Demo"
        buttonVariant="secondary"
      />
    );

    // Fill in all required fields
    fireEvent.change(document.querySelector('input[name="firstName"]')!, {
      target: { value: "Jane" },
    });
    fireEvent.change(document.querySelector('input[name="lastName"]')!, {
      target: { value: "Smith" },
    });
    fireEvent.change(document.querySelector('input[name="email"]')!, {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(document.querySelector('input[name="company"]')!, {
      target: { value: "Acme Corp" },
    });
    fireEvent.change(document.querySelector('input[name="role"]')!, {
      target: { value: "CISO" },
    });
    fireEvent.click(document.querySelector('input[name="consentGiven"]')!);

    fireEvent.click(screen.getByText("Request Demo"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeTruthy();
    });
  });

  test("shows validation errors when required fields are empty", async () => {
    render(
      <LeadForm
        conversionPath="trial"
        buttonLabel="Start Free Trial"
        buttonVariant="primary"
      />
    );

    // Submit without filling anything
    fireEvent.click(screen.getByText("Start Free Trial"));

    await waitFor(() => {
      // Should show at least one validation error
      const alerts = document.querySelectorAll('[role="alert"]');
      expect(alerts.length).toBeGreaterThan(0);
    });
  });
});
