import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { allPosts } from "contentlayer/generated";
import type { Property } from "@/types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.realtyconsultants.in";

  // 1. Static Pages with Strategic Priorities
  const routes = [
    { path: "", priority: 1.0 },                 // Home Base
    { path: "/properties", priority: 0.9 },      // Money Hub
    { path: "/flats", priority: 0.9 },           // Money Hub
    { path: "/houses", priority: 0.9 },          // Money Hub
    { path: "/blog", priority: 0.8 },            // High-Value Hub
    { path: "/tools/price-trend", priority: 0.7 }, // Trust & Tools
    { path: "/faq", priority: 0.7 },             // Trust & Tools
    { path: "/guides/property-documents", priority: 0.7 }, // Trust & Tools
    { path: "/about", priority: 0.5 },           // Admin
    { path: "/contact", priority: 0.5 },         // Admin
    { path: "/booking", priority: 0.5 },         // Admin
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
      .select("slug, updated_at, listing_type")
      .not("listing_type", "eq", "lands");
      
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
    priority: 0.8,
  }));

  // 3. Blog Posts from Contentlayer (Priority 0.7: Dwell Time)
  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Return combined array
  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
