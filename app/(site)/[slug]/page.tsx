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
    const { data } = await supabase.from("properties").select("*").eq("slug", slug).single();
    return data as Property | null;
  } catch {
    return null;
  }
});

export default async function PropertyRootRedirectPage(props: Props) {
  const params = await props.params;
  const property = await getProperty(params.slug);
  
  if (!property) {
    notFound();
  }

  // Determine standard dynamic route segment based on entity type
  let segment = "flats";
  if (property.entity_type === "house") {
    segment = "houses";
    permanentRedirect(`/properties/houses/${params.slug}`);
  } else if (property.entity_type === "land" || property.listing_type === "lands") {
    // Lands do not have detail pages (as requested), redirect to Lands index page
    permanentRedirect(`/properties/lands`);
  } else {
    permanentRedirect(`/properties/flats/${params.slug}`);
  }
}
