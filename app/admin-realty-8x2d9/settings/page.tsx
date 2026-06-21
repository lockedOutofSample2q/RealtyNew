"use client";
// app/admin-realty-8x2d9/settings/page.tsx
// ============================================================
// SETTINGS PAGE
// Shows all editable config locations with direct file paths.
// A future version could write to a DB-backed config table.
// ============================================================

import { ExternalLink, FileCode, Palette, Globe, Database, Settings } from "lucide-react";

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
      "hero.webp — home page background (1920×1080 minimum)",
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
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl shadow-sm border border-blue-100">
            <Settings size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="font-body text-sm text-gray-500 mt-1">Where to edit each part of the site</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {SETTINGS_SECTIONS.map((section) => (
          <div key={section.title} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-start gap-4">
              <section.icon size={20} className="text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h2 className="font-body text-base font-semibold text-gray-900">{section.title}</h2>
                  <code className="font-mono text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {section.file}
                  </code>
                </div>
                <p className="font-body text-sm text-gray-500 leading-relaxed max-w-3xl">
                  {section.description}
                </p>
              </div>
            </div>
            <div className="px-6 py-5 bg-white">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-gray-600">
                    <span className="text-blue-500 mt-0.5 shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Environment variables */}
      <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-body text-base font-semibold text-gray-900 mb-1">Environment Variables</h2>
          <p className="font-body text-sm text-gray-500">
            Set these in Vercel → Project Settings → Environment Variables (and in .env.local for local dev)
          </p>
        </div>
        <div className="px-6 py-5 bg-white space-y-4 font-mono text-sm">
          {[
            ["NEXT_PUBLIC_SUPABASE_URL", "Your Supabase project URL"],
            ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Supabase anon/public key"],
            ["SUPABASE_SERVICE_ROLE_KEY", "Supabase service role key (server-only, never expose)"],
            ["NEXT_PUBLIC_SITE_URL", "https://www.realtyconsultants.in"],
          ].map(([key, desc]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
              <span className="text-blue-700 font-medium sm:w-80 shrink-0">{key}</span>
              <span className="text-gray-500 font-sans">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment quick links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
          { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <span className="font-body text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              {link.label}
            </span>
            <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
