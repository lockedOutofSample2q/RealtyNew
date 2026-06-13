// app/layout.tsx
// ============================================================
// ROOT LAYOUT — wraps every page on the site
// EDIT: Add global providers (analytics, etc.) here
// ============================================================

import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import { seoDefaults, siteConfig } from "@/config/site";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoDefaults.defaultTitle,
    template: seoDefaults.titleTemplate,
  },
  description: seoDefaults.description,
  openGraph: seoDefaults.openGraph as Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.defaultTitle,
    description: seoDefaults.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

async function fetchRating() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID; // Operator needs to set this in Vercel
  
  const fallback = { ratingValue: 4.9, reviewCount: 125 }; // User's requested defaults
  if (!apiKey || !placeId) return fallback;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 604800 } } // 1 week cache
    );
    const data = await res.json();
    if (data?.result?.rating && data?.result?.user_ratings_total) {
      return {
        ratingValue: data.result.rating,
        reviewCount: data.result.user_ratings_total
      };
    }
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
  }
  return fallback;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ratingData = await fetchRating();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://*.supabase.co" />
        <link rel="dns-prefetch" href="https://*.supabase.co" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "RealEstateAgent",
                  "@id": "https://www.realtyconsultants.in/#organization",
                  "name": "Realty Holding and Management Consultants",
                  "url": "https://www.realtyconsultants.in/",
                  "telephone": "+91-7814613916",
                  "logo": "https://www.realtyconsultants.in/assets/logo-dark-theme.svg",
                  "image": "https://www.realtyconsultants.in/assets/logo-dark-theme.svg",
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
                    "latitude": "30.697381977888533", 
                    "longitude": "76.69025000982366"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": ratingData.ratingValue.toString(),
                    "reviewCount": ratingData.reviewCount.toString(),
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "areaServed": [
                    "Mohali", "Banur", "Tepla Road", "Aerocity", "Aerotropolis", "New Chandigarh", "IT City"
                  ],
                  "sameAs": [
                    "https://www.youtube.com/@AmritRealty",
                    "https://www.facebook.com/people/AmritRealty/61587441234909/",
                    "https://www.linkedin.com/company/reality-holding-and-management-consultants",
                    "https://maps.app.goo.gl/3xNnTgRUkC5eKcRG6",
                    "https://wa.me/917814613916"
                  ],
                  "member": {
                    "@id": "https://www.realtyconsultants.in/#person"
                  }
                },
                {
                  "@type": "Service",
                  "@id": "https://www.realtyconsultants.in/#service",
                  "name": "Luxury Real Estate Consulting in Mohali",
                  "provider": { "@id": "https://www.realtyconsultants.in/#organization" },
                  "areaServed": {
                    "@type": "City",
                    "name": "Mohali"
                  },
                  "description": "Premium real estate consulting, NRI property advisory, and land investment services in Mohali, Punjab."
                },
                {
                  "@type": "Person",
                  "@id": "https://www.realtyconsultants.in/#person",
                  "name": "Amritpal Singh",
                  "jobTitle": "Founder & Principal Consultant",
                  "worksFor": { "@id": "https://www.realtyconsultants.in/#organization" },
                  "sameAs": [
                    "https://www.linkedin.com/in/amritpal-singh-29b14795/",
                    "https://www.instagram.com/amritrealty"
                  ],
                  "description": "Amritpal Singh is the Founder and Principal Consultant at Realty Holding & Management Consultants. With over a decade of hands-on experience navigating the Punjab real estate market, he has successfully facilitated over INR 84 Crores in secure, high-yield property transactions. Specializing in NRI advisory, land acquisition reinvestments, and luxury residential assets in Mohali, Amritpal is known for his data-driven, radically transparent approach to real estate consulting."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.realtyconsultants.in/#website",
                  "url": "https://www.realtyconsultants.in/",
                  "name": "Realty Holding & Management Consultants",
                  "description": "Mohali's non-conventional real estate consultancy. Luxury investments.",
                  "publisher": {
                    "@id": "https://www.realtyconsultants.in/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.realtyconsultants.in/properties?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} overflow-x-hidden font-body`}>
        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Qm6W5Qeb+IdgA8tRuYFgHQ"
          strategy="afterInteractive"
        />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#141414",
              border: "1px solid rgba(201, 168, 76, 0.2)",
              color: "#F5F0E8",
            },
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-ZWNKTZ1M1S" />
      <GoogleTagManager gtmId="GTM-5Z6V8R4V" />
    </html>
  );
}
