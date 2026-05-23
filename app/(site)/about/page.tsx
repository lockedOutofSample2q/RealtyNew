// app/site/about/page.tsx
// ============================================================
// ABOUT PAGE
// Premium architectural layout matching the brand's aesthetic
// ============================================================

import AboutHero from "@/components/sections/AboutHero";
import AboutStats from "@/components/sections/AboutStats";
import AboutText from "@/components/sections/AboutText";
import AboutProcess from "@/components/sections/AboutProcess";
import AboutLeadership from "@/components/sections/AboutLeadership";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About Our Advisory",
  description: "Amritpal Singh brings over 10 years of experience across every side of the real estate transaction in Mohali.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteConfig.url}/about/#webpage`,
        url: `${siteConfig.url}/about`,
        name: "About | The Background No Other Advisor in Mohali Can Claim",
        description: "Amritpal Singh brings over 10 years of experience across every side of the real estate transaction in Mohali.",
        inLanguage: "en-IN"
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/images/og-default.jpg`
        },
        image: `${siteConfig.url}/images/og-default.jpg`,
        description: siteConfig.description,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Phase 8A, E328, Industrial Area, Sector 75",
          addressLocality: "Sahibzada Ajit Singh Nagar",
          addressRegion: "Punjab",
          postalCode: "160055",
          addressCountry: "IN"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 30.697381977888533,
          longitude: 76.69025000982366
        },
        sameAs: Object.values(siteConfig.social)
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/about/#person`,
        name: "Amritpal Singh",
        jobTitle: "Real Estate Advisor",
        description: "Amritpal Singh brings over 10 years of experience across every side of the real estate transaction in Mohali.",
        url: `${siteConfig.url}/about`,
        worksFor: {
          "@id": `${siteConfig.url}/#organization`
        }
      }
    ]
  };

  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutHero />
      <AboutStats />
      <AboutText />
      <AboutProcess />
      <AboutLeadership />
    </div>
  );
}
