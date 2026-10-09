import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { crumbTrail } from "@/lib/seo/crumbs";
import { routeByPath } from "@/config/seo/routes";

/**
 * Breadcrumb tests (Rule 34/72): visible trail matches the JSON-LD trail,
 * starts at Home, ends at the current page, and intermediate crumbs link to
 * real (live or canonical) pages.
 */
describe("breadcrumbs", () => {
  const sample = "/broker-technology/crm";
  const route = routeByPath(sample)!;

  it("trail starts at Home and ends at the current page", () => {
    const trail = crumbTrail(route);
    expect(trail[0]?.label).toBe("Home");
    expect(trail[0]?.href).toBe("/");
    expect(trail[trail.length - 1]?.label).toBe(route.label);
    expect(trail[trail.length - 1]?.href).toBe(route.path);
  });

  it("intermediate crumbs resolve to known hub paths", () => {
    const trail = crumbTrail(route);
    const middle = trail[1];
    expect(middle).toBeDefined();
    expect(routeByPath(middle!.href)).toBeDefined();
  });

  it("renders the visible trail with a current-page marker", () => {
    render(<Breadcrumbs current={sample} />);
    const items = screen.getAllByRole("link");
    expect(items.length).toBe(2); // Home + Broker Technology
    const current = screen.getByText("Forex CRM");
    expect(current.getAttribute("aria-current")).toBe("page");
  });

  it("deep pages (platforms/mt7) have a 3-level trail", () => {
    const mt7 = routeByPath("/platforms/mt7")!;
    const trail = crumbTrail(mt7);
    expect(trail.length).toBe(3);
    expect(trail.map((crumb) => crumb.label)).toEqual(["Home", "Platforms", "MT7"]);
  });
});
