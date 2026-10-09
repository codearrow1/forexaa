import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "@/app/page";

/**
 * Rendering + accessibility smoke test for the Phase 12A homepage (V2).
 * The homepage has 1 h1 (hero) and varied section compositions.
 */
describe("home shell rendering (Phase 12A V2)", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { name: /The Technology/i });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders both primary CTAs as visible links", () => {
    render(<Home />);
    const build = screen.getAllByRole("link", { name: /Build Your Brokerage/i });
    const explore = screen.getAllByRole("link", { name: /Explore the Platform/i });
    expect(build.length).toBeGreaterThan(0);
    expect(explore.length).toBeGreaterThan(0);
  });

  it("has exactly 1 h1 element (hero)", () => {
    render(<Home />);
    expect(document.querySelectorAll("h1").length).toBe(1);
  });

  it("renders all major story sections", () => {
    render(<Home />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(12);
  });
});
