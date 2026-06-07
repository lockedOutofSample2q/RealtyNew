"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Building2, Users, CheckCircle, Navigation } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { Property } from "@/types";

const LOGO_MAPPING: Record<string, string> = {
  "affinity-buildtech-affinity-group": "affinity.svg",
  "ambika-realcon-pvt-ltd-ambika-infra-ventures-pvt-ltd": "ambika.svg",
  "evoq-realtech-directors-gaurav-goyal-satish-katyal-brand-ambassador-hrithik-roshan": "evoq.svg",
  "klv-builders-and-developers-pvt-ltd": "klv.svg",
  "gillco-developers-and-builders-pvt-ltd-gillco-group": "gillco.svg",
  "hero-realty-pvt-ltd-hero-group-usd-5-billion-enterprise": "hero_homes.svg",
  "homeland-group": "homeland.svg",
  "horizon-group-punjab": "horizon.svg",
  "jlpl": "jlpl.svg",
  "joy-homes-joy-group": "joygrand.svg",
  "jubilee-group": "jubilee.svg",
  "marbella-group-srg-group": "marbella.svg",
  "turnstone-realty-medallion-group": "medallion.svg",
  "noble-ventures-noble-group": "noble_callista.svg",
};

interface Builder {
  name: string;
  website: string | null;
  slug: string;
  properties: Property[];
  minPrice: number;
  maxPrice: number;
  locations: string[];
  isCoop: boolean;
}

interface BuildersClientProps {
  builders: Builder[];
}

export default function BuildersClient({ builders }: BuildersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"commercial" | "coop">("commercial");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");
  const { formatPrice } = useCurrency();

  // Filter and Sort builders
  const filteredBuilders = builders
    .filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.locations.some(loc => loc.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (activeTab === "commercial") {
        return matchesSearch && !b.isCoop;
      }
      if (activeTab === "coop") {
        return matchesSearch && b.isCoop;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price-asc") {
        const priceA = a.minPrice || Infinity;
        const priceB = b.minPrice || Infinity;
        return priceA - priceB;
      }
      if (sortBy === "price-desc") {
        return b.minPrice - a.minPrice;
      }
      return 0;
    });

  const renderBuilderCard = (b: Builder) => {
    const initials = b.name
      .split(" ")
      .filter(word => !["LLP", "Ltd", "Pvt", "and", "Group", "LLP/", "Pvt."].includes(word))
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    const logoFile = LOGO_MAPPING[b.slug];

    return (
      <div
        key={b.slug}
        className="group relative flex flex-col justify-between bg-white border border-black/5 hover:border-black/15 p-8 rounded-3xl hover:shadow-lg transition-all duration-500 h-full"
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-center font-display text-2xl font-semibold text-charcoal shrink-0 group-hover:bg-charcoal group-hover:text-white transition-all duration-500 shadow-sm overflow-hidden relative">
              {logoFile ? (
                <div className="w-full h-full p-2 relative flex items-center justify-center bg-white group-hover:bg-white transition-colors duration-500">
                  <Image
                    src={`/assets/images/logos/${logoFile}`}
                    alt={`${b.name} logo`}
                    fill
                    sizes="64px"
                    className="object-contain p-1 transition-all duration-500"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
              ) : (
                initials || b.name.substring(0, 2).toUpperCase()
              )}
            </div>
            
            <div className="flex flex-col items-end gap-1.5">
              {b.isCoop ? (
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-body text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                  Coop Board
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-body text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  <CheckCircle size={10} />
                  RERA Verified
                </span>
              )}
              <span className="text-xs text-black/40 font-body">
                {b.properties.length} {b.properties.length === 1 ? "listing" : "listings"}
              </span>
            </div>
          </div>

          {/* Developer Name */}
          <h3 className="font-display text-2xl font-medium text-charcoal leading-tight mb-3 line-clamp-2">
            {b.name}
          </h3>

          {/* Sectors list */}
          <div className="flex items-center gap-1.5 text-xs text-black/50 mb-6 flex-wrap">
            <Navigation size={12} className="shrink-0 opacity-60" />
            {b.locations.length > 0 ? (
              <span className="font-body line-clamp-1">
                {b.locations.slice(0, 3).join(", ")}
                {b.locations.length > 3 && ` +${b.locations.length - 3} more`}
              </span>
            ) : (
              <span className="font-body italic">Various Sectors</span>
            )}
          </div>
        </div>

        {/* Pricing and Action Link */}
        <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-auto">
          <div>
            <span className="block font-body text-[10px] uppercase tracking-widest text-black/40 font-bold mb-0.5">
              Starting Price
            </span>
            <span className="font-display text-lg font-semibold text-charcoal">
              {b.minPrice > 0 ? (
                <>{formatPrice(b.minPrice)}</>
              ) : (
                <span className="text-xs text-black/35 italic font-normal">Price on request</span>
              )}
            </span>
          </div>

          <Link
            href={`/properties/builders/${b.slug}`}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-black/10 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
          >
            <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#FDFDFD]">
      {/* Hero Header */}
      <div className="bg-white pt-20 pb-16 border-b border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] border border-black/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-black/60">
              Verified Directories & Portfolios
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-charcoal mb-8 leading-tight tracking-tight">
            Top RERA-Verified Builders & Developers in Mohali
          </h1>
          <div className="font-body text-base text-black/60 max-w-4xl leading-relaxed space-y-4">
            <p>
              Mohali's real estate market has 28 active builders and cooperative housing societies across 12 sectors — ranging from ₹45 lakh entry-level flats in Sector 91 to ₹9.19 crore penthouses in IT City. This directory covers all of them.
            </p>
            <p>
              Every developer listed here has been independently reviewed by the Realty Holding & Management Consultants advisory desk. We verify RERA registration status, cross-check construction milestones, and assess each builder's delivery track record before they appear on this page. <strong className="text-charcoal font-semibold">No builder has paid to be listed. No ranking is sponsored.</strong>
            </p>
            <p>
              The directory is divided into two categories: <strong className="text-charcoal font-semibold">21 commercial builders</strong> operating under Punjab RERA, and <strong className="text-charcoal font-semibold">7 cooperative housing societies</strong> registered under the Punjab Cooperative Societies Act. Both categories offer legitimate, legally sound ownership structures — but they work differently, and the right choice depends entirely on your situation.
            </p>
            <p>
              If you're comparing developers, use the filters below. If you're unsure where to start, our desk recommends beginning with your budget bracket and working backwards to the developer — not the other way around.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="container-site py-12">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center bg-white border border-black/5 p-4 rounded-3xl shadow-sm mb-12">
          {/* Tabs */}
          <div className="flex p-1 bg-black/[0.02] rounded-2xl border border-black/[0.03] self-start lg:self-auto shrink-0">
            <button
              onClick={() => setActiveTab("commercial")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "commercial"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-black/40 hover:text-charcoal"
              }`}
            >
              <Building2 size={14} />
              Commercial Builders ({builders.filter(b => !b.isCoop).length})
            </button>
            <button
              onClick={() => setActiveTab("coop")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "coop"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-black/40 hover:text-charcoal"
              }`}
            >
              <Users size={14} />
              Coop Housing Societies ({builders.filter(b => b.isCoop).length})
            </button>
          </div>

          {/* Search Box & Sort Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black/35">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search developers, societies, or sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-black/[0.01] border border-black/5 focus:border-black/20 focus:bg-white text-sm outline-none transition-all font-body text-charcoal"
              />
            </div>
            
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-5 py-4 rounded-2xl bg-black/[0.01] border border-black/5 focus:border-black/20 focus:bg-white text-sm outline-none transition-all font-body text-charcoal cursor-pointer appearance-none pr-10"
              >
                <option value="name">Sort: Name (A-Z)</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black/45">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-medium text-charcoal mb-4 leading-tight">
            {activeTab === "commercial" 
              ? "Commercial Builders in Mohali — RERA Verified Portfolios" 
              : "Cooperative Housing Societies in Mohali — Sectors 67, 68 & 70"}
          </h2>
          <div className="font-body text-base text-black/60 leading-relaxed mb-8 max-w-4xl space-y-4">
            {activeTab === "commercial" ? (
              <p>
                Mohali's commercial builder market spans the full spectrum — from government-backed GMADA to legacy private developers like JLPL and Bestech, and newer entrants like Evoq Realtech. Sectors 66A, 82, 88, 112, 121, and 126 hold the highest concentration of active inventory. Prices across this segment start at ₹69.93 lakh (ICL Ivory Castle, Sector 70) and reach ₹9.19 crore for JLPL Falcon View penthouses in IT City.
              </p>
            ) : (
              <>
                <p>
                  Mohali has seven registered cooperative housing societies concentrated in Sectors 67, 68, and 70 — an ownership structure that most property portals underexplain and most buyers misunderstand. In a cooperative society, you hold a share in the registered society and receive a formal allotment — the land title vests in the society collectively, not in your name individually. This is different from a builder flat, where you hold a registered sale deed directly.
                </p>
                <p>
                  The tradeoff: cooperative society units carry <strong className="text-charcoal font-semibold">significantly lower entry prices</strong> (₹55 lakh to ₹85 lakh) compared to equivalent corporate builder inventory in adjacent sectors. Societies like Jal Vayu (Sector 67), Mundi Society (Sector 70), and the SCL Employees Society (Sector 70) have mature, well-maintained common areas and long-established RWAs. For buyers comfortable with the cooperative ownership structure, these represent some of Mohali's most defensible value-per-square-foot purchases.
                </p>
                <p>
                  If you're evaluating a cooperative society and unsure about the legal structure, our desk handles these transactions regularly and can walk you through the process.
                </p>
              </>
            )}
          </div>

          {filteredBuilders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredBuilders.map((b) => renderBuilderCard(b))}
            </div>
          ) : (
            <p className="text-black/40 text-sm font-body italic py-4">
              No developers match your search query.
            </p>
          )}
        </div>

        {/* Empty State */}
        {filteredBuilders.length === 0 && (
          <div className="py-24 text-center bg-white border border-black/5 rounded-3xl p-8 mb-12">
            <Building2 className="mx-auto text-black/20 mb-4" size={48} />
            <p className="text-black/40 text-sm font-body">
              No developer portfolios match your current search terms.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setActiveTab("commercial"); }}
              className="mt-3 text-sm text-black underline font-body hover:text-black/75"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Informational SEO and Guide Section */}
      <div className="bg-white border-t border-black/5 py-24">
        <div className="container-site max-w-4xl">
          
          {/* Verification Section */}
          <div className="mb-24">
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-charcoal mb-6 leading-tight">
              How Realty Consultants Verifies Every Builder
            </h2>
            <p className="font-body text-base text-black/60 leading-relaxed mb-8">
              Every developer in this directory has cleared a four-point verification by our advisory team:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-black/[0.01] border border-black/[0.04]">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">1. RERA Registration Check</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  We cross-reference each project against the Punjab RERA portal (hrera.org.in) to confirm active registration, promoter details, and project-level compliance status. You can verify any listing independently using the RERA IDs on each builder's project page.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/[0.01] border border-black/[0.04]">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">2. Construction Milestone Review</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  For under-construction projects, we track promised vs. actual possession timelines based on RERA filings and direct builder communication. A builder with a pattern of delayed delivery is flagged in our advisory notes — and may not appear in this directory at all.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/[0.01] border border-black/[0.04]">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">3. Legal Clearance Audit</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  We confirm that each listed project holds valid CLU (Change of Land Use), building plan approvals, and environmental clearances as applicable under Punjab and GMADA regulations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/[0.01] border border-black/[0.04]">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">4. Pricing Integrity</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  We verify that listed prices reflect current market reality — not stale brochure rates. Starting prices are updated each quarter based on active floor plan availability and direct builder confirmation.
                </p>
              </div>
            </div>

            <p className="font-body text-base text-black/60 leading-relaxed mt-8">
              This process exists because we advise clients who are investing ₹50 lakh to ₹9 crore. Our reputation depends on the accuracy of what we tell them — which means it depends on the accuracy of what's in this directory.
            </p>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-charcoal mb-12 leading-tight">
              Frequently Asked Questions — Builders & Developers in Mohali
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-black/5 pb-6">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">Which builders in Mohali have the most active listings?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  JLPL, Jubilee Group, and Marbella Group each have three active RERA-verified listings in our directory — the highest count of any developers currently. JLPL operates in Sector 66A, Jubilee Group spans Sectors 91 and 112, and Marbella covers New Chandigarh (Mullanpur).
                </p>
              </div>

              <div className="border-b border-black/5 pb-6">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">What is the lowest starting price for a flat from a RERA-verified builder in Mohali?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Jubilee Group offers the lowest entry price among our listed corporate builders at ₹45 lakh for their Sector 91 project. Among cooperative societies, Mundi Cooperative House Building Society and Shri Guru Teg Bahadur Society both start at ₹55 lakh in Sector 70.
                </p>
              </div>

              <div className="border-b border-black/5 pb-6">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">What is GMADA and is it the same as a private builder?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  GMADA (Greater Mohali Area Development Authority) is the Punjab Government's statutory development body — it plans sectors, develops infrastructure, and allots residential and commercial plots. It is not a private builder and does not construct apartments. GMADA properties typically offer the strongest land-title security of any category in this directory.
                </p>
              </div>

              <div className="border-b border-black/5 pb-6">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">What is the difference between a cooperative housing society and a RERA-verified builder?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  A cooperative housing society is registered under the Punjab Cooperative Societies Act. Ownership is structured as a society membership with allotment rights — the land title vests in the society, not individually. A RERA-verified builder delivers a registered sale deed directly to the buyer. Both are legal. Cooperative societies in Mohali typically carry lower price points but require the buyer to understand the membership and transfer process.
                </p>
              </div>

              <div className="border-b border-black/5 pb-6">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">How do I check if a builder is RERA registered in Mohali?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Visit hrera.org.in — Punjab's official RERA portal — and search by project name or promoter name. All corporate builders listed on this page are RERA registered. Cooperative housing societies are not required to register under RERA as they operate under a separate regulatory framework.
                </p>
              </div>

              <div className="border-b border-black/5 pb-6">
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">Can NRIs buy property from any builder listed here?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Yes. All RERA-verified corporate builders in this directory sell to NRI buyers under standard FEMA guidelines. Cooperative societies may have membership eligibility restrictions that vary by society — confirm with our desk before proceeding.
                </p>
              </div>

              <div>
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">Which sectors in Mohali have the most builder activity?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Sector 66A (JLPL, KLV Builders), Sector 88 (Noble Ventures), Sector 112 (Jubilee Group), Sector 121 (ATS Infrastructure), and Sector 126 (Gillco Group) have the highest concentration of active RERA listings. New Chandigarh (Mullanpur) is the fastest-growing premium zone, anchored by Marbella Group's three active projects.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
