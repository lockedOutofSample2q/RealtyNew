"use client";

// app/admin-realty-8x2d9/seo-indexing/page.tsx
// ============================================================
// GOOGLE INDEXING CONSOLE - PREMIUM ADMIN UI
// ============================================================
// Interactive panel to trigger sync, submissions, inspections,
// search performance audits, and opportunity diagnostics.
// ============================================================

import { useState, useEffect, useCallback } from "react";
import {
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Search,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Layers,
  SearchCode,
  FileText,
  Calendar,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IndexingCounts {
  total: number;
  pending: number;
  submitted: number;
  indexed: number;
  notIndexed: number;
  error: number;
}

interface IndexingUrl {
  id: string;
  url: string;
  status: "pending" | "submitted" | "indexed" | "not_indexed" | "error";
  submit_count: number;
  last_submitted_at: string | null;
  last_inspected_at: string | null;
  inspection_verdict: "PASS" | "NEUTRAL" | "FAIL" | null;
  inspection_coverage_state: string | null;
  last_crawl_time: string | null;
  robots_txt_status: string | null;
  page_fetch_status: string | null;
  error_message: string | null;
  updated_at: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface QuickWinOpportunity {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface AnalyticsData {
  startDate: string;
  endDate: string;
  summary: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  topKeywords: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
  topPages: Array<{ page: string; clicks: number; impressions: number; ctr: number; position: number }>;
  quickWins: QuickWinOpportunity[];
}

export default function IndexingConsolePage() {
  const [activeTab, setActiveTab] = useState<"database" | "analytics">("database");
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Database Tab States
  const [counts, setCounts] = useState<IndexingCounts>({ total: 0, pending: 0, submitted: 0, indexed: 0, notIndexed: 0, error: 0 });
  const [urls, setUrls] = useState<IndexingUrl[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("");

  // Analytics Tab States
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  // Fetch URL list and status counts
  const fetchUrlData = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNumber.toString(),
        limit: "20",
        search,
        status: statusFilter,
        verdict: verdictFilter,
      });
      const response = await fetch(`/api/admin-realty-8x2d9/indexing?${queryParams}`);
      if (!response.ok) {
        throw new Error("Failed to load URLs data.");
      }
      const data = await response.json();
      setCounts(data.counts);
      setUrls(data.urls);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setActionMessage({ type: "error", text: "Could not fetch URL indexing lists." });
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, verdictFilter]);

  // Fetch Search Console Performance Analytics
  const fetchAnalyticsData = useCallback(async () => {
    setAnalyticsLoading(true);
    setAnalyticsError(null);
    try {
      const response = await fetch("/api/admin-realty-8x2d9/indexing/analytics");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load search console analytics.");
      }
      setAnalytics(data);
    } catch (err) {
      console.error(err);
      setAnalyticsError(err instanceof Error ? err.message : "Search Console properties or auth configurations missing.");
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  // Trigger data load on mount or state changes
  useEffect(() => {
    if (activeTab === "database") {
      fetchUrlData(1);
    } else {
      fetchAnalyticsData();
    }
  }, [activeTab, fetchUrlData, fetchAnalyticsData]);

  // Handle sitemap sync action
  const handleSyncSitemap = async () => {
    setLoading(true);
    setActionMessage({ type: "info", text: "Compiling sitemap routes and syncing database..." });
    try {
      const res = await fetch("/api/admin-realty-8x2d9/indexing/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to sync sitemap.");
      setActionMessage({
        type: "success",
        text: `Sync finished: ${data.newUrls} new URLs discovered, ${data.existingUrls} already tracked.`,
      });
      fetchUrlData(1);
    } catch (err) {
      setActionMessage({ type: "error", text: err instanceof Error ? err.message : "Sync aborted." });
    } finally {
      setLoading(false);
    }
  };

  // Handle submission batch action
  const handleRunSubmissions = async () => {
    setLoading(true);
    setActionMessage({ type: "info", text: "Authenticating and sending batch requests to Indexing API..." });
    try {
      const res = await fetch("/api/admin-realty-8x2d9/indexing/submit", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to run submission batch.");
      setActionMessage({
        type: "success",
        text: `Submitted ${data.submitted} URLs. Successes: ${data.successes}, Failures: ${data.failures}.`,
      });
      fetchUrlData(1);
    } catch (err) {
      setActionMessage({ type: "error", text: err instanceof Error ? err.message : "Submission aborted." });
    } finally {
      setLoading(false);
    }
  };

  // Handle URL Inspection batch action
  const handleRunInspections = async () => {
    setLoading(true);
    setActionMessage({ type: "info", text: "Querying Google Search Console URL Inspection API..." });
    try {
      const res = await fetch("/api/admin-realty-8x2d9/indexing/inspect", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to run inspection batch.");
      setActionMessage({
        type: "success",
        text: `Inspected ${data.inspected} URLs. Marked Indexed: ${data.indexed}, Not Indexed: ${data.notIndexed}.`,
      });
      fetchUrlData(1);
    } catch (err) {
      setActionMessage({ type: "error", text: err instanceof Error ? err.message : "Inspection aborted." });
    } finally {
      setLoading(false);
    }
  };

  const submitEligibleCount = counts.pending + counts.notIndexed + counts.error;
  const inspectEligibleCount = counts.pending + counts.submitted + counts.notIndexed + counts.error;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-white font-light flex items-center gap-2">
            <Globe className="text-[var(--gold)]" size={24} />
            Google Indexing Console
          </h1>
          <p className="font-body text-sm text-white/45 mt-1">
            Submit new property corridors, inspect crawling verity, and capture high-opportunity keywords.
          </p>
        </div>

        {/* Global Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSyncSitemap}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white font-body text-xs transition-colors border border-white/5"
          >
            <RefreshCw size={14} className={cn(loading && "animate-spin")} />
            Sync Sitemap
          </button>
          <button
            onClick={handleRunSubmissions}
            disabled={loading || submitEligibleCount === 0}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#0A0A0A] font-body text-xs transition-colors font-medium disabled:opacity-50"
          >
            <ArrowUpRight size={14} />
            Submit Batch ({submitEligibleCount > 30 ? 30 : submitEligibleCount} Pending/Not Indexed)
          </button>
          <button
            onClick={handleRunInspections}
            disabled={loading || inspectEligibleCount === 0}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-400 text-white font-body text-xs transition-colors font-medium disabled:opacity-50 border border-blue-600"
          >
            <RefreshCw size={14} />
            Run Inspection ({inspectEligibleCount > 15 ? 15 : inspectEligibleCount} Queue)
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={cn(
            "p-4 border flex items-start gap-3 transition-all",
            actionMessage.type === "success" && "bg-green-500/10 border-green-500/20 text-green-400",
            actionMessage.type === "error" && "bg-red-500/10 border-red-500/20 text-red-400",
            actionMessage.type === "info" && "bg-blue-500/10 border-blue-500/20 text-blue-400"
          )}
        >
          {actionMessage.type === "success" && <CheckCircle2 size={16} className="mt-0.5 shrink-0" />}
          {actionMessage.type === "error" && <XCircle size={16} className="mt-0.5 shrink-0" />}
          {actionMessage.type === "info" && <Loader2 size={16} className="mt-0.5 shrink-0 animate-spin" />}
          <div className="flex-1 font-body text-sm">
            {actionMessage.text}
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="font-body text-xs hover:underline uppercase tracking-wide opacity-50 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#141414] border border-white/5 p-4 flex flex-col justify-between">
          <span className="font-body text-xs text-white/35 uppercase tracking-wide">Total URLs Tracked</span>
          <span className="font-display text-3xl text-white font-light mt-2">{counts.total}</span>
        </div>
        <div className="bg-[#141414] border border-white/5 p-4 flex flex-col justify-between">
          <span className="font-body text-xs text-white/35 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> Pending Indexing
          </span>
          <span className="font-display text-3xl text-white font-light mt-2">{counts.pending}</span>
        </div>
        <div className="bg-[#141414] border border-white/5 p-4 flex flex-col justify-between">
          <span className="font-body text-xs text-white/35 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> Submitted URLs
          </span>
          <span className="font-display text-3xl text-white font-light mt-2">{counts.submitted}</span>
        </div>
        <div className="bg-[#141414] border border-white/5 p-4 flex flex-col justify-between">
          <span className="font-body text-xs text-white/35 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Indexed (PASS)
          </span>
          <span className="font-display text-3xl text-green-400 font-light mt-2">{counts.indexed}</span>
        </div>
        <div className="bg-[#141414] border border-white/5 p-4 flex flex-col justify-between">
          <span className="font-body text-xs text-white/35 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> API Error Status
          </span>
          <span className="font-display text-3xl text-red-400 font-light mt-2">{counts.error}</span>
        </div>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex border-b border-white/5 gap-4">
        <button
          onClick={() => setActiveTab("database")}
          className={cn(
            "pb-3 font-body text-sm font-medium transition-colors border-b-2 relative -bottom-[2px]",
            activeTab === "database"
              ? "border-[var(--gold)] text-[var(--gold)]"
              : "border-transparent text-white/45 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <Layers size={14} /> URL Status Inventory
          </span>
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={cn(
            "pb-3 font-body text-sm font-medium transition-colors border-b-2 relative -bottom-[2px]",
            activeTab === "analytics"
              ? "border-[var(--gold)] text-[var(--gold)]"
              : "border-transparent text-white/45 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <TrendingUp size={14} /> Search Console Analytics
          </span>
        </button>
      </div>

      {/* Tab 1: Database Inventory Layout */}
      {activeTab === "database" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/30">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tracked URLs..."
                className="w-full pl-9 pr-4 py-2 bg-[#141414] border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 font-body placeholder:text-white/20"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 bg-[#141414] border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 font-body"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="indexed">Indexed</option>
              <option value="not_indexed">Not Indexed</option>
              <option value="error">Error</option>
            </select>
            <select
              value={verdictFilter}
              onChange={(e) => setVerdictFilter(e.target.value)}
              className="py-2 px-3 bg-[#141414] border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 font-body"
            >
              <option value="">All Verdicts</option>
              <option value="PASS">PASS (Indexed)</option>
              <option value="NEUTRAL">NEUTRAL</option>
              <option value="FAIL">FAIL (Not Indexed)</option>
            </select>
            <button
              onClick={() => fetchUrlData(1)}
              className="py-2 px-4 bg-white/5 text-white font-body text-sm border border-white/5 hover:bg-white/10"
            >
              Apply Filter
            </button>
          </div>

          {/* URLs Inventory Table */}
          <div className="bg-[#141414] border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-[#1a1a1a]">
                    <th className="px-4 py-3 text-left font-body text-xs text-white/35 uppercase tracking-wide">Tracked URL</th>
                    <th className="px-4 py-3 text-left font-body text-xs text-white/35 uppercase tracking-wide">Sync Status</th>
                    <th className="px-4 py-3 text-left font-body text-xs text-white/35 uppercase tracking-wide">GSC Verdict</th>
                    <th className="px-4 py-3 text-left font-body text-xs text-white/35 uppercase tracking-wide">Crawled Date</th>
                    <th className="px-4 py-3 text-left font-body text-xs text-white/35 uppercase tracking-wide">Submit Count</th>
                    <th className="px-4 py-3 text-left font-body text-xs text-white/35 uppercase tracking-wide">Details / Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && urls.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-white/30 font-body text-sm">
                        <Loader2 className="animate-spin inline-block mr-2" size={16} /> Loading URL indexing inventory...
                      </td>
                    </tr>
                  ) : urls.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-white/30 font-body text-sm">
                        No tracked URLs matching the specified filters. Try running Sitemap Sync.
                      </td>
                    </tr>
                  ) : (
                    urls.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                        {/* URL path and domain */}
                        <td className="px-4 py-3 font-body text-sm text-white max-w-md truncate">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-white/80 hover:text-white hover:underline group"
                          >
                            {item.url.replace("https://www.realtyconsultants.in", "") || "/"}
                            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </td>

                        {/* Local DB Status Badge */}
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "font-body text-xs px-2 py-0.5",
                              item.status === "indexed" && "bg-green-500/10 text-green-400 border border-green-500/10",
                              item.status === "submitted" && "bg-blue-500/10 text-blue-400 border border-blue-500/10",
                              item.status === "pending" && "bg-yellow-500/10 text-yellow-400 border border-yellow-500/10",
                              item.status === "not_indexed" && "bg-orange-500/10 text-orange-400 border border-orange-500/10",
                              item.status === "error" && "bg-red-500/10 text-red-400 border border-red-500/10"
                            )}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* Google Live Verdict */}
                        <td className="px-4 py-3">
                          {item.inspection_verdict ? (
                            <span
                              className={cn(
                                "font-body text-xs flex items-center gap-1",
                                item.inspection_verdict === "PASS" && "text-green-400",
                                item.inspection_verdict === "FAIL" && "text-red-400",
                                item.inspection_verdict === "NEUTRAL" && "text-yellow-400"
                              )}
                            >
                              {item.inspection_verdict === "PASS" && <CheckCircle2 size={12} />}
                              {item.inspection_verdict === "FAIL" && <XCircle size={12} />}
                              {item.inspection_verdict === "NEUTRAL" && <AlertTriangle size={12} />}
                              {item.inspection_verdict}
                            </span>
                          ) : (
                            <span className="text-white/20 font-body text-xs">Not Inspected</span>
                          )}
                        </td>

                        {/* Last crawled timestamp */}
                        <td className="px-4 py-3 text-white/50 font-body text-xs">
                          {item.last_crawl_time ? new Date(item.last_crawl_time).toLocaleString("en-AE", { dateStyle: "short", timeStyle: "short" }) : "Never"}
                        </td>

                        {/* API submit count */}
                        <td className="px-4 py-3 text-white font-body text-sm">
                          {item.submit_count || 0}
                        </td>

                        {/* Diagnostic errors / Coverage */}
                        <td className="px-4 py-3 text-white/60 font-body text-xs max-w-sm truncate">
                          {item.error_message ? (
                            <span className="text-red-400 flex items-center gap-1" title={item.error_message}>
                              <AlertCircle size={12} className="shrink-0" />
                              {item.error_message}
                            </span>
                          ) : (
                            item.inspection_coverage_state || "No GSC data"
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-t border-white/5">
                <span className="font-body text-xs text-white/35">
                  Showing {urls.length} of {pagination.total} URLs
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => fetchUrlData(pagination.page - 1)}
                    disabled={pagination.page === 1 || loading}
                    className="px-2.5 py-1 text-xs text-white/50 bg-[#141414] hover:bg-white/5 border border-white/5 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-xs text-white/80 font-body font-medium">
                    {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchUrlData(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages || loading}
                    className="px-2.5 py-1 text-xs text-white/50 bg-[#141414] hover:bg-white/5 border border-white/5 disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Search Console Analytics Dashboard */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {analyticsLoading ? (
            <div className="bg-[#141414] border border-white/5 p-12 text-center text-white/30 font-body">
              <Loader2 className="animate-spin inline-block mr-2" size={20} /> Fetching performance metrics from Google Search Console API...
            </div>
          ) : analyticsError ? (
            <div className="bg-[#141414] border border-red-500/20 bg-red-500/5 p-6 text-left text-red-400 font-body flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-medium text-white text-sm">GSC Performance Audit Blocked</h3>
                <p className="text-xs text-red-400/80 leading-relaxed">{analyticsError}</p>
                <div className="pt-2 text-xs leading-relaxed text-white/60">
                  <strong className="text-white">How to fix this:</strong>
                  <ol className="list-decimal pl-4 space-y-1 mt-1 text-white/50">
                    <li>Copy your Service Account email from your JSON credentials.</li>
                    <li>Go to Google Search Console → Settings → Users & permissions.</li>
                    <li>Add the service account email as an <strong className="text-[var(--gold)]">Owner</strong>.</li>
                    <li>Make sure the site property URL exactly matches your domain.</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : analytics ? (
            <div className="space-y-6">
              {/* Query Meta Info */}
              <div className="flex items-center gap-2 text-white/40 font-body text-xs">
                <Calendar size={12} />
                <span>Search Audit Period:</span>
                <span className="text-white/60 font-semibold">{analytics.startDate}</span>
                <span>to</span>
                <span className="text-white/60 font-semibold">{analytics.endDate}</span>
                <span className="ml-auto text-[var(--gold)] font-medium">Verified by Service Account Auth 🟢</span>
              </div>

              {/* GSC Performance Summary Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#141414] border border-white/5 p-5">
                  <span className="font-body text-xs text-white/35 uppercase tracking-wide">Total Search Clicks</span>
                  <div className="font-display text-4xl text-white font-light mt-3">{analytics.summary.clicks.toLocaleString()}</div>
                </div>
                <div className="bg-[#141414] border border-white/5 p-5">
                  <span className="font-body text-xs text-white/35 uppercase tracking-wide">Total Impressions</span>
                  <div className="font-display text-4xl text-white font-light mt-3">{analytics.summary.impressions.toLocaleString()}</div>
                </div>
                <div className="bg-[#141414] border border-white/5 p-5">
                  <span className="font-body text-xs text-white/35 uppercase tracking-wide">Average CTR</span>
                  <div className="font-display text-4xl text-[var(--gold)] font-light mt-3">
                    {(analytics.summary.ctr * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="bg-[#141414] border border-white/5 p-5">
                  <span className="font-body text-xs text-white/35 uppercase tracking-wide">Average Position</span>
                  <div className="font-display text-4xl text-blue-400 font-light mt-3">
                    {analytics.summary.position.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Quick-Win Keyword Opportunities Section */}
              <div className="bg-[#141414] border border-white/5">
                <div className="px-5 py-4 border-b border-white/5 bg-[#1a1a1a] flex items-center justify-between">
                  <div>
                    <h2 className="font-body text-sm font-semibold text-white flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-[var(--gold)]" />
                      Quick-Win Keyword Opportunities (Priority Action List)
                    </h2>
                    <p className="font-body text-xs text-white/35 mt-0.5">
                      Queries ranking between positions 8 and 20 with high impressions but low CTR. Improving titles & meta tags can trigger immediate click boosts.
                    </p>
                  </div>
                  <span className="font-body text-xs px-2 py-0.5 bg-[rgba(201,168,76,0.15)] text-[var(--gold)]">
                    {analytics.quickWins.length} Matches
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-5 py-3 text-left font-body text-xs text-white/35 uppercase">Target Query</th>
                        <th className="px-5 py-3 text-left font-body text-xs text-white/35 uppercase">Related Page</th>
                        <th className="px-5 py-3 text-right font-body text-xs text-white/35 uppercase">Impressions</th>
                        <th className="px-5 py-3 text-right font-body text-xs text-white/35 uppercase">Clicks</th>
                        <th className="px-5 py-3 text-right font-body text-xs text-white/35 uppercase">CTR</th>
                        <th className="px-5 py-3 text-right font-body text-xs text-white/35 uppercase">Avg. Position</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {analytics.quickWins.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center font-body text-sm text-white/30">
                            No quick-win keyword opportunities detected.
                          </td>
                        </tr>
                      ) : (
                        analytics.quickWins.map((win, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                            <td className="px-5 py-3 font-body text-sm text-[var(--gold)] font-medium">{win.query}</td>
                            <td className="px-5 py-3 font-body text-xs text-white/50 max-w-xs truncate" title={win.page}>
                              {win.page.replace("https://www.realtyconsultants.in", "") || "/"}
                            </td>
                            <td className="px-5 py-3 text-right font-body text-sm text-white">{win.impressions.toLocaleString()}</td>
                            <td className="px-5 py-3 text-right font-body text-sm text-white">{win.clicks}</td>
                            <td className="px-5 py-3 text-right font-body text-sm text-yellow-500 font-medium">{(win.ctr * 100).toFixed(2)}%</td>
                            <td className="px-5 py-3 text-right font-body text-sm text-blue-400 font-medium">{win.position}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detailed Tables (Keywords vs. Pages) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Keywords */}
                <div className="bg-[#141414] border border-white/5">
                  <div className="px-5 py-3 border-b border-white/5 bg-[#1a1a1a] font-body text-sm font-semibold text-white">
                    Top 10 Performing Queries
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="px-5 py-2 text-left font-body text-xs text-white/35 uppercase">Query</th>
                          <th className="px-5 py-2 text-right font-body text-xs text-white/35 uppercase">Clicks</th>
                          <th className="px-5 py-2 text-right font-body text-xs text-white/35 uppercase">Impressions</th>
                          <th className="px-5 py-2 text-right font-body text-xs text-white/35 uppercase">Position</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {analytics.topKeywords.map((kw, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.01]">
                            <td className="px-5 py-2.5 font-body text-sm text-white">{kw.query}</td>
                            <td className="px-5 py-2.5 text-right font-body text-sm text-white">{kw.clicks}</td>
                            <td className="px-5 py-2.5 text-right font-body text-sm text-white/50">{kw.impressions.toLocaleString()}</td>
                            <td className="px-5 py-2.5 text-right font-body text-sm text-blue-400">{(kw.position).toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pages */}
                <div className="bg-[#141414] border border-white/5">
                  <div className="px-5 py-3 border-b border-white/5 bg-[#1a1a1a] font-body text-sm font-semibold text-white">
                    Top 10 Performing Pages
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="px-5 py-2 text-left font-body text-xs text-white/35 uppercase">Page Path</th>
                          <th className="px-5 py-2 text-right font-body text-xs text-white/35 uppercase">Clicks</th>
                          <th className="px-5 py-2 text-right font-body text-xs text-white/35 uppercase">Impressions</th>
                          <th className="px-5 py-2 text-right font-body text-xs text-white/35 uppercase">CTR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {analytics.topPages.map((pg, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.01]">
                            <td className="px-5 py-2.5 font-body text-xs text-white/85 truncate max-w-xs" title={pg.page}>
                              {pg.page.replace("https://www.realtyconsultants.in", "") || "/"}
                            </td>
                            <td className="px-5 py-2.5 text-right font-body text-sm text-white">{pg.clicks}</td>
                            <td className="px-5 py-2.5 text-right font-body text-sm text-white/50">{pg.impressions.toLocaleString()}</td>
                            <td className="px-5 py-2.5 text-right font-body text-sm text-[var(--gold)]">{(pg.ctr * 100).toFixed(2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#141414] border border-white/5 p-12 text-center text-white/30 font-body">
              No analytics data could be retrieved.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
