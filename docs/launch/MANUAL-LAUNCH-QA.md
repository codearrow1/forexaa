# MANUAL LAUNCH QA

Owner-performed checks that automation cannot fully cover. This checklist is
the deliverable; it does not claim the checks have occurred.

## Desktop (1280, 1440, 1920)

- [ ] Header: logo, nav, mega menu, Book a Demo CTA
- [ ] Mega menu opens on hover/focus, closes on Escape
- [ ] Hero: headline, sub-copy, CTAs render and are legible
- [ ] All CTAs navigate correctly
- [ ] Forms: focus states, error states, success state
- [ ] Footer: columns, legal links, copyright
- [ ] No horizontal overflow
- [ ] Animations feel smooth, not janky

## Mobile (375, 390, 430)

- [ ] Header: hamburger, logo
- [ ] Mobile drawer opens, focus moves inside, Escape closes
- [ ] Hero: headline wraps, CTAs are tappable
- [ ] No horizontal overflow
- [ ] Forms: inputs are usable, keyboard does not overlap
- [ ] Footer: columns stack, links are tappable

## Tablet (768, 1024)

- [ ] Header adapts (hamburger or full nav)
- [ ] Hero and CTAs render correctly
- [ ] No horizontal overflow
- [ ] Forms usable

## Interaction

- [ ] Tab navigation moves through all interactive elements in order
- [ ] Focus is always visible
- [ ] Hover states work on CTAs and links
- [ ] Reduced motion: content visible, no essential motion
- [ ] Drawer/mega menu: open, close, Escape, focus return

## Real devices (owner)

- [ ] iOS Safari (latest)
- [ ] Android Chrome (latest)
- [ ] Desktop Chrome (latest)
- [ ] Touch interaction (tap targets, no accidental zoom)
- [ ] Typography renders correctly (Sora + Manrope)

## Explicitly NOT verified by automation

- Visual polish / animation feel
- Real-device rendering (Safari/Chrome on physical hardware)
- Touch interaction quality
- Hover-state aesthetics
