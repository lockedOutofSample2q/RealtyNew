"use client";
// app/admin/properties/page.tsx
// ============================================================
// PROPERTIES CMS
// Full CRUD: add, edit, delete properties
// Each property saved to Supabase → auto-appears on site
// ============================================================

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import type { Property } from "@/types";

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);

  const supabase = createClient();

  async function load() {
    setLoading(true);
    try {
      if (!supabase.from) throw new Error("Supabase not initialized");
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      setProperties(data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Property deleted"); load(); }
  }

  function handleEdit(p: Property) {
    setEditing(p);
    setShowForm(true);
  }

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.community.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white font-light">Properties</h1>
          <p className="font-body text-xs text-white/40 mt-1">{properties.length} total listings</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--gold)] text-black font-body text-sm font-medium hover:bg-[var(--gold-light)] transition-colors"
        >
          <Plus size={16} /> Add Property
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search by title, location, community..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm bg-[#141414] border border-white/10 text-white font-body text-sm pl-9 pr-4 py-2.5 outline-none focus:border-[var(--gold)] transition-colors placeholder:text-white/30"
        />
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/5 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Title", "Type", "Price", "Listing", "Status", "Featured", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-body text-xs text-white/30 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center font-body text-sm text-white/30">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center font-body text-sm text-white/30">No properties found</td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-body text-sm text-white max-w-[200px] truncate">{p.title}</td>
                  <td className="px-5 py-3 font-body text-xs text-white/60 capitalize">{p.type}</td>
                  <td className="px-5 py-3 font-body text-sm text-white whitespace-nowrap">
                    {p.price_currency} {p.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-body text-xs px-2 py-1 capitalize ${
                      p.listing_type === "properties" ? "bg-blue-500/15 text-blue-400" :
                      p.listing_type === "lands" ? "bg-green-500/15 text-green-400" :
                      "bg-[rgba(201,168,76,0.15)] text-[var(--gold)]"
                    }`}>
                      {p.listing_type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-body text-xs px-2 py-1 capitalize ${
                      p.status === "available" ? "bg-green-500/15 text-green-400" : "bg-white/5 text-white/40"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-body text-xs ${p.featured ? "text-[var(--gold)]" : "text-white/20"}`}>
                      {p.featured ? "★ Yes" : "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1.5 text-white/40 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyFormModal
          property={editing}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}

// ── Property Form Modal ──────────────────────────────────────
function PropertyFormModal({
  property,
  onClose,
  onSave,
}: {
  property: Property | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: property?.title ?? "",
    slug: property?.slug ?? "",
    type: property?.type ?? "apartment",
    status: property?.status ?? "available",
    listing_type: property?.listing_type ?? "sale",
    price: property?.price ?? 0,
    price_currency: property?.price_currency ?? "INR",
    bedrooms: property?.bedrooms ?? 1,
    bathrooms: property?.bathrooms ?? 1,
    area_sqft: property?.area_sqft ?? 0,
    location: property?.location ?? "Dubai",
    community: property?.community ?? "",
    developer: property?.developer ?? "",
    furnishing: property?.furnishing ?? "unfurnished",
    description: property?.description ?? "",
    featured: property?.featured ?? false,
  });

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (property) {
        const { error } = await (supabase.from("properties") as any)
          .update({ ...form, updated_at: new Date().toISOString() })
          .eq("id", property.id);
        if (error) throw error;
        toast.success("Property updated");
      } else {
        const { error } = await (supabase.from("properties") as any).insert({
          ...form,
          images: [],
          features: [],
        });
        if (error) throw error;
        toast.success("Property created");
      }
      onSave();
    } catch (err: any) {
      toast.error(err.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-[#0D0D0D] border border-white/10 text-white font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] transition-colors";
  const labelClass = "block font-body text-xs text-white/50 uppercase tracking-wide mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 py-8 px-4">
      <div className="bg-[#141414] border border-white/10 w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-display text-xl text-white font-light">
            {property ? "Edit Property" : "Add Property"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Title */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })}
              className={inputClass}
              placeholder="e.g. ENARA by OMNIYAT"
            />
          </div>

          {/* Slug */}
          <div className="sm:col-span-2">
            <label className={labelClass}>URL Slug *</label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Type + Listing Type */}
          <div>
            <label className={labelClass}>Property Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className={inputClass}>
              {["apartment", "villa", "penthouse", "townhouse", "studio"].map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Listing Type</label>
            <select value={form.listing_type} onChange={(e) => setForm({ ...form, listing_type: e.target.value as any })} className={inputClass}>
              <option value="sale">For Sale</option>
              <option value="lands">For Rent</option>
              <option value="properties">Off Plan</option>
            </select>
          </div>

          {/* Price + Currency */}
          <div>
            <label className={labelClass}>Price *</label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: +e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Currency</label>
            <select value={form.price_currency} onChange={(e) => setForm({ ...form, price_currency: e.target.value as any })} className={inputClass}>
              <option>INR</option><option>USD</option><option>CAD</option><option>AUD</option>
            </select>
          </div>

          {/* Beds + Baths */}
          <div>
            <label className={labelClass}>Bedrooms</label>
            <input type="number" value={form.bedrooms ?? ""} onChange={(e) => setForm({ ...form, bedrooms: +e.target.value })} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Bathrooms</label>
            <input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: +e.target.value })} className={inputClass} />
          </div>

          {/* Area */}
          <div>
            <label className={labelClass}>Area (sqft)</label>
            <input type="number" value={form.area_sqft} onChange={(e) => setForm({ ...form, area_sqft: +e.target.value })} className={inputClass} />
          </div>

          {/* Location + Community */}
          <div>
            <label className={labelClass}>Location (City)</label>
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} placeholder="Dubai" />
          </div>

          <div>
            <label className={labelClass}>Community *</label>
            <input type="text" required value={form.community} onChange={(e) => setForm({ ...form, community: e.target.value })} className={inputClass} placeholder="Downtown Dubai" />
          </div>

          <div>
            <label className={labelClass}>Developer</label>
            <input type="text" value={form.developer} onChange={(e) => setForm({ ...form, developer: e.target.value })} className={inputClass} placeholder="OMNIYAT" />
          </div>

          {/* Status + Furnishing */}
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className={inputClass}>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="properties">Off Plan</option>
            </select>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Featured */}
          <div className="sm:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-[var(--gold)]"
            />
            <label htmlFor="featured" className="font-body text-sm text-white/60">
              Featured property (shows in hero carousel)
            </label>
          </div>

          {/* Actions */}
          <div className="sm:col-span-2 flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[var(--gold)] text-black font-body font-medium text-sm hover:bg-[var(--gold-light)] transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : property ? "Update Property" : "Create Property"}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 border border-white/15 text-white/60 font-body text-sm hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
