import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * Vitest global setup.
 *
 * - Registers @testing-library/react cleanup after every test.
 * - Polyfills window.matchMedia (jsdom doesn't implement it).
 * - Mocks motion/react so components render their children in jsdom
 *   (motion uses browser APIs that jsdom doesn't support).
 */

// Polyfill matchMedia
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Mock motion/react — render children directly, skip animation
vi.mock("motion/react", () => {
  const make = (tag: string) => {
    const Component = React.forwardRef(
      (props: Record<string, unknown>, ref: React.Ref<unknown>) => {
        const {
          initial: _initial,
          animate: _animate,
          exit: _exit,
          whileInView: _whileInView,
          whileHover: _whileHover,
          whileTap: _whileTap,
          whileFocus: _whileFocus,
          whileDrag: _whileDrag,
          layout: _layout,
          layoutId: _layoutId,
          transition: _transition,
          variants: _variants,
          viewport: _viewport,
          ...rest
        } = props;
        return React.createElement(tag, { ...rest, ref }, props.children as React.ReactNode);
      },
    );
    Component.displayName = `Motion(${tag})`;
    return Component;
  };

  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        if (prop === "default") return motion;
        return make(prop);
      },
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({
      scrollYProgress: { current: 0, get: () => 0, set: () => {} },
    }),
    useTransform: () => ({ current: 0, get: () => 0, set: () => {} }),
    useInView: () => true,
    useMotionValue: () => ({ current: 0, get: () => 0, set: () => {} }),
    useMotionValueEvent: () => {},
    useSpring: () => ({ current: 0, get: () => 0, set: () => {} }),
    useAnimation: () => ({ start: () => {}, stop: () => {}, set: () => {} }),
    useAnimate: () => [null, () => {}],
    useReducedMotion: () => false,
    useWillChange: () => {},
    useVelocity: () => ({ current: 0, get: () => 0, set: () => {} }),
    useTime: () => ({ current: 0, get: () => 0, set: () => {} }),
    useAnimationFrame: () => {},
    useCycle: () => [0, () => {}],
    useElementScroll: () => ({
      scrollY: { current: 0, get: () => 0, set: () => {} },
    }),
    usePageScroll: () => ({
      scrollY: { current: 0, get: () => 0, set: () => {} },
    }),
    useScrollTimeline: () => ({ currentTime: null }),
    useViewTimeline: () => ({ currentTime: null }),
    useDragControls: () => ({ start: () => {} }),
    usePresence: () => [true, () => {}],
    useIsPresent: () => true,
  };
});

afterEach(() => {
  cleanup();
});
