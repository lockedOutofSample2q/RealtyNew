"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Building2, Users, CheckCircle, Navigation, Globe, ExternalLink } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { Property } from "@/types";
import PropertyCard from "@/components/ui/PropertyCard";
import InquiryForm from "@/app/(site)/properties/[slug]/InquiryForm";
import buildersData from "@/config/builders-data.json";

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

interface BuilderBackground {
  c1: string;
  c2: string;
}

interface AdvisoryBreakdown {
  rightFor: string[];
  lookElsewhere: string[];
  ratings: {
    delivery: number;
    quality: number;
    appreciation: number;
    friendliness: number;
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SectorContextItem {
  sector: string;
  text: string;
}

interface Builder {
  name: string;
  commonName: string;
  website: string | null;
  slug: string;
  minPrice: number;
  maxPrice: number;
  locations: string[];
  isCoop: boolean;
  propertyCount: number;
  types: string[];
  founded: string;
  headquarters: string;
  reraReg: string;
  reraStatus: string;
  buyerProfile: string;
  priceRange: string;
  advisoryVerdict: string;
  background: BuilderBackground;
  advisoryBreakdown: AdvisoryBreakdown;
  editorialNotes: Record<string, string>;
  comparables: string[];
  faqs: FAQItem[];
  sectorContexts: SectorContextItem[];
}

interface BuilderProfileClientProps {
  builder: Builder;
  properties: Property[];
}

export default function BuilderProfileClient({ builder, properties }: BuilderProfileClientProps) {
  const { formatPrice } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const initials = builder.commonName
    .split(" ")
    .filter(word => !["LLP", "Ltd", "Pvt", "and", "Group", "LLP/", "Pvt."].includes(word))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || builder.commonName.substring(0, 2).toUpperCase();

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
          <span className="text-charcoal font-medium">{builder.commonName}</span>
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
              <div className="w-20 h-20 rounded-2xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-center font-display text-3xl font-semibold text-charcoal shrink-0 transition-all duration-500 shadow-sm overflow-hidden relative">
                {LOGO_MAPPING[builder.slug] ? (
                  <div className="w-full h-full p-2 relative flex items-center justify-center bg-white">
                    <Image
                      src={`/assets/images/logos/${LOGO_MAPPING[builder.slug]}`}
                      alt={`${builder.commonName} logo`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                      style={{ filter: "brightness(0)" }}
                    />
                  </div>
                ) : (
                  initials
                )}
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
                  {builder.commonName}
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

      {/* Programmatic SEO Sections Layout */}
      <div className="container-site pb-24">
        {/* SECTION A — The Advisory Verdict */}
        <div className="bg-charcoal/[0.02] border border-charcoal/10 rounded-3xl p-8 mb-8 relative">
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-charcoal text-white font-body text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Our Advisory Verdict
          </div>
          <p className="font-body text-sm text-charcoal/80 leading-relaxed italic">
            "{builder.advisoryVerdict}"
          </p>
        </div>

        {/* SECTION B — Builder At a Glance (Table) */}
        <div className="bg-white border border-black/5 rounded-3xl p-8 mb-12">
          <h2 className="font-display text-lg font-medium text-charcoal mb-6">
            Builder At a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-body">
              <tbody>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45 w-1/3">Legal Entity Name</td>
                  <td className="py-4 text-charcoal font-medium">{builder.name}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Commonly Known As</td>
                  <td className="py-4 text-charcoal font-medium">{builder.commonName}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Founded</td>
                  <td className="py-4 text-charcoal font-medium">{builder.founded}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Headquarters</td>
                  <td className="py-4 text-charcoal font-medium">{builder.headquarters}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">RERA Status</td>
                  <td className="py-4 text-charcoal font-medium">
                    <span className="text-emerald-600 font-semibold">✅ {builder.reraStatus}</span>
                  </td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">RERA Registration</td>
                  <td className="py-4 text-charcoal font-medium font-mono">{builder.reraReg}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Active Projects in Mohali</td>
                  <td className="py-4 text-charcoal font-medium">{builder.propertyCount}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Sectors Active</td>
                  <td className="py-4 text-charcoal font-medium">{builder.locations.join(", ")}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Asset Types</td>
                  <td className="py-4 text-charcoal font-medium">{builder.types.join(", ")}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Price Range</td>
                  <td className="py-4 text-charcoal font-medium">{builder.priceRange}</td>
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 pr-4 font-bold text-black/45">Buyer Profile</td>
                  <td className="py-4 text-charcoal font-medium">{builder.buyerProfile}</td>
                </tr>
                {builder.website && (
                  <tr>
                    <td className="py-4 pr-4 font-bold text-black/45">Official Website</td>
                    <td className="py-4 text-charcoal font-medium">
                      <a 
                        href={builder.website.startsWith("http") ? builder.website : `https://${builder.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline text-black/60 inline-flex items-center gap-1"
                      >
                        {builder.website.replace(/^https?:\/\/(www\.)?/, "")} <ExternalLink size={10} />
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Grid: Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* SECTION C — Builder Background & Mohali Presence */}
            <div className="bg-white border border-black/5 p-8 rounded-3xl space-y-6">
              <h2 className="font-display text-2xl font-medium text-charcoal">
                Builder Background & Mohali Presence
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-xs font-bold text-black/40 mb-2 uppercase tracking-wider">
                    Who They Are
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-black/60">
                    {builder.background.c1}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold text-black/40 mb-2 uppercase tracking-wider">
                    Their Mohali Footprint
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-black/60">
                    {builder.background.c2}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION D — Active Projects Listings (Enhanced with custom editorial notes) */}
            <div className="space-y-6">
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
                  {properties.map((p) => {
                    const note = builder.editorialNotes[p.slug] || builder.editorialNotes[p.id] || "";
                    return (
                      <PropertyCard 
                        key={p.id} 
                        property={p} 
                        editorialNote={note} 
                      />
                    );
                  })}
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

            {/* SECTION E — Our Advisory Breakdown */}
            <div className="bg-white border border-black/5 p-8 rounded-3xl space-y-8">
              <h2 className="font-display text-2xl font-medium text-charcoal">
                Our Advisory Breakdown
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Who this is right for */}
                <div className="space-y-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Who This Builder Is Right For
                  </h3>
                  <ul className="space-y-3">
                    {builder.advisoryBreakdown.rightFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-black/60 font-body leading-relaxed">
                        <span className="text-emerald-500 text-sm font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who should look elsewhere */}
                <div className="space-y-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Who Should Look Elsewhere
                  </h3>
                  <ul className="space-y-3">
                    {builder.advisoryBreakdown.lookElsewhere.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-black/60 font-body leading-relaxed">
                        <span className="text-amber-500 text-sm font-bold shrink-0">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ratings Section */}
              <div className="pt-6 border-t border-black/5 space-y-6">
                <h3 className="font-display text-xs font-bold text-black/45 uppercase tracking-wider">
                  Our Advisory Rating
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                  {[
                    { label: "Delivery Track Record", score: builder.advisoryBreakdown.ratings.delivery },
                    { label: "Construction Quality", score: builder.advisoryBreakdown.ratings.quality },
                    { label: "Price Appreciation", score: builder.advisoryBreakdown.ratings.appreciation },
                    { label: "Buyer-Friendliness", score: builder.advisoryBreakdown.ratings.friendliness }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-body text-charcoal">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold">{item.score}/10</span>
                      </div>
                      <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-charcoal rounded-full transition-all duration-1000" 
                          style={{ width: `${item.score * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION F — Sector & Location Context */}
            {builder.sectorContexts && builder.sectorContexts.length > 0 && (
              <div className="bg-white border border-black/5 p-8 rounded-3xl space-y-6">
                <h2 className="font-display text-2xl font-medium text-charcoal">
                  Sector & Location Context
                </h2>
                <div className="space-y-6">
                  {builder.sectorContexts.map((ctx, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-display text-xs font-bold text-black/40 mb-2 uppercase tracking-wider">
                        {ctx.sector.startsWith("Sector") ? ctx.sector : `Sector ${ctx.sector}`}
                      </h3>
                      <p className="font-body text-sm leading-relaxed text-black/60">
                        {ctx.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION G — Comparison Teaser (Internal Linking Engine) */}
            {builder.comparables && builder.comparables.length > 0 && (
              <div className="bg-white border border-black/5 p-8 rounded-3xl space-y-4">
                <h2 className="font-display text-lg font-medium text-charcoal">
                  Comparing Options?
                </h2>
                <p className="font-body text-xs leading-relaxed text-black/50">
                  Buyers evaluating {builder.commonName} often also consider other developers active in similar price tiers or sectors. View our comparison pages:
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {builder.comparables.map((compSlug, idx) => {
                    const compBuilder = (buildersData.builders as any)[compSlug];
                    if (!compBuilder) return null;
                    return (
                      <Link
                        key={idx}
                        href={`/properties/builders/${compSlug}`}
                        className="px-3.5 py-2 rounded-full border border-black/5 hover:border-black/20 bg-black/[0.01] hover:bg-black/[0.03] text-[11px] font-body text-charcoal font-semibold transition-all"
                      >
                        {compBuilder.commonName} Portfolio
                      </Link>
                    );
                  })}
                  <Link
                    href="/properties/builders"
                    className="px-3.5 py-2 rounded-full border border-charcoal/10 hover:bg-charcoal hover:text-white text-[11px] font-body text-charcoal font-semibold transition-all"
                  >
                    View Full Builder Directory
                  </Link>
                </div>
              </div>
            )}

            {/* SECTION H — FAQ Accordion */}
            <div className="bg-white border border-black/5 p-8 rounded-3xl space-y-6">
              <h2 className="font-display text-2xl font-medium text-charcoal">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {builder.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="border-b border-black/5 pb-4 last:border-b-0 last:pb-0">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex justify-between items-center text-left py-2 font-display text-sm font-semibold text-charcoal hover:text-charcoal/80 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="text-lg font-body leading-none text-black/40">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="mt-2 pl-1 animate-fadeIn">
                          <p className="font-body text-xs leading-relaxed text-black/50">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Developer Trust Badge */}
            <div className="bg-white border border-black/5 p-6 rounded-3xl">
              <h3 className="font-display text-lg font-medium text-charcoal mb-4 flex items-center gap-2">
                {builder.isCoop ? <Users size={18} className="text-blue-500" /> : <Building2 size={18} className="text-emerald-500" />}
                Portfolio Integrity
              </h3>
              
              <p className="font-body text-xs leading-relaxed text-black/50 mb-4">
                Each listing within the {builder.commonName} portfolio has been thoroughly verified by our advisory team. We confirm construction milestones, legal clearances, and pricing structures directly with the builders and cooperative registries.
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
                Connect with our dedicated consultant for {builder.commonName} projects. Request real-time availability, floor plans, and customized deals.
              </p>
              
              <InquiryForm
                propertyId={builder.slug}
                propertyTitle={`${builder.commonName} Portfolio Inquiry`}
                entityType="apartment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
