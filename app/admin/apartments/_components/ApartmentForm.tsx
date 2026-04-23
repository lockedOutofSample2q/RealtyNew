"use client";
// app/admin/apartments/_components/ApartmentForm.tsx
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
import type { Property, Agent } from "@/types";
import { siteConfig } from "@/config/site";

const GOLD = "#C9A84C";

const ic = "w-full bg-[#F7F6F3] border border-black/[0.1] text-[#0A0A0A] font-body text-sm px-3 py-2.5 rounded-lg outline-none focus:border-amber-400 transition-colors placeholder:text-[#bbb]";
const lc = "block font-body text-xs text-[#888] uppercase tracking-wider mb-1.5";
const tc = `${ic} resize-none`;

function Section({ id, icon: Icon, title, children }: {
  id: string; icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-black/[0.06]" style={{ backgroundColor: "#FAFAF8" }}>
        <Icon size={16} style={{ color: GOLD }} />
        <h2 className="font-body text-sm font-semibold text-[#0A0A0A] uppercase tracking-wider">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function arrayToLines(arr?: string[] | null) { return arr ? arr.join("\n") : ""; }
function linesToArray(v: string) { return v.split("\n").map((l) => l.trim()).filter(Boolean); }
function autoSlug(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const SECTIONS = [
  { id: "basic",    label: "Basic Info",    icon: Info },
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
    price_currency:      p?.price_currency ?? "INR",
    bedrooms:            p?.bedrooms ?? 1,
    bedrooms_max:        p?.bedrooms_max ?? ("" as any),
    bathrooms:           p?.bathrooms ?? 1,
    area_sqft:           p?.area_sqft ?? 0,
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
    nearby_landmarks_json: p?.nearby_landmarks ? JSON.stringify(p.nearby_landmarks, null, 2) : "",
    documents_json:      p?.documents ? JSON.stringify(p.documents, null, 2) : "",
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

    let nearby_landmarks = null;
    let documents = null;
    try { nearby_landmarks = form.nearby_landmarks_json ? JSON.parse(form.nearby_landmarks_json) : null; }
    catch { toast.error("Nearby Landmarks JSON is invalid"); setSaving(false); return; }
    try { documents = form.documents_json ? JSON.parse(form.documents_json) : null; }
    catch { toast.error("Documents JSON is invalid"); setSaving(false); return; }

    const payload: any = {
      title: form.title,
      slug: form.slug,
      type: form.type,
      status: form.status,
      listing_type: form.listing_type,
      price: form.price || 0,
      price_currency: form.price_currency,
      bedrooms: form.bedrooms || null,
      bedrooms_max: form.bedrooms_max !== "" ? +form.bedrooms_max : null,
      bathrooms: form.bathrooms,
      area_sqft: form.area_sqft,
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
      nearby_landmarks,
      documents,
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
        router.push("/admin/apartments");
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
    <form onSubmit={handleSave} className="min-h-screen" style={{ backgroundColor: "#F7F6F3" }}>
      <div className="sticky top-14 z-30 bg-white border-b border-black/[0.06] flex items-center gap-4 -mx-6 -mt-6 px-6 py-3">
        <Link href="/admin/apartments" className="flex items-center gap-1.5 font-body text-sm text-[#888] hover:text-[#0A0A0A] transition-colors">
          <ChevronLeft size={16} /> Apartments
        </Link>
        <span className="text-[#ddd]">/</span>
        <span className="font-body text-sm text-[#0A0A0A]">
          {apartment ? "Edit Apartment" : "New Apartment"}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/admin/apartments"
            className="px-4 py-2 border border-black/[0.12] text-[#666] font-body text-sm rounded-lg hover:text-[#0A0A0A] hover:border-black/25 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-body font-medium text-sm transition-all disabled:opacity-60"
            style={{ backgroundColor: GOLD, color: "#fff" }}>
            <Save size={14} />
            {saving ? "Saving..." : apartment ? "Update Apartment" : "Create Apartment"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 flex items-start gap-8 mt-8 pb-12">
        <aside className="hidden xl:block w-44 shrink-0 self-start sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
          <div className="space-y-0.5">
            {SECTIONS.map((s) => (
              <button key={s.id} type="button" onClick={() => scrollTo(s.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-body text-sm text-[#888] hover:text-[#0A0A0A] hover:bg-black/[0.04] transition-all text-left">
                <s.icon size={14} style={{ color: GOLD }} />
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
                  <label className={lc}>Price *</label>
                  <input type="number" required value={form.price} onChange={(e) => f("price", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Currency *</label>
                  <select required value={form.price_currency} onChange={(e) => f("price_currency", e.target.value)} className={ic}>
                    <option>INR</option><option>USD</option><option>CAD</option><option>AUD</option>
                  </select>
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Bedrooms</label>
                  <input type="number" value={form.bedrooms ?? ""} onChange={(e) => f("bedrooms", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Bathrooms</label>
                  <input type="number" value={form.bathrooms} onChange={(e) => f("bathrooms", +e.target.value)} className={ic} />
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Area (sqft) *</label>
                  <input type="number" required value={form.area_sqft} onChange={(e) => f("area_sqft", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Status</label>
                  <select value={form.status} onChange={(e) => f("status", e.target.value)} className={ic}>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                    <option value="off-plan">Off Plan</option>
                  </select>
                </div>
              </Row>
              <div>
                <label className={lc}>Furnishing</label>
                <select value={form.furnishing} onChange={(e) => f("furnishing", e.target.value)} className={ic}>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="furnished">Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                </select>
              </div>
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
              <div className="flex items-center gap-3 pt-1">
                <input type="checkbox" id="featured" checked={form.featured}
                  onChange={(e) => f("featured", e.target.checked)}
                  className="w-4 h-4 rounded" style={{ accentColor: GOLD }} />
                <label htmlFor="featured" className="font-body text-sm text-[#555]">
                  Featured property
                </label>
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
            <textarea rows={5} value={form.documents_json} onChange={(e) => f("documents_json", e.target.value)}
              className={`${tc} font-mono text-xs`} placeholder="[]" />
          </Section>

          <Section id="agent" icon={UserCircle2} title="Listing Agent">
            <select value={form.agent_id} onChange={(e) => handleAgentSelect(e.target.value)} className={ic}>
              <option value="">— Select Agent —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </Section>

          <div className="flex items-center justify-between py-4">
            <Link href="/admin/apartments" className="font-body text-sm text-[#888] hover:text-[#0A0A0A] transition-colors">
              ← Back to Apartments
            </Link>
            <button type="submit" disabled={saving}
              className="px-8 py-3 rounded-xl font-body font-medium text-sm transition-all disabled:opacity-60"
              style={{ backgroundColor: GOLD, color: "#fff" }}>
              {saving ? "Saving..." : apartment ? "Update Apartment" : "Create Apartment"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
