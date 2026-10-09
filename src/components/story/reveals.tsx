"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";

/**
 * Reveal effects (Rule 57). One major reveal per scene — not every element.
 * Phase 13: dead reveals removed (ImageReveal, TextReveal, LayeredParallax).
 */

type RevealType = "clip" | "mask" | "scale" | "slide" | "fade-blur";

export function VisualReveal({
  children,
  type = "clip",
  className,
  delay = 0,
}: {
  children: ReactNode;
  type?: RevealType;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotionSafe();

  const variants = {
    clip: {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: { clipPath: "inset(0 0% 0 0)" },
    },
    mask: {
      hidden: { maskImage: "linear-gradient(to right, black 0%, transparent 0%)" },
      visible: { maskImage: "linear-gradient(to right, black 100%, transparent 100%)" },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-blur": {
      hidden: { opacity: 0, filter: "blur(8px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  } as const;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants[type]}
      transition={{ duration: reduced ? 0 : DURATION.slow, delay, ease: EASE.inOut }}
    >
      {children}
    </motion.div>
  );
}
