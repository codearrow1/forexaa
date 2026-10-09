import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

// Tests run from the project root; resolve paths relative to CWD.
const root = process.cwd();
const srcDir = path.join(root, "src");

function listFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, out);
    else out.push(full);
  }
  return out;
}

/** Common secret patterns that must never appear in source. */
const SECRET_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: "AWS access key", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "private key block", re: /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/ },
  { name: "Stripe secret", re: /\bsk_live_[a-z0-9]{16,}\b/i },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
];

describe("secret hygiene (Rule 3)", () => {
  it("no hardcoded secret-like patterns exist in src/", () => {
    const files = listFiles(srcDir);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const pattern of SECRET_PATTERNS) {
        expect(
          pattern.re.test(content),
          `${pattern.name} pattern found in ${path.relative(root, file)}`,
        ).toBe(false);
      }
    }
  });

  it(".env.example exists and .env.local is gitignored", () => {
    expect(existsSync(path.join(root, ".env.example"))).toBe(true);
    const gitignore = readFileSync(path.join(root, ".gitignore"), "utf8");
    expect(gitignore).toMatch(/\.env/);
    expect(gitignore).toMatch(/\.env\.\*/);
  });
});
