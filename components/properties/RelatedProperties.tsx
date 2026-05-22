import { createAdminClient } from "@/lib/supabase";
import { enrichProperty } from "@/lib/property-utils";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/types";

interface RelatedPropertiesProps {
  entityType: "apartment" | "house" | "land";
  currentSlug: string;
}

export default async function RelatedProperties({ entityType, currentSlug }: RelatedPropertiesProps) {
  const supabase = createAdminClient();
  
  // Map entity type to correct table
  const tableName = entityType === "apartment" ? "apartments" : 
                    entityType === "house" ? "houses" : "lands";

  // Fetch 3 related properties, excluding current slug
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .neq("slug", currentSlug)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(3);

  if (error || !data || data.length === 0) {
    return null;
  }

  // Enrich data for PropertyCard
  const relatedProperties = data.map((p: any) => enrichProperty({ ...p, entity_type: entityType })) as Property[];

  return (
    <section className="mt-20 pt-16 border-t border-black/10">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[28px] font-bold text-black font-display">
          Similar {entityType === "apartment" ? "Flats" : entityType === "house" ? "Houses" : "Plots"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProperties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </section>
  );
}
