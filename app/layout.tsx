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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://*.supabase.co" />
        <link rel="preconnect" href="https://imagedelivery.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://*.supabase.co" />
        {/* Cloudflare Web Analytics — paste your token below */}
        {/* <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN"}'></script> */}
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} overflow-x-hidden font-body`}>
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
