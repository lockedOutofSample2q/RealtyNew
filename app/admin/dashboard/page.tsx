// app/admin/dashboard/page.tsx
import { createAdminClient } from "@/lib/supabase";
import { Building2, Users, Mail, TrendingUp } from "lucide-react";

export const revalidate = 30;

async function getStats() {
  try {
    const supabase = createAdminClient();
    const [
      { count: properties },
      { count: leads },
      { count: subscribers },
      { count: newLeads },
    ] = await Promise.all([
      supabase.from("properties").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    ]);
    return { properties, leads, subscribers, newLeads };
  } catch {
    return { properties: 0, leads: 0, subscribers: 0, newLeads: 0 };
  }
}

async function getRecentLeads() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const [stats, recentLeads] = await Promise.all([getStats(), getRecentLeads()]);

  const STATS = [
    { label: "Total Properties", value: stats.properties ?? 0, icon: Building2, color: "text-blue-400" },
    { label: "Total Leads", value: stats.leads ?? 0, icon: Users, color: "text-green-400" },
    { label: "New Leads", value: stats.newLeads ?? 0, icon: TrendingUp, color: "text-[var(--gold)]" },
    { label: "Newsletter Subscribers", value: stats.subscribers ?? 0, icon: Mail, color: "text-purple-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-white font-light">Dashboard</h1>
        <p className="font-body text-sm text-white/40 mt-1">
          Overview of your Monter platform
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#141414] border border-white/5 p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-body text-xs text-white/40 uppercase tracking-wide">
                {stat.label}
              </span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="font-display text-4xl text-white font-light">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-[#141414] border border-white/5">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="font-body text-sm font-medium text-white">Recent Leads</h2>
          <a href="/admin/leads" className="font-body text-xs text-[var(--gold)] hover:text-[var(--gold-light)]">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Name", "Email", "Phone", "Source", "Status", "Date"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-body text-xs text-white/30 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center font-body text-sm text-white/30">
                    No leads yet
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 font-body text-sm text-white">{lead.name}</td>
                    <td className="px-5 py-3 font-body text-sm text-white/60">{lead.email}</td>
                    <td className="px-5 py-3 font-body text-sm text-white/60">{lead.phone}</td>
                    <td className="px-5 py-3">
                      <span className="font-body text-xs px-2 py-1 bg-white/5 text-white/60 capitalize">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`font-body text-xs px-2 py-1 capitalize ${
                        lead.status === "new"
                          ? "bg-[rgba(201,168,76,0.15)] text-[var(--gold)]"
                          : "bg-white/5 text-white/40"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-body text-xs text-white/40">
                      {new Date(lead.created_at).toLocaleDateString("en-AE")}
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
