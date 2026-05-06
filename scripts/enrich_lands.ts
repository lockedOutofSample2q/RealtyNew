import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

// Load from .env.local
if (fs.existsSync(".env.local")) {
  const envFile = fs.readFileSync(".env.local", "utf8");
  envFile.split("\n").forEach((line) => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim().replace(/^"|"$/g, "");
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

const COMMUNITY_INSIGHTS: Record<string, any> = {
  "Gurditpura": {
    infrastructure: ["Upcoming Mohali expansion corridor", "Proximity to Banur-Landa road"],
    landmarks: ["Mohali IT City (15 mins)", "Banur Industrial Hub"],
    analysis: "Strategic agricultural land with high appreciation potential due to the Mohali 2026 expansion corridor. Ideal for long-term vision investing."
  },
  "Manakpur": {
    infrastructure: ["Rural belt connectivity", "Planned wide link roads"],
    landmarks: ["Banur Main Market", "Chitkara University (Nearby)"],
    analysis: "Manakpur is witnessing a shift from pure agriculture to strategic land banking. Proximity to major educational hubs drives long-term value."
  },
  "Saneta": {
    infrastructure: ["Proposed 100ft wide sector roads", "IT City expansion zone"],
    landmarks: ["Mohali IT City", "Airport Road (5 mins)", "Plaksha University"],
    analysis: "Saneta is the 'Next Big Hub'. Its proximity to IT City and Plaksha University makes it prime for land pooling or premium farmhouse development."
  },
  "Raipur Kalan": {
    infrastructure: ["Direct access to Airport Road", "Aerocity expansion corridor"],
    landmarks: ["Chandigarh International Airport (10 mins)", "Aerocity Mohali", "JLPL Industrial Area"],
    analysis: "Premium location. Raipur Kalan is effectively an extension of Aerocity. High-ticket investment with immediate appreciation drivers."
  },
  "Gobindpura": {
    infrastructure: ["Bharatmala Road impact zone", "Rajpura Industrial Corridor"],
    landmarks: ["Rajpura Industrial Area", "NH-44 Connectivity"],
    analysis: "Part of the Rajpura-Banur industrial belt. Bharatmala Road will reduce airport distance by 50%, making this a top-tier industrial investment."
  },
  "Pilkhani": {
    infrastructure: ["Red Zone Industrial permissions", "Heavy vehicle access roads"],
    landmarks: ["Rajpura Railway Junction", "Upcoming Logistics Park"],
    analysis: "Rare Red Zone land parcel. Suitable for high-pollution industries like chemicals or heavy manufacturing. High demand, low supply."
  },
  "Gandiya": {
    infrastructure: ["Industrial zone classification", "Strategic highway link"],
    landmarks: ["Rajpura Industrial Zone", "Banur Road"],
    analysis: "Large land parcel suitable for industrial establishment or logistics hub. Rajpura's growth as a logistics center is the primary driver here."
  },
  "Zirakpur": {
    infrastructure: ["Established commercial ecosystem", "PR-7 Airport Road connectivity"],
    landmarks: ["VIP Road Zirakpur", "Best Price/Walmart", "Radisson Hotel"],
    analysis: "Zirakpur is a mature high-growth corridor. 150ft front plots on link roads are rare and offer immediate commercial utility."
  },
  "Cholta Khurd": {
    infrastructure: ["Kurali-Mohali link road", "Industrial belt proximity"],
    landmarks: ["Kurali Market", "Rayat Bahra University", "Mohali Ph 6 (15 mins)"],
    analysis: "Strategic location near Kurali's industrial base. Good for warehousing or residential plotted development as Mohali expands North."
  },
  "Ucha Khehra": {
    infrastructure: ["Quiet agricultural belt", "Good water table"],
    landmarks: ["Banur", "Landran-Banur Road"],
    analysis: "Clean agricultural land with clear titles. Excellent for 'Wait and Watch' investors who want to benefit from the Banur-Mohali link."
  },
  "Mindha Majra": {
    infrastructure: ["Link road connectivity", "Agricultural heartland"],
    landmarks: ["Gurudwara Baoli Sahib", "Zirakpur-Patiala Highway"],
    analysis: "Affordable land entry point with safe titles. Suitable for small investors looking to enter the Mohali periphery market."
  },
  "Govindgarh": {
    infrastructure: ["Link road access", "Proximity to Kharar-Ludhiana highway"],
    landmarks: ["Kharar", "Chandigarh University"],
    analysis: "Govindgarh benefits from the overflow demand of Kharar and Chandigarh University. High rental demand for future residential use."
  }
};

async function enrichLands() {
  const { data: lands, error } = await supabase.from("lands").select("*");
  if (error || !lands) {
    console.error("Error fetching lands:", error);
    return;
  }

  console.log(`Enriching ${lands.length} land listings...`);

  for (const land of lands) {
    let price = land.price;
    let area = land.area_sqft;
    let description = land.description;
    let zoning = land.zoning || "Agricultural";
    
    // Parse price and area from description if zero
    if (price === 0) {
      const priceMatch = description.match(/(\d+(\.\d+)?)\s*(Lakh|Cr|L)/i);
      if (priceMatch) {
        const val = parseFloat(priceMatch[1]);
        const unit = priceMatch[3].toLowerCase();
        price = (unit === "cr") ? val * 10000000 : val * 100000;
      }
    }

    // Area conversion (1 Acre = 43560 sqft, 1 Kanal = 5445 sqft, 1 Biggha = 8470 sqft approx in Punjab)
    // Actually Punjab Biggha varies, but typically 1 Acre = 4 Biggha in some parts, or 1 Biggha = 1000 sq yards.
    // Let's use 1 Kanal = 5445 sqft, 1 Acre = 43560 sqft.
    if (area === 0) {
      const acreMatch = land.title.match(/(\d+(\.\d+)?)\s*(Acre|acre)/i);
      const kanalMatch = land.title.match(/(\d+(\.\d+)?)\s*(Kanal|kanal)/i);
      const bigghaMatch = land.title.match(/(\d+(\.\d+)?)\s*(Biggha|Biggah|biggah)/i);
      
      if (acreMatch) area = parseFloat(acreMatch[1]) * 43560;
      else if (kanalMatch) area = parseFloat(kanalMatch[1]) * 5445;
      else if (bigghaMatch) area = parseFloat(bigghaMatch[1]) * 9000; // rough estimate for Biggha
    }

    if (land.title.toLowerCase().includes("redzone")) zoning = "Industrial (Red Zone)";

    const insight = COMMUNITY_INSIGHTS[land.community] || COMMUNITY_INSIGHTS[land.location] || {};
    
    const enrichedDescription = `This ${area > 0 ? (area/43560).toFixed(2) + ' Acre ' : ''}${zoning} land in ${land.community}, ${land.location} offers a strategic investment opportunity. ${insight.analysis || "Located in a high-growth corridor of Mohali."} 

Amritpal's Vision: "Je aapaan vision ton bina challaange taan aapaan mehngi cheez khareeddaange." (If we move without vision, we will buy at the wrong price). This land is positioned for those who understand the infrastructure trajectory of Mohali and its surrounding industrial belts.

Key Advantages:
- Strategic location in ${land.community}
- High appreciation potential in the 2026 expansion corridor
- Clear title and professional documentation assistance by RHMC
- Suitable for ${zoning.toLowerCase().includes('industrial') ? 'industrial establishment and logistics' : 'long-term land banking or agricultural utility'}.`;

    const updates = {
      price,
      area_sqft: Math.round(area),
      zoning,
      description: enrichedDescription,
      features: ["Clear Title", "Road Access", "Water Availability", "High Appreciation Zone"],
      highlights: [
        `Strategic location in ${land.community}`,
        `Vision investing opportunity`,
        `Part of Mohali expansion corridor`
      ],
      nearby_landmarks: insight.landmarks || [],
      upcoming_infrastructure: insight.infrastructure || [],
      og_title: `${land.title} | Premium Land in ${land.location} | RHMC`,
      og_description: `Invest in ${land.title} at ${land.community}. ${insight.analysis ? insight.analysis.substring(0, 150) : "Expert advisory by Amritpal Singh, RHMC Mohali."}`,
      meta_description: `Premium ${zoning} land for sale in ${land.community}, ${land.location}. Area: ${area} sqft. Strategic investment near Mohali infrastructure corridors. Contact RHMC for honest advisory.`
    };

    const { error: updateError } = await supabase
      .from("lands")
      .update(updates)
      .eq("id", land.id);

    if (updateError) {
      console.error(`Error updating land ${land.id}:`, updateError);
    } else {
      console.log(`Successfully enriched land: ${land.title}`);
    }
  }

  console.log("Enrichment complete.");
}

enrichLands();
