import { ImageResponse } from "next/og";

/**
 * OG/social image generator (Rule 36), framework-native via next/og.
 *
 * Content-aware: each route passes its own title + section label, so the
 * generated card is NOT one identical image for the whole site.
 *
 * Visual identity: Aurora Terminal (obsidian base + cyan/violet glow +
 * market-grid accent). No external fonts or assets are fetched.
 */
export const ogSize = { width: 1200, height: 630 } as const;

export async function forexaaOgImage(opts: {
  title: string;
  section?: string;
}): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#07111F",
          color: "#F5F8FC",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Geist, sans-serif",
        }}
      >
        {/* soft glows */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(32,216,232,0.28) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(114,92,255,0.24) 0%, transparent 70%)",
          }}
        />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1px solid rgba(32,216,232,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#20D8E8",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "tight" }}>FOREXAA</div>
        </div>

        {/* content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          {opts.section ? (
            <div style={{ fontSize: 20, letterSpacing: "0.18em", color: "#20D8E8", fontWeight: 600 }}>
              {opts.section.toUpperCase()}
            </div>
          ) : null}
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginTop: 16, maxWidth: 900 }}>
            {opts.title}
          </div>
          <div style={{ fontSize: 26, color: "#7C8DA3", marginTop: 20 }}>
            The Technology Behind Modern Brokerages
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#7C8DA3",
            position: "relative",
          }}
        >
          <span>forexaa.com</span>
          <span>Aurora Terminal</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      headers: { "content-type": "image/png" },
    },
  );
}
