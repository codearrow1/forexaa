/**
 * Motion design tokens (Rule 8).
 *
 * Animation durations + easings are centralized here. Components never
 * invent timing values — they reference these tokens.
 */

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  standard: 0.35,
  slow: 0.6,
  cinematic: 1.2,
} as const;

export const EASE = {
  /** Standard ease-out — the default for entrances. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Soft ease-in-out — for state changes. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Sharp ease-out — for quick UI feedback. */
  sharp: [0.4, 0, 0.2, 1] as const,
  /** Gentle spring-like — for organic motion. */
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export type Duration = keyof typeof DURATION;
export type Ease = keyof typeof EASE;
