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
      colors: {
        charcoal: {
          DEFAULT: "#0D0D0D",
          50: "#1A1A1A",
          100: "#141414",
          200: "#0D0D0D",
          300: "#080808",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        card: "var(--card)",
        gold: "#C9A84C",
      },
      fontFamily: {
        display: ["var(--font-body)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-display)", "serif"],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        14: "56px",
        16: "64px",
        "section": "6rem",
        "section-sm": "3rem",
      },
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
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.08)",
        elevated: "0 8px 30px rgba(0, 0, 0, 0.12)",
        hover: "0 12px 40px rgba(0, 0, 0, 0.15)",
        "card": "0 4px 40px rgba(0,0,0,0.05)",
        "card-hover": "0 8px 60px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "4xl": "32px",
      },
      typography: ({ theme }: any) => ({
        charcoal: {
          css: {
            '--tw-prose-body': theme('colors.charcoal[200]'),
            '--tw-prose-headings': theme('colors.charcoal[DEFAULT]'),
            '--tw-prose-lead': theme('colors.charcoal[300]'),
            '--tw-prose-links': theme('colors.gold'),
            '--tw-prose-bold': theme('colors.charcoal[DEFAULT]'),
            '--tw-prose-counters': theme('colors.charcoal[300]'),
            '--tw-prose-bullets': theme('colors.gold'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.charcoal[DEFAULT]'),
            '--tw-prose-quote-borders': theme('colors.gold'),
            '--tw-prose-captions': theme('colors.muted'),
            '--tw-prose-code': theme('colors.charcoal[DEFAULT]'),
            '--tw-prose-pre-code': theme('colors.charcoal[50]'),
            '--tw-prose-pre-bg': theme('colors.charcoal[DEFAULT]'),
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),
          },
        },
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--foreground)',
            fontFamily: theme('fontFamily.body').join(', '),
            fontSize: '1.125rem',
            lineHeight: '2.0',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              lineHeight: '2.0',
            },
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '500',
              letterSpacing: '-0.02em',
              color: theme('colors.charcoal[DEFAULT]'),
            },
            h1: {
              fontSize: '3.5rem',
              marginTop: '0',
              marginBottom: '0.75rem',
              lineHeight: '1.1',
            },
            h2: {
              fontSize: '2.5rem',
              marginTop: '3rem',
              marginBottom: '0.75rem',
              lineHeight: '1.2',
            },
            h3: {
              fontSize: '1.875rem',
              marginTop: '2.5rem',
              marginBottom: '0.6rem',
              lineHeight: '1.3',
            },
            h4: {
              fontSize: '1.5rem',
              marginTop: '2rem',
              marginBottom: '0.5rem',
              lineHeight: '1.4',
            },
            // Target paragraphs immediately following headings to tighten the gap
            'h1 + p, h2 + p, h3 + p, h4 + p': {
              marginTop: '0.5rem',
            },
            a: {
              color: theme('colors.gold'),
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              borderBottom: '1px solid transparent',
              '&:hover': {
                color: theme('colors.gold'),
                borderBottomColor: theme('colors.gold'),
                opacity: '0.8',
              },
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            'ol > li::marker': {
              color: theme('colors.gold'),
              fontWeight: '600',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.5rem',
            },
            'ul > li::before': {
              content: '""',
              position: 'absolute',
              left: '0',
              top: '0.75em',
              width: '0.5rem',
              height: '1px',
              backgroundColor: theme('colors.gold'),
            },
            hr: {
              borderColor: 'rgba(0,0,0,0.05)',
              marginTop: '4rem',
              marginBottom: '4rem',
            },
            blockquote: {
              fontStyle: 'italic',
              fontWeight: '400',
              borderLeftWidth: '0',
              marginTop: '3rem',
              marginBottom: '3rem',
              backgroundColor: 'rgba(201, 168, 76, 0.04)',
              padding: '2.5rem 3rem',
              borderRadius: '1.5rem',
              position: 'relative',
              '&::before': {
                content: '"“"',
                position: 'absolute',
                top: '-0.5rem',
                left: '1.5rem',
                fontSize: '4rem',
                color: theme('colors.gold'),
                opacity: '0.2',
                fontFamily: 'serif',
              },
            },
            'blockquote p': {
              margin: '0 !important',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              color: theme('colors.charcoal[DEFAULT]'),
            },
            img: {
              borderRadius: '2rem',
              marginTop: '4rem',
              marginBottom: '1rem',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15)',
            },
            // Style the text below images if it's meant to be a caption
            'p img + em, p img + span, p + em': {
              display: 'block',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: theme('colors.muted'),
              marginTop: '1rem',
              fontStyle: 'italic',
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;

