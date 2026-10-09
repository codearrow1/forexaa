import { GridBackground, GlowField } from "@/components/marketing/market-grid";

/**
 * Global premium background: obsidian base + subtle grid + one very soft
 * cyan glow (top) + one very soft violet glow (lower-right).
 * Deliberately restrained (Rule 20: luxury institutional fintech,
 * not cyberpunk).
 */
export function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <GridBackground />
      <GlowField color="cyan" position="top" size={640} opacity={0.32} />
      <GlowField color="violet" position="right" size={520} opacity={0.2} className="top-[55%]" />
    </div>
  );
}
