// lib/sitemap-generator.ts
// ============================================================
// INDEPENDENT SITEMAP URL GENERATOR
// ============================================================
// Generates all platform sitemap URLs dynamically by querying
// Supabase and parsing the blog content files on the filesystem.
// Avoids bundling issues with Contentlayer in CLI tools.
// ============================================================

import fs from "fs";
import path from "path";
import { createAdminClient } from "./supabase";

const baseUrl = "https://www.realtyconsultants.in";

const BLACKLISTED_SLUGS = [
  "gurditpura", "kurali", "gandiya", "mindha-majra", "manakpur", "fauji-colony",
  "gobindpura", "pilkhani", "ucha-khehra", "saneta", "zirakpur", "khaspur",
  "raipur-kalan", "govindgarh"
];

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export async function generateSitemapUrls(): Promise<string[]> {
  const urls: string[] = [];

  // 1. Static Pages
  const staticPaths = [
    "",
    "/properties",
    "/properties/flats",
    "/properties/houses",
    "/properties/lands",
    "/properties/builders",
    "/blog",
    "/tools/price-trend",
    "/faq",
    "/guides/property-documents",
    "/about",
    "/contact",
    "/appointments",
    "/list-your-property",
    "/tools/mortgage-calculator",
    "/tools/loan-eligibility",
    "/privacy",
    "/terms",
    "/cookies"
  ];

  staticPaths.forEach((p) => {
    urls.push(`${baseUrl}${p}`);
  });

  // 2. Fetch live properties from Supabase
  const supabase = createAdminClient();
  try {
    const { data: properties, error: propertiesError } = await supabase
      .from("properties")
      .select("slug, entity_type");

    if (propertiesError) throw propertiesError;

    if (properties) {
      properties.forEach((property: any) => {
        if (
          (property.entity_type === "apartment" || property.entity_type === "house") &&
          !BLACKLISTED_SLUGS.includes(property.slug || "")
        ) {
          const segment = property.entity_type === "house" ? "houses" : "flats";
          urls.push(`${baseUrl}/properties/${segment}/${property.slug}`);
        }
      });
    }
  } catch (error) {
    console.error("Sitemap Generator: Failed to fetch properties from Supabase:", error);
  }

  // 3. Blog Posts (Read MDX files directly from the filesystem)
  try {
    const blogDir = path.resolve(process.cwd(), "content/blog");
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      files.forEach((file) => {
        if (file.endsWith(".mdx") || file.endsWith(".md")) {
          const slug = file.replace(/\.mdx?$/, "");
          urls.push(`${baseUrl}/blog/${slug}`);
        }
      });
    } else {
      console.warn("Sitemap Generator: Blog content directory not found at", blogDir);
    }
  } catch (error) {
    console.error("Sitemap Generator: Failed to read blog files:", error);
  }

  // 4. Sector SEO Landing Pages
  try {
    const { data: seoData, error: seoError } = await supabase
      .from("sector_seo")
      .select("sector_slug");

    if (seoError) throw seoError;

    if (seoData) {
      const sectorSet = new Set<string>();
      seoData.forEach((item: any) => {
        if (item.sector_slug && !BLACKLISTED_SLUGS.includes(item.sector_slug)) {
          sectorSet.add(item.sector_slug);
        }
      });
      sectorSet.forEach((slug) => {
        urls.push(`${baseUrl}/properties/flats/${slug}`);
      });
    }
  } catch (error) {
    console.error("Sitemap Generator: Failed to fetch sector SEO pages:", error);
  }

  // 5. Fetch live developers/builders from Supabase
  try {
    const [aptsRes, landsRes, housesRes] = await Promise.all([
      supabase.from("apartments").select("developer"),
      supabase.from("lands").select("developer"),
      supabase.from("houses").select("developer"),
    ]);

    const devSet = new Set<string>();
    
    const extractDevs = (data: any[] | null) => {
      if (!data) return;
      data.forEach((p: any) => {
        if (p.developer && p.developer.trim() !== "" && p.developer.trim() !== "Independent") {
          devSet.add(slugify(p.developer.trim()));
        }
      });
    };

    extractDevs(aptsRes.data);
    extractDevs(landsRes.data);
    extractDevs(housesRes.data);

    devSet.forEach((slug) => {
      urls.push(`${baseUrl}/properties/builders/${slug}`);
    });
  } catch (error) {
    console.error("Sitemap Generator: Failed to fetch builders from Supabase:", error);
  }

  return urls;
}
