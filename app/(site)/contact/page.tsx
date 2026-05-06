import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | Amritpal Singh Advisory",
  description: "Speak directly with Amritpal Singh, property advisor at Phase 8A, E328, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055. No gatekeeping. No pitch. A direct answer to your property question.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteConfig.url}/contact/#webpage`,
        "url": `${siteConfig.url}/contact`,
        "name": "Contact Us | Amritpal Singh Advisory",
        "description": "Speak directly with Amritpal Singh, property advisor at Phase 8A, E328, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055. No gatekeeping. No pitch. A direct answer to your property question.",
        "inLanguage": "en-IN",
        "isPartOf": {
          "@id": `${siteConfig.url}/#website`
        }
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/images/og-default.jpg`,
        "image": `${siteConfig.url}/images/og-default.jpg`,
        "description": siteConfig.description,
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Phase 8A, E328, Industrial Area, Sector 75",
          "addressLocality": "Sahibzada Ajit Singh Nagar",
          "addressRegion": "Punjab",
          "postalCode": "160055",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.6975981",
          "longitude": "76.6903303"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": siteConfig.contact.phone,
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi", "Punjabi"]
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
