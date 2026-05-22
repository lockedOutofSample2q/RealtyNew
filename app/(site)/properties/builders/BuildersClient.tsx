"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Building2, Users, CheckCircle, Navigation } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { Property } from "@/types";

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
  const { formatPrice } = useCurrency();

  // Filter builders
  const filteredBuilders = builders.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.locations.some(loc => loc.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "corporate") {
      return matchesSearch && !b.isCoop;
    }
    if (activeTab === "coop") {
      return matchesSearch && b.isCoop;
    }
    return matchesSearch;
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
            Leading Builders & Developers
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

          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
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

              return (
                <div
                  key={b.slug}
                  className="group relative flex flex-col justify-between bg-white border border-black/5 hover:border-black/15 p-8 rounded-3xl hover:shadow-lg transition-all duration-500 h-full"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-center font-display text-2xl font-semibold text-charcoal shrink-0 group-hover:bg-charcoal group-hover:text-white transition-all duration-500 shadow-sm">
                        {initials || b.name.substring(0, 2).toUpperCase()}
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
    </div>
  );
}
