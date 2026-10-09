"use client";

import { useEffect } from "react";

export function ThemeController({ initialTheme }: { initialTheme: "light" | "dark" }) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", initialTheme);
    try {
      document.cookie = `fxa_theme=${initialTheme}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
  }, [initialTheme]);

  return null;
}
