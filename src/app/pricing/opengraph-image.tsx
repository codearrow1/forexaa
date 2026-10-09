import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Pricing";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "FOREXAA Pricing & Plans",
    section: "Pricing",
  });
}
