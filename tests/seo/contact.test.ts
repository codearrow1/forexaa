import { describe, it, expect } from "vitest";
import { ContactDemoSchema } from "@/validation/forms";

/**
 * Contact form validation tests (Rule 48/49/71).
 */
describe("contact form validation", () => {
  const valid = {
    name: "Ada Lovelace",
    email: "ada@broker.com",
    company: "Acme FX",
    country: "United Kingdom",
    businessType: "new-brokerage",
    interest: "demo",
    message: "Interested in your platform.",
  };

  it("accepts a well-formed submission", () => {
    expect(ContactDemoSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = ContactDemoSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown business type", () => {
    const result = ContactDemoSchema.safeParse({ ...valid, businessType: "holographic" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown interest", () => {
    const result = ContactDemoSchema.safeParse({ ...valid, interest: "telepathy" });
    expect(result.success).toBe(false);
  });

  it("rejects an oversized message", () => {
    const result = ContactDemoSchema.safeParse({ ...valid, message: "x".repeat(3000) });
    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = ContactDemoSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
  });
});
