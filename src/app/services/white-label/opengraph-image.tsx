import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA WHITE LABEL";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "white label", section: "SERVICES" });
}
