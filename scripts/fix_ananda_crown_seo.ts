import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

const anandaCrownData = {
  slug: "ananda-crown",
  og_title: "Ananda Crown Sector 78 Mohali | 3/4 BHK Ultra-Luxury Apartments | RHMC",
  og_description: "Ananda Crown is an upcoming ultra-luxury project in Sector 78, Mohali — 3 BHK, 3+1 BHK & 4+1 BHK apartments from ₹3.05 Cr. Flexible payment plans, low density, world-class amenities. Honest advisory from Realty Holding & Management Consultants.",
  meta_description: "Ananda Crown is an upcoming ultra-luxury project in Sector 78, Mohali — 3 BHK, 3+1 BHK & 4+1 BHK apartments from ₹3.05 Cr. Flexible payment plans, low density, world-class amenities. Honest advisory from Realty Holding & Management Consultants.",
  description: `Ananda Crown is Sector 78's first luxury high-rise entry at this price point. The project occupies a prime residential position in Sector 78 — a sector that residents rate 4.5 out of 5 for environment, cleanliness, and neighbourliness — and offers 3 BHK (3,050 sq. ft.), 3+1 BHK, and 4+1 BHK (3,750 sq. ft.) apartments across 4 towers.\n\nThe unit sizes are large by any standard. A 3,050 sq. ft. 3 BHK here costs ₹3.05 Cr — that is significantly more floor space per rupee than equivalent 3 BHK options in Sector 66 or 83A, where ₹3 Cr buys you 1,700-2,000 sq. ft. in most projects. For buyers who prioritise space over postcode prestige, this is a meaningful value proposition.\n\nSector 78 sits 10 minutes from Mohali International Hockey Stadium, 10 minutes from PCA Cricket Stadium (I.S. Bindra Stadium), and 10 minutes from Chandigarh International Airport. The sector connects easily to Sector 79 and the Sohana commercial belt. Field reviews describe Sector 78 as well-maintained and peaceful compared to the denser Airport Road corridor.\n\nAnanda Group is an established developer — they have delivered residential and commercial projects in the construction space for over a decade. This is their significant Mohali launch. Given the limited online track record specific to Mohali, buyers should visit the site, verify RERA registration and construction progress, and ask for details of completed projects in other markets.`,
  bedrooms: 3,
  bedrooms_max: 4,
  latitude: 30.6974,
  longitude: 76.7176,
  upcoming_infrastructure: [
    "Sector 78 residential growth|Sector 78 has seen consistent new project launches since 2022, with land rates appreciating as the residential belt around Sectors 66–82 matures. Ananda Crown enters at an early stage of this cycle.",
    "Airport-road accessibility|Chandigarh International Airport is approximately 7–10 km from Sector 78, reachable in under 15 minutes via the airport road. This makes the location practical for frequent flyers and NRI families.",
    "Sports and education ecosystem nearby|Mohali International Hockey Stadium and PCA Cricket Stadium are within 10 minutes by car. Several established schools — including GD Goenka and Strawberry Fields — are in the nearby Sectors 68–71 belt.",
    "Premium spillover from core Mohali sectors|As per-sqft rates in Sectors 66 and 82A push past ₹12,000–15,000, buyer attention is shifting to Sector 78 where comparable specs are available at ₹9,500–11,000/sqft. This demand compression is already visible in new launch pricing."
  ],
  faqs: [
    {
      question: "Why are IT professionals and NRIs drawn to Ananda Crown?",
      answer: "Sector 78 is close enough to Mohali's IT belt (Sectors 66–82) to make the commute practical, and far enough out that you're still getting larger floor plates at a lower per-sqft rate than established sectors. The flexible, construction-linked payment plan is a genuine draw for NRIs who want to stagger remittances rather than commit the full amount upfront. We have walked a number of IT professionals through this comparison — it holds up, but only if the possession timeline is realistic."
    },
    {
      question: "What is the Sky-Deck at Ananda Crown?",
      answer: "The rooftop amenity deck at Ananda Crown is positioned to face the Shivalik hills. In Sector 78 specifically — where most of the existing inventory is 5–12 floors — a dedicated rooftop amenity at this scale is uncommon. Whether it justifies a premium over competing projects depends on your lifestyle priorities. If outdoor communal space matters to your family, it is worth factoring in; if you prioritise carpet area inside the flat, the comparison looks different."
    },
    {
      question: "How is the construction quality at Ananda Crown?",
      answer: "The layouts prioritise cross-ventilation — both bedrooms and the living room in each unit face outward. In older high-rises in the sector, internal-facing bedrooms are common; Ananda Crown avoids this. Our team has done a site visit and can share specific observations on finishing standards and slab progress on request."
    },
    {
      question: "Is Ananda Crown a safe investment for first-time luxury buyers?",
      answer: "Any pre-construction purchase carries delivery risk — that's the honest starting point. What reduces it here: RERA registration (verify the number on Punjab-RERA before you book), a construction-linked payment plan that ties your payments to physical progress, and a developer with a completed project track record. We tell every client to compare the per-sqft rate against ready-to-move inventory in Sector 66 and 88 first. If the gap is large enough to offset the wait, it makes sense. If it is not, ready-to-move is safer. We are happy to run that comparison with you."
    }
  ],
  unit_types: [
    { bhk: "3 BHK", size_min: 3050, price: "₹3.05 Cr onwards" },
    { bhk: "3+1 BHK", size_min: 3350, price: "Price on request" },
    { bhk: "4+1 BHK", size_min: 3750, price: "Price on request" }
  ]
};

async function updateAnandaCrown() {
  console.log("Updating Ananda Crown SEO data...");

  const { data: apartment, error: findError } = await supabase
    .from("apartments")
    .select("id")
    .eq("slug", "ananda-crown-mohali-3-4-BHK-flat-sector-78")
    .single();

  if (findError || !apartment) {
    console.error("Could not find Ananda Crown in apartments table.");
    return;
  }

  const { error: updateError } = await supabase
    .from("apartments")
    .update({
      og_title: anandaCrownData.og_title,
      og_description: anandaCrownData.og_description,
      meta_description: anandaCrownData.meta_description,
      description: anandaCrownData.description,
      bedrooms: anandaCrownData.bedrooms,
      bedrooms_max: anandaCrownData.bedrooms_max,
      latitude: anandaCrownData.latitude,
      longitude: anandaCrownData.longitude,
      upcoming_infrastructure: anandaCrownData.upcoming_infrastructure,
      faqs: anandaCrownData.faqs,
      unit_types: anandaCrownData.unit_types
    })
    .eq("id", apartment.id);

  if (updateError) {
    console.error("Error updating Ananda Crown:", updateError);
  } else {
    console.log("Successfully updated Ananda Crown SEO and property data.");
  }
}

updateAnandaCrown();
