import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — The Technology Behind Modern Brokerages";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "The Technology Behind Modern Brokerages" });
}
