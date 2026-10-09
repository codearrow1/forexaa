/**
 * Scroll utilities (Rule 80).
 *
 * Thin wrappers around Motion's scroll primitives. Components use these
 * instead of raw window scroll listeners.
 */
"use client";

import { useScroll, useTransform, useInView, useMotionValueEvent, useMotionValue, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Track scroll progress of a ref'd element (0 → 1 as it passes through the
 * viewport). Use for scroll-linked scene progress.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, progress: scrollYProgress };
}

/**
 * Map a scroll progress range to a value range. Returns a MotionValue.
 */
export function useScrollMap(
  progress: MotionValue<number>,
  input: [number, number],
  output: [number, number],
) {
  return useTransform(progress, input, output);
}

/**
 * True once the element has entered the viewport (for one-shot reveals).
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/**
 * Scroll direction: 1 = down, -1 = up, 0 = idle.
 * Uses useMotionValueEvent to track direction changes.
 */
export function useScrollDirection(): MotionValue<number> {
  const { scrollY } = useScroll();
  const direction = useMotionValue(0);
  const prev = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > prev.current) direction.set(1);
    else if (latest < prev.current) direction.set(-1);
    prev.current = latest;
  });

  return direction;
}
