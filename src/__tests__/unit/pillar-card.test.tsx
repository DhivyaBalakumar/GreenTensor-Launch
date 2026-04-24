import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import ThreePillarsSection from "@/components/sections/ThreePillarsSection";

describe("ThreePillarsSection / PillarCard", () => {
  test("renders all three pillar cards", () => {
    render(<ThreePillarsSection />);
    expect(screen.getByText("Cut AI Carbon Emissions")).toBeTruthy();
    expect(screen.getByText("Detect Threats via Carbon Spikes")).toBeTruthy();
    expect(screen.getByText("Automate ESG Reporting")).toBeTruthy();
  });

  test("sustainability pillar shows green metric", () => {
    render(<ThreePillarsSection />);
    const metric = screen.getByText("40%");
    expect(metric).toBeTruthy();
    // The metric element should have the green color class
    expect(metric.className).toContain("text-gt-green");
  });

  test("security pillar shows blue metric", () => {
    render(<ThreePillarsSection />);
    const metric = screen.getByText("< 2min");
    expect(metric).toBeTruthy();
    expect(metric.className).toContain("text-gt-blue");
  });

  test("ESG pillar shows cyan metric", () => {
    render(<ThreePillarsSection />);
    const metric = screen.getByText("90%");
    expect(metric).toBeTruthy();
    expect(metric.className).toContain("text-gt-cyan");
  });

  test("renders metric labels", () => {
    render(<ThreePillarsSection />);
    expect(screen.getByText("average carbon reduction")).toBeTruthy();
    expect(screen.getByText("mean time to detect")).toBeTruthy();
    expect(screen.getByText("reduction in reporting time")).toBeTruthy();
  });
});
