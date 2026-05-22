"use client";

import Link from "next/link";
import { ArrowLeft, Building2, Users, CheckCircle, Navigation, Globe, ExternalLink } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { Property } from "@/types";
import PropertyCard from "@/components/ui/PropertyCard";
import InquiryForm from "@/app/(site)/properties/[slug]/InquiryForm";

interface Builder {
  name: string;
  website: string | null;
  slug: string;
  minPrice: number;
  maxPrice: number;
  locations: string[];
  isCoop: boolean;
  propertyCount: number;
  types: string[];
}

interface BuilderProfileClientProps {
  builder: Builder;
  properties: Property[];
}

export default function BuilderProfileClient({ builder, properties }: BuilderProfileClientProps) {
  const { formatPrice } = useCurrency();

  const initials = builder.name
    .split(" ")
    .filter(word => !["LLP", "Ltd", "Pvt", "and", "Group", "LLP/", "Pvt."].includes(word))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || builder.name.substring(0, 2).toUpperCase();

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#FDFDFD]">
      {/* Breadcrumbs */}
      <div className="container-site pt-8 pb-4">
        <nav className="flex items-center gap-2 text-xs text-black/40 font-body">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-charcoal transition-colors">Properties</Link>
          <span>/</span>
          <Link href="/properties/builders" className="hover:text-charcoal transition-colors">Builders</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{builder.name}</span>
        </nav>
      </div>

      {/* Back Link */}
      <div className="container-site mb-8">
        <Link
          href="/properties/builders"
          className="inline-flex items-center gap-2 text-xs font-body font-bold uppercase tracking-widest text-black/50 hover:text-charcoal transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to all builders
        </Link>
      </div>

      {/* Portfolio Info Hero Header */}
      <div className="container-site mb-12">
        <div className="bg-white border border-black/5 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.01] via-transparent to-transparent pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
              {/* Initials Logo */}
              <div className="w-20 h-20 rounded-2xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-center font-display text-3xl font-semibold text-charcoal shrink-0 transition-all duration-500 shadow-sm">
                {initials}
              </div>
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {builder.isCoop ? (
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-body text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                      Coop Board
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-body text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                      <CheckCircle size={10} />
                      RERA Verified Developer
                    </span>
                  )}
                </div>
                
                <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-3 tracking-tight leading-none">
                  {builder.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-black/50 font-body">
                  <span className="flex items-center gap-1.5">
                    <Navigation size={12} className="opacity-60" />
                    {builder.locations.join(", ") || "Mohali"}
                  </span>
                  {builder.website && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 hidden sm:inline" />
                      <a
                        href={builder.website.startsWith("http") ? builder.website : `https://${builder.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-black/60 hover:text-charcoal transition-colors hover:underline"
                      >
                        <Globe size={12} />
                        {builder.website.replace(/^https?:\/\/(www\.)?/, "")}
                        <ExternalLink size={10} />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-t border-black/5 bg-black/[0.01]">
            <div>
              <span className="block font-body text-[10px] uppercase tracking-widest text-black/45 font-bold mb-1">
                Active Listings
              </span>
              <span className="font-display text-2xl font-semibold text-charcoal">
                {builder.propertyCount}
              </span>
              <span className="block font-body text-[10px] text-black/35 mt-0.5">
                Vetted & updated
              </span>
            </div>
            <div>
              <span className="block font-body text-[10px] uppercase tracking-widest text-black/45 font-bold mb-1">
                Starting Price
              </span>
              <span className="font-display text-2xl font-semibold text-charcoal">
                {builder.minPrice > 0 ? (
                  formatPrice(builder.minPrice)
                ) : (
                  <span className="text-sm font-normal text-black/40 italic">On request</span>
                )}
              </span>
              <span className="block font-body text-[10px] text-black/35 mt-0.5">
                Excl. taxes & fees
              </span>
            </div>
            <div>
              <span className="block font-body text-[10px] uppercase tracking-widest text-black/45 font-bold mb-1">
                Footprint
              </span>
              <span className="font-display text-lg font-semibold text-charcoal truncate block" title={builder.locations.join(", ")}>
                {builder.locations.length} {builder.locations.length === 1 ? "Sector" : "Sectors"}
              </span>
              <span className="block font-body text-[10px] text-black/35 mt-0.5">
                In Mohali & Tricity
              </span>
            </div>
            <div>
              <span className="block font-body text-[10px] uppercase tracking-widest text-black/45 font-bold mb-1">
                Asset Types
              </span>
              <span className="font-display text-lg font-semibold text-charcoal truncate block" title={builder.types.join(", ")}>
                {builder.types.join(", ")}
              </span>
              <span className="block font-body text-[10px] text-black/35 mt-0.5">
                Class divisions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid / Sidebar Section */}
      <div className="container-site pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Properties Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-2">
                Active Listings in Mohali
              </h2>
              <p className="font-body text-xs text-black/40">
                Displaying all verified residential and commercial assets managed by our desk.
              </p>
            </div>

            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white border border-black/5 rounded-3xl p-8">
                <Building2 className="mx-auto text-black/20 mb-4" size={48} />
                <p className="text-black/40 text-sm font-body">
                  No active listings are currently available under this developer's profile.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Developer Trust Badge */}
            <div className="bg-white border border-black/5 p-6 rounded-3xl">
              <h3 className="font-display text-lg font-medium text-charcoal mb-4 flex items-center gap-2">
                {builder.isCoop ? <Users size={18} className="text-blue-500" /> : <Building2 size={18} className="text-emerald-500" />}
                Portfolio Integrity
              </h3>
              
              <p className="font-body text-xs leading-relaxed text-black/50 mb-4">
                Each listing within the {builder.name} portfolio has been thoroughly verified by our advisory team. We confirm construction milestones, legal clearances, and pricing structures directly with the builders and cooperative registries.
              </p>

              <div className="space-y-3 pt-3 border-t border-t-black/5">
                <div className="flex justify-between items-center text-[11px] font-body">
                  <span className="text-black/40 uppercase tracking-widest font-bold">RERA Registration</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={12} stroke="currentColor" /> Compliant
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-body">
                  <span className="text-black/40 uppercase tracking-widest font-bold">Entity Classification</span>
                  <span className="font-semibold text-charcoal">
                    {builder.isCoop ? "Cooperative Society" : "Corporate Builder"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-body">
                  <span className="text-black/40 uppercase tracking-widest font-bold">Audit Standard</span>
                  <span className="font-semibold text-charcoal">100% Legal Check</span>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white border border-charcoal/10 p-6 rounded-3xl shadow-sm">
              <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                Portfolio Desk Inquiry
              </h3>
              <p className="font-body text-xs text-black/40 mb-6 leading-relaxed">
                Connect with our dedicated consultant for {builder.name} projects. Request real-time availability, floor plans, and customized deals.
              </p>
              
              <InquiryForm
                propertyId={builder.slug}
                propertyTitle={`${builder.name} Portfolio Inquiry`}
                entityType="apartment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
