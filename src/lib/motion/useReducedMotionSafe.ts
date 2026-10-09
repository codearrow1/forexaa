"use client";

import { useSyncExternalStore } from "react";

/**
 * Reduced-motion safety (Rule 11/61/65).
 *
 * Every animated component must respect prefers-reduced-motion. This hook
 * provides a single, consistent check using useSyncExternalStore (the
 * React-recommended pattern for media queries). When reduced motion is
 * preferred, animations resolve instantly to their final state — content
 * is never hidden, only the motion is removed.
 */

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Returns motion props that resolve instantly under reduced motion.
 * Use with Motion components: pass `transition={{ duration: reduced ? 0 : 0.35 }}`.
 */
export function reducedMotionTransition(reduced: boolean, duration = 0.35) {
  return { duration: reduced ? 0 : duration };
}
