// app/admin-realty-8x2d9/dashboard/page.tsx
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
    { label: "Total Properties", value: stats.properties ?? 0, icon: Building2, color: "text-blue-600 bg-blue-50" },
    { label: "Total Leads", value: stats.leads ?? 0, icon: Users, color: "text-green-600 bg-green-50" },
    { label: "New Leads", value: stats.newLeads ?? 0, icon: TrendingUp, color: "text-amber-600 bg-amber-50" },
    { label: "Newsletter Subscribers", value: stats.subscribers ?? 0, icon: Mail, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-gray-900 font-medium">Dashboard</h1>
        <p className="font-body text-sm text-gray-500 mt-1">
          Overview of your Realty platform
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-body text-xs text-gray-500 uppercase tracking-wide font-medium">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="font-display text-4xl text-gray-900 font-semibold tracking-tight">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-body text-base font-medium text-gray-900">Recent Leads</h2>
          <a href="/admin-realty-8x2d9/leads" className="font-body text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all &rarr;
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                {["Name", "Email", "Phone", "Source", "Status", "Date"].map((h) => (
                  <th key={h} className="px-6 py-4 font-body text-xs text-gray-500 uppercase tracking-wider font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center font-body text-sm text-gray-500">
                    No leads yet
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-body text-sm text-gray-900 font-medium">{lead.name}</td>
                    <td className="px-6 py-4 font-body text-sm text-gray-600">{lead.email}</td>
                    <td className="px-6 py-4 font-body text-sm text-gray-600">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span className="font-body text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md capitalize font-medium">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-body text-xs px-2.5 py-1 rounded-md capitalize font-medium ${
                        lead.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-gray-500">
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
