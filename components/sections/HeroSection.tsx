"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PillSelect from "@/components/ui/PillSelect";
import PropertySearchBar from "@/components/search/PropertySearchBar";
import {
  BEDROOMS,
  FURNISHING,
  LOCATIONS,
  PROPERTY_TYPES,
  DEFAULT_PROPERTY_FILTERS,
  type SearchTab,
} from "@/components/search/propertySearchOptions";

// 13 logos from public/assets/images/logos/
const LOGOS = [
  { file: "emaar.svg",        name: "Emaar" },
  { file: "meraas.svg",       name: "Meraas" },
  { file: "nakheel.svg",      name: "Nakheel" },
  { file: "omniyat.svg",      name: "Omniyat" },
  { file: "sobha.svg",        name: "Sobha Realty" },
  { file: "aldar.svg",        name: "Aldar" },
  { file: "binghatti.svg",    name: "Binghatti" },
  { file: "ellington.svg",    name: "Ellington" },
  { file: "damac.svg",        name: "Damac" },
  { file: "azizi.svg",        name: "Azizi" },
  { file: "meydan.svg",       name: "Meydan" },
  { file: "select-group.svg", name: "Select Group" },
  { file: "mag.svg",          name: "MAG" },
];

export default function HeroSection() {
  const router = useRouter();
  const [tab, setTab] = useState<SearchTab>("buy");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_PROPERTY_FILTERS);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1.05, 1.15]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      listingType: tab,
      ...(filters.location && { location: filters.location }),
      ...(filters.type && { type: filters.type }),
      ...(filters.bedrooms && { bedrooms: filters.bedrooms }),
      ...(filters.furnishing && { furnishing: filters.furnishing }),
      ...(filters.price && { price: filters.price }),
      ...(filters.currency && { currency: filters.currency }),
    });
    const page = tab === "rent" ? "/rentals" : "/off-plan";
    setIsSearchModalOpen(false);
    router.push(`${page}?${params.toString()}`);
  }



  // Doubled for seamless loop
  const tickerLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Parallax Background ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          backgroundImage: `url(/assets/images/home/hero-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* ── Overlays ── */}
      {/* Top-left dark vignette (keeps text readable) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-transparent" />
      {/* General darkening */}
      <div className="absolute inset-0 bg-black/25" />
      {/* NO bottom white fade — removed */}

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1100px] mx-auto px-6 pt-40 pb-10">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-medium text-white mb-5 text-5xl md:text-7xl lg:text-[80px] tracking-tight leading-[1.05] text-center"
        >
          Discover Your Perfect<br />Property Today
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-body text-white/85 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light text-center"
        >
          Real estate properties for sale and rent across Dubai &amp; UAE
        </motion.p>

        {/* ── Search Widget (Desktop & Mobile) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="w-full max-w-[1100px] mx-auto flex flex-col items-center"
        >
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="md:hidden w-full max-w-[400px] bg-white text-black py-4 px-6 rounded-2xl flex items-center gap-3 shadow-xl font-body font-medium transition-transform active:scale-95"
          >
            <Search size={20} className="text-black/50" />
            <span className="flex-1 text-left">Search properties</span>
          </button>

          <PropertySearchBar
            tab={tab}
            setTab={setTab}
            filters={filters}
            setFilters={setFilters}
            onSubmit={handleSearch}
            className="hidden md:block w-full"
          />
        </motion.div>

        {/* ── Mobile Search Bottom Sheet ── */}
        <AnimatePresence>
          {isSearchModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchModalOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
              />
              {/* Bottom Sheet Modal */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-[#F3F4F6] rounded-t-[32px] z-[1000] p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl font-semibold text-black">Filter</h2>
                  <button
                    onClick={() => setIsSearchModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
                  >
                    <X size={20} className="text-black" />
                  </button>
                </div>

                <div className="flex bg-white rounded-2xl p-1 mb-8 shadow-sm">
                  {(["buy", "rent"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 py-3.5 text-sm font-semibold rounded-xl transition-all ${
                        tab === t ? "bg-black text-white shadow-lg" : "text-black/40"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSearch} className="flex flex-col gap-10">
                  <PillSelect 
                    label="Location"
                    value={filters.location}
                    options={LOCATIONS}
                    onChange={(loc) => setFilters({ ...filters, location: loc })}
                    placeholder="All Dubai"
                  />

                  <PillSelect 
                    label="Property Type"
                    value={filters.type}
                    options={PROPERTY_TYPES}
                    onChange={(type) => setFilters({ ...filters, type: type })}
                    placeholder="All Types"
                  />

                  <PillSelect 
                    label="Bedrooms"
                    value={filters.bedrooms}
                    options={BEDROOMS}
                    onChange={(beds) => setFilters({ ...filters, bedrooms: beds })}
                    placeholder="Any"
                  />

                  <PillSelect 
                    label="Furnishing"
                    value={filters.furnishing}
                    options={FURNISHING}
                    onChange={(furn) => setFilters({ ...filters, furnishing: furn })}
                    placeholder="All"
                  />

                  {/* Reset & Submit Footer */}
                  <div className="mt-4 flex flex-col gap-4 border-t border-black/5 pt-8">
                    <button
                      type="button"
                      onClick={() => setFilters(DEFAULT_PROPERTY_FILTERS)}
                      className="text-center font-body text-[13px] font-bold uppercase tracking-widest text-black/40 hover:text-black"
                    >
                      Reset filters
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-5 rounded-2xl font-bold text-[15px] shadow-xl active:scale-[0.98] transition-transform"
                    >
                      Show results
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Logo Ticker — full-width, pinned to bottom of hero ── */}
      <div className="relative z-10 w-full pb-10 overflow-hidden">
        {/* Left & right edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center"
          style={{ animation: "hero-ticker 32s linear infinite" }}
        >
          {tickerLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 px-10 opacity-55 hover:opacity-90 transition-opacity duration-300">
              <Image
                src={`/assets/images/logos/${logo.file}`}
                alt={logo.name}
                width={120}
                height={36}
                className="h-7 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes hero-ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
