"use client";
// app/admin/houses/_components/HouseForm.tsx
// ============================================================
// Full-page house form (Villas/Townhouses)
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
import type { Agent } from "@/types";

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
    type:                p?.type ?? "villa",
    status:              p?.status ?? "available",
    listing_type:        p?.listing_type ?? "sale",
    price:               p?.price ?? 0,
    price_currency:      p?.price_currency ?? "INR",
    bedrooms:            p?.bedrooms ?? 3,
    bathrooms:           p?.bathrooms ?? 3,
    area_sqft:           p?.area_sqft ?? 0,
    plot_area_sqft:      p?.plot_area_sqft ?? 0,
    location:            p?.location ?? "Mohali",
    community:           p?.community ?? "",
    developer:           p?.developer ?? "",
    description:         p?.description ?? "",
    featured:            p?.featured ?? false,
    images:              p?.images ?? [],
    features:            arrayToLines(p?.features),
    highlights:          arrayToLines(p?.highlights),
    amenities:           arrayToLines(p?.amenities),
    latitude:            p?.latitude ?? ("" as any),
    longitude:           p?.longitude ?? ("" as any),
    agent_id:            p?.agent_id ?? "",
    agent_name:          p?.agent_name ?? "",
    agent_title:         p?.agent_title ?? "",
    agent_email:         p?.agent_email ?? "",
    agent_phone:         p?.agent_phone ?? "",
    agent_photo:         p?.agent_photo ?? "",
  };
}

export default function HouseForm({ house }: { house?: any | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [form, setForm] = useState(() => defaultForm(house));

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
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: any = {
      ...form,
      price: +form.price || 0,
      bedrooms: +form.bedrooms || null,
      bathrooms: +form.bathrooms || null,
      area_sqft: +form.area_sqft || 0,
      plot_area_sqft: +form.plot_area_sqft || null,
      features: linesToArray(form.features),
      highlights: linesToArray(form.highlights),
      amenities: linesToArray(form.amenities),
      latitude: form.latitude !== "" ? +form.latitude : null,
      longitude: form.longitude !== "" ? +form.longitude : null,
      updated_at: new Date().toISOString(),
    };

    // Clean up helper fields not in DB
    delete payload.agent_name;
    delete payload.agent_title;
    delete payload.agent_email;
    delete payload.agent_phone;
    delete payload.agent_photo;

    try {
      if (house) {
        const { error } = await (supabase.from("houses") as any).update(payload).eq("id", house.id);
        if (error) throw error;
        toast.success("House updated");
      } else {
        const { error } = await (supabase.from("houses") as any).insert(payload);
        if (error) throw error;
        toast.success("House created");
        router.push("/admin/houses");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="min-h-screen" style={{ backgroundColor: "#F7F6F3" }}>
      <div className="sticky top-14 z-30 bg-white border-b border-black/[0.06] flex items-center gap-4 -mx-6 -mt-6 px-6 py-3">
        <Link href="/admin/houses" className="flex items-center gap-1.5 font-body text-sm text-[#888] hover:text-[#0A0A0A] transition-colors">
          <ChevronLeft size={16} /> Houses
        </Link>
        <span className="text-[#ddd]">/</span>
        <span className="font-body text-sm text-[#0A0A0A]">
          {house ? "Edit House" : "New House"}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-body font-medium text-sm transition-all disabled:opacity-60"
            style={{ backgroundColor: GOLD, color: "#fff" }}>
            <Save size={14} />
            {saving ? "Saving..." : house ? "Update House" : "Create House"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 space-y-6 mt-8 pb-12">
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
                  <label className={lc}>House Type</label>
                  <select value={form.type} onChange={(e) => f("type", e.target.value)} className={ic}>
                    <option value="villa">Villa</option>
                    <option value="townhouse">Townhouse</option>
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
              <Row>
                <div>
                  <label className={lc}>Bedrooms</label>
                  <input type="number" value={form.bedrooms} onChange={(e) => f("bedrooms", +e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Bathrooms</label>
                  <input type="number" value={form.bathrooms} onChange={(e) => f("bathrooms", +e.target.value)} className={ic} />
                </div>
              </Row>
              <div>
                <label className={lc}>Plot Area (sqft)</label>
                <input type="number" value={form.plot_area_sqft} onChange={(e) => f("plot_area_sqft", +e.target.value)} className={ic} />
              </div>
              <div>
                <label className={lc}>Description</label>
                <textarea rows={5} value={form.description} onChange={(e) => f("description", e.target.value)} className={tc} />
              </div>
            </div>
          </Section>

          <Section id="location" icon={MapPin} title="Location">
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
          </Section>

          <Section id="images" icon={ImageIcon} title="Images">
            <ImageUploader value={form.images} onChange={(urls) => f("images", urls)} />
          </Section>

          <Section id="agent" icon={UserCircle2} title="Listing Agent">
            <select value={form.agent_id} onChange={(e) => handleAgentSelect(e.target.value)} className={ic}>
              <option value="">— Select Agent —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </Section>
      </div>
    </form>
  );
}
