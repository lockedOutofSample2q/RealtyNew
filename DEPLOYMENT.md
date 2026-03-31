# Monter Real Estate — Developer & Deployment Guide

## Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | Full-stack React, SSR, ISR |
| Styling | Tailwind CSS | Utility-first CSS |
| Blog CMS | Contentlayer + MDX | Push `.mdx` to GitHub → live post |
| Database | Supabase (PostgreSQL) | Properties, leads, subscribers |
| Auth | Supabase Auth | Admin dashboard login |
| Hosting | Vercel | Auto-deploy on Git push |
| CDN + DNS | Cloudflare | Domain, CDN, DDoS protection |

---

## 1. Local Development Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/monter-real-estate.git
cd monter-real-estate

# Install dependencies
npm install

# Copy env template and fill in values
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
# → http://localhost:3000
```

---

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name it `monter-real-estate`, choose a region close to UAE (e.g. Frankfurt or Mumbai)
3. Copy your project URL and keys from **Project Settings → API**
4. Go to **SQL Editor** → paste the entire contents of `supabase/schema.sql` → Run
5. Create an admin user: **Authentication → Users → Add User** (use your email + strong password)

**Keys to copy into Vercel + .env.local:**
- `NEXT_PUBLIC_SUPABASE_URL` — your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (**never expose this client-side**)

---

## 3. Vercel Deployment

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select the repository
4. Set **Framework Preset** to `Next.js`
5. Add environment variables (from step 2 above)
6. Click **Deploy**

**Auto-deploy is now active.** Every `git push` to `main` triggers a new deployment.

### Vercel Settings to Configure
- **Project Settings → General**: Set Production Branch to `main`
- **Project Settings → Domains**: Add `monterealestate.ae` and `www.monterealestate.ae`
- **Project Settings → Environment Variables**: Add all 4 env vars

---

## 4. Cloudflare Setup (DNS + CDN)

### Domain Configuration
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Add Site → enter `monterealestate.ae`
2. Update your domain registrar's nameservers to Cloudflare's nameservers
3. Wait for DNS propagation (up to 24 hours)

### DNS Records (add in Cloudflare)
```
Type    Name    Content                         Proxy
CNAME   @       cname.vercel-dns.com            OFF ← important: proxy must be OFF for Vercel
CNAME   www     cname.vercel-dns.com            OFF
```

> **Why proxy OFF?** Vercel manages SSL/TLS certificates themselves. Cloudflare proxying (orange cloud) interferes with Vercel's certificate issuance. Keep it grey (DNS only).

### Cloudflare CDN for Static Assets
After DNS is working, you can enable CDN caching rules:
1. **Rules → Cache Rules** → Create rule
2. Match: `monterealestate.ae/images/*`
3. Cache: Override, TTL 1 year
4. This caches your property images at Cloudflare's edge globally

### Cloudflare Web Analytics (optional, free)
1. **Analytics → Web Analytics** → Add site
2. Copy the `<script>` tag
3. Paste into `app/layout.tsx` (there's a comment showing where)

---

## 5. Blog Publishing Workflow

The blog uses **Contentlayer** — MDX files are your CMS.

```
# To publish a new post:

1. Create: content/blog/your-post-slug.mdx

2. Required frontmatter:
   ---
   title: "Post Title"
   date: "2025-06-01"
   excerpt: "Short summary for card previews"
   author: "Author Name"
   category: "Market Insights"
   coverImage: "/images/blog/cover.jpg"
   featured: false
   tags: ["Dubai", "Investment"]
   ---

3. Write your post in Markdown below the ---

4. git add content/blog/your-post-slug.mdx
   git commit -m "Add blog: your post title"
   git push

5. Vercel builds in ~60 seconds → post is live at:
   monterealestate.ae/blog/your-post-slug
```

**Category options:** `Market Insights` | `Off Plan` | `Rentals` | `Investment` | `Lifestyle` | `News`

---

## 6. Admin Dashboard

Access at: `https://www.monterealestate.ae/admin/login`

| Section | What you can do |
|---------|----------------|
| Dashboard | See total properties, leads, new inquiries at a glance |
| Properties | Add, edit, delete listings. Set featured status. |
| Leads | View all contact form submissions. Update status (new → contacted → qualified → closed) |
| Blog Posts | See published MDX posts. Instructions for adding new ones. |
| Settings | Reference guide for where to edit each part of the site |

**Admin credentials** are managed in Supabase → Authentication → Users.

---

## 7. Editing Site Content

### All copy and content → `config/site.ts`
Open this one file to change:
- Company name, tagline, description
- Phone, email, WhatsApp number
- Social media URLs
- Hero headline and subline
- About section stats
- Services (4 cards)
- FAQ questions and answers
- Navigation items
- Footer links

### Brand colours → `styles/globals.css`
```css
:root {
  --gold: #C9A84C;         /* ← change this to rebrand the accent */
  --background: #0D0D0D;   /* ← page background */
  --font-display: 'Cormorant Garamond';  /* ← heading font */
  --font-body: 'DM Sans';               /* ← body font */
}
```

### Hero background image
Replace `/public/images/hero.jpg` with your own image (1920×1080px minimum).

### Property images
Upload images to **Supabase Storage** → copy the public URL → paste into the `images` array when adding a property in the admin panel.

---

## 8. File Structure Reference

```
monter/
├── app/
│   ├── layout.tsx                 Root layout, metadata, fonts
│   ├── not-found.tsx              404 page
│   ├── api/
│   │   ├── contact/route.ts       POST: save lead to Supabase
│   │   └── subscribe/route.ts     POST: newsletter signup
│   ├── site/                      All public pages
│   │   ├── layout.tsx             Navbar + Footer wrapper
│   │   ├── page/page.tsx          Home (/)
│   │   ├── off-plan/page.tsx      Off Plan (/off-plan)
│   │   ├── rentals/page.tsx       Rentals (/rentals)
│   │   ├── about/page.tsx         About (/about)
│   │   ├── contact/page.tsx       Contact (/contact)
│   │   ├── blog/
│   │   │   ├── page.tsx           Blog listing (/blog)
│   │   │   └── [slug]/page.tsx    Blog post (/blog/:slug)
│   │   ├── properties/
│   │   │   └── [slug]/page.tsx    Property detail (/properties/:slug)
│   │   └── mortgage-calculator/   Mortgage calculator tool
│   └── admin/                     Protected admin dashboard
│       ├── layout.tsx             Sidebar + header
│       ├── login/page.tsx         Login page
│       ├── dashboard/page.tsx     Stats overview
│       ├── properties/page.tsx    Property CRUD
│       ├── leads/page.tsx         Lead management
│       ├── blog-posts/page.tsx    Blog CMS reference
│       └── settings/page.tsx      Settings guide
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             Top navigation bar
│   │   └── Footer.tsx             Site footer with newsletter
│   ├── sections/                  Home page sections
│   │   ├── HeroSection.tsx        Full-screen hero with search
│   │   ├── AboutSection.tsx       Company intro + stats
│   │   ├── FeaturedProperty.tsx   Featured development card
│   │   ├── PropertiesCarousel.tsx Horizontal scroll carousel
│   │   ├── ServicesSection.tsx    4-service grid
│   │   ├── CtaSection.tsx         Gold CTA banner
│   │   ├── FaqSection.tsx         Accordion FAQ
│   │   └── ContactSection.tsx     Contact form
│   └── ui/
│       ├── PropertyCard.tsx       Property listing card
│       └── PropertyGrid.tsx       Filterable property grid
│
├── config/
│   └── site.ts                   ← EDIT THIS for all content
│
├── content/
│   └── blog/
│       └── *.mdx                 ← DROP POSTS HERE
│
├── lib/
│   ├── supabase.ts               Supabase client setup
│   └── utils.ts                  cn(), formatPrice(), formatDate()
│
├── styles/
│   └── globals.css               ← EDIT for brand colours/fonts
│
├── supabase/
│   └── schema.sql                ← RUN in Supabase SQL Editor
│
├── types/
│   ├── index.ts                  TypeScript interfaces
│   └── supabase.ts               Auto-generated DB types
│
├── middleware.ts                 Admin route protection
├── next.config.js                Next.js + Contentlayer config
├── tailwind.config.ts            Tailwind design tokens
├── contentlayer.config.ts        MDX blog schema definition
└── .env.local.example            Copy to .env.local
```

---

## 9. Updating TypeScript DB Types

After changing the Supabase schema, regenerate types:

```bash
npm run db:generate
# → updates types/supabase.ts automatically
```

Requires Supabase CLI installed and logged in.

---

## 10. Performance Notes

- Pages use **ISR (Incremental Static Regeneration)** with `revalidate = 60` — pages rebuild every 60 seconds automatically
- Blog posts are **fully static** (built at deploy time from MDX)
- Images use Next.js `<Image>` with automatic WebP/AVIF conversion
- Cloudflare CDN caches `/images/*` at the edge globally
- The admin dashboard is client-rendered (no caching needed)
