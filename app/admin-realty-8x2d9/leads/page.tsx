"use client";
// app/admin-realty-8x2d9/leads/page.tsx
// Leads CRM — view, filter, update status

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare, Users } from "lucide-react";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/20",
  contacted: "bg-purple-50 text-purple-700 ring-purple-600/20",
  qualified: "bg-green-50 text-green-700 ring-green-600/20",
  closed: "bg-gray-50 text-gray-600 ring-gray-500/10",
};

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const supabase = createClient();

  async function load() {
    setLoading(true);
    try {
      if (!supabase.from) throw new Error("Supabase not initialized");
      let q = supabase
        .from("leads")
        .select("*, apartments(title), houses(title), lands(title)")
        .order("created_at", { ascending: false });
      
      if (filter !== "all") q = q.eq("status", filter);
      const { data } = await q;
      setLeads(data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [filter]);

  async function updateStatus(id: string, status: string) {
    const { error } = await (supabase.from("leads") as any).update({ status }).eq("id", id);
    if (error) toast.error("Update failed");
    else { toast.success(`Marked as ${status}`); load(); }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl shadow-sm border border-blue-100">
            <Users size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-gray-900">Leads CRM</h1>
            <p className="font-body text-sm text-gray-500 mt-1">{leads.length} {filter === "all" ? "total" : filter} leads</p>
          </div>
        </div>
        {/* Filter tabs */}
        <div className="flex bg-gray-100/50 p-1 rounded-lg border border-gray-200">
          {["all", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 font-body text-sm font-medium capitalize rounded-md transition-all ${
                filter === s
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center font-body text-sm text-gray-500">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center font-body text-sm text-gray-500">No leads found in this category</div>
        ) : (
          leads.map((lead) => {
            const propertyTitle = 
              lead.apartments?.title || 
              lead.houses?.title || 
              lead.lands?.title;
            
            return (
              <div
                key={lead.id}
                className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-body text-base font-semibold text-gray-900">{lead.name}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-xs font-medium ring-1 ring-inset capitalize ${STATUS_COLORS[lead.status] ?? "bg-gray-50 text-gray-600 ring-gray-500/10"}`}>
                      {lead.status}
                    </span>
                    <span className="font-body text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-medium capitalize border border-gray-200">
                      {lead.source}
                    </span>
                    {propertyTitle && (
                      <span className="font-body text-xs text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md font-medium">
                        {propertyTitle}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-5 text-gray-500">
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-2 font-body text-sm hover:text-blue-600 transition-colors">
                      <Mail size={14} className="text-gray-400" /> {lead.email}
                    </a>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-2 font-body text-sm hover:text-blue-600 transition-colors">
                        <Phone size={14} className="text-gray-400" /> {lead.phone}
                      </a>
                    )}
                    {lead.message && (
                      <div className="flex items-start gap-2 font-body text-sm text-gray-600 mt-1 sm:mt-0 w-full sm:w-auto">
                        <MessageSquare size={14} className="text-gray-400 shrink-0 mt-0.5" /> 
                        <span className="line-clamp-2 max-w-xl">{lead.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status + date */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 sm:pl-6 sm:border-l border-gray-100">
                  <span className="font-body text-xs text-gray-400 font-medium">
                    {new Date(lead.created_at).toLocaleDateString("en-AE", { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="bg-white border border-gray-200 text-gray-700 font-body text-sm px-3 py-1.5 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
