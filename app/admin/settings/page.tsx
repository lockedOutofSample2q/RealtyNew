"use client";
// app/admin/settings/page.tsx
// ============================================================
// SETTINGS PAGE
// Shows all editable config locations with direct file paths.
// A future version could write to a DB-backed config table.
// ============================================================

import { ExternalLink, FileCode, Palette, Globe, Database } from "lucide-react";

const SETTINGS_SECTIONS = [
  {
    icon: FileCode,
    title: "Site Content & Copy",
    file: "config/site.ts",
    description: "Edit everything from this one file: brand name, phone number, WhatsApp, email, social links, hero headline, about text, FAQ questions, services.",
    items: [
      "Brand name and tagline",
      "Contact phone, email, WhatsApp number",
      "Social media URLs",
      "Hero section headline and subline",
      "About section stats (10+ years, 500+ properties...)",
      "Services grid (4 cards)",
      "FAQ accordion questions and answers",
      "Navigation items",
      "Footer links",
    ],
  },
  {
    icon: Palette,
    title: "Visual Design & Colors",
    file: "styles/globals.css",
    description: "All CSS variables are in this file. Change --gold to update the gold accent across the entire site in one edit.",
    items: [
      "--gold: accent color (default #C9A84C)",
      "--background: page background color",
      "--font-display: heading font",
      "--font-body: body text font",
      "Section padding, max-width",
    ],
  },
  {
    icon: Globe,
    title: "Images & Media",
    file: "public/images/",
    description: "Drop images here and reference them by path. Key images to replace:",
    items: [
      "hero.jpg — home page background (1920×1080 minimum)",
      "og-default.jpg — social share image (1200×630)",
      "property-placeholder.jpg — fallback for properties without images",
      "blog/ — folder for blog post cover images",
    ],
  },
  {
    icon: Database,
    title: "Database",
    file: "supabase/schema.sql",
    description: "All tables are defined here. Run in Supabase SQL Editor to (re)create the schema. Properties, leads, and subscribers are the three core tables.",
    items: [
      "properties — all listings (managed via Admin → Properties)",
      "leads — contact form submissions (Admin → Leads)",
      "subscribers — newsletter signups",
      "Row-level security policies are pre-configured",
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-white font-light">Settings</h1>
        <p className="font-body text-sm text-white/40 mt-1">
          Where to edit each part of the site
        </p>
      </div>

      <div className="space-y-4">
        {SETTINGS_SECTIONS.map((section) => (
          <div key={section.title} className="bg-[#141414] border border-white/5">
            <div className="px-6 py-5 border-b border-white/5 flex items-start gap-4">
              <section.icon size={18} className="text-[var(--gold)] mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-body text-sm font-medium text-white">{section.title}</h2>
                  <code className="font-mono text-xs bg-[rgba(201,168,76,0.1)] text-[var(--gold)] px-2 py-0.5 rounded">
                    {section.file}
                  </code>
                </div>
                <p className="font-body text-xs text-white/50 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
            <div className="px-6 py-4">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-xs text-white/40">
                    <span className="text-[var(--gold)] mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Environment variables */}
      <div className="mt-6 bg-[#141414] border border-white/5">
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="font-body text-sm font-medium text-white mb-1">Environment Variables</h2>
          <p className="font-body text-xs text-white/50">
            Set these in Vercel → Project Settings → Environment Variables (and in .env.local for local dev)
          </p>
        </div>
        <div className="px-6 py-4 space-y-2 font-mono text-xs">
          {[
            ["NEXT_PUBLIC_SUPABASE_URL", "Your Supabase project URL"],
            ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Supabase anon/public key"],
            ["SUPABASE_SERVICE_ROLE_KEY", "Supabase service role key (server-only, never expose)"],
            ["NEXT_PUBLIC_SITE_URL", "https://www.monterealestate.ae"],
          ].map(([key, desc]) => (
            <div key={key} className="flex items-start gap-4">
              <span className="text-[var(--gold-light)] shrink-0">{key}</span>
              <span className="text-white/30">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment quick links */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
          { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-[#141414] border border-white/5 hover:border-[var(--gold)] transition-colors group"
          >
            <span className="font-body text-sm text-white/60 group-hover:text-white transition-colors">
              {link.label}
            </span>
            <ExternalLink size={12} className="text-white/30 group-hover:text-[var(--gold)] transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
