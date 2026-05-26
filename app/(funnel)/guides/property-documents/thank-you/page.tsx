"use client";

import { useEffect } from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ThankYouPage() {
  // Trigger file download automatically on page mount
  useEffect(() => {
    try {
      const link = document.createElement("a");
      link.href = "/documents/property-document-checklist.pdf";
      link.setAttribute("download", "property-document-checklist.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Auto download failed:", err);
    }
  }, []);

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 animate-fade-in">
      <div className="container-site max-w-2xl text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl text-charcoal font-medium mb-6">Your Download Has Started!</h1>
        
        <p className="font-body text-lg text-muted mb-10 leading-relaxed">
          The Essential Property Document Checklist is downloading to your device automatically. 
          If your download didn't start, please click the button below to retrieve your file directly.
        </p>

        <div className="mb-10">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
            <a href="/documents/property-document-checklist.pdf" download="property-document-checklist.pdf">
              Download Manually
            </a>
          </Button>
        </div>
        
        <div className="bg-gray-50 border border-black/5 rounded-2xl p-8 mb-10">
          <h3 className="font-body font-bold text-charcoal mb-4 uppercase tracking-widest text-sm">Next Step</h3>
          <p className="font-body text-muted mb-6">
            While you wait, would you like to speak with a Mohali property expert about your search? 
            We offer free 20-minute consultations for serious buyers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}>
                Book Free Consultation
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>

        <p className="font-body text-sm text-muted">
          Need assistance? Check your downloads folder or <a href={`mailto:${siteConfig.contact.email}`} className="text-charcoal underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}
