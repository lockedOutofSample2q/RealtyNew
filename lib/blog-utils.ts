// lib/blog-utils.ts

export const BLOG_CATEGORY_MAP: Record<string, string> = {
  "AEO Anchor & Authority Builders": "Advisory Pillars",
  "Foundation & Master Reference":   "Market Guides",
  "Master Pillar":                   "Core Knowledge",
  "Developer Due Diligence":         "Due Diligence",
  "NRI Investor Series":             "NRI Advisory",
  "Land Seller Series":              "Land Reinvestment",
  "Sector Intelligence":             "Sector Analysis",
  "Investment Thesis":               "Investment Strategy",
  "Process & Paperwork":             "Legal & Process",
  "Legal Updates":                   "Legal Rights",
  "Market Analysis":                 "Market Insights",
  "Market News":                     "Market News",
  "Investment Tips":                 "Investment Tips",
  "Community Spotlight":             "Community Spotlight",
  "Lifestyle":                       "Lifestyle",
  "Buyer Guide":                     "Buyer Guide",
};

export function getBlogLabel(category: string) {
  return BLOG_CATEGORY_MAP[category] || category;
}
