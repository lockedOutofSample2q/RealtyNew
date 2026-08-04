// content/area-calculator/index.ts
import { AreaPageContent } from "./types";
import { hubContent } from "./hub";
import { tier2AllPages } from "./tier2-all";
import { remainingTier2Pages } from "./tier2-remaining";
import { tier3Pages } from "./tier3";

export * from "./types";
export { hubContent } from "./hub";

const ALL_CHILD_PAGES: Record<string, AreaPageContent> = {
  ...tier2AllPages,
  ...remainingTier2Pages,
  ...tier3Pages,
};

export const ALL_AREA_PAGES: Record<string, AreaPageContent> = {
  "": hubContent,
  ...ALL_CHILD_PAGES,
};

export function getAreaPageContent(slug: string): AreaPageContent | undefined {
  const cleanSlug = slug === "index" ? "" : slug;
  return ALL_AREA_PAGES[cleanSlug];
}

export function getAllAreaSlugs(): string[] {
  return Object.keys(ALL_CHILD_PAGES);
}
