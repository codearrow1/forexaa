/**
 * Reusable animation variants (Rule 8/9).
 *
 * Variants communicate hierarchy, depth and cause/effect — never mere
 * decoration. All use transform/opacity (GPU-friendly, Rule 10).
 */
import type { Variants } from "motion/react";
import { DURATION, EASE } from "./transitions";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.standard, ease: EASE.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.standard, ease: EASE.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.standard, ease: EASE.out },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.standard, ease: EASE.out },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.standard, ease: EASE.out },
  },
};

/** Stagger container — children animate in sequence (Rule 91). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
};

/** Word-by-word hero entrance (Rule 58). */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
};

/** Line reveal — for section labels. */
export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/** Clip-path reveal — for images (Rule 57). */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: DURATION.slow, ease: EASE.inOut },
  },
};

/** Mask reveal — for images. */
export const maskReveal: Variants = {
  hidden: { maskImage: "linear-gradient(to right, black 0%, transparent 0%)" },
  visible: {
    maskImage: "linear-gradient(to right, black 100%, transparent 100%)",
    transition: { duration: DURATION.slow, ease: EASE.inOut },
  },
};

/** Node connection — for architecture diagrams. */
export const nodeConnect: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.standard, ease: EASE.spring },
  },
};

/** Data flow — for liquidity/connection lines. */
export const dataFlow: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: DURATION.cinematic, ease: EASE.inOut },
  },
};
