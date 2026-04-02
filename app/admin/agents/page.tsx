"use client";
// app/admin/agents/page.tsx
// ============================================================
// AGENTS CMS — add, edit, delete listing agents
// Agents can then be selected via dropdown on any property
// ============================================================

import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, UserCircle2, Globe2, Phone, Mail, Languages } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import type { Agent } from "@/types";

const GOLD = "#C9A84C";
const ic = "w-full bg-[#F7F6F3] border border-black/[0.1] text-[#0A0A0A] font-body text-sm px-3 py-2.5 rounded-lg outline-none focus:border-amber-400 transition-colors placeholder:text-[#bbb]";
const lc = "block font-body text-xs text-[#888] uppercase tracking-wider mb-1.5";

export default function AgentsAdmin() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Agent | null>(null);
  const supabase = createClient();

  async function load() {
    setLoading(true);
    try {
      const { data } = await (supabase.from("agents") as any)
        .select("*")
        .order("name", { ascending: true });
      setAgents(data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this agent? Properties linked to them will be unlinked.")) return;
    const { error } = await (supabase.from("agents") as any).delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Agent deleted"); load(); }
  }

  function handleEdit(a: Agent) { setEditing(a); setShowForm(true); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[#0A0A0A] font-light tracking-tight">Agents</h1>
          <p className="font-body text-xs text-[#888] mt-1">{agents.length} team members</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-medium rounded-lg"
          style={{ backgroundColor: GOLD, color: "#fff" }}
        >
          <Plus size={15} /> Add Agent
        </button>
      </div>

      {/* Agent grid */}
      {loading ? (
        <p className="font-body text-sm text-[#bbb] text-center py-12">Loading...</p>
      ) : agents.length === 0 ? (
        <div className="text-center py-16 bg-white border border-black/[0.07] rounded-xl">
          <UserCircle2 size={40} className="mx-auto text-[#ddd] mb-3" />
          <p className="font-body text-sm text-[#aaa]">No agents yet</p>
          <p className="font-body text-xs text-[#bbb] mt-1">Add agents so you can assign them to property listings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white border border-black/[0.07] rounded-xl p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex gap-4">
              {/* Photo */}
              <div className="shrink-0">
                {agent.photo_url ? (
                  <img src={agent.photo_url} alt={agent.name}
                    className="w-14 h-14 rounded-xl object-cover border border-black/[0.07]" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-[#F7F6F3] flex items-center justify-center border border-black/[0.07]">
                    <UserCircle2 size={28} className="text-[#ccc]" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="font-body text-sm font-medium text-[#0A0A0A] leading-tight">{agent.name}</p>
                    {agent.title && (
                      <p className="font-body text-xs text-[#888] mt-0.5">{agent.title}</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleEdit(agent)}
                      className="p-1.5 text-[#bbb] hover:text-[#0A0A0A] transition-colors rounded">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(agent.id)}
                      className="p-1.5 text-[#bbb] hover:text-red-500 transition-colors rounded">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <div className="space-y-0.5 mt-2">
                  {agent.email && (
                    <div className="flex items-center gap-1.5 font-body text-xs text-[#888]">
                      <Mail size={11} /> {agent.email}
                    </div>
                  )}
                  {agent.phone && (
                    <div className="flex items-center gap-1.5 font-body text-xs text-[#888]">
                      <Phone size={11} /> {agent.phone}
                    </div>
                  )}
                  {agent.languages && agent.languages.length > 0 && (
                    <div className="flex items-center gap-1.5 font-body text-xs text-[#888]">
                      <Languages size={11} /> {agent.languages.join(", ")}
                    </div>
                  )}
                </div>
                {!agent.active && (
                  <span className="inline-block mt-2 font-body text-[10px] px-2 py-0.5 bg-black/5 text-[#aaa] rounded uppercase tracking-wide">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AgentFormModal
          agent={editing}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}

// ── Agent Form Modal ─────────────────────────────────────────
function AgentFormModal({
  agent, onClose, onSave,
}: { agent: Agent | null; onClose: () => void; onSave: () => void }) {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: agent?.name ?? "",
    title: agent?.title ?? "Property Consultant",
    email: agent?.email ?? "",
    phone: agent?.phone ?? "",
    photo_url: agent?.photo_url ?? "",
    languages: agent?.languages?.join(", ") ?? "",
    bio: agent?.bio ?? "",
    active: agent?.active ?? true,
  });

  function f(k: string, v: any) { setForm((p) => ({ ...p, [k]: v })); }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      f("photo_url", json.url);
      toast.success("Photo uploaded");
    } catch (err: any) {
      toast.error(err.message ?? "Photo upload failed");
    } finally {
      setPhotoUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      title: form.title || null,
      email: form.email || null,
      phone: form.phone || null,
      photo_url: form.photo_url || null,
      languages: form.languages ? form.languages.split(",").map((l) => l.trim()).filter(Boolean) : [],
      bio: form.bio || null,
      active: form.active,
      updated_at: new Date().toISOString(),
    };
    try {
      if (agent) {
        const { error } = await (supabase.from("agents") as any).update(payload).eq("id", agent.id);
        if (error) throw error;
        toast.success("Agent updated");
      } else {
        const { error } = await (supabase.from("agents") as any).insert(payload);
        if (error) throw error;
        toast.success("Agent added");
      }
      onSave();
    } catch (err: any) {
      toast.error(err.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 py-8 px-4">
      <div className="bg-white border border-black/[0.08] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]" style={{ backgroundColor: "#FAFAF8" }}>
          <h2 className="font-display text-xl text-[#0A0A0A] font-light tracking-tight">
            {agent ? "Edit Agent" : "Add Agent"}
          </h2>
          <button onClick={onClose} className="text-[#aaa] hover:text-[#0A0A0A] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Photo */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-black/[0.07] bg-[#F7F6F3] flex items-center justify-center">
              {form.photo_url ? (
                <img src={form.photo_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <UserCircle2 size={36} className="text-[#ccc]" />
              )}
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={photoUploading}
                className="px-4 py-2 rounded-lg font-body text-sm border border-black/[0.1] text-[#555] hover:border-amber-400 transition-colors disabled:opacity-60"
              >
                {photoUploading ? "Uploading..." : "Upload Photo"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              <p className="font-body text-xs text-[#aaa] mt-1.5">Or paste URL below</p>
              <input type="url" value={form.photo_url} onChange={(e) => f("photo_url", e.target.value)}
                className={`${ic} mt-1.5 text-xs`} placeholder="https://..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={lc}>Full Name *</label>
              <input type="text" required value={form.name} onChange={(e) => f("name", e.target.value)}
                className={ic} placeholder="Armina Hakobyan" />
            </div>
            <div>
              <label className={lc}>Title</label>
              <input type="text" value={form.title} onChange={(e) => f("title", e.target.value)}
                className={ic} placeholder="Senior Property Consultant" />
            </div>
            <div>
              <label className={lc}>Phone</label>
              <input type="text" value={form.phone} onChange={(e) => f("phone", e.target.value)}
                className={ic} placeholder="+971 50 123 4567" />
            </div>
            <div className="col-span-2">
              <label className={lc}>Email</label>
              <input type="email" value={form.email} onChange={(e) => f("email", e.target.value)}
                className={ic} placeholder="agent@monterealestate.ae" />
            </div>
            <div className="col-span-2">
              <label className={lc}>Languages (comma-separated)</label>
              <input type="text" value={form.languages} onChange={(e) => f("languages", e.target.value)}
                className={ic} placeholder="English, Arabic, Russian" />
            </div>
            <div className="col-span-2">
              <label className={lc}>Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => f("bio", e.target.value)}
                className={`${ic} resize-none`} placeholder="Brief agent bio..." />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="agent-active" checked={form.active}
              onChange={(e) => f("active", e.target.checked)}
              className="w-4 h-4 rounded" style={{ accentColor: GOLD }} />
            <label htmlFor="agent-active" className="font-body text-sm text-[#555]">Active (available for assignment)</label>
          </div>

          <div className="flex gap-3 pt-2 border-t border-black/[0.06]">
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-lg font-body font-medium text-sm disabled:opacity-60"
              style={{ backgroundColor: GOLD, color: "#fff" }}>
              {saving ? "Saving..." : agent ? "Update Agent" : "Add Agent"}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-2.5 border border-black/[0.12] text-[#666] font-body text-sm rounded-lg hover:text-[#0A0A0A] transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
