"use client";
// app/admin-realty-8x2d9/lands/page.tsx
// ============================================================
// LANDS CMS
// ============================================================

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Map } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LandsAdmin() {
  const [landItems, setLandItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const supabase = createClient();

  async function load() {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("lands")
        .select("*")
        .order("created_at", { ascending: false });
      setLandItems(data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this lands listing?")) return;
    const { error } = await supabase.from("lands").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Lands deleted"); load(); }
  }

  const filtered = landItems.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(search.toLowerCase())) ||
      (p.community && p.community.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl shadow-sm border border-blue-100">
            <Map size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-gray-900">Lands Listings</h1>
            <p className="font-body text-sm text-gray-500 mt-1">{landItems.length} total listings</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin-realty-8x2d9/lands/new")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-body text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus size={16} /> Add Lands
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search lands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 font-body text-sm pl-10 pr-4 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {["Title", "Type", "Price", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3.5 font-body text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-body text-sm">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-body text-sm">No lands listings found</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-body text-sm font-medium text-gray-900">{p.title}</div>
                      <div className="font-body text-xs text-gray-500 mt-0.5">{p.location}, {p.community}</div>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-gray-600 capitalize">{p.type}</td>
                    <td className="px-6 py-4 font-body text-sm text-gray-900 font-medium">
                      {p.price_currency} {p.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        p.status === "available" ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => router.push(`/admin-realty-8x2d9/lands/${p.id}`)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                          <Trash2 size={16} />
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
    </div>
  );
}
