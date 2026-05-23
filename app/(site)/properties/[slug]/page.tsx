import { createAdminClient } from "@/lib/supabase";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import type { Property } from "@/types";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("slug")
      .not("listing_type", "eq", "lands");
    return (data ?? []).map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

const getProperty = cache(async (slug: string): Promise<Property | null> => {
  try {
    const supabase = createAdminClient();
    
    // Check apartments table first
    let { data } = await supabase.from("apartments").select("*").eq("slug", slug).single();
    if (data) return { ...data, entity_type: 'apartment' } as Property;
    
    // Check houses table
    ({ data } = await supabase.from("houses").select("*").eq("slug", slug).single());
    if (data) return { ...data, entity_type: 'house' } as Property;
    
    // Check lands table
    ({ data } = await supabase.from("lands").select("*").eq("slug", slug).single());
    if (data) return { ...data, entity_type: 'land' } as Property;
    
    return null;
  } catch {
    return null;
  }
});

export default async function PropertySubRedirectPage(props: Props) {
  const params = await props.params;
  const property = await getProperty(params.slug);
  
  if (!property) {
    notFound();
  }

  // Redirect to correct sub-route based on the property type
  if (property.entity_type === "house") {
    permanentRedirect(`/properties/houses/${params.slug}`);
  } else if (property.entity_type === "land" || property.listing_type === "lands") {
    // Lands do not have detail pages (as requested), redirect to Lands index page
    permanentRedirect(`/properties/lands`);
  } else {
    permanentRedirect(`/properties/flats/${params.slug}`);
  }
}
