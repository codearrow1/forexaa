"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { SECTION_MENUS } from "@/config/menus";
import { PRIMARY_ACTIONS } from "@/config/navigation";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { MegaMenu } from "@/components/navigation/mega-menu";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";
import type { Theme } from "@/lib/theme";

/**
 * Desktop header with the Phase 3 mega menu (Rule 76) + Phase 4 scroll
 * animation (Rule 50): transparent at top → compact translucent bar on scroll.
 */
export function SiteHeader({ initialTheme }: { initialTheme: Theme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotionSafe();
  const { scrollY } = useScroll();

  // Animate header background opacity + height based on scroll position
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const height = useTransform(scrollY, [0, 100], [64, 56]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const bgColor = useTransform(bgOpacity, (v) => `rgba(7, 17, 31, ${v})`);
  const borderColor = useTransform(borderOpacity, (v) => `rgba(255, 255, 255, ${v * 0.08})`);

  return (
    <motion.header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: bgColor,
        backdropFilter: "blur(12px)",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: borderColor,
        height: reduced ? 64 : height,
      }}
    >
      <div className="mx-auto flex h-full max-w-[var(--container-width)] items-center justify-between px-5 sm:px-6 lg:px-8 3xl:px-10">
        <Link href="/" aria-label="FOREXAA home" className="text-text">
          <Logo />
        </Link>

        {/* Desktop primary navigation (mega menu) */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {SECTION_MENUS.map((menu) => (
              <MegaMenu key={menu.label} menu={menu} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={PRIMARY_ACTIONS.contact.href}
            variant="primary"
            size="sm"
            className="hidden lg:inline-flex"
          >
            {PRIMARY_ACTIONS.contact.label}
          </ButtonLink>

          <ThemeToggle initialTheme={initialTheme} />

          <IconButton
            aria-label="Open navigation menu"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </IconButton>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
}
