import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA TRADERS ROOM";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "traders room", section: "BROKER-TECHNOLOGY" });
}
