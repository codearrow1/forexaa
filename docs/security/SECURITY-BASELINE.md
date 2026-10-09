# SECURITY-BASELINE

OWASP ASVS-aligned principles for this repository. Security work started in
Phase 1 and every later phase must preserve it (Rule 1).

## Threat model (short)

Public marketing site that will later add authenticated/demo-request
endpoints. Primary risks: XSS, injection, clickjacking, open redirect /
SSRF, secret leakage, supply chain, abuse of mutation endpoints.

## Secrets

- Real values live **only** in `.env.local` (gitignored). `.env.example`
  documents variable names and safe hints — never real values.
- Server-only access via `src/lib/env.ts`. Client code reads at most
  `NEXT_PUBLIC_*` variables, which are inlined at build time and must be
  non-secret.
- Rotate secrets on any suspected exposure. Nothing here is a long-lived
  credential.
- **Never log** passwords, tokens, API keys, secrets, full PII, card data or
  full request bodies. The logger redacts known keys (`src/lib/logger.ts`).

## Input validation

- All user input is validated by Zod (`src/validation/forms.ts`) on the
  **server**. Client-side validation is UX only.
- Fields have length limits; emails are normalized; free text is trimmed and
  capped.
- Unknown enum values are rejected (`brokerType`, etc.).

## Output encoding / XSS

- React escapes by default. **No `dangerouslySetInnerHTML`** anywhere.
- If rich content becomes necessary, introduce a documented sanitization
  boundary (e.g. a vetted sanitizer library) before enabling it.

## Injection

- **SQL/ORM:** future DB access goes through an ORM with parameterized
  queries — never string-concatenated SQL.
- **Command injection:** no shell execution of user input. The only
  `child_process` use is our own CI tooling with constant arguments.
- **Template injection:** no user-controlled template strings.
- **URL open-redirect / SSRF:** user-supplied URLs must pass
  `RelativePathSchema` (same-site only) or the HTTPS-only `website`
  refinement. No endpoint accepts an arbitrary destination.

## SSRF

No server-side URL fetching exists yet. When added, target URLs must be
validated and restricted (allowlist / scheme / host). Do not build an
unrestricted fetch-by-URL endpoint.

## File uploads

Not implemented (Rule: do not yet). When added, the architecture MUST
enforce: allowlisted file types, size limits, MIME verification, content
validation, randomized storage names, safe storage location, and no
executable upload path.

## Cookies

Documented for when we add them:
- `Secure` (HTTPS-only), `HttpOnly` (no JS access),
  `SameSite=Lax` (default; `Strict` where no cross-site form posts are
  needed), scoped to the minimum path.
- Session/auth cookies are `HttpOnly`.

## Security headers (implemented)

Centralized in `src/security/headers.ts`, applied on every response in
`src/proxy.ts`:

| Header | Value |
| --- | --- |
| Content-Security-Policy | strict `default-src 'self'`, `object-src 'none'`, `frame-src 'none'`, `base-uri 'self'`, `form-action 'self'` |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin` |
| Permissions-Policy | camera/mic/geo/payment/usb disabled |
| X-Frame-Options | `DENY` |
| Cross-Origin-Opener-Policy | `same-origin` |
| Cross-Origin-Resource-Policy | `same-origin` |

### CSP notes
- **Production is strict.** No `unsafe-eval`. `script-src 'self'`.
- **Development** relaxes `script-src`/`style-src` with `'unsafe-inline'`
  because Next.js HMR injects inline module scripts. This is a documented
  deviation; production stays strict.
- `style-src` keeps `'unsafe-inline'` in both modes (React sets inline
  `style` attributes for sizing/transforms); `script-src` is the critical
  vector and stays strict in production.
- Third-party origins are off by default. To allow one, add it to
  `CSP_ALLOWED_ORIGINS` **and** document the approval here.

## Clickjacking

`X-Frame-Options: DENY` + `frame-src 'none'` + `Cross-Origin-Opener-Policy`
make the app un-frameable by arbitrary origins.

## Rate limiting

Abstraction in `src/security/rate-limit.ts` (`RateLimiter` interface +
`InMemoryRateLimiter` for local dev, plus `RATE_LIMIT_PROFILES`). No
unauthenticated mutation endpoint exists yet; the **first** one (demo /
contact) must go through a rate limiter. Production will use a shared
backend (e.g. Upstash) with per-IP keying.

## Error leakage

Branded error UIs (`error.tsx`, `global-error.tsx`, `not-found.tsx`) never
render stack traces, paths, env, tokens or SQL. Only a short, redacted
digest is logged server-side.

## MIME / content handling

Correct content types are set by Next.js. `X-Content-Type-Options: nosniff`
prevents MIME sniffing of ambiguous responses.

## Dependency security

- `npm audit` on install and in CI.
- Prefer the small, maintained dependency set already present.
- Do **not** run destructive automated upgrades (e.g. blanket
  `npm-force-resolve` / `--force` major bumps) without review.
- Lockfile integrity: use `npm ci` in CI (fails if `package.json` and
  `package-lock.json` disagree).

## Logging

Structured JSON-lines via `src/lib/logger.ts`. Level-sensitive
(`LOG_LEVEL`). The logger redacts keys matching password/token/api key/
secret/authorization, etc. **Never log** secrets, full PII, card data or full
request bodies.

## Verification

- `npm run verify:headers` asserts the header set, blocked paths and a clean
  client-bundle secret scan against the production build.
- `tests/unit/security.test.ts`, `tests/unit/secret-hygiene.test.ts`,
  `tests/unit/validation.test.ts` and `tests/unit/navigation.test.ts`
  encode the invariants as automated checks.
