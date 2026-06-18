"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const COUNTRY_CODES = [
  { code: "+91",  label: "🇮🇳 +91" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+44",  label: "🇬🇧 +44" },
  { code: "+1",   label: "🇺🇸 +1" },
  { code: "+1-CA", label: "🇨🇦 +1" },
  { code: "+61",  label: "🇦🇺 +61" },
  { code: "+33",  label: "🇫🇷 +33" },
  { code: "+49",  label: "🇩🇪 +49" },
  { code: "+65",  label: "🇸🇬 +65" },
];

export interface LeadPopupProps {
  type: "blog" | "property";
  propertyTitle?: string;
  propertyId?: string;
  image?: string;
}

export default function LeadPopup({ type, propertyTitle, propertyId, image }: LeadPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user already submitted within the last 15 days
    const expiry = localStorage.getItem("lead_captured_expiry");
    if (expiry && Date.now() < parseInt(expiry)) {
      return; // Do not show
    }

    // Track property views in localStorage
    if (type === "property" && propertyTitle) {
      const viewedStr = localStorage.getItem("viewed_properties");
      let viewed = viewedStr ? JSON.parse(viewedStr) : [];
      if (!viewed.includes(propertyTitle)) {
        viewed.push(propertyTitle);
        // Keep last 20 to avoid massive localstorage
        if (viewed.length > 20) viewed.shift();
        localStorage.setItem("viewed_properties", JSON.stringify(viewed));
      }
    }

    // Initial timer
    const delay = type === "blog" ? 20000 : 10000;
    let timer = setTimeout(() => setIsOpen(true), delay);

    return () => clearTimeout(timer);
  }, [type, propertyTitle]);

  const handleClose = () => {
    setIsOpen(false);
    // If closed (unfilled), trigger again in 60 seconds
    setTimeout(() => {
      // Re-check expiry just in case they filled it in another tab
      const expiry = localStorage.getItem("lead_captured_expiry");
      if (!expiry || Date.now() > parseInt(expiry)) {
        setIsOpen(true);
      }
    }, 60000);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    const fd = new FormData(e.currentTarget);
    const phone = `${countryCode} ${fd.get("phone_number")}`;
    
    let message = "";
    if (type === "property") {
      const viewedStr = localStorage.getItem("viewed_properties");
      const viewed = viewedStr ? JSON.parse(viewedStr) : [];
      message = `Requested quote for: ${propertyTitle}.\n\nOther properties viewed recently:\n${viewed.join("\n")}`;
    } else {
      message = `Requested Buyer's Due Diligence guide from Blog.`;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone,
          source: type === "property" ? "property_popup" : "blog_popup",
          property_id: propertyId,
          message,
        }),
      });
      
      if (res.ok) {
        setStatus("success");
        // Store 15 day expiry
        localStorage.setItem("lead_captured_expiry", (Date.now() + 15 * 24 * 60 * 60 * 1000).toString());
        // Close modal after short delay
        setTimeout(() => setIsOpen(false), 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!isClient || !isOpen) return null;

  const inputClass = "w-full border border-black/10 rounded-xl px-3 py-2.5 text-[13px] text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 bg-[#f9f9f9] transition-colors";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {type === "property" && image && (
          <div className="w-full h-40 mb-6 rounded-2xl overflow-hidden relative border border-black/5">
            <Image src={image} alt={propertyTitle || "Property"} fill className="object-cover" />
          </div>
        )}

        <div className="mb-6">
          {type === "blog" ? (
            <>
              <h3 className="text-2xl font-display font-semibold text-black leading-tight mb-2">
                Buying your first property?
              </h3>
              <p className="text-[14px] text-black/60">
                Get the Buyer's Due Diligence guide and avoid all legal troubles.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-display font-semibold text-black leading-tight mb-2">
                Get the best quote
              </h3>
              <p className="text-[14px] text-black/60">
                For {propertyTitle}
              </p>
            </>
          )}
        </div>

        {status === "success" ? (
          <div className="py-8 text-center bg-[#f9f9f9] rounded-2xl border border-black/5">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-[15px] font-semibold text-black mb-1">Request Received</p>
            <p className="text-[13px] text-black/50">We will get back to you shortly.</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" placeholder="Full name" required className={inputClass} />
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-black/10 rounded-xl px-2 py-2.5 text-[13px] text-black bg-[#f9f9f9] focus:outline-none focus:border-black/30 shrink-0"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input type="tel" name="phone_number" placeholder="Phone number" required className={`${inputClass} flex-1`} />
            </div>
            
            {status === "error" && (
              <p className="text-red-500 text-[12px]">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-black text-white text-[14px] font-semibold py-3.5 mt-2 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Request call back"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
