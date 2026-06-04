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
  const [activeTab, setActiveTab] = useState<"all" | "corporate" | "coop">("all");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");
  const { formatPrice } = useCurrency();

  // Filter and Sort builders
  const filteredBuilders = builders
    .filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.locations.some(loc => loc.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (activeTab === "corporate") {
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
        // Put builders with no price at the end
        const priceA = a.minPrice || Infinity;
        const priceB = b.minPrice || Infinity;
        return priceA - priceB;
      }
      if (sortBy === "price-desc") {
        return b.minPrice - a.minPrice;
      }
      return 0;
    });

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#FDFDFD]">
      {/* Hero Header */}
      <div className="bg-white py-20 border-b border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] border border-black/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-black/60">
              Verified Directories & Portfolios
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-medium text-charcoal mb-6 leading-tight tracking-tight">
            Top Real Estate Builders & Developers in Mohali
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-2xl leading-relaxed font-body">
            Access exhaustive, honestly-appraised portfolios of corporate construction groups and cooperative societies in Mohali. Cross-referenced for RERA credentials, construction quality, and delivery histories.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="container-site py-12">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center bg-white border border-black/5 p-4 rounded-3xl shadow-sm mb-12">
          {/* Tabs */}
          <div className="flex p-1 bg-black/[0.02] rounded-2xl border border-black/[0.03] self-start lg:self-auto shrink-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "all"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-black/40 hover:text-charcoal"
              }`}
            >
              All Portfolios ({builders.length})
            </button>
            <button
              onClick={() => setActiveTab("corporate")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "corporate"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-black/40 hover:text-charcoal"
              }`}
            >
              <Building2 size={14} />
              Corporate Builders
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
              Coop Societies
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

        {/* Results Grid */}
        {filteredBuilders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBuilders.map((b) => {
              // Generate dynamic initials for the logo
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
                          <>
                            {formatPrice(b.minPrice)}
                          </>
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
            })}
          </div>
        ) : (
          <div className="py-24 text-center bg-white border border-black/5 rounded-3xl p-8">
            <Building2 className="mx-auto text-black/20 mb-4" size={48} />
            <p className="text-black/40 text-sm font-body">
              No developer portfolios match your current search terms.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setActiveTab("all"); }}
              className="mt-3 text-sm text-black underline font-body hover:text-black/75"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Informational SEO and Guide Section */}
      <div className="bg-white border-t border-black/5 py-20 mt-12">
        <div className="container-site max-w-4xl">
          
          {/* Section 1: Introduction & Definition */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-medium text-charcoal mb-6 leading-tight">
              Verified Real Estate Builders & Developers in Mohali
            </h2>
            <p className="font-body text-base text-black/60 leading-relaxed mb-4">
              <strong>Real estate builders in Mohali</strong> have transformed the Tricity skyline over the last decade, expanding luxury housing and commercial infrastructure across growth corridors like Airport Road (PR7), IT City, Sector 82, and New Sunny Enclave.
            </p>
            <p className="font-body text-base text-black/60 leading-relaxed">
              At Realty Consultants, we compile exhaustive, independently verified portfolios of leading property groups and cooperative societies. This enables buyers and investors to evaluate developers based on RERA compliance, structural quality, financial solvency, and historical delivery timelines rather than marketing brochures.
            </p>
          </div>

          {/* Section 2: How to Verify (Numbered Guide) */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-medium text-charcoal mb-6 leading-tight">
              How to Verify a Property Developer in Mohali
            </h2>
            <p className="font-body text-base text-black/60 leading-relaxed mb-6">
              Before purchasing a commercial space or a luxury flat in Mohali, follow this essential verification checklist to safeguard your investment:
            </p>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-charcoal/5 font-display text-sm font-semibold text-charcoal shrink-0">1</span>
                <div>
                  <h4 className="font-display text-lg font-medium text-charcoal mb-1">Verify RERA Registration</h4>
                  <p className="font-body text-sm text-black/60 leading-relaxed">Search the Punjab RERA database (rera.punjab.gov.in) using the developer or project registration number. Never book properties in pre-launch phases that do not have active RERA certification.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-charcoal/5 font-display text-sm font-semibold text-charcoal shrink-0">2</span>
                <div>
                  <h4 className="font-display text-lg font-medium text-charcoal mb-1">Check Past Delivery Records</h4>
                  <p className="font-body text-sm text-black/60 leading-relaxed">Examine the builder's earlier developments. Check for litigation history, construction delays, and whether occupation certificates (OC) were handed over promptly.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-charcoal/5 font-display text-sm font-semibold text-charcoal shrink-0">3</span>
                <div>
                  <h4 className="font-display text-lg font-medium text-charcoal mb-1">Audit Financial Partnering</h4>
                  <p className="font-body text-sm text-black/60 leading-relaxed">Projects approved for home loans by major national banks (SBI, HDFC, ICICI) undergo rigid legal and technical clearances, providing an additional layer of security.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Section 3: Comparison (Corporate vs Coop) */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-medium text-charcoal mb-6 leading-tight">
              Corporate Real Estate Developers vs. Cooperative Housing Societies
            </h2>
            <p className="font-body text-base text-black/60 leading-relaxed mb-6">
              Mohali real estate features two main developer entities. Understanding their differences is key to choosing the right properties:
            </p>
            <div className="overflow-x-auto border border-black/5 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/[0.02] border-b border-black/5">
                    <th className="p-4 font-display text-sm font-semibold text-charcoal">Feature</th>
                    <th className="p-4 font-display text-sm font-semibold text-charcoal">Corporate Builders (e.g., Jubilee, ATS)</th>
                    <th className="p-4 font-display text-sm font-semibold text-charcoal">Cooperative Housing Societies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-body text-sm text-black/60">
                  <tr>
                    <td className="p-4 font-semibold text-charcoal">Pricing Model</td>
                    <td className="p-4">Higher base price, market-driven commercial margins.</td>
                    <td className="p-4">Cost-to-cost construction sharing (often lower cost).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-charcoal">Timelines</td>
                    <td className="p-4">Fixed construction-linked plans with delays subject to RERA penalty.</td>
                    <td className="p-4">Variable schedules dependent on member funding and board efficiency.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-charcoal">Amenities</td>
                    <td className="p-4">Premium clubs, professional maintenance, luxury landscapes.</td>
                    <td className="p-4">Basic to mid-level amenities managed by member committees.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: FAQs */}
          <div>
            <h2 className="text-3xl font-display font-medium text-charcoal mb-8 leading-tight">
              Frequently Asked Questions about Builders in Mohali
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">How do I check if a builder in Mohali is RERA-registered?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  You can verify any developer or real estate project on the official Punjab RERA portal (rera.punjab.gov.in) by searching for their registration number. Always confirm that the builder holds an active RERA license before signing a booking agreement.
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">What is the difference between cooperative housing societies and corporate builders in Mohali?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Corporate developers (such as Jubilee, JLPL, and ATS) are private commercial enterprises that design, construct, and sell luxury properties directly. Cooperative housing societies are member-owned boards where land acquisition and development costs are shared among members, usually offering lower purchase prices but with less predictable delivery timelines and amenity management.
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg font-medium text-charcoal mb-2">Who are the leading real estate builders on Airport Road, Mohali?</h4>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Airport Road (PR7) is Mohali's premier growth corridor. Leading builders active here include Jubilee Group (Jubilee Walk, Jubilee Portico), JLPL (Falcon View, JLPL sectors), Homeland Group (Homeland Heights, Homeland Regalia), and Marbella Group (Marbella Grand, Marbella Royce).
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
