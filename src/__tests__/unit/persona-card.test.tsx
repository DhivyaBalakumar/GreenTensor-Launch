import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import PersonaSection from "@/components/sections/PersonaSection";

describe("PersonaSection / PersonaCard", () => {
  test("renders all three persona cards", () => {
    render(<PersonaSection />);
    expect(screen.getByText("MLOps Engineer")).toBeTruthy();
    expect(screen.getByText("CISO / Security Lead")).toBeTruthy();
    expect(screen.getByText("ESG / Sustainability Officer")).toBeTruthy();
  });

  test("MLOps persona CTA links to #trial", () => {
    render(<PersonaSection />);
    const trialLink = screen.getByText("Start Free Trial");
    expect(trialLink.closest("a")?.getAttribute("href")).toBe("#trial");
  });

  test("CISO persona CTA links to #demo", () => {
    render(<PersonaSection />);
    const demoLink = screen.getByText("Request a Security Demo");
    expect(demoLink.closest("a")?.getAttribute("href")).toBe("#demo");
  });

  test("ESG persona CTA links to #demo", () => {
    render(<PersonaSection />);
    const esgLink = screen.getByText("See ESG Reporting");
    expect(esgLink.closest("a")?.getAttribute("href")).toBe("#demo");
  });

  test("each persona card renders capabilities list", () => {
    render(<PersonaSection />);
    // MLOps capabilities
    expect(screen.getByText(/PyTorch, TensorFlow/i)).toBeTruthy();
    // CISO capabilities
    expect(screen.getByText(/Real-time compute anomaly detection/i)).toBeTruthy();
    // ESG capabilities
    expect(screen.getByText(/GRI, TCFD, and CDP report generation/i)).toBeTruthy();
  });
});
