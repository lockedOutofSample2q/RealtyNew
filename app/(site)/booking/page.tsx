import type { Metadata } from "next";
import BookingClient from "./BookingClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Consultation | Amritpal Singh Advisory",
  description: "Book a free 15-minute property consultation with Amritpal Singh. A direct answer on any property decision. No sales pitch. No pressure.",
};

export default function BookingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteConfig.url}/booking/#webpage`,
        "url": `${siteConfig.url}/booking`,
        "name": "Book a Consultation | Amritpal Singh Advisory",
        "description": "Book a free 10-minute property consultation with Amritpal Singh. A direct answer on any property decision. No sales pitch. No pressure.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@id": siteConfig.url,
                "name": "Home"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": `${siteConfig.url}/booking`,
                "name": "Booking"
              }
            }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/booking/#service`,
        "name": "10-Minute Property Consultation",
        "description": "Free property consultation with Amritpal Singh",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "provider": {
          "@type": "Person",
          "name": "Amritpal Singh",
          "url": siteConfig.url
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
      <BookingClient />
    </>
  );
}
