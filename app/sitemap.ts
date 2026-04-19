import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase";

import { allPosts } from "contentlayer/generated";
import { siteConfig } from "@/config/site";
import type { Property } from "@/types";

export const revalidate = 3600; // Auto-rebuild the sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url || "https://www.monterealestate.ae";

  // 1. Static Pages
  const staticRoutes = [
    "",
    "/properties",
    
    "/lands",
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

  // 2. Fetch live properties from Supabase
  let properties: Partial<Property>[] = [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("slug, updated_at");
      
    if (data && data.length > 0) {
      properties = (data as any[]);
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch properties from Supabase.", error);
  }

  const propertyRoutes = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
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
