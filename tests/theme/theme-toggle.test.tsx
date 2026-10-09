import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * Theme toggle (Phase 17). The server resolves `fxa_theme` and sets
 * <html data-theme> before hydration, so the control receives `initialTheme`
 * as a prop and must render the correct icon/label on first paint with no
 * effect-driven state sync.
 */
describe("ThemeToggle", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.cookie = "fxa_theme=; path=/; max-age=0";
  });

  it("reports the dark initial theme via its accessible name", () => {
    render(<ThemeToggle initialTheme="dark" />);
    expect(screen.getByRole("button", { name: /Switch to light mode/i })).toBeTruthy();
  });

  it("reports the light initial theme via its accessible name", () => {
    render(<ThemeToggle initialTheme="light" />);
    expect(screen.getByRole("button", { name: /Switch to dark mode/i })).toBeTruthy();
  });

  it("applies the theme to <html> and persists it on toggle", () => {
    render(<ThemeToggle initialTheme="dark" />);
    fireEvent.click(screen.getByRole("button", { name: /Switch to light mode/i }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.cookie).toContain("fxa_theme=light");
    expect(screen.getByRole("button", { name: /Switch to dark mode/i })).toBeTruthy();
  });

  it("toggles back to dark and persists the change", () => {
    render(<ThemeToggle initialTheme="light" />);
    fireEvent.click(screen.getByRole("button", { name: /Switch to dark mode/i }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.cookie).toContain("fxa_theme=dark");
    expect(screen.getByRole("button", { name: /Switch to light mode/i })).toBeTruthy();
  });
});
