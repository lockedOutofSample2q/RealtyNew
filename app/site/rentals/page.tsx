// app/site/rentals/page.tsx  →  /rentals
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import PropertyGrid from "@/components/ui/PropertyGrid";
import type { Property } from "@/types";

export const metadata: Metadata = {
  title: "Rentals",
  description: "Furnished and unfurnished rentals across Dubai's best communities. Short-term and long-term options, managed end-to-end by Monter.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("listing_type", "rent")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return (data ?? []) as Property[];
  } catch {
    return [];
  }
}

export default async function RentalsPage() {
  const properties = await getProperties();

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* Page header */}
      <div className="border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site pt-16 pb-10">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-3 block">
            Available to Rent
          </span>
          <h1 className="font-display font-light text-white mb-4">
            Rental Properties
          </h1>
          <p className="font-body text-white/50 max-w-xl text-base leading-relaxed">
            Curated rentals across Dubai's most sought-after communities. Furnished or unfurnished,
            short-term or long-term — we handle everything from viewing to Ejari.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { value: "24hr", label: "Average response time" },
              { value: "Ejari", label: "Fully registered leases" },
              { value: "Zero", label: "Hidden fees" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl text-[var(--gold)] font-light">{s.value}</div>
                <div className="font-body text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="container-site py-12">
        <PropertyGrid properties={properties} listingType="rent" />
      </div>
    </div>
  );
}
