"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LeadMagnetClient() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // UTM Tracking
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (searchParams) {
      setUtmParams({
        source: searchParams.get("utm_source") || "direct",
        medium: searchParams.get("utm_medium") || "none",
        campaign: searchParams.get("utm_campaign") || "property_documents_guide",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/lead-magnets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "Property Documents Checklist PDF",
          metadata: utmParams,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      
      // We would ideally trigger the file download here
      // const link = document.createElement("a");
      // link.href = "/assets/documents-checklist.pdf";
      // link.download = "Property-Documents-Checklist.pdf";
      // link.click();
      
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-charcoal font-medium mb-2">Check your email!</h3>
        <p className="font-body text-sm text-muted mb-6">
          We've sent the PDF guide to {formData.email}.
        </p>
        <Button 
          variant="secondary" 
          className="w-full"
          onClick={() => window.open('/assets/Property-Documents-Checklist.pdf', '_blank')}
        >
          Download PDF Now
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Full Name"
        type="text"
        required
        placeholder="Enter your full name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      <Input
        label="Email Address"
        type="email"
        required
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
      />
      <Input
        label="WhatsApp Number"
        type="tel"
        required
        placeholder="Enter your WhatsApp number"
        value={formData.whatsapp}
        onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
      />
      <Input
        label="City"
        type="text"
        required
        placeholder="Enter your city"
        value={formData.city}
        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
      />

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full mt-4" 
        disabled={status === "loading"}
      >
        {status === "loading" ? "Processing..." : "Get the Free Guide"}
      </Button>
      
      {status === "error" && (
        <p className="text-sm text-red-600 mt-2 text-center">Something went wrong. Please try again.</p>
      )}

      <p className="text-[11px] text-muted text-center mt-4 uppercase tracking-wider">
        By downloading, you agree to our privacy policy.
      </p>
    </form>
  );
}
