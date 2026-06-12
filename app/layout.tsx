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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5Z6V8R4V');`,
          }}
        />
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
                    "postalCode": "160071",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "30.697381977888533", 
                    "longitude": "76.69025000982366"
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
                  "@type": "Person",
                  "@id": "https://www.realtyconsultants.in/#person",
                  "name": "Amritpal Singh",
                  "jobTitle": "Founder & Principal Consultant",
                  "worksFor": { "@id": "https://www.realtyconsultants.in/#organization" },
                  "sameAs": [
                    "https://www.linkedin.com/in/amritpal-singh-29b14795/",
                    "https://www.instagram.com/amritrealty"
                  ]
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Z6V8R4V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZWNKTZ1M1S"
          strategy="afterInteractive"
        />
        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Qm6W5Qeb+IdgA8tRuYFgHQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZWNKTZ1M1S');
          `}
        </Script>
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
    </html>
  );
}
