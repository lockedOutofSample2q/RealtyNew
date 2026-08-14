import { slugify } from "@/lib/utils";
import buildersData from "@/config/builders-data.json";

export const LOGO_MAPPING: Record<string, string> = {
  "affinity-buildtech-affinity-group": "affinity.svg",
  "ambika-realcon-pvt-ltd-ambika-infra-ventures-pvt-ltd": "ambika.svg",
  "evoq-realtech-directors-gaurav-goyal-satish-katyal-brand-ambassador-hrithik-roshan": "evoq.svg",
  "klv-builders-and-developers-pvt-ltd": "klv.svg",
  "gillco-developers-and-builders-pvt-ltd-gillco-group": "gillco.svg",
  "hero-realty-pvt-ltd-hero-group-usd-5-billion-enterprise": "hero_homes.svg",
  "homeland-group": "homeland.svg",
  "homeland-group-sa-global": "homeland.svg",
  "homeland-buildwell-private-limited": "homeland.svg",
  "horizon-group-punjab": "horizon.svg",
  "jlpl": "jlpl.svg",
  "joy-homes-joy-group": "joygrand.svg",
  "jubilee-group": "jubilee.svg",
  "marbella-group-srg-group": "marbella.svg",
  "turnstone-realty-medallion-group": "medallion.svg",
  "noble-ventures-noble-group": "noble_callista.svg",
  "gmada-govt-of-punjab": "gmada.png",
  "mb-infrabuild": "mdb.svg",
  "emaar": "emaar.svg",
  "omaxe": "omaxe.svg",
  "sbp": "sbp.svg",
  "acme": "acme.svg",
  "dlf": "dlf.svg",
};

export function getDeveloperLogo(devName?: string | null): string | null {
  if (!devName) return null;
  const trimmed = devName.trim();
  const devSlug = slugify(trimmed);
  
  if (LOGO_MAPPING[devSlug]) return LOGO_MAPPING[devSlug];

  const lower = trimmed.toLowerCase();
  if (lower.includes("homeland")) return "homeland.svg";
  if (lower.includes("jubilee")) return "jubilee.svg";
  if (lower.includes("hero")) return "hero_homes.svg";
  if (lower.includes("marbella")) return "marbella.svg";
  if (lower.includes("jlpl")) return "jlpl.svg";
  if (lower.includes("ambika")) return "ambika.svg";
  if (lower.includes("gillco")) return "gillco.svg";
  if (lower.includes("noble")) return "noble_callista.svg";
  if (lower.includes("medallion") || lower.includes("turnstone")) return "medallion.svg";
  if (lower.includes("affinity")) return "affinity.svg";
  if (lower.includes("horizon")) return "horizon.svg";
  if (lower.includes("joy")) return "joygrand.svg";
  if (lower.includes("klv")) return "klv.svg";
  if (lower.includes("gmada")) return "gmada.png";
  if (lower.includes("evoq")) return "evoq.svg";
  if (lower.includes("mb-infra") || lower.includes("mb infrabuild") || lower.includes("mdb")) return "mdb.svg";
  if (lower.includes("emaar")) return "emaar.svg";
  if (lower.includes("omaxe")) return "omaxe.svg";
  if (lower.includes("sbp")) return "sbp.svg";
  if (lower.includes("acme")) return "acme.svg";
  if (lower.includes("dlf")) return "dlf.svg";

  for (const [key, logo] of Object.entries(LOGO_MAPPING)) {
    if (devSlug.includes(key) || key.includes(devSlug)) {
      return logo;
    }
  }

  return null;
}

export function getBuilderInfo(devName?: string | null): { slug: string; info: any } {
  if (!devName) return { slug: "", info: null };
  const trimmed = devName.trim();
  const devSlug = slugify(trimmed);
  const builders = buildersData.builders as Record<string, any>;

  if (builders[devSlug]) return { slug: devSlug, info: builders[devSlug] };

  const lower = trimmed.toLowerCase();
  if (lower.includes("homeland") && builders["homeland-group"]) {
    return { slug: "homeland-group", info: builders["homeland-group"] };
  }
  if (lower.includes("jubilee") && builders["jubilee-group"]) {
    return { slug: "jubilee-group", info: builders["jubilee-group"] };
  }
  if (lower.includes("hero") && builders["hero-realty-pvt-ltd-hero-group-usd-5-billion-enterprise"]) {
    return { slug: "hero-realty-pvt-ltd-hero-group-usd-5-billion-enterprise", info: builders["hero-realty-pvt-ltd-hero-group-usd-5-billion-enterprise"] };
  }
  if (lower.includes("ambika") && builders["ambika-realcon-pvt-ltd-ambika-infra-ventures-pvt-ltd"]) {
    return { slug: "ambika-realcon-pvt-ltd-ambika-infra-ventures-pvt-ltd", info: builders["ambika-realcon-pvt-ltd-ambika-infra-ventures-pvt-ltd"] };
  }
  if (lower.includes("gillco") && builders["gillco-developers-and-builders-pvt-ltd-gillco-group"]) {
    return { slug: "gillco-developers-and-builders-pvt-ltd-gillco-group", info: builders["gillco-developers-and-builders-pvt-ltd-gillco-group"] };
  }
  if (lower.includes("noble") && builders["noble-ventures-noble-group"]) {
    return { slug: "noble-ventures-noble-group", info: builders["noble-ventures-noble-group"] };
  }
  if ((lower.includes("medallion") || lower.includes("turnstone")) && builders["turnstone-realty-medallion-group"]) {
    return { slug: "turnstone-realty-medallion-group", info: builders["turnstone-realty-medallion-group"] };
  }
  if (lower.includes("affinity") && builders["affinity-buildtech-affinity-group"]) {
    return { slug: "affinity-buildtech-affinity-group", info: builders["affinity-buildtech-affinity-group"] };
  }
  if (lower.includes("horizon") && builders["horizon-group-punjab"]) {
    return { slug: "horizon-group-punjab", info: builders["horizon-group-punjab"] };
  }
  if (lower.includes("joy") && builders["joy-homes-joy-group"]) {
    return { slug: "joy-homes-joy-group", info: builders["joy-homes-joy-group"] };
  }
  if (lower.includes("klv") && builders["klv-builders-and-developers-pvt-ltd"]) {
    return { slug: "klv-builders-and-developers-pvt-ltd", info: builders["klv-builders-and-developers-pvt-ltd"] };
  }
  if (lower.includes("marbella") && builders["marbella-group-srg-group"]) {
    return { slug: "marbella-group-srg-group", info: builders["marbella-group-srg-group"] };
  }
  if (lower.includes("jlpl") && builders["jlpl"]) {
    return { slug: "jlpl", info: builders["jlpl"] };
  }
  if (lower.includes("evoq") && builders["evoq-realtech-directors-gaurav-goyal-satish-katyal-brand-ambassador-hrithik-roshan"]) {
    return { slug: "evoq-realtech-directors-gaurav-goyal-satish-katyal-brand-ambassador-hrithik-roshan", info: builders["evoq-realtech-directors-gaurav-goyal-satish-katyal-brand-ambassador-hrithik-roshan"] };
  }
  if (lower.includes("ats") && builders["ats-infrastructure-limited"]) {
    return { slug: "ats-infrastructure-limited", info: builders["ats-infrastructure-limited"] };
  }

  for (const [slug, info] of Object.entries(builders)) {
    if (devSlug.includes(slug) || slug.includes(devSlug)) {
      return { slug, info };
    }
  }

  return { slug: devSlug, info: null };
}
