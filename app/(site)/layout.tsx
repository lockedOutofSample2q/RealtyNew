// app/site/layout.tsx
// ============================================================
// PUBLIC SITE LAYOUT
// Wraps all public-facing pages with Navbar + Footer
// ============================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: siteConfig.name,
    image: `${siteConfig.url}/images/og-default.jpg`,
    "@id": `${siteConfig.url}/#organization`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Mohali",
      addressRegion: "Punjab",
      postalCode: "160055",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.7046,
      longitude: 76.7179
    },
    areaServed: ["Mohali", "Chandigarh", "Panchkula"],
    knowsAbout: ["JLPL properties", "Sector 66A Mohali", "Luxury Real Estate", "Real Estate Advisory"],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.youtube
    ]
  };

  return (
    <HeaderProvider>
      <CurrencyProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <Suspense fallback={<div className="h-[var(--nav-height)] bg-white w-full border-b border-black/6"></div>}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </CurrencyProvider>
    </HeaderProvider>
  );
}
