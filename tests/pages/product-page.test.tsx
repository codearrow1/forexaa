import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import CrmPage from "@/app/broker-technology/crm/page";

/**
 * ProductPage type test (Rule 72): the flagship CRM page renders its H1,
 * breadcrumbs, schema and related links.
 */
describe("ProductPage — CRM", () => {
  it("renders a single H1 with the product title", () => {
    render(<CrmPage />);
    expect(screen.getByRole("heading", { level: 1 })).not.toBeNull();
    expect(document.querySelectorAll("h1").length).toBe(1);
  });

  it("renders the breadcrumb trail ending on the product", () => {
    render(<CrmPage />);
    const nav = document.querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).not.toBeNull();
    expect(nav?.textContent).toContain("Broker Technology");
    expect(nav?.textContent).toContain("Forex CRM");
  });

  it("emits SoftwareApplication + BreadcrumbList JSON-LD", () => {
    render(<CrmPage />);
    const blocks = document.querySelectorAll('script[type="application/ld+json"]');
    const graph = JSON.parse(
      (blocks[0]?.textContent ?? "{}").replace(/\\u003c/g, "<"),
    );
    const nodes: Array<Record<string, unknown>> = graph["@graph"]
      ? (graph["@graph"] as Array<Record<string, unknown>>)
      : [graph];
    const types = nodes.map((node) => node["@type"]);
    expect(types).toContain("SoftwareApplication");
    expect(types).toContain("BreadcrumbList");
  });

  it("links to related products (no orphans)", () => {
    render(<CrmPage />);
    const links = [...document.querySelectorAll('a[href^="/"]')].map((a) =>
      a.getAttribute("href"),
    );
    expect(links).toContain("/broker-technology/traders-room");
    expect(links).toContain("/broker-technology/back-office");
    expect(links.some((href) => href?.startsWith("/contact"))).toBe(true);
  });

  it("labels synthetic data as illustrative", () => {
    render(<CrmPage />);
    expect(document.body.textContent).toContain("Illustrative");
  });
});
