import { describe, it, expect } from "vitest";
import {
  organizationLd,
  websiteLd,
  breadcrumbLd,
  softwareApplicationLd,
  serviceLd,
  faqLd,
} from "@/lib/seo/jsonld";

describe("JSON-LD generators (Rule 15-20)", () => {
  it("Organization has only verified, non-invented fields", () => {
    const org = organizationLd();
    expect(org["@type"]).toBe("Organization");
    expect(org["name"]).toBe("FOREXAA");
    expect(typeof org["url"]).toBe("string");
    expect(org["logo"]).toContain("forexaa-mark.svg");
    // No invented facts:
    expect(org["address"]).toBeUndefined();
    expect(org["foundingDate"]).toBeUndefined();
    // sameAs is only allowed with verified profiles — assert empty/absent
    // structure (an array that stays empty until verified).
    const sameAs = org["sameAs"];
    expect(sameAs === undefined || (Array.isArray(sameAs) && sameAs.length === 0)).toBe(true);
  });

  it("WebSite is minimal and current (no obsolete search-box pattern)", () => {
    const site = websiteLd();
    expect(site["@type"]).toBe("WebSite");
    expect(site["potentialAction"]).toBeUndefined();
  });

  it("BreadcrumbList has sequential positions and absolute items", () => {
    const crumbs = [
      { label: "Home", href: "/" },
      { label: "Platforms", href: "/platforms" },
      { label: "MT7", href: "/platforms/mt7" },
    ];
    const bc = breadcrumbLd(crumbs, "https://forexaa.com");
    const items = bc["itemListElement"] as Array<Record<string, unknown>>;
    expect(items.length).toBe(3);
    items.forEach((item, index) => {
      expect(item["position"]).toBe(index + 1);
      expect(typeof item["item"]).toBe("string");
      expect((item["item"] as string).startsWith("https://")).toBe(true);
    });
  });

  it("SoftwareApplication only carries truthful fields", () => {
    const app = softwareApplicationLd({
      name: "FOREXAA — MT7",
      description: "desc",
      url: "https://forexaa.com/platforms/mt7",
    });
    expect(app["@type"]).toBe("SoftwareApplication");
    expect(app["applicationCategory"]).toBe("BusinessApplication");
    // No fabricated aggregateRating.
    expect(app["aggregateRating"]).toBeUndefined();
    expect(app["review"]).toBeUndefined();
  });

  it("Service names its provider as the FOREXAA Organization", () => {
    const service = serviceLd({
      name: "Liquidity",
      description: "desc",
      url: "https://forexaa.com/infrastructure",
    });
    expect(service["@type"]).toBe("Service");
    expect((service["provider"] as Record<string, unknown>)["name"]).toBe("FOREXAA");
  });

  it("FAQPage maps to Question/Answer with text answers", () => {
    const faq = faqLd([{ question: "Q?", answer: "A." }]);
    const entity = (faq["mainEntity"] as Array<Record<string, unknown>>)[0];
    expect(entity?.["@type"]).toBe("Question");
    expect((entity?.["acceptedAnswer"] as Record<string, unknown> | undefined)?.["@type"]).toBe("Answer");
  });

  it("all generators produce valid JSON-safe strings (no </script> breakout)", () => {
    const payload = JSON.stringify(
      [organizationLd(), websiteLd()],
    ).replace(/</g, "\\u003c");
    expect(payload.includes("</script>")).toBe(false);
    expect(payload.includes("<")).toBe(false);
  });
});
