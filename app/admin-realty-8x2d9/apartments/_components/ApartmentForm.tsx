"use client";
// app/admin-realty-8x2d9/apartments/_components/ApartmentForm.tsx
// ============================================================
// Full-page apartment form
// ============================================================

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, Save, MapPin, ImageIcon, ListChecks,
  CreditCard, FileStack, UserCircle2, Info,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import ImageUploader from "@/components/admin/ImageUploader";
import DynamicListField from "@/components/admin/DynamicListField";
import type { Property, Agent } from "@/types";
import { siteConfig } from "@/config/site";

const PRIMARY_COLOR = "#2563EB"; // blue-600

const ic = "w-full bg-white border border-gray-200 text-gray-900 font-body text-sm px-3 py-2.5 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400";
const lc = "block font-body text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium";
const tc = `${ic} resize-none`;

function Section({ id, icon: Icon, title, children }: {
  id: string; icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <Icon size={18} className="text-blue-600" />
        <h2 className="font-body text-sm font-semibold text-gray-900 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>;
}

function arrayToLines(arr?: string[] | null) { return arr ? arr.join("\n") : ""; }
function linesToArray(v: string) { return v.split("\n").map((l) => l.trim()).filter(Boolean); }
function autoSlug(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const SECTIONS = [
  { id: "basic",    label: "Basic Info",    icon: Info },
  { id: "forensics",label: "Property Forensics", icon: Building2 },
  { id: "location", label: "Location",      icon: MapPin },
  { id: "images",   label: "Images",        icon: ImageIcon },
  { id: "features", label: "Features",      icon: ListChecks },
  { id: "payment",  label: "Payment Plan",  icon: CreditCard },
  { id: "docs",     label: "Documents",     icon: FileStack },
  { id: "agent",    label: "Agent",         icon: UserCircle2 },
];

function defaultForm(p?: any | null) {
  return {
    title:               p?.title ?? "",
    slug:                p?.slug ?? "",
    type:                p?.type ?? "apartment",
    status:              p?.status ?? "available",
    listing_type:        p?.listing_type ?? "sale",
    price:               p?.price ?? 0,
    price_max:           p?.price_max ?? ("" as any),
    price_currency:      p?.price_currency ?? "INR",
    bedrooms:            p?.bedrooms ?? 1,
    bedrooms_max:        p?.bedrooms_max ?? ("" as any),
    bathrooms:           p?.bathrooms ?? 1,
    bathrooms_max:       p?.bathrooms_max ?? ("" as any),
    area_sqft:           p?.area_sqft ?? 0,
    area_sqft_max:       p?.area_sqft_max ?? ("" as any),
    location:            p?.location ?? "Mohali",
    community:           p?.community ?? "Aerocity",
    developer:           p?.developer ?? "",
    developer_website:   p?.developer_website ?? "",
    building_name:       p?.building_name ?? "",
    address:             p?.address ?? "",
    furnishing:          p?.furnishing ?? "unfurnished",
    description:         p?.description ?? "",
    featured:            p?.featured ?? false,
    images:              p?.images ?? [],
    image_count:         p?.image_count ?? ("" as any),
    features:            arrayToLines(p?.features),
    highlights:          arrayToLines(p?.highlights),
    amenities:           arrayToLines(p?.amenities),
    interior_features:   arrayToLines(p?.interior_features),
    amenities_gallery:   p?.amenities_gallery ?? [],
    latitude:            p?.latitude ?? ("" as any),
    longitude:           p?.longitude ?? ("" as any),
    pp_down:             p?.payment_plan?.down_payment ?? ("" as any),
    pp_construction:     p?.payment_plan?.during_construction ?? ("" as any),
    pp_handover:         p?.payment_plan?.on_handover ?? ("" as any),
    nearby_landmarks:    p?.nearby_landmarks ?? [],
    documents:           p?.documents ?? [],
    faqs:                p?.faqs ?? [],
    unit_types:          p?.unit_types ?? [],
    rera_number:         p?.rera_number ?? "",
    completion_date:     p?.completion_date ?? "",
    handover_date:       p?.handover_date ?? "",
    price_sqft_min:      p?.price_sqft_min ?? ("" as any),
    price_sqft_max:      p?.price_sqft_max ?? ("" as any),
    tower_count:         p?.tower_count ?? ("" as any),
    floor_count:         p?.floor_count ?? ("" as any),
    total_units:         p?.total_units ?? ("" as any),
    project_area_acres:  p?.project_area_acres ?? ("" as any),
    unit_types_image:    p?.unit_types_image ?? "",
    unit_types_coming_soon: p?.unit_types_coming_soon ?? false,
    agent_id:            p?.agent_id ?? "",
    agent_name:          p?.agent_name ?? "",
    agent_title:         p?.agent_title ?? "",
    agent_email:         p?.agent_email ?? "",
    agent_phone:         p?.agent_phone ?? "",
    agent_photo:         p?.agent_photo ?? "",
    agent_languages:     p?.agent_languages?.join(", ") ?? "",
    upcoming_infrastructure: arrayToLines(p?.upcoming_infrastructure),
    videos:              arrayToLines(p?.videos),
    alternate_names:     arrayToLines(p?.alternate_names),
  };
}

export default function ApartmentForm({ apartment }: { apartment?: any | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [form, setForm] = useState(() => defaultForm(apartment));

  const f = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    (supabase.from("agents") as any)
      .select("*")
      .eq("active", true)
      .order("name")
      .then(({ data }: any) => setAgents(data ?? []));
  }, []);

  function handleAgentSelect(agentId: string) {
    f("agent_id", agentId);
    if (!agentId) return;
    const a = agents.find((ag) => ag.id === agentId);
    if (!a) return;
    setForm((p) => ({
      ...p,
      agent_id:       a.id,
      agent_name:     a.name,
      agent_title:    a.title ?? "",
      agent_email:    a.email ?? "",
      agent_phone:    a.phone ?? "",
      agent_photo:    a.photo_url ?? "",
      agent_languages: a.languages?.join(", ") ?? "",
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (form.images.length === 0) {
      toast.error("Please upload at least one image");
      setSaving(false);
      return;
    }

    const payload: any = {
      title: form.title,
      slug: form.slug,
      type: form.type,
      status: form.status,
      listing_type: form.listing_type,
      price: form.price || 0,
      price_max: form.price_max !== "" ? +form.price_max : null,
      price_currency: form.price_currency,
      bedrooms: form.bedrooms !== "" ? +form.bedrooms : null,
      bedrooms_max: form.bedrooms_max !== "" ? +form.bedrooms_max : null,
      bathrooms: form.bathrooms !== "" ? +form.bathrooms : null,
      bathrooms_max: form.bathrooms_max !== "" ? +form.bathrooms_max : null,
      area_sqft: form.area_sqft || 0,
      area_sqft_max: form.area_sqft_max !== "" ? +form.area_sqft_max : null,
      location: form.location,
      community: form.community,
      developer: form.developer,
      developer_website: form.developer_website || null,
      building_name: form.building_name || null,
      address: form.address || null,
      furnishing: form.furnishing,
      description: form.description,
      featured: form.featured,
      images: form.images,
      image_count: form.image_count !== "" ? +form.image_count : form.images.length || null,
      features: linesToArray(form.features),
      highlights: linesToArray(form.highlights),
      amenities: linesToArray(form.amenities),
      interior_features: linesToArray(form.interior_features),
      amenities_gallery: form.amenities_gallery,
      latitude: form.latitude !== "" ? +form.latitude : null,
      longitude: form.longitude !== "" ? +form.longitude : null,
      payment_plan: (form.pp_down !== "" || form.pp_construction !== "" || form.pp_handover !== "")
        ? { down_payment: +form.pp_down, during_construction: +form.pp_construction, on_handover: +form.pp_handover }
        : null,
      nearby_landmarks: form.nearby_landmarks.length > 0 ? form.nearby_landmarks : null,
      documents: form.documents.length > 0 ? form.documents : null,
      faqs: form.faqs.length > 0 ? form.faqs : null,
      unit_types: form.unit_types.length > 0 ? form.unit_types : null,
      rera_number: form.rera_number || null,
      completion_date: form.completion_date || null,
      handover_date: form.handover_date || null,
      price_sqft_min: form.price_sqft_min !== "" ? +form.price_sqft_min : null,
      price_sqft_max: form.price_sqft_max !== "" ? +form.price_sqft_max : null,
      tower_count: form.tower_count !== "" ? +form.tower_count : null,
      floor_count: form.floor_count !== "" ? +form.floor_count : null,
      total_units: form.total_units !== "" ? +form.total_units : null,
      project_area_acres: form.project_area_acres !== "" ? +form.project_area_acres : null,
      unit_types_image: form.unit_types_image || null,
      unit_types_coming_soon: form.unit_types_coming_soon,
      agent_id: form.agent_id || null,
      agent_name: form.agent_name || null,
      agent_title: form.agent_title || null,
      agent_email: form.agent_email || null,
      agent_phone: form.agent_phone || null,
      agent_photo: form.agent_photo || null,
      agent_languages: form.agent_languages
        ? form.agent_languages.split(",").map((l: string) => l.trim()).filter(Boolean)
        : null,
      upcoming_infrastructure: linesToArray(form.upcoming_infrastructure),
      videos: linesToArray(form.videos),
      alternate_names: linesToArray(form.alternate_names),
      updated_at: new Date().toISOString(),
    };

    try {
      if (apartment) {
        const { error } = await (supabase.from("apartments") as any).update(payload).eq("id", apartment.id);
        if (error) throw error;
        toast.success("Apartment updated");
      } else {
        const { error } = await (supabase.from("apartments") as any).insert(payload);
        if (error) throw error;
        toast.success("Apartment created");
        router.push("/admin-realty-8x2d9/apartments");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form onSubmit={handleSave} className="min-h-screen bg-[#F9F9FA] pb-12">
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 flex items-center gap-4 px-6 py-4 shadow-sm">
        <Link href="/admin-realty-8x2d9/apartments" className="flex items-center gap-1.5 font-body text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft size={16} /> Apartments
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-body text-sm font-medium text-gray-900">
          {apartment ? "Edit Apartment" : "New Apartment"}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/admin-realty-8x2d9/apartments"
            className="px-4 py-2 border border-gray-200 text-gray-600 font-body font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-body font-medium text-sm transition-all disabled:opacity-60 bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
            <Save size={16} />
            {saving ? "Saving..." : apartment ? "Update Apartment" : "Create Apartment"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 flex items-start gap-8 mt-8 pb-12">
        <aside className="hidden xl:block w-56 shrink-0 self-start sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
          <div className="space-y-1">
            {SECTIONS.map((s) => (
              <button key={s.id} type="button" onClick={() => scrollTo(s.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all text-left font-medium">
                <s.icon size={16} className="text-gray-400" />
                {s.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0 space-y-6">
          <Section id="basic" icon={Info} title="Basic Info">
            <div className="space-y-4">
              <div>
                <label className={lc}>Title *</label>
                <input type="text" required value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, slug: autoSlug(e.target.value) }))}
                  className={ic} placeholder="e.g. Luxury Penthouse in Sector 82" />
              </div>
              <div>
                <label className={lc}>URL Slug *</label>
                <input type="text" required value={form.slug}
                  onChange={(e) => f("slug", e.target.value)} className={ic} />
              </div>
              <Row>
                <div>
                  <label className={lc}>Apartment Type *</label>
                  <select required value={form.type} onChange={(e) => f("type", e.target.value)} className={ic}>
                    {["apartment", "penthouse", "studio"].map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={lc}>Listing Type *</label>
                  <select required value={form.listing_type} onChange={(e) => f("listing_type", e.target.value)} className={ic}>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="off-plan">Off Plan</option>
                  </select>
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Price (Min) *</label>
                  <input type="number" required value={form.price} onChange={(e) => f("price", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Price (Max)</label>
                  <input type="number" value={form.price_max} onChange={(e) => f("price_max", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Currency *</label>
                  <select required value={form.price_currency} onChange={(e) => f("price_currency", e.target.value)} className={ic}>
                    <option>INR</option><option>USD</option><option>CAD</option><option>AUD</option>
                  </select>
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Bedrooms (Min)</label>
                  <input type="number" value={form.bedrooms ?? ""} onChange={(e) => f("bedrooms", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Bedrooms (Max)</label>
                  <input type="number" value={form.bedrooms_max} onChange={(e) => f("bedrooms_max", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Bathrooms (Min)</label>
                  <input type="number" value={form.bathrooms ?? ""} onChange={(e) => f("bathrooms", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Bathrooms (Max)</label>
                  <input type="number" value={form.bathrooms_max ?? ""} onChange={(e) => f("bathrooms_max", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Area (sqft) (Min) *</label>
                  <input type="number" required value={form.area_sqft} onChange={(e) => f("area_sqft", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Area (sqft) (Max)</label>
                  <input type="number" value={form.area_sqft_max ?? ""} onChange={(e) => f("area_sqft_max", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Status</label>
                  <select value={form.status} onChange={(e) => f("status", e.target.value)} className={ic}>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                    <option value="off-plan">Off Plan</option>
                  </select>
                </div>
                <div>
                  <label className={lc}>Furnishing</label>
                  <select value={form.furnishing} onChange={(e) => f("furnishing", e.target.value)} className={ic}>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="furnished">Furnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                  </select>
                </div>
              </Row>
              <div>
                <label className={lc}>Description *</label>
                <textarea required rows={5} value={form.description} onChange={(e) => f("description", e.target.value)} className={tc} />
              </div>
              <Row>
                <div>
                  <label className={lc}>Developer</label>
                  <input type="text" value={form.developer} onChange={(e) => f("developer", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Building Name</label>
                  <input type="text" value={form.building_name} onChange={(e) => f("building_name", e.target.value)} className={ic} />
                </div>
              </Row>
              <div className="flex items-center gap-3 pt-2 pb-2">
                <input type="checkbox" id="featured" checked={form.featured}
                  onChange={(e) => f("featured", e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label htmlFor="featured" className="font-body text-sm font-medium text-gray-700">
                  Featured property
                </label>
              </div>
              <div className="pt-2">
                <label className={lc}>Alternate Names / Aliases (one per line)</label>
                <textarea rows={3} value={form.alternate_names} onChange={(e) => f("alternate_names", e.target.value)} className={tc} placeholder="e.g. Beverly Golf Hills" />
                <p className="text-[11px] text-gray-400 mt-1.5 italic">Used for SEO entity bridging and rich snippets.</p>
              </div>
            </div>
          </Section>

          <Section id="forensics" icon={Building2} title="Property Forensics">
            <div className="space-y-4">
              <Row>
                <div>
                  <label className={lc}>RERA Number</label>
                  <input type="text" value={form.rera_number} onChange={(e) => f("rera_number", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Project Area (Acres)</label>
                  <input type="number" value={form.project_area_acres} onChange={(e) => f("project_area_acres", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Completion Date</label>
                  <input type="text" value={form.completion_date} onChange={(e) => f("completion_date", e.target.value)} className={ic} placeholder="e.g. Q4 2025" />
                </div>
                <div>
                  <label className={lc}>Handover Date</label>
                  <input type="text" value={form.handover_date} onChange={(e) => f("handover_date", e.target.value)} className={ic} placeholder="e.g. Dec 2025" />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Total Towers</label>
                  <input type="number" value={form.tower_count} onChange={(e) => f("tower_count", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Total Floors</label>
                  <input type="number" value={form.floor_count} onChange={(e) => f("floor_count", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Total Units</label>
                  <input type="number" value={form.total_units} onChange={(e) => f("total_units", e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Price / SqFt (Min)</label>
                  <input type="number" value={form.price_sqft_min} onChange={(e) => f("price_sqft_min", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Price / SqFt (Max)</label>
                  <input type="number" value={form.price_sqft_max} onChange={(e) => f("price_sqft_max", e.target.value)} className={ic} />
                </div>
              </Row>
              
              <div className="pt-6 border-t border-gray-100">
                <DynamicListField
                  label="Unit Types"
                  value={form.unit_types}
                  onChange={(val) => f("unit_types", val)}
                  addButtonText="Add Unit Type"
                  emptyItem={{ bhk: "", type_count: "", size_min: "", size_max: "", price: "" }}
                  columns={[
                    { key: "bhk", label: "BHK Type (e.g. 3+1BHK)", type: "text" },
                    { key: "type_count", label: "Type Count (e.g. 5)", type: "number" },
                    { key: "size_min", label: "Size Min (sqft)", type: "number" },
                    { key: "size_max", label: "Size Max (sqft)", type: "number" },
                    { key: "price", label: "Price String", type: "text" }
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="location" icon={MapPin} title="Location">
            <div className="space-y-4">
              <Row>
                <div>
                  <label className={lc}>City *</label>
                  <input type="text" required value={form.location} onChange={(e) => f("location", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Community *</label>
                  <input type="text" required value={form.community} onChange={(e) => f("community", e.target.value)} className={ic} />
                </div>
              </Row>
              <div>
                <label className={lc}>Street Address</label>
                <input type="text" value={form.address} onChange={(e) => f("address", e.target.value)} className={ic} />
              </div>
              <div className="pt-6 border-t border-gray-100 mt-6">
                <DynamicListField
                  label="Nearby Landmarks"
                  value={form.nearby_landmarks}
                  onChange={(val) => f("nearby_landmarks", val)}
                  addButtonText="Add Landmark"
                  emptyItem={{ name: "", time: "", transport: "car" }}
                  columns={[
                    { key: "name", label: "Landmark Name", type: "text" },
                    { key: "time", label: "Time (minutes)", type: "number" },
                    { key: "transport", label: "Transport Type (car/walk/metro)", type: "text" }
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="images" icon={ImageIcon} title="Images">
            <div className="space-y-6">
              <ImageUploader value={form.images} onChange={(urls) => f("images", urls)} />
              <div className="border-t border-black/[0.06] pt-6">
                <label className={lc}>Video URLs (one per line)</label>
                <textarea rows={3} value={form.videos} onChange={(e) => f("videos", e.target.value)} className={tc} />
              </div>
            </div>
          </Section>

          <Section id="features" icon={ListChecks} title="Features & Content">
            <div className="space-y-4">
              <div>
                <label className={lc}>Amenities (one per line)</label>
                <textarea rows={5} value={form.amenities} onChange={(e) => f("amenities", e.target.value)} className={tc} />
              </div>
              <div>
                <label className={lc}>Features (one per line)</label>
                <textarea rows={5} value={form.features} onChange={(e) => f("features", e.target.value)} className={tc} />
              </div>
              <div className="pt-6 border-t border-gray-100">
                <DynamicListField
                  label="FAQs"
                  value={form.faqs}
                  onChange={(val) => f("faqs", val)}
                  addButtonText="Add FAQ"
                  emptyItem={{ question: "", answer: "" }}
                  columns={[
                    { key: "question", label: "Question", type: "text" },
                    { key: "answer", label: "Answer", type: "textarea" }
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="payment" icon={CreditCard} title="Payment Plan">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lc}>Down Payment %</label>
                <input type="number" value={form.pp_down} onChange={(e) => f("pp_down", e.target.value)} className={ic} />
              </div>
              <div>
                <label className={lc}>Construction %</label>
                <input type="number" value={form.pp_construction} onChange={(e) => f("pp_construction", e.target.value)} className={ic} />
              </div>
              <div>
                <label className={lc}>Handover %</label>
                <input type="number" value={form.pp_handover} onChange={(e) => f("pp_handover", e.target.value)} className={ic} />
              </div>
            </div>
          </Section>

          <Section id="docs" icon={FileStack} title="Documents">
            <DynamicListField
              label="Documents & Brochures"
              value={form.documents}
              onChange={(val) => f("documents", val)}
              addButtonText="Add Document"
              emptyItem={{ name: "", url: "", coming_soon: false }}
              columns={[
                { key: "name", label: "Document Name", type: "text" },
                { key: "url", label: "Document URL", type: "url" },
                { key: "coming_soon", label: "Coming Soon?", type: "checkbox" }
              ]}
            />
          </Section>

          <Section id="agent" icon={UserCircle2} title="Listing Agent">
            <select value={form.agent_id} onChange={(e) => handleAgentSelect(e.target.value)} className={ic}>
              <option value="">— Select Agent —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </Section>

          <div className="flex items-center justify-between py-6">
            <Link href="/admin-realty-8x2d9/apartments" className="font-body text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
              &larr; Back to Apartments
            </Link>
            <button type="submit" disabled={saving}
              className="px-8 py-3 rounded-xl font-body font-semibold text-sm transition-all disabled:opacity-60 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">
              {saving ? "Saving..." : apartment ? "Update Apartment" : "Create Apartment"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
