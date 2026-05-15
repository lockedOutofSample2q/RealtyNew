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
    <div className="bg-white text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-site py-12 md:py-20 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
        
        {/* Left Side: Teaser Content */}
        <div className="flex-1 space-y-8 animate-fade-up">
          <div className="space-y-4">
            <span className="font-mono text-sm tracking-widest uppercase text-black/50">Free Exclusive Guide</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-tight">
              The Essential Property <br className="hidden md:block" />
              Document Checklist
            </h1>
            <p className="font-body text-lg text-muted max-w-xl leading-relaxed">
              Don’t risk your life savings. We’ve compiled the definitive list of 15+ crucial legal and financial documents you must inspect before buying any property.
            </p>
          </div>

          {/* Visual Mockup - Added as per Audit Item 8 */}
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-black/5">
             <Image 
               src="/assets/images/guides/checklist-mockup.png" 
               alt="Property Checklist Mockup" 
               fill 
               className="object-cover"
             />
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="font-body font-semibold text-lg uppercase tracking-widest text-charcoal/90">Inside the Guide:</h3>
            <ul className="space-y-4">
              {[
                "Title Deed Verification Basics",
                "Encumbrance Certificate Checks",
                "Approved Building Plans & RERA",
                "Tax Receipts & NO Objection Certificates",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-muted font-body">
                  <div className="w-1.5 h-1.5 rounded-full bg-charcoal mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Updated Testimonial - As per Audit Item 10 */}
          <div className="p-8 bg-gray-50 border border-black/5 rounded-2xl max-w-xl relative">
             <div className="absolute -top-4 left-8 w-8 h-8 bg-white border border-black/5 flex items-center justify-center rounded-full shadow-sm">
                <span className="text-xl font-display leading-none mt-2">"</span>
             </div>
             <p className="font-body text-base text-muted italic leading-relaxed">
               "Used this checklist before buying our flat in Sector 82 — it flagged a missing NOC that would have cost us lakhs in legal fees. Saved our investment." 
               <br/>
               <span className="text-charcoal font-semibold not-italic mt-4 block">— Rajiv S., Sector 82 flat buyer</span>
             </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[460px] shrink-0 animate-fade-up border border-border bg-white shadow-2xl rounded-[32px] overflow-hidden lg:sticky lg:top-12">
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              {/* Social Proof - Added as per Audit Item 11 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <span className="text-[11px] font-body font-bold text-emerald-600 uppercase tracking-wider">
                  Downloaded by 1,400+ Buyers
                </span>
              </div>
              
              <h2 className="font-display text-3xl text-charcoal font-medium mb-3">Download the PDF</h2>
              <p className="font-body text-sm text-muted">Enter your details below for instant access to the 15+ point legal checklist.</p>
            </div>
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted font-body text-sm italic animate-pulse">Initializing secure form...</div>}>
              <LeadMagnetClient />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
