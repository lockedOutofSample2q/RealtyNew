/**
 * Property Detail Page - Houses
 */
import { createAdminClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronLeft, ChevronRight, Share2, MapPin, Building2, ArrowRight, FileText, Download
} from "lucide-react";
import type { Property, NearbyLandmark } from "@/types";
import { AmenityIcon } from "@/components/ui/AmenityIcons";
import { enrichProperty } from "@/lib/property-utils";
import { cn } from "@/lib/utils";
import InquiryForm, { PropertyGallery } from "../../properties/[slug]/InquiryForm";
import PriceDisplay from "../../properties/[slug]/PriceDisplay";
import PropertyDetailMapClient from "../../properties/[slug]/PropertyDetailMapClient";
import PropertyCard from "@/components/ui/PropertyCard";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("houses").select("slug");
    return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error) return null;
    return data as Property | null;
  } catch {
    return null;
  }
}

async function getRelatedProperties(property: Property): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .neq("id", property.id)
      .eq("entity_type", "house")
      .limit(4);
    
    return (data ?? []) as Property[];
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const p = await getProperty(params.slug);
  if (!p) return {};
  
  const cleanTitle = p.title.replace(/\s*\|\s*Monte Real Estate/gi, '').replace(/\s*\|\s*Realty Holding and Management Consultants/gi, '');

  return {
    title: { absolute: cleanTitle },
    description: p.meta_description || p.description?.slice(0, 160),
    other: { thumbnail: p.images?.[0] || '/favicon.ico' }
  };
}

export const revalidate = 60;

export default async function HouseDetailPage(props: Props) {
  const params = await props.params;
  const rawProperty = await getProperty(params.slug);
  if (!rawProperty) notFound();

  const property = enrichProperty(rawProperty);
  const related = await getRelatedProperties(property);

  const backHref = "/houses";
  const backLabel = "Houses";
  const listingLabel = "House For Sale";

  const bedroomsDisplay = property.bedrooms === 0 ? "Studio" : String(property.bedrooms ?? "—");

  return (
    <>
      <meta name="thumbnail" content={property.images?.[0] || "/favicon.ico"} />
      <main className="bg-white min-h-screen pt-[var(--nav-height)]">

        {/* Breadcrumb */}
        <div className="border-b border-black/6">
          <div className="container-site py-3 flex items-center gap-1.5 text-[13px] text-black/40">
            <Link href={backHref} className="flex items-center gap-1 hover:text-black transition-colors">
              <ChevronLeft size={14} /> Back
            </Link>
            <ChevronRight size={12} className="text-black/20" />
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={12} className="text-black/20" />
            <Link href={backHref} className="hover:text-black transition-colors">{backLabel}</Link>
            <ChevronRight size={12} className="text-black/20" />
            <span className="text-black/70 truncate max-w-[200px]">{property.title}</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="container-site">
          <PropertyGallery 
            images={property.images} 
            videos={property.videos}
            title={property.title}
            imageCountOverride={property.image_count}
          />
        </div>

        <article className="container-site pb-24">
          {property.address && (
            <p className="text-[12px] text-black/40 mb-4 flex items-center gap-1">
              <MapPin size={11} /> {property.address}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">
            <div>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-3">
                <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-black leading-tight tracking-tight font-display">
                  {property.title}
                </h1>
              </div>
              <span className="inline-block text-[11px] text-black/40 border border-black/10 rounded px-2 py-0.5 mb-5 uppercase tracking-wider">
                {listingLabel}
              </span>

              {/* Description (Multi-paragraph support) */}
              <div className="space-y-4 mb-8">
                {property.description?.split('\n').map((para, i) => (
                  para.trim() && (
                    <p key={i} className="text-[15px] text-black/60 leading-relaxed">
                      {para.trim()}
                    </p>
                  )
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-5 sm:gap-14 flex-wrap py-6 mb-8 border-y border-black/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Size</p>
                  <p className="text-[17px] font-bold text-black font-display">
                    {property.area_sqft ? `${property.area_sqft.toLocaleString()} sqft` : 'N/A'}
                  </p>
                </div>
                {property.bedrooms !== null && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Bedrooms</p>
                    <p className="text-[17px] font-bold text-black font-display">{bedroomsDisplay}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Bathrooms</p>
                  <p className="text-[17px] font-bold text-black font-display">{property.bathrooms ?? "—"}</p>
                </div>
                {property.tower_count && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Towers</p>
                    <p className="text-[17px] font-bold text-black font-display">{property.tower_count}</p>
                  </div>
                )}
              </div>

              {/* Analysis */}
              {(property.transfer_trap_analysis || property.lifestyle_tax_analysis) && (
                <section className="mb-16">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Structural Audit & Forensics</h2>
                  <div className="grid grid-cols-1 gap-8">
                    {property.transfer_trap_analysis && (
                      <div className="bg-orange-50/30 border border-orange-100 rounded-3xl p-8">
                        <h3 className="text-[11px] font-black text-orange-700 uppercase tracking-[0.2em] mb-4">The Transfer Trap</h3>
                        <p className="text-[15px] text-orange-900/80 leading-relaxed font-medium">{property.transfer_trap_analysis}</p>
                      </div>
                    )}
                    {property.lifestyle_tax_analysis && (
                      <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-8">
                        <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-[0.2em] mb-4">The Lifestyle Tax</h3>
                        <p className="text-[15px] text-blue-900/80 leading-relaxed font-medium">{property.lifestyle_tax_analysis}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Highlights */}
              {(property.highlights?.length ?? 0) > 0 && (
                <section className="mb-16">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Key Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                    {property.highlights!.map((h) => (
                      <div key={h} className="flex items-start gap-4">
                        <span className="text-black text-sm mt-0.5 opacity-60">✓</span>
                        <span className="text-[15px] text-black/70 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Amenities */}
              {(property.amenities?.length ?? 0) > 0 && (
                <section className="mb-16">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
                    {property.amenities!.map((a) => (
                      <div key={a} className="flex items-center gap-3">
                        <AmenityIcon name={a} />
                        <span className="text-[14px] text-black/70">{a}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {(property.faqs?.length ?? 0) > 0 && (
                <section className="mt-14 pt-14 border-t border-black/5">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Investment FAQ</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {property.faqs!.map((faq, i) => (
                      <div key={i} className="group">
                        <h3 className="text-[16px] font-bold text-black mb-3 group-hover:text-orange-600 transition-colors leading-tight font-display">
                          {faq.question}
                        </h3>
                        <p className="text-black/60 text-[14px] leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Project Assets & Documents */}
              {(property.documents?.length ?? 0) > 0 && (
                <section className="mt-14 pt-14 border-t border-black/5">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Project Assets & Documents</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.documents!.map((doc, i) => (
                      <a 
                        key={i} 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-5 bg-black/[0.02] border border-black/5 rounded-2xl hover:bg-black/[0.04] transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-black/5">
                            <FileText size={20} className="text-black/40 group-hover:text-black transition-colors" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-black font-display">{doc.name}</p>
                            <p className="text-[11px] text-black/30 uppercase tracking-widest font-bold">PDF Document</p>
                          </div>
                        </div>
                        <Download size={18} className="text-black/20 group-hover:text-black transition-colors" />
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 transition-all">
              <div className="border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <PriceDisplay price={property.price} price_max={property.price_max} listingLabel={listingLabel} />
                <div className="p-6 border-b border-black/5">
                  <p className="text-sm font-bold text-black mb-4 font-display">Inquire About This House</p>
                  <InquiryForm propertyId={property.id} propertyTitle={property.title} entityType="house" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-4">Assigned Advisor</p>
                  <Link href="/about" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-black/5 relative">
                      <Image src="/assets/images/leadership/amritpal.jpg" alt="Amritpal Singh" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black group-hover:underline font-display">Amritpal Singh</p>
                      <p className="text-[11px] text-black/40">MD</p>
                    </div>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}
