import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA SOCIAL COPY";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "social copy", section: "SOLUTIONS" });
}
