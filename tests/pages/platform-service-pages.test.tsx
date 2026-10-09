import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Mt4Mt5Page from "@/app/platforms/mt4-mt5/page";
import WhiteLabelPage from "@/app/services/white-label/page";

/**
 * Platform + Service page type tests (Rule 72).
 */
describe("PlatformPage — MT4/MT5", () => {
  it("renders a single H1 and the breadcrumb", () => {
    render(<Mt4Mt5Page />);
    expect(screen.getByRole("heading", { level: 1 })).not.toBeNull();
    expect(document.querySelectorAll("h1").length).toBe(1);
    expect(document.querySelector('nav[aria-label="Breadcrumb"]')?.textContent).toContain("Platforms");
  });

  it("emits a SoftwareApplication node", () => {
    render(<Mt4Mt5Page />);
    const block = document.querySelector('script[type="application/ld+json"]');
    const graph = JSON.parse((block?.textContent ?? "{}").replace(/\\u003c/g, "<"));
    const types: string[] = graph["@graph"]
      ? graph["@graph"].map((node: { "@type": string }) => node["@type"])
      : [graph["@type"]];
    expect(types).toContain("SoftwareApplication");
  });
});

describe("ServicePage — White Label", () => {
  it("renders a single H1 and emits a Service node", () => {
    render(<WhiteLabelPage />);
    expect(document.querySelectorAll("h1").length).toBe(1);
    const block = document.querySelector('script[type="application/ld+json"]');
    const graph = JSON.parse((block?.textContent ?? "{}").replace(/\\u003c/g, "<"));
    const types: string[] = graph["@graph"]
      ? graph["@graph"].map((node: { "@type": string }) => node["@type"])
      : [graph["@type"]];
    expect(types).toContain("Service");
  });

  it("does not state implementation times or commercial terms", () => {
    render(<WhiteLabelPage />);
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/guaranteed (?:in |within )?\d+(?:-|\s)?(?:day|week)/i);
    expect(text).not.toMatch(/\$\s?\d{2,4}(?:\/(mo|month|year))/i);
  });
});
