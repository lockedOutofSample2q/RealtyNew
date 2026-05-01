"use client";
// app/admin/apartments/page.tsx
// ============================================================
// APARTMENTS CMS
// ============================================================

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/navigation";
import { useRouter } from "next/navigation";

export default function ApartmentsAdmin() {
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const supabase = createClient();

  async function load() {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("apartments")
        .select("*")
        .order("created_at", { ascending: false });
      setApartments(data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this apartment?")) return;
    const { error } = await supabase.from("apartments").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Apartment deleted"); load(); }
  }

  const filtered = apartments.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.community.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white font-light">Flats</h1>
          <p className="font-body text-xs text-white/40 mt-1">{apartments.length} total listings</p>
        </div>
        <button
          onClick={() => router.push("/admin/apartments/new")}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--gold)] text-black font-body text-sm font-medium hover:bg-[var(--gold-light)] transition-colors"
        >
          <Plus size={16} /> Add Apartment
        </button>
      </div>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search apartments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm bg-[#141414] border border-white/10 text-white font-body text-sm pl-9 pr-4 py-2.5 outline-none focus:border-[var(--gold)] transition-colors placeholder:text-white/30"
        />
      </div>

      <div className="bg-[#141414] border border-white/5 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Title", "Type", "Price", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-body text-xs text-white/30 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-white/20">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-white/20">No apartments found</td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-body text-sm text-white">{p.title}</td>
                  <td className="px-5 py-3 font-body text-xs text-white/60 capitalize">{p.type}</td>
                  <td className="px-5 py-3 font-body text-sm text-white">
                    {p.price_currency} {p.price?.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                      p.status === "available" ? "bg-green-500/10 text-green-500" : "bg-white/5 text-white/30"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => router.push(`/admin/apartments/${p.id}`)} className="p-1 text-white/40 hover:text-white transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1 text-white/40 hover:text-red-400 transition-colors">
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
    </div>
  );
}
