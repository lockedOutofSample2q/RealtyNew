// tailwind.config.ts
// ============================================================
// DESIGN TOKENS — Edit brand colors/fonts here
// All colors reference CSS variables defined in styles/globals.css
// ============================================================

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      // ── Brand Colors ────────────────────────────────────
      colors: {
        // Core palette
        charcoal: {
          DEFAULT: "#0D0D0D",
          50: "#1A1A1A",
          100: "#141414",
          200: "#0D0D0D",
          300: "#080808",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          dark: "#A8893A",
          muted: "#C9A84C33",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          dark: "#E8E0D0",
        },

        // Semantic
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        card: "var(--card)",
      },

      // ── Typography ───────────────────────────────────────
      fontFamily: {
        // Display: used for headings (imported in globals.css)
        display: ["var(--font-display)", "serif"],
        // Body: clean and readable
        body: ["var(--font-body)", "sans-serif"],
        // Mono: code blocks in blog
        mono: ["var(--font-mono)", "monospace"],
      },

      // ── Spacing Scale ────────────────────────────────────
      spacing: {
        "section": "6rem",   // Standard section padding
        "section-sm": "3rem",
      },

      // ── Animations ───────────────────────────────────────
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        "shimmer": "shimmer 2s linear infinite",
        "carousel": "carousel 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        carousel: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      // ── Shadows ──────────────────────────────────────────
      boxShadow: {
        "gold": "0 0 30px rgba(201, 168, 76, 0.15)",
        "card": "0 4px 40px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 60px rgba(0,0,0,0.6)",
      },

      // ── Border Radius ────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
