// app/(site)/tools/area-calculator/page.tsx
import { Metadata } from "next";
import { hubContent } from "@/content/area-calculator";
import { AreaCalculatorView } from "@/components/tools/area-calculator/AreaCalculatorView";

export const metadata: Metadata = {
  title: "Punjab Land Area Calculator | Marla, Kanal, Bigha Converter",
  description: "Free land area calculator for Punjab & Tricity. Convert marla, kanal, bigha, gaj, killa, and acre across all six regional revenue standards.",
  alternates: {
    canonical: "https://www.realtyconsultants.in/tools/area-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Realty Holding & Management Consultants",
    title: "Punjab Land Area Calculator | Marla, Kanal, Bigha Converter",
    description: "Free land area calculator for Punjab & Tricity. Convert marla, kanal, bigha, gaj, killa, and acre across all six regional revenue standards.",
    url: "https://www.realtyconsultants.in/tools/area-calculator",
    images: [{ url: "https://www.realtyconsultants.in/tools/area-calculator/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Punjab Land Area Calculator | Marla, Kanal, Bigha Converter",
    description: "Free land area calculator for Punjab & Tricity. Convert marla, kanal, bigha, gaj, killa, and acre across all six regional revenue standards.",
    images: ["https://www.realtyconsultants.in/tools/area-calculator/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function AreaCalculatorHubPage() {
  return <AreaCalculatorView content={hubContent} />;
}
