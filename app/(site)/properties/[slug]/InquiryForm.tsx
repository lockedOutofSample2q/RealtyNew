"use client";
import { useState } from "react";

const COUNTRY_CODES = [
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+44",  label: "🇬🇧 +44" },
  { code: "+1",   label: "🇺🇸 +1" },
  { code: "+91",  label: "🇮🇳 +91" },
  { code: "+33",  label: "🇫🇷 +33" },
  { code: "+49",  label: "🇩🇪 +49" },
  { code: "+7",   label: "🇷🇺 +7" },
  { code: "+86",  label: "🇨🇳 +86" },
];

export default function InquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [countryCode, setCountryCode] = useState("+971");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const phone = `${countryCode} ${fd.get("phone_number")}`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone,
          source: "property",
          property_id: propertyId,
          message: `Inquiry about: ${propertyTitle}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full border border-black/10 rounded-xl px-3 py-2.5 text-[13px] text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 bg-[#f9f9f9] transition-colors";

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <p className="text-[14px] font-semibold text-black mb-1">Request sent!</p>
        <p className="text-[13px] text-black/50">We'll be in touch within the hour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="name" placeholder="Full name" required className={input} />
      <input type="email" name="email" placeholder="Email address" required className={input} />

      {/* Phone with country code */}
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
        <input type="tel" name="phone_number" placeholder="Phone number" className={`${input} flex-1`} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-black text-white text-[13px] font-semibold py-3 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request Information"}
      </button>

      {status === "error" && (
        <p className="text-[12px] text-red-500 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
