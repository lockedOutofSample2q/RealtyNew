"use client";
// components/sections/HeroSection.tsx
// ============================================================
// HERO SECTION
// EDIT copy in config/site.ts → heroContent
// EDIT background image: /public/images/hero.jpg
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { heroContent } from "@/config/site";

const FALLBACK_LOCATIONS = [
  "All Dubai",
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "JVC",
  "DIFC",
  "Dubai Hills",
  "Creek Harbour",
  "Emaar Beachfront",
];

const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Villa",
  "Penthouse",
  "Townhouse",
  "Studio",
];

const BEDROOMS = ["Any", "Studio", "1", "2", "3", "4", "5+"];

const CURRENCIES = ["AED", "USD", "EUR"];

export default function HeroSection({ locations = [] }: { locations?: string[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent" | "off-plan">("buy");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    bedrooms: "",
    currency: "AED",
  });

  const displayLocations = locations.length > 0 
    ? ["All Locations", ...locations] 
    : ["All Locations", ...FALLBACK_LOCATIONS.filter(l => l !== "All Dubai")];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      listingType: tab,
      ...(filters.location && { location: filters.location }),
      ...(filters.type && { type: filters.type }),
      ...(filters.bedrooms && { bedrooms: filters.bedrooms }),
    });
    const page = tab === "rent" ? "/rentals" : tab === "off-plan" ? "/off-plan" : "/off-plan";
    router.push(`${page}?${params.toString()}`);
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroContent.backgroundImage})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      {/* Gold vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-site flex flex-col items-center text-center pt-24 pb-16">
        {/* Tag */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgba(201,168,76,0.3)] text-[var(--gold)] font-body text-xs tracking-widest uppercase mb-8">
          <span className="w-1 h-1 rounded-full bg-[var(--gold)] animate-pulse" />
          Dubai Real Estate
        </span>

        {/* Headline */}
        <h1 className="font-display font-light text-white mb-6 leading-tight">
          {heroContent.headline.split("\n").map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-gold-gradient">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Subline */}
        <p className="font-body text-white/60 text-lg max-w-xl mb-12 leading-relaxed">
          {heroContent.subline}
        </p>

        {/* ── Search Widget ──────────────────────────────── */}
        <div className="w-full max-w-3xl">
          {/* Tabs */}
          <div className="flex mb-0">
            {(["buy", "rent", "off-plan"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 font-body text-sm capitalize tracking-wide transition-all ${
                  tab === t
                    ? "bg-[var(--gold)] text-black font-medium"
                    : "bg-black/60 text-white/60 hover:text-white backdrop-blur-sm"
                }`}
              >
                {t === "off-plan" ? "Off Plan" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="bg-black/80 backdrop-blur-md border border-[rgba(201,168,76,0.15)] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {/* Location */}
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="bg-[#141414] border border-white/10 text-white/80 px-4 py-3 font-body text-sm outline-none focus:border-[var(--gold)] transition-colors"
            >
              {displayLocations.map((l) => (
                <option key={l} value={l === "All Locations" ? "" : l}>
                  {l}
                </option>
              ))}
            </select>

            {/* Property Type */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="bg-[#141414] border border-white/10 text-white/80 px-4 py-3 font-body text-sm outline-none focus:border-[var(--gold)] transition-colors"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t === "All Types" ? "" : t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </select>

            {/* Bedrooms */}
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
              className="bg-[#141414] border border-white/10 text-white/80 px-4 py-3 font-body text-sm outline-none focus:border-[var(--gold)] transition-colors"
            >
              {BEDROOMS.map((b) => (
                <option key={b} value={b === "Any" ? "" : b.toLowerCase()}>
                  {b === "Any" ? "Bedrooms" : `${b} Bed`}
                </option>
              ))}
            </select>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[var(--gold)] text-black font-body font-medium text-sm tracking-wide hover:bg-[var(--gold-light)] transition-colors py-3 px-6"
            >
              <Search size={16} />
              Search
            </button>
          </form>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-12">
          {[
            { value: "500+", label: "Properties" },
            { value: "AED 2B+", label: "Transacted" },
            { value: "10 Yrs", label: "In Dubai" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl text-[var(--gold)] font-light">
                {stat.value}
              </div>
              <div className="font-body text-xs text-white/40 tracking-wide uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--gold)]" />
      </div>
    </section>
  );
}
