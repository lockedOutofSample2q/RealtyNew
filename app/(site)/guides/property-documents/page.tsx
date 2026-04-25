import { Suspense } from "react";
import { Metadata } from "next";
import LeadMagnetClient from "./LeadMagnetClient";

export const metadata: Metadata = {
  title: "Documents to Check Before Buying a Property | Monter",
  description: "Download our exclusive checklist of legal and financial documents you must verify before purchasing real estate.",
};

export default function PropertyDocumentsPage() {
  return (
    <div className="min-h-screen bg-white text-charcoal pt-[var(--nav-height)]">
      <div className="container-site py-section flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
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

          <div className="space-y-6">
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
          
          <div className="p-6 bg-black/5 border border-black/10 rounded-xl max-w-xl">
             <p className="font-body text-sm text-muted italic">
               "This simple checklist saved me from buying a disputed property. A must-have for every buyer." 
               <br/>
               <span className="text-charcoal/60 mt-1 inline-block font-normal not-italic">— Verified Buyer</span>
             </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[440px] shrink-0 animate-fade-up border border-border bg-white shadow-card rounded-[24px] sticky top-32" style={{ animationDelay: "0.2s" }}>
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="font-display text-3xl text-charcoal font-medium mb-3">Download the PDF</h2>
              <p className="font-body text-sm text-muted">Enter your details to receive immediate access to the checklist.</p>
            </div>
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading form...</div>}>
              <LeadMagnetClient />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
