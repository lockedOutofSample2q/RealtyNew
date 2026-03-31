"use client";
// app/admin/leads/page.tsx
// Leads CRM — view, filter, update status

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare } from "lucide-react";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-[rgba(201,168,76,0.15)] text-[var(--gold)]",
  contacted: "bg-blue-500/15 text-blue-400",
  qualified: "bg-green-500/15 text-green-400",
  closed: "bg-white/5 text-white/30",
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
      let q = supabase.from("leads").select("*").order("created_at", { ascending: false });
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white font-light">Leads</h1>
          <p className="font-body text-xs text-white/40 mt-1">{leads.length} {filter === "all" ? "total" : filter} leads</p>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1">
          {["all", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 font-body text-xs capitalize transition-colors ${
                filter === s
                  ? "bg-[var(--gold)] text-black"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-12 font-body text-sm text-white/30">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 font-body text-sm text-white/30">No leads found</div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-[#141414] border border-white/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-body text-sm font-medium text-white">{lead.name}</span>
                  <span className={`font-body text-xs px-2 py-0.5 capitalize ${STATUS_COLORS[lead.status] ?? "bg-white/5 text-white/40"}`}>
                    {lead.status}
                  </span>
                  <span className="font-body text-xs bg-white/5 text-white/40 px-2 py-0.5 capitalize">
                    {lead.source}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-white/50">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 font-body text-xs hover:text-white transition-colors">
                    <Mail size={12} /> {lead.email}
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 font-body text-xs hover:text-white transition-colors">
                      <Phone size={12} /> {lead.phone}
                    </a>
                  )}
                  {lead.message && (
                    <span className="flex items-center gap-1.5 font-body text-xs text-white/30 max-w-xs truncate">
                      <MessageSquare size={12} /> {lead.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Status + date */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-body text-xs text-white/25">
                  {new Date(lead.created_at).toLocaleDateString("en-AE")}
                </span>
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="bg-[#0D0D0D] border border-white/10 text-white/70 font-body text-xs px-3 py-1.5 outline-none focus:border-[var(--gold)] cursor-pointer"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
