"use client";

import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import type { Theme } from "@/lib/theme";

/**
 * Theme control. `initialTheme` is resolved on the server from the
 * `fxa_theme` cookie and applied to <html data-theme> before hydration, so
 * the button renders the correct icon/label on first paint (no flash) and
 * hydration stays byte-identical.
 */
export function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      document.cookie = `fxa_theme=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <IconButton aria-label={label} size="sm" onClick={toggle} title={label}>
      {theme === "dark" ? (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </IconButton>
  );
}
