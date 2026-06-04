// scripts/ingest_researched_batches.ts
import { createAdminClient } from "../lib/supabase";
import * as fs from "fs";
import * as path from "path";

// 1. Slug mapping for the 13 projects
const projectSlugMap: Record<string, string> = {
  "JLPL FALCON VIEW": "jlpl-falcon-view-sector-66a-mohali",
  "BESTECH PARK VIEW RESIDENCES": "bestech-park-view-residences-sector-66-mohali",
  "ATS CASA ESPANA": "ats-casa-espana-sector-121-mohali",
  "GILLCO PARKHILLS": "gillco-parkhills-sector-126-mohali",
  "THE MEDALLION NOVA": "the-medallion-nova-sector-66-mohali",
  "MARBELLA TWIN TOWERS": "marbella-twin-towers-new-chandigarh-mullanpur",
  "KLV SIGNATURE TOWERS": "klv-signature-towers-sector-66a-mohali",
  "NOBLE MAGNOLLIA": "noble-magnollia-sector-88-mohali",
  "AFFINITY BELGRAVIA": "affinity-belgravia-aerocity-mohali",
  "JUBILEE VALLUM": "jubilee-vallum-sector-91-mohali",
  "JLPL GALAXY HEIGHTS": "jlpl-galaxy-heights-sector-66a-mohali",
  "JUBILEE TWINTO": "jubilee-twinto-sector-112-mohali",
  "THE MEDALLION, SECTOR 82, MOHALI": "the-medallion-sector-82-mohali"
};

// 2. Helper to parse number ranges (e.g. sizes, beds, prices)
function parseRange(str: string | undefined): { min: number | null; max: number | null } {
  if (!str) return { min: null, max: null };
  // Remove commas, sq. ft., BHK, Cr, etc.
  const cleaned = str.replace(/,/g, "").toLowerCase();
  
  // Try to find numbers
  const matches = cleaned.match(/[\d.]+/g);
  if (!matches || matches.length === 0) return { min: null, max: null };

  const numbers = matches.map(Number);
  
  if (numbers.length >= 2) {
    return { min: numbers[0], max: numbers[1] };
  }
  
  if (cleaned.includes("up to") || cleaned.includes("max")) {
    return { min: null, max: numbers[0] };
  }
  
  return { min: numbers[0], max: null };
}

// 3. Helper to parse price/sqft
function parsePriceSqft(metadata: any): { min: number | null; max: number | null } {
  // Find key that contains "avg. price"
  let priceStr: string | undefined = undefined;
  for (const key of Object.keys(metadata)) {
    if (key.toLowerCase().includes("avg. price")) {
      priceStr = metadata[key];
      break;
    }
  }

  if (!priceStr) return { min: null, max: null };
  
  // e.g. "Rs 9,350 to Rs 9,800 per sq. ft." or "Rs 9,250 per sq. ft. (up 3.35% from Rs 8,950)"
  const cleaned = priceStr.replace(/,/g, "").toLowerCase();
  const matches = cleaned.match(/[\d.]+/g);
  if (!matches || matches.length === 0) return { min: null, max: null };
  const numbers = matches.map(Number);

  if (cleaned.includes("from") || cleaned.includes("up")) {
    // "Rs 9,250 ... from Rs 8,950"
    const maxVal = numbers[0];
    const minVal = numbers[2] || numbers[1] || null;
    return { min: minVal, max: maxVal };
  }

  if (numbers.length >= 2) {
    return { min: numbers[0], max: numbers[1] };
  }

  return { min: null, max: numbers[0] };
}

// 4. Helper to parse latitude / longitude
function parseCoordinate(str: string | undefined): number | null {
  if (!str) return null;
  const match = str.match(/[\d.]+/);
  return match ? Number(match[0]) : null;
}

// 5. Helper to parse unit configurations into min/max sizes
function parseUnitTypes(types: any[]): any[] {
  return types.map(t => {
    const sizeRange = parseRange(t.size);
    const result: any = { bhk: t.bhk };
    if (sizeRange.min !== null) result.size_min = sizeRange.min;
    if (sizeRange.max !== null) result.size_max = sizeRange.max;
    return result;
  });
}

// 6. Helper to parse landmark times and transport modes
function parseLandmarks(landmarks: any[]): any[] {
  return landmarks.map(l => {
    const timeMatch = l.time.match(/\d+/);
    const timeNum = timeMatch ? Number(timeMatch[0]) : 5;
    const modeStr = l.mode.toLowerCase().includes("walk") ? "walking" : "car";
    return {
      name: l.name,
      time: timeNum,
      transport: modeStr
    };
  });
}

async function ingestAll() {
  const supabase = createAdminClient();
  const jsonPath = path.join(__dirname, "../scratch/parsed_projects.json");
  
  if (!fs.existsSync(jsonPath)) {
    console.error("Parsed projects file does not exist at", jsonPath);
    return;
  }

  const projects = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  console.log(`Starting ingestion of ${projects.length} researched projects...`);

  for (const project of projects) {
    const projectName = project.projectName;
    const slug = projectSlugMap[projectName];

    if (!slug) {
      console.warn(`No slug mapping found for project name: "${projectName}". Skipping.`);
      continue;
    }

    console.log(`\n----------------------------------------`);
    console.log(`Processing: "${projectName}" -> Slug: "${slug}"`);

    // Fetch the existing record to inspect current state
    const { data: existing, error: fetchErr } = await supabase
      .from("apartments")
      .select("*")
      .eq("slug", slug)
      .single();

    if (fetchErr || !existing) {
      console.error(`Could not find record for slug "${slug}" in database. Error:`, fetchErr?.message || "Not found");
      continue;
    }

    // Extract metadata fields
    const meta = project.metadata;
    const title = meta.Title || existing.title;
    const description = meta.Description || existing.description;
    const developer = meta["Developed By"] || existing.developer;
    const rera_number = meta["RERA Numbers"] || meta["RERA No."] || meta["RERA Status"] || existing.rera_number;
    
    // Parse sizes
    const sizeRange = parseRange(meta["Size Range"] || meta["Size Range (Super Area)"]);
    const area_sqft = sizeRange.min || existing.area_sqft;
    const area_sqft_max = sizeRange.max || existing.area_sqft_max;

    // Parse bedrooms
    const bedRange = parseRange(meta["Bedroom Range"]);
    const bedrooms = bedRange.min || existing.bedrooms;
    const bedrooms_max = bedRange.max || existing.bedrooms_max;

    // Parse project properties
    const floorRange = parseRange(meta["No. of Floors"]);
    const floor_count = floorRange.max || floorRange.min || existing.floor_count;
    
    const towerRange = parseRange(meta["No. of Towers"]);
    const tower_count = towerRange.max || towerRange.min || existing.tower_count;

    const unitRange = parseRange(meta["Total Units"]);
    const total_units = unitRange.max || unitRange.min || existing.total_units;

    const areaAcresRange = parseRange(meta["Total Area"]);
    const project_area_acres = areaAcresRange.max || areaAcresRange.min || existing.project_area_acres;

    // Parse coordinates
    const latitude = parseCoordinate(meta.Latitude) || existing.latitude;
    const longitude = parseCoordinate(meta.Longitude) || existing.longitude;

    // Parse sqft prices
    const priceSqftRange = parsePriceSqft(meta);
    const price_sqft_min = priceSqftRange.min || existing.price_sqft_min;
    const price_sqft_max = priceSqftRange.max || existing.price_sqft_max;

    // Parse JSON schemas
    const unit_types = project.unitTypes.length > 0 ? parseUnitTypes(project.unitTypes) : existing.unit_types;
    const nearby_landmarks = project.nearbyLandmarks.length > 0 ? parseLandmarks(project.nearbyLandmarks) : existing.nearby_landmarks;
    
    const upcoming_infrastructure = project.upcomingInfra.length > 0 
      ? project.upcomingInfra.map((item: any) => `${item.project}: ${item.detail}`) 
      : existing.upcoming_infrastructure;

    // Construct the update object
    const updateData: any = {
      title,
      description,
      developer,
      rera_number,
      area_sqft,
      area_sqft_max,
      bedrooms,
      bedrooms_max,
      floor_count,
      tower_count,
      total_units,
      project_area_acres,
      latitude,
      longitude,
      price_sqft_min,
      price_sqft_max,
      highlights: project.highlights.length > 0 ? project.highlights : existing.highlights,
      amenities: project.amenities.length > 0 ? project.amenities : existing.amenities,
      unit_types,
      nearby_landmarks,
      upcoming_infrastructure,
      faqs: project.faqs.length > 0 ? project.faqs : existing.faqs,
      meta_description: meta["Meta Description"] || existing.meta_description,
      og_title: meta["Meta Title"] || title,
      og_description: meta["Meta Description"] || existing.og_description,
      updated_at: new Date().toISOString()
    };

    // If an active resident issue exists, add it to the description or highlights
    const activeIssue = meta["Active Resident Issue"];
    if (activeIssue) {
      console.log(`Adding active resident issue for ${projectName}: "${activeIssue}"`);
      updateData.description = `${description}\n\n**Critical Resident Welfare Alert**: ${activeIssue}`;
    }

    // Special logic for price/price_max if specified in Cr
    const priceRangeStr = meta["Price Range"] || meta["Starting Price"];
    if (priceRangeStr) {
      const parsedPrice = parseRange(priceRangeStr);
      // Map Cr to actual numbers (e.g. 1.64 -> 16400000)
      const multiplier = priceRangeStr.toLowerCase().includes("cr") ? 10000000 : 1;
      if (parsedPrice.min !== null) {
        updateData.price = parsedPrice.min * multiplier;
      }
      if (parsedPrice.max !== null) {
        updateData.price_max = parsedPrice.max * multiplier;
      }
      console.log(`Parsed prices: min = ${updateData.price}, max = ${updateData.price_max}`);
    }

    // Execute the database update
    const { data: updated, error: updateErr } = await supabase
      .from("apartments")
      .update(updateData)
      .eq("slug", slug)
      .select("id, slug, title");

    if (updateErr) {
      console.error(`Failed to update database for "${slug}". Error:`, updateErr.message);
    } else {
      console.log(`SUCCESSFULLY UPDATED "${slug}" in Supabase!`);
      if (updated && updated.length > 0) {
        console.log(`Updated Row details: [${updated[0].id}] ${updated[0].slug} -> ${updated[0].title}`);
      }
    }
  }

  console.log("\n========================================");
  console.log("Supabase ingestion complete!");
}

ingestAll();
