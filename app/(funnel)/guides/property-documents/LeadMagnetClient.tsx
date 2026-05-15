"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
    try {
      if (searchParams) {
        setUtmParams({
          source: searchParams.get("utm_source") || "direct",
          medium: searchParams.get("utm_medium") || "none",
          campaign: searchParams.get("utm_campaign") || "property_documents_guide",
        });
      }
    } catch (e) {
      console.error("Error parsing UTM params", e);
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
      
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  const router = useRouter();

  if (status === "success") {
    router.push("/guides/property-documents/thank-you");
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        required
        placeholder="e.g. Rajiv Singh"
        className="text-base" // Prevent iOS zoom (Audit Item 13)
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      <Input
        label="Email Address"
        type="email"
        required
        placeholder="email@example.com"
        className="text-base"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
      />
      <Input
        label="WhatsApp Number"
        type="tel"
        required
        placeholder="+91"
        className="text-base"
        value={formData.whatsapp}
        onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
      />
      <Input
        label="City"
        type="text"
        required
        placeholder="Enter your city"
        className="text-base"
        value={formData.city}
        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
      />

      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-600/20" 
          disabled={status === "loading"}
        >
          {status === "loading" ? "Processing..." : "Send Me the Free Checklist →"}
        </Button>
        <p className="text-[11px] text-muted text-center mt-3 font-medium">
          Delivered to your inbox in under 60 seconds. No spam, ever.
        </p>
      </div>
      
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
           <p className="text-sm text-red-600 text-center font-medium">Something went wrong. Please try again or contact us directly.</p>
        </div>
      )}

      <p className="text-[10px] text-muted text-center mt-6 uppercase tracking-widest opacity-60">
        By downloading, you agree to our privacy policy.
      </p>
    </form>
  );
}
