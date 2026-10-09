import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export async function getServerTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("fxa_theme")?.value;
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return "dark";
}
