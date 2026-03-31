// next.config.js
// ============================================================
// EDIT: Add/remove Next.js config here
// Contentlayer handles MDX blog posts (content/blog/*.mdx)
// Images from external domains must be whitelisted below
// ============================================================

const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image domains ────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co", // Supabase storage
      },
      {
        protocol: "https",
        hostname: "monterealestate.ae",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // ── Headers (Cloudflare CDN cache hints) ─────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache static assets via Cloudflare CDN
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────────
  async redirects() {
    return [
      // Keep old URLs working if migrating
      // { source: '/properties', destination: '/off-plan', permanent: true },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
