import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Resources";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "Brokerage Knowledge & Resources",
    section: "Resources",
  });
}
