// app/site/page/page.tsx  →  renders at /
// ============================================================
// HOME PAGE
// Sections are in components/sections/
// Content/copy is in config/site.ts
// ============================================================

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PropertiesCarousel from "@/components/sections/PropertiesCarousel";
import ServicesSection from "@/components/sections/ServicesSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogTeaserSection from "@/components/sections/BlogTeaserSection";
import { createAdminClient } from "@/lib/supabase";
import { homeCarousels } from "@/config/site";
import type { Property } from "@/types";
import { enrichProperty } from "@/lib/property-utils";

// Fetch fresh properties at build time (ISR every 60s)
// Enable hourly caching (ISR every 1 hour)
export const revalidate = 3600;

async function getHomeData() {
  try {
    const supabase = createAdminClient();

    const [{ data: featured }, { data: latest }, { data: rentals }, { data: locData }] =
      await Promise.all([
        supabase
          .from("properties")
          .select("*")
          .or('featured_sections.cs.{"home_hero"},and(featured.eq.true,listing_type.eq.properties)')
          .limit(1)
          .single(),
        supabase
          .from("properties")
          .select("*")
          .or('featured_sections.cs.{"home_latest"},listing_type.eq.sale')
          .order("created_at", { ascending: false })
          .limit(6),
        supabase
          .from("properties")
          .select("*")
          .or('featured_sections.cs.{"home_lands"},listing_type.eq.lands')
          .order("created_at", { ascending: false })
          .limit(6),
        supabase
          .from("properties")
          .select("community, location")
          .eq("status", "available"),
      ]);

    const sectorsSet = new Set<string>();
    if (locData) {
      locData.forEach((p: { community?: string, location?: string }) => {
        if (p.community) sectorsSet.add(p.community);
        if (p.location) sectorsSet.add(p.location);
      });
    }
    const sectors = Array.from(sectorsSet).sort();
    if (!sectors.includes("All") && sectors.length > 0) {
      sectors.unshift("All");
    }

    return {
      featured: (featured ? enrichProperty(featured as Property) : null),
      latest: (latest ?? []).map(enrichProperty) as Property[],
      rentals: (rentals ?? []).map(enrichProperty) as Property[],
      availableSectors: sectors.length > 0 ? sectors : undefined,
    };
  } catch {
    // Return empty data if DB not connected (dev mode)
    return { featured: null, latest: [], rentals: [], availableSectors: undefined };
  }
}

export default async function HomePage() {
  const { featured, latest, rentals, availableSectors } = await getHomeData();

  return (
    <>
      <HeroSection availableSectors={availableSectors} />
      <AboutSection />
      <PropertiesCarousel
        title={homeCarousels.properties.title}
        subtitle={homeCarousels.properties.subtitle}
        properties={latest}
        type="sale"
      />
      <PropertiesCarousel
        title={homeCarousels.lands.title}
        subtitle={homeCarousels.lands.subtitle}
        properties={rentals}
        type="lands"
        inverted
      />
      <ServicesSection />
      <TestimonialsSection />
      <BlogTeaserSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
