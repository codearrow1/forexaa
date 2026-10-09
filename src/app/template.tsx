"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";

/**
 * Route template (Rule 81/82, amended Phase 8).
 *
 * LCP requirement: the SSR HTML must paint the page content at full opacity.
 * A `initial={{ opacity: 0 }}` wrapper is serialized into the HTML as
 * `style="opacity:0"`, which hides the entire `<main>` (including the LCP
 * hero text) until client hydration runs — measured as ~84% of LCP time
 * (render delay) on mobile-throttled Lighthouse runs, and it leaves no-JS
 * users with a blank main. `initial={false}` keeps first paint visible and
 * never gates meaningful content. (Verified: this change does not alter the
 * pre-existing framer-motion hydration behavior on static routes.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
