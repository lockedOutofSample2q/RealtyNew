// app/site/off-plan/page.tsx  →  /off-plan
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import PropertyGrid from "@/components/ui/PropertyGrid";
import type { Property } from "@/types";

export const metadata: Metadata = {
  title: "Off Plan Properties",
  description: "Browse Dubai's best off-plan developments. Flexible payment plans, Golden Visa-eligible projects, and early-bird pricing — curated by Monter.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("listing_type", "off-plan")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return (data ?? []) as Property[];
  } catch {
    return [];
  }
}

export default async function OffPlanPage() {
  const properties = await getProperties();

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* Page header */}
      <div className="border-b border-[rgba(201,168,76,0.08)] section-padding-sm">
        <div className="container-site pt-10 pb-10">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-3 block">
            New Developments
          </span>
          <h1 className="font-display font-light text-white mb-4">
            Off Plan Properties
          </h1>
          <p className="font-body text-white/50 max-w-xl text-base leading-relaxed">
            Buy at launch price. Pay over 5–7 years. Earn rental yield while you do.
            These are the off-plan developments worth your capital right now.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              "DLD-registered projects only",
              "Escrow-protected funds",
              "Developer payment plans available",
              "Golden Visa eligible from AED 2M",
            ].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-[var(--gold)] text-sm">✓</span>
                <span className="font-body text-xs text-white/50">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="container-site py-12">
        <PropertyGrid properties={properties} listingType="off-plan" />
      </div>
    </div>
  );
}
