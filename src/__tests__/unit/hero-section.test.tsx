import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import HeroSection from "@/components/sections/HeroSection";

describe("HeroSection", () => {
  test("renders H1 with outcome-oriented copy", () => {
    render(<HeroSection />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeTruthy();
    // Must contain the core value proposition words
    expect(h1.textContent).toContain("Sustainable");
    expect(h1.textContent).toContain("Secure");
  });

  test("H1 is 12 words or fewer", () => {
    render(<HeroSection />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const wordCount = (h1.textContent ?? "").trim().split(/\s+/).length;
    expect(wordCount).toBeLessThanOrEqual(12);
  });

  test("renders all three CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("Start Free Trial")).toBeTruthy();
    expect(screen.getByText("Request Demo")).toBeTruthy();
    expect(screen.getByText("Join Waitlist")).toBeTruthy();
  });

  test("renders social proof section", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Trusted by teams/i)).toBeTruthy();
  });

  test("section has aria-labelledby pointing to hero-heading", () => {
    render(<HeroSection />);
    const section = document.querySelector("section[aria-labelledby='hero-heading']");
    expect(section).toBeTruthy();
  });

  test("snapshot matches", () => {
    const { container } = render(<HeroSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
