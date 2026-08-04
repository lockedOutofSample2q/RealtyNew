// app/(site)/tools/area-calculator/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getAreaPageContent } from "@/content/area-calculator";

export const runtime = "nodejs";
export const alt = "Punjab Land Area Calculator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const content = getAreaPageContent(resolvedParams.slug);

  const headline = content?.title.split("|")[0].trim() || "PUNJAB LAND AREA CALCULATOR";

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
            Land Calculator Tool
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "800",
              lineHeight: "1.15",
              color: "#FFFFFF",
              maxWidth: "1000px",
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: "22px", color: "#AAAAAA", maxWidth: "900px" }}>
            {content?.answerBlock || "Free Revenue Measurement Converter & Disambiguation Guide for Punjab"}
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
          <div>Mohali | Rajpura | Patiala | Jalandhar | Amritsar | Ludhiana</div>
          <div style={{ color: "#C9A84C", fontWeight: "600" }}>realtyconsultants.in</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
