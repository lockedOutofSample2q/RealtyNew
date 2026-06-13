// app/site/page/page.tsx  →  renders at /
// ============================================================
// HOME PAGE
// Sections are in components/sections/
// Content/copy is in config/site.ts
// ============================================================

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PropertiesCarousel from "@/components/sections/PropertiesCarousel";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const BlogTeaserSection = dynamic(() => import("@/components/sections/BlogTeaserSection"));
import { createAdminClient } from "@/lib/supabase";
import { homeCarousels, faqs } from "@/config/site";
import type { Property } from "@/types";
import type { SearchTab } from "@/components/search/propertySearchOptions";
import { enrichProperty } from "@/lib/property-utils";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

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
          .limit(15),
        supabase
          .from("properties")
          .select("*")
          .or('featured_sections.cs.{"home_lands"},listing_type.eq.lands')
          .order("created_at", { ascending: false })
          .limit(15),
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

    // Filter out properties that have no images or empty image arrays
    const validLatest = (latest ?? []).filter(p => p.images && p.images.length > 0).slice(0, 6);
    const validRentals = (rentals ?? []).filter(p => p.images && p.images.length > 0).slice(0, 6);

    return {
      featured: (featured ? enrichProperty(featured as Property) : null),
      latest: validLatest.map(enrichProperty) as Property[],
      rentals: validRentals.map(enrichProperty) as Property[],
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
