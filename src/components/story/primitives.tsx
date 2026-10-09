"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";

/**
 * Storytelling primitives (Rule 12). Composable scene components that keep
 * the cinematic narrative consistent across the site.
 * Phase 13: dead primitives removed (StorySection, StoryScene, StickyScene,
 * SceneProgress) — ScrollScene is the site-wide motion primitive.
 */

/** Scroll-triggered scene: children animate in as they enter the viewport. */
export function ScrollScene({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0 : DURATION.standard, delay, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
