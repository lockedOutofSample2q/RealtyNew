
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !serviceKey) {
  console.error("Supabase Admin credentials missing. Check your .env.local file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

function formatPrice(price: number) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} CR`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString()}`;
}

async function populateTable(tableName: "apartments" | "houses" | "lands") {
  console.log(`\n--- Populating ${tableName} ---`);
  
  const { data: records, error } = await supabase
    .from(tableName)
    .select("*");

  if (error || !records) {
    console.error(`Error fetching ${tableName}:`, error);
    return;
  }

  console.log(`Found ${records.length} records in ${tableName}.`);

  for (const p of records) {
    // Skip if it already has both fields filled out (to prevent overwriting manual edits later)
    if (p.og_title && p.og_description && p.slug !== "homeland-regalia-mohali") {
      console.log(`Skipping ${p.slug} (already has OG data).`);
      continue;
    }

    let ogTitle = "";
    let ogDescription = "";

    // Special case for Homeland Regalia
    if (p.slug === "homeland-regalia-mohali") {
      ogTitle = "Homeland Regalia Mohali | Luxury 3/4/5 BHK on Airport Road";
      ogDescription = "Homeland Regalia, Sector 77 Mohali — luxury 3/4/5 BHK flats from ₹2.5CR. 1,00,000 sq.ft. Club Regalia. Honest assessment before you invest.";
    } else {
      // Dynamic generation
      const bhkText = p.bedrooms ? `${p.bedrooms}${p.bedrooms_max ? `-${p.bedrooms_max}` : ''} BHK` : '';
      const typeText = p.type ? p.type.charAt(0).toUpperCase() + p.type.slice(1) : '';
      const priceText = formatPrice(p.price);
      
      if (tableName === "lands") {
        ogTitle = `${p.title} | Premium Land on ${p.location}`;
        ogDescription = `${p.title}, ${p.location} — Premium ${p.type} land starting from ${priceText}. Honest assessment by Realty Holding & Management Consultants.`;
      } else {
        const titleType = bhkText ? `${bhkText} ${typeText}` : typeText;
        ogTitle = `${p.title} | ${titleType} on ${p.location}`;
        ogDescription = `${p.title}, ${p.location} — ${titleType} starting from ${priceText}. Honest assessment by Realty Holding & Management Consultants.`;
      }
    }

    // Clean up excessive whitespace
    ogTitle = ogTitle.replace(/\s+/g, ' ').trim();
    ogDescription = ogDescription.replace(/\s+/g, ' ').trim();

    console.log(`Updating ${p.slug}...`);
    const { error: updateError } = await supabase
      .from(tableName)
      .update({
        og_title: ogTitle,
        og_description: ogDescription
      })
      .eq("id", p.id);

    if (updateError) {
      console.error(`Failed to update ${p.slug}:`, updateError);
    }
  }
}

async function main() {
  console.log("Starting OG Metadata population...");
  await populateTable("apartments");
  await populateTable("houses");
  await populateTable("lands");
  console.log("\nDone!");
}

main();
