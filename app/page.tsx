// app/page.tsx
// ============================================================
// HOME PAGE (moved from /site/page/page.tsx)
// ============================================================

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProperty from "@/components/sections/FeaturedProperty";
import PropertiesCarousel from "@/components/sections/PropertiesCarousel";
import ServicesSection from "@/components/sections/ServicesSection";
import CtaSection from "@/components/sections/CtaSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";

export const revalidate = 60;

async function getHomeData() {
  try {
    const supabase = createAdminClient();

    const [{ data: featured }, { data: latest }, { data: rentals }, { data: locationsData }] =
      await Promise.all([
        supabase
          .from("properties")
          .select("*")
          .eq("featured", true)
          .eq("listing_type", "off-plan")
          .limit(1)
          .single(),
        supabase
          .from("properties")
          .select("*")
          .eq("listing_type", "sale")
          .order("created_at", { ascending: false })
          .limit(6),
        supabase
          .from("properties")
          .select("*")
          .eq("listing_type", "rent")
          .order("created_at", { ascending: false })
          .limit(6),
        supabase
          .from("properties")
          .select("location")
          .neq("location", ""),
      ]);

    const uniqueLocations = Array.from(new Set((locationsData ?? []).map((p) => p.location))).filter(Boolean).sort();

    return {
      featured: featured as Property | null,
      latest: (latest ?? []) as Property[],
      rentals: (rentals ?? []) as Property[],
      locations: uniqueLocations,
    };
  } catch {
    return { featured: null, latest: [], rentals: [], locations: [] };
  }
}

export default async function HomePage() {
  const { featured, latest, rentals, locations } = await getHomeData();

  return (
    <>
      <HeroSection locations={locations} />
      <AboutSection />
      {featured && <FeaturedProperty property={featured} />}
      <PropertiesCarousel
        title="Fresh Opportunities"
        subtitle="Latest off-plan and sale listings"
        properties={latest}
        type="sale"
      />
      <PropertiesCarousel
        title="Top Picks to Rent"
        subtitle="Curated rentals across Dubai's best communities"
        properties={rentals}
        type="rent"
        inverted
      />
      <ServicesSection />
      <CtaSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
