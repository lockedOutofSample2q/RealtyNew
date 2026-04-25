import type { Metadata } from "next";
import { TrendingUp, BarChart3, MapPin, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Mohali Real Estate Price Trends | Realty Holding & Management Consultants",
  description: "Analyze real estate price trends in Mohali. Sector-wise analysis, historical growth data, and market demand insights.",
};

const stats = [
  { label: "Avg. Price Growth", value: "12.5%", sub: "Year-over-Year" },
  { label: "Top Sector", value: "Sector 82A", sub: "Most Demand" },
  { label: "Avg. ROI", value: "8-10%", sub: "Rental Yield" },
];

const sectors = [
  { name: "Sector 82A", status: "High Growth", trend: "up", avgPrice: "₹8,500/sqft" },
  { name: "Sector 66", status: "Stable", trend: "stable", avgPrice: "₹7,200/sqft" },
  { name: "Sector 80", status: "Emerging", trend: "up", avgPrice: "₹6,800/sqft" },
  { name: "Airport Road", status: "Prime", trend: "up", avgPrice: "₹12,000/sqft" },
];

export default function PriceTrendPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-black/5">
        <div className="container-site max-w-3xl mx-auto pt-20 pb-16 px-6 text-center">
          <span className="font-body text-[11px] font-bold tracking-widest uppercase text-black/40 mb-4 block">
            Price Trend Mohali
          </span>
          <h1 className="font-display text-5xl font-semibold mb-4 tracking-tight">
            Price Trends
          </h1>
          <p className="font-body text-black/60 text-lg max-w-xl mx-auto">
            Mohali Real Estate Market Analysis: Stay ahead with sector-wise price movements and demand trends.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container-site py-16 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-black/10 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              <p className="font-body text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">{s.label}</p>
              <p className="text-4xl font-display font-medium text-black mb-1">{s.value}</p>
              <p className="text-sm text-black/60">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container-site py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <h2 className="text-3xl font-display font-medium mb-8">Sector-wise Analysis</h2>
          <div className="space-y-4">
            {sectors.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-6 border border-black/5 rounded-2xl hover:bg-black/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center">
                    <MapPin size={20} className="text-black/40" />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-lg">{s.name}</h3>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${s.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-medium text-xl">{s.avgPrice}</p>
                  <p className="text-[10px] text-black/40 uppercase tracking-widest">Avg. Rate</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-black text-white rounded-[32px]">
            <h3 className="text-3xl font-display font-medium mb-6">Market Insight</h3>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              The Aerocity and IT City corridors continue to drive Mohali's growth. Infrastructure projects like the Bharatmala Pariyojana and expansion of industrial zones near Rajpura are creating new investment hotspots.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Info size={16} />
              <span>Data updated as of April 2026</span>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-8">
            <div className="bg-black/5 rounded-[32px] p-10">
              <h3 className="text-2xl font-display font-medium mb-6 text-black">Get the Full Report</h3>
              <p className="text-black/60 mb-8">
                Request our quarterly market report for detailed sector analysis and upcoming project evaluations.
              </p>
              <a
                href="/contact"
                className="block w-full bg-charcoal text-white text-center py-5 rounded-full font-body font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors"
              >
                Request Report
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
