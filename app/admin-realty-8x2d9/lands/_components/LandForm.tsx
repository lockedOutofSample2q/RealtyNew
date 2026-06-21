"use client";
// app/admin-realty-8x2d9/lands/_components/LandForm.tsx
// ============================================================
// Full-page lands form
// ============================================================

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, Save, MapPin, ImageIcon, Info, ListChecks, FileStack
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import ImageUploader from "@/components/admin/ImageUploader";

import DynamicListField from "@/components/admin/DynamicListField";

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
  { id: "location", label: "Location",      icon: MapPin },
  { id: "images",   label: "Images",        icon: ImageIcon },
  { id: "features", label: "Features",      icon: ListChecks },
  { id: "docs",     label: "Documents",     icon: FileStack },
];

function defaultForm(p?: any | null) {
  return {
    title:               p?.title ?? "",
    slug:                p?.slug ?? "",
    type:                p?.type ?? "agricultural",
    status:              p?.status ?? "available",
    listing_type:        p?.listing_type ?? "sale",
    price:               p?.price ?? 0,
    price_currency:      p?.price_currency ?? "INR",
    area_sqft:           p?.area_sqft ?? 0,
    zoning:              p?.zoning ?? "",
    location:            p?.location ?? "Mohali",
    community:           p?.community ?? "",
    developer:           p?.developer ?? "",
    description:         p?.description ?? "",
    featured:            p?.featured ?? false,
    images:              p?.images ?? [],
    features:            arrayToLines(p?.features),
    highlights:          arrayToLines(p?.highlights),
    latitude:            p?.latitude ?? ("" as any),
    longitude:           p?.longitude ?? ("" as any),
    faqs:                p?.faqs ?? [],
    documents:           p?.documents ?? [],
    nearby_landmarks:    p?.nearby_landmarks ?? [],
  };
}

export default function LandForm({ land }: { land?: any | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => defaultForm(land));

  const f = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: any = {
      ...form,
      price: +form.price || 0,
      area_sqft: +form.area_sqft || 0,
      features: linesToArray(form.features),
      highlights: linesToArray(form.highlights),
      latitude: form.latitude !== "" ? +form.latitude : null,
      longitude: form.longitude !== "" ? +form.longitude : null,
      faqs: form.faqs.length > 0 ? form.faqs : null,
      documents: form.documents.length > 0 ? form.documents : null,
      nearby_landmarks: form.nearby_landmarks.length > 0 ? form.nearby_landmarks : null,
      updated_at: new Date().toISOString(),
    };

    try {
      if (land) {
        const { error } = await (supabase.from("lands") as any).update(payload).eq("id", land.id);
        if (error) throw error;
        toast.success("Lands updated");
      } else {
        const { error } = await (supabase.from("lands") as any).insert(payload);
        if (error) throw error;
        toast.success("Lands created");
        router.push("/admin-realty-8x2d9/lands");
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
        <Link href="/admin-realty-8x2d9/lands" className="flex items-center gap-1.5 font-body text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft size={16} /> Lands
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-body text-sm font-medium text-gray-900">
          {land ? "Edit Lands" : "New Lands"}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/admin-realty-8x2d9/lands"
            className="px-4 py-2 border border-gray-200 text-gray-600 font-body font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-body font-medium text-sm transition-all disabled:opacity-60 bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
            <Save size={16} />
            {saving ? "Saving..." : land ? "Update Lands" : "Create Lands"}
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
                  className={ic} />
              </div>
              <Row>
                <div>
                  <label className={lc}>Lands Type</label>
                  <select value={form.type} onChange={(e) => f("type", e.target.value)} className={ic}>
                    <option value="agricultural">Agricultural</option>
                    <option value="residential">Residential Plot</option>
                    <option value="industrial">Industrial</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className={lc}>Status</label>
                  <select value={form.status} onChange={(e) => f("status", e.target.value)} className={ic}>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </Row>
              <Row>
                <div>
                  <label className={lc}>Price</label>
                  <input type="number" value={form.price} onChange={(e) => f("price", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Area (sqft)</label>
                  <input type="number" value={form.area_sqft} onChange={(e) => f("area_sqft", +e.target.value)} className={ic} />
                </div>
              </Row>
              <div>
                <label className={lc}>Zoning</label>
                <input type="text" value={form.zoning} onChange={(e) => f("zoning", e.target.value)} className={ic} placeholder="e.g. Mixed Use" />
              </div>
              <div>
                <label className={lc}>Description</label>
                <textarea rows={5} value={form.description} onChange={(e) => f("description", e.target.value)} className={tc} />
              </div>
            </div>
          </Section>

          <Section id="location" icon={MapPin} title="Location">
            <div className="space-y-4">
              <Row>
                <div>
                  <label className={lc}>City</label>
                  <input type="text" value={form.location} onChange={(e) => f("location", e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Community</label>
                  <input type="text" value={form.community} onChange={(e) => f("community", e.target.value)} className={ic} />
                </div>
              </Row>
              <div className="pt-6 border-t border-gray-100">
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
            <ImageUploader value={form.images} onChange={(urls) => f("images", urls)} />
          </Section>
          
          <Section id="features" icon={ListChecks} title="Features & Content">
            <div className="space-y-4">
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
          
          <div className="flex items-center justify-between py-6">
            <Link href="/admin-realty-8x2d9/lands" className="font-body text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
              &larr; Back to Lands
            </Link>
            <button type="submit" disabled={saving}
              className="px-8 py-3 rounded-xl font-body font-semibold text-sm transition-all disabled:opacity-60 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">
              {saving ? "Saving..." : land ? "Update Lands" : "Create Lands"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
