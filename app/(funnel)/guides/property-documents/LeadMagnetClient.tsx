"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LeadMagnetClient() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    whatsapp: "",
    city: "",
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

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

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim()) {
      setValidationError("Name is required.");
      return;
    }
    setValidationError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.whatsapp.trim() || !formData.city.trim()) {
      setValidationError("Please fill out all required fields.");
      return;
    }
    
    setValidationError(null);
    setStatus("loading");

    const fullName = formData.firstName.trim();

    try {
      const response = await fetch("/api/lead-magnets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: "no-email@realtyconsultants.in", // Default placeholder email for schema integrity
          whatsapp: formData.whatsapp,
          city: formData.city,
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
    <div className="w-full relative">
      {/* Step Indicators - Scaled Up Text and Circles */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-300 ${step === 1 ? 'bg-charcoal text-white' : 'bg-charcoal/10 text-charcoal'}`}>1</span>
          <span className="font-mono text-xs tracking-widest uppercase text-charcoal/60 font-bold">Identity</span>
        </div>
        <div className="h-[1px] flex-1 bg-charcoal/15 mx-6"></div>
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-300 ${step === 2 ? 'bg-charcoal text-white' : 'bg-charcoal/10 text-charcoal/40'}`}>2</span>
          <span className="font-mono text-xs tracking-widest uppercase text-charcoal/60 font-bold">Delivery Info</span>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-8 animate-fade-in relative pb-10">
          <div className="text-center sm:text-left mb-8">
            <h3 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">What's your name?</h3>
            <p className="font-body text-sm sm:text-base text-charcoal/50">We personalize every scaling roadmap checklist directly.</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-xs font-mono tracking-widest uppercase text-charcoal/60 font-semibold">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rajiv Singh"
              className="w-full h-14 bg-transparent border-b border-charcoal/20 text-lg sm:text-xl text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors pb-2"
              value={formData.firstName}
              onChange={(e) => {
                setValidationError(null);
                setFormData(prev => ({ ...prev, firstName: e.target.value }));
              }}
            />
          </div>

          {/* Fixed absolute error positioning - does not push elements down */}
          {validationError && (
            <div className="absolute left-0 right-0 bottom-2 text-center h-5">
              <p className="text-xs text-red-500 font-medium">{validationError}</p>
            </div>
          )}

          <div className="pt-6">
            <Button 
              type="button" 
              onClick={handleNextStep}
              className="w-full bg-charcoal text-white hover:bg-charcoal/90 rounded-full h-16 font-mono tracking-widest uppercase text-sm font-bold"
            >
              Next →
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in relative pb-10">
          <div className="text-center sm:text-left mb-8">
            <h3 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">Where should we send it?</h3>
            <p className="font-body text-sm sm:text-base text-charcoal/50">Instant delivery to your WhatsApp.</p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-mono tracking-widest uppercase text-charcoal/60 font-semibold">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  className="w-full h-14 bg-transparent border-b border-charcoal/20 text-lg sm:text-xl text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors pb-2"
                  value={formData.whatsapp}
                  onChange={(e) => {
                    setValidationError(null);
                    setFormData(prev => ({ ...prev, whatsapp: e.target.value }));
                  }}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-mono tracking-widest uppercase text-charcoal/60 font-semibold">Target Investment City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohali"
                  className="w-full h-14 bg-transparent border-b border-charcoal/20 text-lg sm:text-xl text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors pb-2"
                  value={formData.city}
                  onChange={(e) => {
                    setValidationError(null);
                    setFormData(prev => ({ ...prev, city: e.target.value }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* Fixed absolute error positioning - does not push elements down */}
          {validationError && (
            <div className="absolute left-0 right-0 bottom-2 text-center h-5">
              <p className="text-xs text-red-500 font-medium">{validationError}</p>
            </div>
          )}

          {status === "error" && (
            <div className="absolute left-0 right-0 bottom-2 text-center h-5">
               <p className="text-[11px] text-red-600 font-medium">Failed. Check your fields and try again.</p>
            </div>
          )}

          <div className="pt-6 flex flex-col sm:flex-row gap-6">
            <Button 
              type="button" 
              onClick={() => {
                setValidationError(null);
                setStep(1);
              }}
              variant="secondary"
              className="w-full sm:w-1/3 border border-charcoal/20 hover:bg-charcoal/5 rounded-full h-16 font-mono tracking-widest uppercase text-sm font-bold text-charcoal"
              disabled={status === "loading"}
            >
              ← Back
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-2/3 bg-charcoal text-white hover:bg-charcoal/90 rounded-full h-16 font-mono tracking-widest uppercase text-sm font-bold" 
              disabled={status === "loading"}
            >
              {status === "loading" ? "Processing..." : "Get Checklist Instantly →"}
            </Button>
          </div>
        </form>
      )}

      <p className="text-[10px] text-charcoal/40 text-center mt-8 uppercase tracking-widest opacity-60">
        By checking out, you agree to our premium security policies.
      </p>
    </div>
  );
}
