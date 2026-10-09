import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Brokerage Solutions for Every Business Model";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "Brokerage Solutions for Every Business Model",
    section: "Solutions",
  });
}
