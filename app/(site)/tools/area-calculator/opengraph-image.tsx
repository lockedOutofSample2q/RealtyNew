// app/(site)/tools/area-calculator/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Punjab Land Area Calculator Hub";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "2px", color: "#C9A84C" }}>
            REALTY HOLDING & MANAGEMENT CONSULTANTS
          </div>
          <div style={{ fontSize: "14px", color: "#888888", textTransform: "uppercase" }}>
            Official Free Tool
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: "1.1",
              color: "#FFFFFF",
            }}
          >
            PUNJAB LAND AREA CALCULATOR
          </div>
          <div style={{ fontSize: "24px", color: "#AAAAAA", maxWidth: "900px" }}>
            1 MARLA = 272.25 SQ FT | 1 KANAL = 5,445 SQ FT | 1 BIGHA = 21,780 SQ FT
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #333333",
            paddingTop: "20px",
            fontSize: "16px",
            color: "#666666",
          }}
        >
          <div>All 6 Punjab Measurement Systems Sourced from Land Records Manual 2004</div>
          <div style={{ color: "#C9A84C", fontWeight: "600" }}>realtyconsultants.in</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
