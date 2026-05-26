import { Metadata } from "next";
import LeadMagnetClient from "./LeadMagnetClient";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import Image from "next/image";

const PAGE_URL = `${siteConfig.url}/guides/property-documents`;

export const metadata: Metadata = {
  title: "Free Property Document Checklist | Realty Consultants Mohali",
  description: "Download our exclusive checklist of 15+ legal and financial documents you must verify before purchasing real estate in Mohali.",
  openGraph: {
    title: "Free Property Document Checklist | Realty Consultants Mohali",
    description: "Download our exclusive checklist of 15+ legal and financial documents you must verify before purchasing real estate in Mohali.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/assets/images/guides/checklist-mockup.png`,
        width: 1200,
        height: 630,
        alt: "The Essential Property Document Checklist Mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Property Document Checklist — Mohali",
    description: "Download our exclusive list of 15+ legal and financial documents you must verify before buying any property in Mohali.",
    images: [`${siteConfig.url}/assets/images/guides/checklist-mockup.png`],
  },
};

export default function PropertyDocumentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "@id": `${PAGE_URL}#book`,
        "name": "The Essential Property Document Checklist",
        "description": "The definitive list of 15+ crucial legal and financial documents you must inspect before buying any property.",
        "bookFormat": "https://schema.org/EBook",
        "isAccessibleForFree": true,
        "author": {
          "@type": "Organization",
          "name": siteConfig.name
        },
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Rajiv S."
          },
          "reviewBody": "Used this checklist before buying our flat in Sector 82 — it flagged a missing NOC that would have cost us lakhs in legal fees. Saved our investment."
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides",
            "item": `${siteConfig.url}/guides`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Property Document Checklist",
            "item": PAGE_URL
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#FAF9F5] text-charcoal min-h-[calc(100vh-80px)] flex items-start justify-center overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1-Frame Funnel Landing Layout - Fine Tuned Padding for Zero-Scroll Viewport fit */}
      <div className="container-site py-2 md:py-3 max-w-7xl w-full flex flex-col justify-between h-full min-h-[78vh] mt-6">
        
        {/* Header Title Section - Scaled Up Elements with minimal bottom margin and Bolder Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-2 mb-2 animate-fade-up shrink-0">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-charcoal/50 font-bold">
            Free Exclusive Access
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-charcoal">
            Get Your Free Essential Property Document Checklist
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-charcoal/60 max-w-xl mx-auto leading-relaxed">
            Secure the definitive 15+ point legal and financial framework to verify any property in Mohali.
          </p>
        </div>

        {/* Dynamic 2-Column Split - Optimized Grid gap for 1-Frame fit with push-down mt-12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center my-auto w-full animate-fade-up max-w-6xl mx-auto px-4 mt-8">
          
          {/* Left Column: Visual Mockup Frame with Testimonial Card */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center relative space-y-4">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-charcoal/10 bg-white z-10 transition-transform duration-500 hover:scale-[1.02]">
              <Image 
                src="/assets/images/guides/checklist-mockup.png" 
                alt="Property Checklist Mockup" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            {/* Visual background layers representing visual checklist snippets */}
            <div className="absolute left-[-5%] w-[52%] aspect-[4/3] bg-charcoal/95 border border-white/10 rounded-3xl shadow-2xl -rotate-6 scale-95 opacity-10 hidden sm:block pointer-events-none"></div>
            <div className="absolute right-[-5%] w-[52%] aspect-[4/3] bg-charcoal/95 border border-white/10 rounded-3xl shadow-2xl rotate-6 scale-95 opacity-10 hidden sm:block pointer-events-none"></div>

            {/* Testimonial Card Overlay */}
            <div className="w-full max-w-lg p-4 bg-charcoal/5 border border-charcoal/10 rounded-2xl text-left hidden lg:block">
              <p className="font-display text-sm text-charcoal italic leading-relaxed">
                "I vetted this list with my lawyer. It flagged a missing RERA extension detail that saved our entire family investment. Highly recommend."
              </p>
              <div className="font-mono text-[9px] tracking-wider text-charcoal/50 uppercase mt-2">
                — Rajiv S., Mohali Apartment Owner
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Checkout - Floating Seamlessly */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto shrink-0">
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted font-body text-sm italic animate-pulse">Initializing...</div>}>
              <LeadMagnetClient />
            </Suspense>
          </div>

        </div>

        {/* Footer High-Conversion Trust Links */}
        <div className="w-full border-t border-charcoal/10 pt-4 flex flex-row items-center justify-center gap-6 sm:gap-12 text-center text-xs font-mono tracking-widest text-charcoal/40 uppercase shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-base">✨</span>
            <span>Get Checklist in 30 Seconds</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">🌟</span>
            <span>Trusted by 1,400+ Buyers</span>
          </div>
        </div>

        {/* Hidden SEO Contextual Section - Optimized for real estate search queries & GPT semantic indexes */}
        <div className="sr-only" aria-hidden="true">
          <h2>Common Real Estate Document Verification Problems Solved by this Checklist</h2>
          <p>
            Are you wondering how to check if a property has a clear title or how to spot property title defects in Mohali? Many home buyers ask Google and ChatGPT questions like "how to prevent double selling fraud in Punjab real estate", "how to verify a developer's RERA registration number", and "what documents are required for GMADA plot transfer". This free property documents checklist addresses crucial land record verifications, encumbrance certificate (EC) timelines, and title deed history checks.
          </p>
          <p>
            Our legal verification guide helps you identify hidden financial liabilities, municipal tax outstanding issues, unpaid developer mortgages, and missing No Objection Certificates (NOC). Avoid illegal unauthorized construction, verify layout plan approvals, and discover building completion certificate (CC) and occupancy certificate (OC) discrepancies before paying booking amounts in Tricity projects.
          </p>
          <p>
            Key topics solved: seller impersonation fraud, power of attorney (PoA) validation steps in Punjab, boundary survey disputes, chain of ownership tracking for 30 years, and sub-registrar office registration checks.
          </p>
        </div>

      </div>
    </div>
  );
}
