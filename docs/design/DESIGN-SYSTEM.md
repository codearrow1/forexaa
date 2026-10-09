# DESIGN SYSTEM — Aurora Terminal

Institutional fintech + enterprise software + next-generation trading
technology. Deliberately **not** a generic forex template, crypto-casino
aesthetic, gaming UI or flashy Web3.

All tokens live in `src/app/globals.css` (Tailwind v4 `@theme`). Components
consume the **semantic** tokens, never raw hex.

## Color

### Base palette
| Token | Value | Use |
| --- | --- | --- |
| obsidian | `#07111F` | Page background |
| deep-navy | `#0D1B2E` | Surfaces |
| deep-navy-raised | `#11213A` | Elevated surfaces |
| electric-cyan | `#20D8E8` | Primary accent |
| cyan-soft | `#5FE7F2` | Primary hover |
| ultraviolet | `#725CFF` | Secondary accent |
| violet-soft | `#9A88FF` | Secondary (on dark) |
| aurora-mint | `#64F2C1` | Success / supporting accent |
| ice-white | `#F5F8FC` | Primary text |
| primary-dark | `#0A1220` | Text on accent fills |
| muted | `#7C8DA3` | Muted text |

### Semantic tokens
`--color-background`, `--color-surface`, `--color-surface-elevated`,
`--color-primary`, `--color-primary-hover`, `--color-secondary`,
`--color-success`, `--color-warning` (`#F5B04A`), `--color-danger`
(`#FF5C6E`), `--color-text`, `--color-text-muted`, `--color-text-inverted`,
`--color-border`, `--color-border-strong`, `--color-border-accent`,
`--color-border-focus`.

## Typography

- **Display / headings:** Sora (self-hosted via `@fontsource-variable/sora`)
- **Body / UI:** Manrope (self-hosted via `@fontsource-variable/manrope`)
- No remote font CDNs.

Scale tokens (px): `display` 60, `display-lg` 76, `h1` 44, `h2` 32,
`h3` 22, `body-lg` 20, `body` 16, `small` 14, `caption` 12, `label` 12.
Semantic classes: `.type-display` … `.type-label`. Display uses
`-0.02em` tracking; h1 `-0.015em`; h2 `-0.01em`.

## Spacing

4px base rhythm. Section vertical spacing: tight `40/56`, default
`64/96`, wide `80/128` (mobile/desktop). Gutters: `20 / 24 / 32 / 40`
mobile → 3xl. All spacing via Tailwind scale (no arbitrary magic numbers in
components).

## Radius

`sm 6`, `md 10`, `lg 14`, `xl 18`, `2xl 24`, `pill 9999`. Moderate rounding;
avoid making everything giant pills.

## Borders

Thin, precise (1px). `--color-border` (subtle dark), `--color-border-strong`,
`--color-border-light` (for light surfaces), `--color-border-accent` (cyan
tint), `--color-border-focus` (cyan, for focus rings). Prefer borders over
heavy shadows.

## Shadow / glow

`--shadow-card` (elevated cards), `--shadow-modal` (dialogs),
`--glow-cyan`, `--glow-violet` (interactive focus / interactive cards).
Glow is restrained — premium fintech, not neon.

## Motion

See `MOTION.md`. Tokens: `--duration-fast 120ms`, `--duration-base 200ms`,
`--duration-slow 320ms`, `--ease-out cubic-bezier(0.22,1,0.36,1)`.

## Breakpoints

mobile <640, `sm` 640, `md` 768, `lg` 1024, `xl` 1440, `3xl` 1920
(`120rem`). Mobile-first; the shell is designed at every width, not
desktop-first collapsed.

## Containers

`--container-width: 80rem` (1280px). `Container` component applies it with
responsive gutters.

## Accessibility (WCAG 2.2 AA)

- Semantic HTML, one `h1` per page, correct heading order.
- Keyboard navigation for all interactive primitives (roving tabindex on
  tabs; focus management on modal/dropdown).
- Visible focus: global `:focus-visible` cyan outline.
- Labels on every form field; errors wired via `aria-describedby` +
  `role="alert"`.
- Sufficient contrast: ice-white on obsidian; muted text used only for
  non-essential.
- `prefers-reduced-motion` freezes decorative animation globally.
- Skip link to `#main-content`.

## Component rules

- One default export per file matching the filename.
- Prefer server components; mark interactivity with `"use client"`.
- No `any`. No `dangerouslySetInnerHTML`. No inline `style` that a token
  can express. No magic numbers — use spacing/radius/size tokens.
- Reserve `glass` surfaces for overlays; default cards use `surface`.
