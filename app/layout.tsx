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
  alternates: {
    canonical: "./",
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
        <link rel="preconnect" href="https://*.supabase.co" />
        <link rel="dns-prefetch" href="https://*.supabase.co" />
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
                    "latitude": "30.7028", 
                    "longitude": "76.7111"
                  },
                  "areaServed": [
                    "Mohali", "Banur", "Tepla Road", "Aerocity", "Aerotropolis", "New Chandigarh", "IT City"
                  ],
                  "sameAs": [
                    "https://www.youtube.com/@AmritRealty",
                    "https://www.facebook.com/people/AmritRealty/61587441234909/",
                    "https://www.linkedin.com/company/reality-holding-and-management-consultants",
                    "https://maps.app.goo.gl/H3Bxgv5v6fx3k3mEA",
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
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} overflow-x-hidden font-body`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZWNKTZ1M1S"
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
