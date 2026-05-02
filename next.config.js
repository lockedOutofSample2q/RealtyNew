// next.config.js
// ============================================================
// EDIT: Add/remove Next.js config here
// Contentlayer handles MDX blog posts (content/blog/*.mdx)
// Images from external domains must be whitelisted below
// ============================================================

const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  turbopack: {},
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

  // ── Headers (Security & Cache hints) ─────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=*, interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com",
              "img-src 'self' blob: data: https://*.supabase.co https://images.unsplash.com https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com https://unpkg.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://*.google-analytics.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      {
        // Cache static assets
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
      {
        source: "/mortgage-calculator",
        destination: "/tools/mortgage-calculator",
        permanent: true,
      },
      {
        source: "/apartments",
        destination: "/flats",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
