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
      {/* Breadcrumbs & Back Link */}
      <div className="container-site pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 border-b border-black/[0.03] text-[10px] font-body text-black/45">
        <nav className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/properties" className="hover:text-charcoal transition-colors">Properties</Link>
          <span className="opacity-30">/</span>
          <Link href="/properties/builders" className="hover:text-charcoal transition-colors">Builders</Link>
          <span className="opacity-30">/</span>
          <span className="text-charcoal font-semibold">{builder.commonName}</span>
        </nav>
        <Link
          href="/properties/builders"
          className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-black/50 hover:text-charcoal transition-colors group"
        >
          <ArrowLeft size={10} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to directory
        </Link>
      </div>

      {/* Thin Editorial Header */}
      <div className="container-site py-4 border-b border-black/[0.04] mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          {/* Logo */}
          <div className="w-11 h-11 rounded-xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-center font-display text-base font-semibold text-charcoal shrink-0 shadow-sm overflow-hidden relative bg-white">
            {LOGO_MAPPING[builder.slug] ? (
              <div className="w-full h-full p-1.5 relative flex items-center justify-center">
                <Image
                  src={`/assets/images/logos/${LOGO_MAPPING[builder.slug]}`}
                  alt={`${builder.commonName} logo`}
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
            ) : (
              initials
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              {builder.isCoop ? (
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-body text-[8px] font-bold uppercase tracking-wider border border-blue-100/50">
                  Cooperative Board
                </span>
              ) : (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-body text-[8px] font-bold uppercase tracking-wider border border-emerald-100/50">
                  <CheckCircle size={8} /> RERA Verified
                </span>
              )}
            </div>
            <h1 className="font-display text-lg md:text-xl font-medium text-charcoal tracking-tight leading-none mb-1">
              {builder.commonName}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2.5 text-[10px] text-black/50 font-body">
              <span className="flex items-center gap-0.5">
                <Navigation size={10} className="opacity-60" />
                {builder.locations.join(", ") || "Mohali"}
              </span>
              {builder.website && (
                <>
                  <span className="opacity-30">•</span>
                  <a
                    href={builder.website.startsWith("http") ? builder.website : `https://${builder.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-black/60 hover:text-charcoal transition-colors hover:underline"
                  >
                    <Globe size={10} />
                    {builder.website.replace(/^https?:\/\/(www\.)?/, "")}
                    <ExternalLink size={8} />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Content Split */}
      <div className="container-site pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Column (Left Side, 2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SECTION A — The Advisory Verdict */}
            <div className="bg-charcoal/[0.02] border border-charcoal/10 rounded-2xl p-4 relative">
              <div className="absolute top-0 left-6 -translate-y-1/2 bg-charcoal text-white font-body text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Our Advisory Verdict
              </div>
              <p className="font-body text-xs md:text-sm text-charcoal/80 leading-relaxed italic">
                "{builder.advisoryVerdict}"
              </p>
            </div>

            {/* SECTION D — Active Projects Listings */}
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-lg font-medium text-charcoal">
                  Active Listings in Mohali
                </h2>
                <p className="font-body text-[11px] text-black/45">
                  Displaying all verified residential and commercial assets managed by our desk.
                </p>
              </div>

              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="py-16 text-center bg-white border border-black/5 rounded-2xl p-6">
                  <Building2 className="mx-auto text-black/20 mb-3" size={36} />
                  <p className="text-black/40 text-xs font-body">
                    No active listings are currently available under this developer's profile.
                  </p>
                </div>
              )}
            </div>

            {/* SECTION B — Builder At a Glance (Compact Table) */}
            <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-[10px] font-bold text-black/45 uppercase tracking-wider mb-3">
                Builder At a Glance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] font-body">
                  <tbody>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45 w-1/3">Legal Entity Name</td>
                      <td className="py-2 text-charcoal font-medium">{builder.name}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Commonly Known As</td>
                      <td className="py-2 text-charcoal font-medium">{builder.commonName}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Founded</td>
                      <td className="py-2 text-charcoal font-medium">{builder.founded}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Headquarters</td>
                      <td className="py-2 text-charcoal font-medium">{builder.headquarters}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">RERA Status</td>
                      <td className="py-2 text-charcoal font-medium">
                        <span className="text-emerald-600 font-semibold">✅ {builder.reraStatus}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">RERA Registration</td>
                      <td className="py-2 text-charcoal font-medium font-mono">{builder.reraReg}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Active Projects in Mohali</td>
                      <td className="py-2 text-charcoal font-medium">{builder.propertyCount}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Sectors Active</td>
                      <td className="py-2 text-charcoal font-medium">{builder.locations.join(", ")}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Asset Types</td>
                      <td className="py-2 text-charcoal font-medium">{builder.types.join(", ")}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Price Range</td>
                      <td className="py-2 text-charcoal font-medium">{builder.priceRange}</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2 pr-4 font-bold text-black/45">Buyer Profile</td>
                      <td className="py-2 text-charcoal font-medium">{builder.buyerProfile}</td>
                    </tr>
                    {builder.website && (
                      <tr>
                        <td className="py-2 pr-4 font-bold text-black/45">Official Website</td>
                        <td className="py-2 text-charcoal font-medium">
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

            {/* SECTION C — Builder Background & Mohali Presence */}
            <div className="bg-white border border-black/5 p-6 rounded-2xl space-y-4">
              <h2 className="font-display text-lg font-medium text-charcoal">
                Builder Background & Mohali Presence
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">
                    Who They Are
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-black/65">
                    {builder.background.c1}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">
                    Their Mohali Footprint
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-black/65">
                    {builder.background.c2}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION E — Our Advisory Breakdown */}
            <div className="bg-white border border-black/5 p-6 rounded-2xl space-y-6">
              <h2 className="font-display text-lg font-medium text-charcoal">
                Our Advisory Breakdown
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Who this is right for */}
                <div className="space-y-3">
                  <h3 className="font-display text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Who This Builder Is Right For
                  </h3>
                  <ul className="space-y-2">
                    {builder.advisoryBreakdown.rightFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-black/60 font-body leading-relaxed">
                        <span className="text-emerald-500 text-sm font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who should look elsewhere */}
                <div className="space-y-3">
                  <h3 className="font-display text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Who Should Look Elsewhere
                  </h3>
                  <ul className="space-y-2">
                    {builder.advisoryBreakdown.lookElsewhere.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-black/60 font-body leading-relaxed">
                        <span className="text-amber-500 text-sm font-bold shrink-0">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ratings Section */}
              <div className="pt-4 border-t border-black/5 space-y-4">
                <h3 className="font-display text-[10px] font-bold text-black/45 uppercase tracking-wider">
                  Our Advisory Rating
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: "Delivery Track Record", score: builder.advisoryBreakdown.ratings.delivery },
                    { label: "Construction Quality", score: builder.advisoryBreakdown.ratings.quality },
                    { label: "Price Appreciation", score: builder.advisoryBreakdown.ratings.appreciation },
                    { label: "Buyer-Friendliness", score: builder.advisoryBreakdown.ratings.friendliness }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-body text-charcoal">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold">{item.score}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
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
              <div className="bg-white border border-black/5 p-6 rounded-2xl space-y-4">
                <h2 className="font-display text-lg font-medium text-charcoal">
                  Sector & Location Context
                </h2>
                <div className="space-y-4">
                  {builder.sectorContexts.map((ctx, idx) => (
                    <div key={idx} className="space-y-1">
                      <h3 className="font-display text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">
                        {ctx.sector.startsWith("Sector") ? ctx.sector : `Sector ${ctx.sector}`}
                      </h3>
                      <p className="font-body text-xs leading-relaxed text-black/65">
                        {ctx.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION G — Comparison Teaser */}
            {builder.comparables && builder.comparables.length > 0 && (
              <div className="bg-white border border-black/5 p-6 rounded-2xl space-y-3">
                <h2 className="font-display text-base font-medium text-charcoal">
                  Comparing Options?
                </h2>
                <p className="font-body text-xs leading-relaxed text-black/50">
                  Buyers evaluating {builder.commonName} often also consider other developers active in similar price tiers or sectors. View our comparison pages:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {builder.comparables.map((compSlug, idx) => {
                    const compBuilder = (buildersData.builders as any)[compSlug];
                    if (!compBuilder) return null;
                    return (
                      <Link
                        key={idx}
                        href={`/properties/builders/${compSlug}`}
                        className="px-3 py-1.5 rounded-full border border-black/5 hover:border-black/20 bg-black/[0.01] hover:bg-black/[0.03] text-[10px] font-body text-charcoal font-semibold transition-all"
                      >
                        {compBuilder.commonName} Portfolio
                      </Link>
                    );
                  })}
                  <Link
                    href="/properties/builders"
                    className="px-3 py-1.5 rounded-full border border-charcoal/10 hover:bg-charcoal hover:text-white text-[10px] font-body text-charcoal font-semibold transition-all"
                  >
                    View Full Builder Directory
                  </Link>
                </div>
              </div>
            )}

            {/* SECTION H — FAQ Accordion */}
            <div className="bg-white border border-black/5 p-6 rounded-2xl space-y-4">
              <h2 className="font-display text-lg font-medium text-charcoal">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {builder.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="border-b border-black/5 pb-3 last:border-b-0 last:pb-0">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex justify-between items-center text-left py-1 font-display text-xs font-semibold text-charcoal hover:text-charcoal/80 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="text-base font-body leading-none text-black/45">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="mt-1.5 pl-0.5 animate-fadeIn">
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

          {/* Sticky Sidebar Column (Right Side, 1/3 width on desktop) */}
          <div className="space-y-6 lg:sticky lg:top-24">
            
            {/* Developer Stats Card */}
            <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-[10px] uppercase tracking-widest text-black/40 font-bold mb-3">
                Portfolio Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-body text-[9px] uppercase tracking-wider text-black/45 font-bold">
                    Active Listings
                  </span>
                  <span className="font-display text-base font-semibold text-charcoal mt-0.5 block">
                    {builder.propertyCount}
                  </span>
                </div>
                <div>
                  <span className="block font-body text-[9px] uppercase tracking-wider text-black/45 font-bold">
                    Starting Price
                  </span>
                  <span className="font-display text-base font-semibold text-charcoal mt-0.5 block truncate" title={builder.priceRange}>
                    {builder.minPrice > 0 ? (
                      formatPrice(builder.minPrice)
                    ) : (
                      <span className="text-xs font-normal text-black/40 italic">On request</span>
                    )}
                  </span>
                </div>
                <div>
                  <span className="block font-body text-[9px] uppercase tracking-wider text-black/45 font-bold">
                    Footprint
                  </span>
                  <span className="font-display text-xs font-semibold text-charcoal truncate block mt-0.5" title={builder.locations.join(", ")}>
                    {builder.locations.length} {builder.locations.length === 1 ? "Sector" : "Sectors"}
                  </span>
                </div>
                <div>
                  <span className="block font-body text-[9px] uppercase tracking-wider text-black/45 font-bold">
                    Asset Types
                  </span>
                  <span className="font-display text-xs font-semibold text-charcoal truncate block mt-0.5" title={builder.types.join(", ")}>
                    {builder.types.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Developer Trust Badge */}
            <div className="bg-white border border-black/5 p-5 rounded-2xl shadow-sm">
              <h3 className="font-display text-sm font-medium text-charcoal mb-3 flex items-center gap-2">
                {builder.isCoop ? <Users size={16} className="text-blue-500" /> : <Building2 size={16} className="text-emerald-500" />}
                Portfolio Integrity
              </h3>
              
              <p className="font-body text-xs leading-relaxed text-black/50 mb-3">
                Each listing within the {builder.commonName} portfolio has been thoroughly verified by our advisory team. We confirm construction milestones, legal clearances, and pricing structures directly with the builders and cooperative registries.
              </p>

              <div className="space-y-2 pt-2 border-t border-t-black/5 text-[10px] font-body">
                <div className="flex justify-between items-center">
                  <span className="text-black/40 uppercase tracking-widest font-bold">RERA Registration</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={10} stroke="currentColor" /> Compliant
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/40 uppercase tracking-widest font-bold">Entity Classification</span>
                  <span className="font-semibold text-charcoal">
                    {builder.isCoop ? "Cooperative Society" : "Corporate Builder"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/40 uppercase tracking-widest font-bold">Audit Standard</span>
                  <span className="font-semibold text-charcoal">100% Legal Check</span>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white border border-charcoal/10 p-5 rounded-2xl shadow-sm">
              <h3 className="font-display text-sm font-medium text-charcoal mb-1">
                Portfolio Desk Inquiry
              </h3>
              <p className="font-body text-xs text-black/40 mb-4 leading-relaxed">
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


