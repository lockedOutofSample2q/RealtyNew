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

// Fetch fresh properties at build time (ISR every 60s)
export const revalidate = 60;

async function getHomeData() {
  try {
    const supabase = createAdminClient();

    const [{ data: featured }, { data: latest }, { data: rentals }] =
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
      ]);

    return {
      featured: featured as Property | null,
      latest: (latest ?? []) as Property[],
      rentals: (rentals ?? []) as Property[],
    };
  } catch {
    // Return empty data if DB not connected (dev mode)
    return { featured: null, latest: [], rentals: [] };
  }
}

export default async function HomePage() {
  const { featured, latest, rentals } = await getHomeData();

  return (
    <>
      <HeroSection />
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
