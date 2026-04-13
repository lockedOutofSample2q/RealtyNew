import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase";
import { DEMO_PROPERTIES } from "@/lib/demo-properties";
import { allPosts } from "../.contentlayer/generated";
import { siteConfig } from "@/config/site";
import type { Property } from "@/types";

export const revalidate = 3600; // Auto-rebuild the sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url || "https://www.monterealestate.ae";

  // 1. Static Pages
  const staticRoutes = [
    "",
    "/properties",
    "/off-plan",
    "/rentals",
    "/about",
    "/blog",
    "/contact",
    "/booking",
    "/list-your-property",
    "/mortgage-calculator",
    "/relocation",
    "/privacy",
    "/terms",
    "/cookies",
    "/imprint"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Fetch live properties from Supabase + fallback to Demo
  let properties: Partial<Property>[] = DEMO_PROPERTIES.map(p => ({
    slug: p.slug,
    updated_at: p.updated_at || new Date().toISOString()
  }));

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("slug, updated_at");
      
    if (data && data.length > 0) {
      // Merge live properties, overriding demos with the same slug if they exist
      const dataSlugs = new Set((data as any[]).map(p => p.slug));
      const filteredDemos = properties.filter(p => !dataSlugs.has(p.slug));
      properties = [...filteredDemos, ...(data as any[])];
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch properties from Supabase.", error);
  }

  const propertyRoutes = properties.map((property) => ({
    url: `${baseUrl}/${property.slug}`,
    lastModified: new Date(property.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Get all blog posts from Contentlayer
  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Return combined array
  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
