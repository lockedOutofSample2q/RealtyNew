import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { allPosts } from "contentlayer/generated";
import type { Property } from "@/types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.realtyconsultants.in";

  const BLACKLISTED_SLUGS = [
    "gurditpura", "kurali", "gandiya", "mindha-majra", "manakpur", "fauji-colony",
    "gobindpura", "pilkhani", "ucha-khehra", "saneta", "zirakpur", "khaspur",
    "raipur-kalan", "govindgarh"
  ];

  // 1. Static Pages with Strategic Priorities
  const routes = [
    { path: "", priority: 1.0 },                 // Home Base
    { path: "/properties/flats", priority: 0.9 }, 
    { path: "/properties/houses", priority: 0.9 },
    { path: "/properties/lands", priority: 0.9 },
    { path: "/properties/builders", priority: 0.8 }, // Builders Directory Hub
    { path: "/blog", priority: 0.8 },            // High-Value Hub
    { path: "/tools/price-trend", priority: 0.7 }, // Trust & Tools
    { path: "/faq", priority: 0.7 },             // Trust & Tools
    { path: "/about", priority: 0.5 },           // Admin
    { path: "/contact", priority: 0.5 },         // Admin
    { path: "/appointments", priority: 0.5 },         // Admin
    { path: "/list-your-property", priority: 0.5 }, // Admin
    { path: "/tools/mortgage-calculator", priority: 0.5 }, // Admin
    { path: "/tools/loan-eligibility", priority: 0.5 },   // Admin
    { path: "/privacy", priority: 0.3 },         // Low Value
    { path: "/terms", priority: 0.3 },           // Low Value
    { path: "/cookies", priority: 0.3 }          // Low Value
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route.priority,
  }));

  // 2. Fetch live properties from Supabase (Priority 0.8: Inventory)
  let properties: Partial<Property>[] = [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("slug, updated_at, entity_type");
      
    if (data && data.length > 0) {
      properties = (data as any[]);
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch properties from Supabase.", error);
  }

  const propertyRoutes = properties
    .filter((property) => (property.entity_type === "apartment" || property.entity_type === "house") && !BLACKLISTED_SLUGS.includes(property.slug || ""))
    .map((property) => {
      const segment = property.entity_type === "house" ? "houses" : "flats";
      return {
        url: `${baseUrl}/properties/${segment}/${property.slug}`,
        lastModified: new Date(property.updated_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

  // 3. Blog Posts from Contentlayer (Priority 0.7: Dwell Time)
  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 4. Sector SEO Landing Pages (Priority 0.8: Landing Pages)
  let sectorPages: { sector_slug: string; updated_at?: string }[] = [];
  try {
    const supabase = createAdminClient();

    // First, get explicit SEO pages
    const { data: seoData } = await supabase
      .from("sector_seo")
      .select("sector_slug, updated_at");

    const sectorSet = new Map<string, Date>();
    if (seoData) {
      seoData.forEach((item: any) => {
        sectorSet.set(item.sector_slug, new Date(item.updated_at || new Date()));
      });
    }

    sectorPages = Array.from(sectorSet.entries()).map(([slug, date]) => ({
      sector_slug: slug,
      updated_at: date.toISOString(),
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch sector SEO pages.", error);
  }
  const sectorRoutes = sectorPages
    .filter((item) => !BLACKLISTED_SLUGS.includes(item.sector_slug || ""))
    .map((item: { sector_slug: string; updated_at?: string }) => ({
      url: `${baseUrl}/properties/flats/${item.sector_slug}`,
      lastModified: new Date(item.updated_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // 5. Fetch live developers/builders from Supabase (Priority 0.7)
  let buildersSlugs: string[] = [];
  try {
    const supabase = createAdminClient();
    const [aptsRes, landsRes, housesRes] = await Promise.all([
      supabase.from("apartments").select("developer"),
      supabase.from("lands").select("developer"),
      supabase.from("houses").select("developer"),
    ]);

    const devSet = new Set<string>();
    
    const slugify = (text: string) =>
      text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");

    [...(aptsRes.data || []), ...(landsRes.data || []), ...(housesRes.data || [])].forEach((p: any) => {
      if (p.developer && p.developer.trim() !== "" && p.developer.trim() !== "Independent") {
        devSet.add(slugify(p.developer.trim()));
      }
    });

    buildersSlugs = Array.from(devSet);
  } catch (error) {
    console.error("Sitemap: Failed to fetch builders from Supabase.", error);
  }

  const builderRoutes = buildersSlugs.map((slug) => ({
    url: `${baseUrl}/properties/builders/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Return combined array
  return [...staticRoutes, ...propertyRoutes, ...blogRoutes, ...sectorRoutes, ...builderRoutes];
}
