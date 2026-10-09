/**
 * Phase 1 security verification script.
 *
 * Usage:
 *   npm run build
 *   npm run verify:headers
 *
 * 1. Starts the production server on a dedicated port.
 * 2. Asserts the security header set on real responses.
 * 3. Asserts sensitive path patterns are blocked (403).
 * 4. Scans the built client bundles for leaked secret patterns.
 *
 * Exits non-zero on any failure so it can gate CI and deployment.
 */

import { spawn } from "node:child_process";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;

const EXPECTED_HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
];

const BLOCKED_PATHS = ["/admin", "/api/admin"];

let failures = 0;

function check(label, condition, detail = "") {
  if (condition) {
    console.log(`  PASS  ${label}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      return res.status < 500;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  return false;
}

function scanClientBundles() {
  const bundlesDir = path.join(process.cwd(), ".next", "static");
  const patterns = [
    { label: "AWS access key", re: /\bAKIA[0-9A-Z]{16}\b/ },
    { label: "Stripe live secret", re: /\bsk_live_[a-z0-9]{16,}\b/i },
    { label: "Private key block", re: /-----BEGIN (?:RSA|EC|OPENSSH) PRIVATE KEY-----/ },
    { label: "SMTP password in bundle", re: /SMTP_PASS\s*[:=]\s*"[^"]{8,}/ },
  ];

  let files = 0;
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".js")) {
        files += 1;
        const content = readFileSync(full, "utf8");
        for (const pattern of patterns) {
          check(
            `no "${pattern.label}" in ${path.relative(bundlesDir, full)}`,
            !pattern.re.test(content),
          );
        }
      }
    }
  };
  walk(bundlesDir);
  check(`scanned ${files} client JS file(s)`, files > 0, "no .next/static bundles found");
}

async function main() {
  const { resolve } = await import("node:path");
  const nextBin = resolve(process.cwd(), "node_modules/next/dist/bin/next");
  console.log("Starting production server on port", PORT);
  const child = spawn(process.execPath, [nextBin, "start", "--port", String(PORT)], {
    stdio: ["ignore", "inherit", "inherit"],
    cwd: process.cwd(),
  });

  const ready = await waitForServer(`${BASE}/`);
  if (!ready) {
    check("server became ready", false);
    child.kill();
    process.exit(1);
  }

  try {
    console.log("\n[1] Security headers on real responses");
    const home = await fetch(`${BASE}/`);
    check("GET / returns 200", home.status === 200, `got ${home.status}`);
    for (const header of EXPECTED_HEADERS) {
      check(`header present: ${header}`, home.headers.has(header));
    }
    const csp = home.headers.get("content-security-policy") ?? "";
    check("CSP default-src 'self'", csp.includes("default-src 'self'"));
    check("CSP object-src 'none'", csp.includes("object-src 'none'"));
    check(
      "CSP frame-src 'none' (clickjacking)",
      csp.includes("frame-src 'none'") && home.headers.get("x-frame-options") === "DENY",
    );
    check(
      "CSP production has no unsafe-eval",
      !csp.includes("unsafe-eval"),
    );
    check(
      "MIME sniffing disabled",
      home.headers.get("x-content-type-options") === "nosniff",
    );

    console.log("\n[2] Sensitive paths blocked");
    for (const p of BLOCKED_PATHS) {
      const res = await fetch(`${BASE}${p}`);
      check(`${p} blocked with 403`, res.status === 403, `got ${res.status}`);
    }

    console.log("\n[3] Client bundle secret scan");
    scanClientBundles();
  } finally {
    child.kill();
  }

  console.log(
    failures === 0 ? "\nAll header/security checks passed." : `\n${failures} check(s) FAILED.`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
