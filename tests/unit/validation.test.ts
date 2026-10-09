import { describe, it, expect } from "vitest";
import {
  DemoRequestSchema,
  ContactSchema,
  RelativePathSchema,
  toFieldErrors,
} from "@/validation/forms";

describe("RelativePathSchema (open-redirect / SSRF guard)", () => {
  it("accepts same-site relative paths", () => {
    expect(RelativePathSchema.safeParse("/platforms").success).toBe(true);
  });

  it("rejects protocol-relative URLs", () => {
    expect(RelativePathSchema.safeParse("//evil.com").success).toBe(false);
  });

  it("rejects absolute external URLs", () => {
    expect(RelativePathSchema.safeParse("https://evil.com").success).toBe(false);
  });

  it("rejects path traversal / empty", () => {
    expect(RelativePathSchema.safeParse("").success).toBe(false);
    expect(RelativePathSchema.safeParse("..").success).toBe(false);
  });
});

describe("DemoRequestSchema", () => {
  const valid = {
    name: "Ada Lovelace",
    email: "ada@broker.example",
    company: "Acme FX",
    brokerType: "forex",
    message: "Interested in the white label stack.",
  };

  it("accepts a well-formed request", () => {
    const result = DemoRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects oversized free text", () => {
    const result = DemoRequestSchema.safeParse({
      ...valid,
      message: "x".repeat(3000),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = DemoRequestSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects unknown broker types", () => {
    const result = DemoRequestSchema.safeParse({ ...valid, brokerType: "holographic" });
    expect(result.success).toBe(false);
  });

  it("maps ZodErrors to field-keyed errors for UI", () => {
    const result = DemoRequestSchema.safeParse({ ...valid, email: "bad", name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(errors.email).toBeDefined();
      expect(errors.name).toBeDefined();
    }
  });
});

describe("ContactSchema", () => {
  it("requires all fields", () => {
    expect(ContactSchema.safeParse({}).success).toBe(false);
  });

  it("accepts a valid message", () => {
    expect(
      ContactSchema.safeParse({
        name: "Grace",
        email: "grace@broker.example",
        message: "Hello",
      }).success,
    ).toBe(true);
  });
});
