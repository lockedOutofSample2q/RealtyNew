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
import type { SearchTab } from "@/components/search/propertySearchOptions";
import { enrichProperty } from "@/lib/property-utils";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

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
          .select("community, location, entity_type")
          .eq("status", "available"),
      ]);

    const sectorsByTab: Record<SearchTab, Set<string>> = {
      flats: new Set<string>(),
      houses: new Set<string>(),
      lands: new Set<string>(),
    };

    if (locData) {
      locData.forEach((p: { community?: string, location?: string, entity_type: string }) => {
        let tab: SearchTab | null = null;
        if (p.entity_type === 'apartment') tab = 'flats';
        else if (p.entity_type === 'house') tab = 'houses';
        else if (p.entity_type === 'land') tab = 'lands';

        if (tab) {
          if (p.community) sectorsByTab[tab].add(p.community);
          if (p.location) sectorsByTab[tab].add(p.location);
        }
      });
    }

    const availableSectors = {
      flats: ["All", ...Array.from(sectorsByTab.flats).sort()],
      houses: ["All", ...Array.from(sectorsByTab.houses).sort()],
      lands: ["All", ...Array.from(sectorsByTab.lands).sort()],
    };

    return {
      featured: (featured ? enrichProperty(featured as Property) : null),
      latest: (latest ?? []).map(enrichProperty) as Property[],
      rentals: (rentals ?? []).map(enrichProperty) as Property[],
      availableSectors,
    };
  } catch {
    // Return empty data if DB not connected (dev mode)
    return { 
      featured: null, 
      latest: [], 
      rentals: [], 
      availableSectors: { flats: ["All"], houses: ["All"], lands: ["All"] } 
    };
  }
}

export default async function HomePage() {
  const { featured, latest, rentals, availableSectors } = await getHomeData();

  const latestPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      category: post.category,
      date: format(parseISO(post.date), "MMMM dd, yyyy"),
      href: post.url,
      image: post.coverImage,
    }));

  return (
    <>
      <HeroSection sectorOptions={availableSectors} />
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
      <BlogTeaserSection posts={latestPosts} />
      <FaqSection />
      <ContactSection />
    </>
  );
}
