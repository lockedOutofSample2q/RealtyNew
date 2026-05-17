import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["AhrefsBot", "AhrefsSiteAudit"],
        crawlDelay: 60, // Throttle aggressive SEO audit bots to 1 req/min to prevent Vercel memory spikes
      }
    ],
    sitemap: "https://www.realtyconsultants.in/sitemap.xml",
  };
}
