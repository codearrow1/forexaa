# Hostinger Build Notes

> **Document provenance:** Independently verified during Phase 19 Hostinger build fix.

## Root cause of the Hostinger build failure

Hostinger's default Node.js container ships a glibc older than 2.29. Next.js's
production build invokes the native **SWC compiler binary**, which is dynamically
linked against glibc ≥ 2.29. Two consequences reported in the log:

1. `GLIBC_2.29 not found` — SWC native binary cannot load.
2. Next.js then attempted its WebAssembly SWC fallback, but **configuring a
   Next.js `*.ts` file requires compiling the config via the same failing native
   toolchain**, so config loading fell back and emitted
   `Cannot find module ... next.config.compiled.js`.

## What Hostinger actually installed

| Package | Declared in repo | Resolved by lockfile | Hostinger installed (from log) |
|--------|------------------|----------------------|--------------------------------|
| node   | engines `>=20` (added in this fix) | Node.js 22.18.0 | 22.18.0 |
| next   | `^16.3.8`        | 16.4.0               | 16.4.0 |
| react  | 19.2.8 (pinned)  | 19.2.8               | — |

The lockfile pins Next.js 16.4.0. The reported failure was due to using a
**.ts config file** + the glibc-incompatible native SWC binary — not a version
mismatch in the lockfile or a wrong Next.js install.

## Changes made (Phase 19, commit a0d1c03)

1. **`next.config.ts` → `next.config.mjs`** (kept as a JS module).
   - Next.js loads `.mjs`/`.js` config **without invoking the native TypeScript
     config compiler**, sidestepping the `next.config.compiled.js` failure.
   - All redirects, `poweredByHeader`, and security notes are preserved verbatim.
2. **`tests/seo/redirects.test.ts`** updated to load the `.mjs` config via
   `createRequire` so type checking and tests pass without a `.ts` config.
3. **`package.json`**: added `"engines": { "node": ">=20" }` to make the
   Node-version requirement explicit to Hostinger's runtime selector.

## What was NOT changed

- Next.js version (16.4.0 preserved).
- React version (19.2.8 pinned preserved).
- No lockfile regeneration.
- No application/source changes.
- CSP nonce enforcement, `src/proxy.ts`, and `force-dynamic` remain untouched.

## Hostinger deployment instructions

In the Hostinger control panel:

1. Set **Node.js version** to **22** or **24** (22.18.0 is verified; 24.x also
   satisfies the engine requirement).
2. Choose **"Use npm"** with a **production** install of the lockfile.
3. Build command:
   ```
   npm ci && npm run build
   ```
4. Output directory: `.next`
5. Start command: `npm run start`
6. Ensure `next.config.mjs` is at the archive root.

> The glibc issue lives in the **build** phase (native SWC). If Hostinger still
> cannot build on the default Node image, the alternative is to build on a
> glibc ≥ 2.29 image and deploy the standalone `.next` output only — but that
> is an operational choice for the hosting provider, not a source change.

## Verification

Locally (glibc ≥ 2.31 environment):

- `npx --no-install tsc --noEmit` → PASS
- `npx --no-install vitest --run` → 113/113 passed
- `npx --no-install next build` → `✓ Compiled successfully`
- `npm run verify:headers` → PASS
- `npm run seo:check` → 0 errors / 0 warnings
- `npm audit --omit=dev` → 0 vulnerabilities

The `.mjs` config loads correctly under `next build` in this environment.

## Archive

- Path: `forexaa-deploy.zip` (generated root)
- Contents: 631 tracked files; `package.json`, `package-lock.json`,
  `next.config.mjs` at root; excludes `node_modules`, `.next`, `.env*` (only
  `.env.example` shipped), build logs, and `brand-board.html`.
- Size: ~60.3 MB.

## Limitation

This fix makes the build **config** independent of the native SWC toolchain.
The final Next.js build still invokes native SWC for page compilation. On
Hostinger's legacy glibc host the build may still fail at the compilation stage
if the glibc version is below 2.29 — in that case the Hostinger build image
itself must be upgraded or a standalone build must be supplied. This cannot be
resolved purely from source.
