import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const slug = "homeland-regalia-mohali";

const meta_title = "Homeland Regalia Mohali Review 2026: Price, RERA Status, Worth Buying?";
const meta_description = "Homeland Regalia, Sector 77 Mohali: RERA PBRERA-SAS81-PR0757. 3-5 BHK, Rs 2.82-7.66 Cr. Independent advisory review before you invest.";
const title = "Homeland Regalia, Sector 77 Mohali: Full Advisory Review";
const og_title = meta_title;
const og_description = meta_description;

const description = `Homeland Regalia is a 6-tower, 279-unit luxury residential project on Airport Road, spread across 4.58 acres. Configurations run 3, 4, and 5 BHK plus penthouses, with carpet area from roughly 1,430 sqft to 6,884 sqft and current market pricing between Rs 2.82 Cr and Rs 7.66 Cr depending on tower, floor, and configuration. RERA completion is registered for December 2028. The standout amenity is Club Regalia, a 100,000 sqft clubhouse with an all-season indoor pool.

This is the project Homeland Group built after Homeland Heights and CP.67, and it is the one most people search for when they mean "the tallest towers on Airport Road." Before you read the amenity list, read the part below on maintenance cost and construction pace. Both change the real cost of owning here.

Where This Page Disagrees With the Brochure:
Every project brochure sells the upside. Our job is to tell you what it does not mention.

The maintenance number is real, and it is not small. At Rs 6.50 to Rs 8.50 per sqft per month, a 3,000 sqft unit runs Rs 19,500 to Rs 25,500 a month in maintenance alone, before you have paid for your own electricity or gas. Club Regalia is a genuine asset, a 100,000 sqft clubhouse is rare in Mohali. But someone pays for running it, and that someone is every owner in the building, whether or not they use the gym.

Glass facades cost money to live behind. Punjab summers touch 45°C. A glass-heavy facade means higher thermal gain, which means your AC runs longer, which shows up on your PSPCL bill every single month for as long as you own the flat. Factor this into your real cost of ownership, not just the purchase price.

The RERA date and the realistic date are not the same number. The registered completion is December 2028. Based on the developer's own construction updates through 2025, structural work on all six towers was complete and interior finishing was underway. On that trajectory, a phased handover starting late 2027 is a reasonable expectation for the earlier towers, well ahead of the RERA deadline. That is a good sign. It is also not a promise, and construction pace on the remaining towers should be tracked before you assume an early handover for your specific unit.

Secondary market saturation is a real exit consideration. Airport Road has seen several premium launches in the last five years. If you are buying to exit in 3-5 years rather than to live in, ask what comparable resale inventory exists on the corridor right now, not just what Homeland Regalia itself is asking.

Sohana junction traffic. The project fronts directly onto Airport Road, which is excellent access. It also sits near the Sohana junction, which sees bottlenecks at peak hours. If your daily commute runs through that junction, drive it at 9 AM on a weekday before you decide, not on a Sunday site visit.

Loading factor (the gap between carpet and super area you are actually paying for) runs close to the upper end of what we consider acceptable for a high-rise Mivan-construction project. Ask for the RERA carpet area certificate for your specific unit and tower before booking. Do not rely on the brochure super-area figure alone.

What We Would Actually Tell You:
If you are earning well, already own your primary residence, and want a second home or a long-term hold on Airport Road, Homeland Regalia earns a serious look. The clubhouse is not marketing spin, it is a real asset. The location logic on Airport Road has held up over the last decade.

If you are stretching to afford this on a 3-5 year investment thesis, the maintenance load and current secondary-market saturation on this corridor deserve a harder look before you commit. We would rather tell you that now than after your booking amount is non-refundable.

If what you read here describes your situation, one 15-minute call. We will tell you directly what we would do in your position. No pitch, no pressure, just the answer.

Pricing sourced from current secondary-market listings, June 2026. Confirm the live price list with the developer before transacting; resale premiums move faster than any listing page can track.`;

const highlights = [
  "6 Towers ranging 21 to 25 floors across 4.58 acres",
  "279 Luxury Units (3, 4, 5 BHK & Penthouses)",
  "Carpet area range ~1,430 sqft to 6,884 sqft",
  "100,000 sq. ft. 'Club Regalia' with All-Season Indoor Pool",
  "PBRERA-SAS81-PR0757 Registered (Completion Dec 2028)",
  "Phased handover estimated starting Late 2027",
  "Direct frontage on Airport Road, Sector 77 Mohali"
];

const unit_types = [
  {
    bhk: "3 BHK",
    size_min: 1430,
    size_max: 2908,
    price: "₹2.82 Cr – ₹3.80 Cr"
  },
  {
    bhk: "4 BHK",
    size_min: 2724,
    size_max: 4380,
    price: "₹3.80 Cr – ₹6.10 Cr"
  },
  {
    bhk: "5 BHK",
    size_min: 4500,
    size_max: 6884,
    price: "₹6.10 Cr – ₹7.66 Cr"
  },
  {
    bhk: "Penthouse",
    size_min: 6500,
    size_max: 6500,
    price: "₹7.50 Cr+"
  }
];

const faqs = [
  {
    question: "Is Homeland Regalia RERA registered?",
    answer: "Yes. Registration number PBRERA-SAS81-PR0757, verifiable directly on the Punjab RERA portal (https://rera.punjab.gov.in/). Registered completion date is December 2028."
  },
  {
    question: "When is realistic possession, not just the RERA date?",
    answer: "The RERA-registered date is December 2028. Structural work across all six towers was reported complete by mid-2025, with interior finishing underway. On that pace, a phased handover beginning late 2027 is realistic for the earlier-completing towers. Track monthly construction updates for your specific tower before treating this as a firm date."
  },
  {
    question: "What will maintenance actually cost me?",
    answer: "Budget Rs 6.50 to Rs 8.50 per sqft per month. On a 3,000 sqft unit, that is roughly Rs 19,500 to Rs 25,500 monthly, on top of your own utility bills. This is a genuine cost of the amenity package, not a hidden fee, but it needs to be in your monthly budget from day one, not discovered after possession."
  },
  {
    question: "Is Club Regalia worth the premium?",
    answer: "The 100,000 sqft clubhouse with an indoor pool is a legitimate differentiator versus most Mohali high-rises, which offer a fraction of this. Whether it is worth the associated maintenance load depends on whether you or your family will actually use it weekly. If it will sit empty, you are paying for square footage you never touch."
  },
  {
    question: "What is the loading factor, and why does it matter?",
    answer: "Loading factor is the difference between what you pay for (super area) and what you actually live in (carpet area). Ask for the RERA carpet area certificate for your exact unit before signing anything. A loading factor above 35% is a red flag on any project, regardless of brand."
  },
  {
    question: "Should I buy here to invest, or to live?",
    answer: "For end-use, at this price point the amenity depth and Airport Road location are genuinely strong. For pure investment with a 3-5 year exit horizon, check current secondary-market absorption on the corridor first. A project can be excellent to live in and still be a crowded exit market."
  }
];

const nearby_landmarks = [
  { name: "CP 67 Mall", time: 5, transport: "car" },
  { name: "PCA International Cricket Stadium", time: 10, transport: "car" },
  { name: "Fortis Hospital", time: 12, transport: "car" },
  { name: "Max Hospital (within 5 km)", time: 8, transport: "car" },
  { name: "ISB, IISER, NIPER (Education Corridor)", time: 10, transport: "car" },
  { name: "Chandigarh Railway Station", time: 15, transport: "car" },
  { name: "Quark City", time: 15, transport: "car" },
  { name: "Chandigarh International Airport", time: 20, transport: "car" }
];

const amenities = [
  "Swimming Pool (all-season, indoor)",
  "Club House (100,000 sqft)",
  "Gym",
  "Landscaped Gardens",
  "Children's Play Area",
  "Jogging Track",
  "24x7 Security",
  "CCTV",
  "Rain Water Harvesting",
  "Power Backup",
  "Covered Parking",
  "Party Area",
  "Lift"
];

const upcoming_infrastructure = [
  "Airport Road (PR-7) Corridor Widening: Plans to expand service lanes and ease Sohana junction peak bottlenecks.",
  "Sector 77 Smart Infrastructure: Advanced storm-water drainage and dedicated 66KV sub-stations for the sector.",
  "Mohali Aerotropolis & Commercial Hub: Development of major retail and office spaces along Airport Road."
];

const documents = [
  { name: "Punjab RERA Registration (PBRERA-SAS81-PR0757)", url: "https://rera.punjab.gov.in/" },
  { name: "Official Project Brochure", url: "https://www.homelandgroup.org/wp-content/uploads/2022/01/homeland-heights-6926_compressed.pdf" },
  { name: "Floor Plans & Specifications", coming_soon: true }
];

const transfer_trap_analysis = "Secondary market saturation is a real exit consideration. Airport Road has seen several premium launches in the last five years. If you are buying to exit in 3-5 year horizon rather than to live in, ask what comparable resale inventory exists on the corridor right now, not just what Homeland Regalia itself is asking. Also verify loading factor (gap between carpet and super area) with the RERA carpet certificate before booking.";

const lifestyle_tax_analysis = "Projected maintenance is Rs 6.50 to Rs 8.50 per sqft per month (approx. Rs 19,500 to Rs 25,500/mo for a 3,000 sqft unit for running Club Regalia). In addition, the glass-heavy facade brings higher thermal gain and AC costs during 45°C Punjab summers, alongside peak-hour congestion at Sohana junction.";

async function updateRegalia() {
  console.log(`Starting update for ${slug}...`);

  const apartmentPayload = {
    title: title,
    meta_description: meta_description,
    og_title: og_title,
    og_description: og_description,
    description: description,
    address: "Airport Road, Sector 77, Sahibzada Ajit Singh Nagar, Mohali, Punjab 140308",
    location: "Sector 77, Mohali",
    community: "Sector 77",
    developer: "Homeland Group (SA Global)",
    developer_website: "https://www.homelandgroup.org",
    rera_number: "PBRERA-SAS81-PR0757",
    project_area_acres: 4.58,
    tower_count: 6,
    floor_count: 25,
    total_units: 279,
    bedrooms: 3,
    bedrooms_max: 5,
    bathrooms: 3,
    bathrooms_max: 5,
    area_sqft: 1430,
    area_sqft_max: 6884,
    price: 28200000,
    price_max: 76600000,
    price_currency: "INR" as const,
    completion_date: "December 2028",
    handover_date: "Phased, starting late 2027",
    maintenance_fee_psft: 7.5,
    highlights: highlights,
    unit_types: unit_types,
    faqs: faqs,
    nearby_landmarks: nearby_landmarks,
    amenities: amenities,
    upcoming_infrastructure: upcoming_infrastructure,
    documents: documents,
    transfer_trap_analysis: transfer_trap_analysis,
    lifestyle_tax_analysis: lifestyle_tax_analysis,
    featured: true,
    agent_name: "Amritpal Singh",
    agent_title: "Founder, Realty Holding & Management Consultants",
    agent_email: "hello@realtyconsultants.in",
    agent_phone: "+91 78146 13916",
    agent_photo: "/assets/images/leadership/amritpal.jpg",
    agent_languages: ["English", "Punjabi", "Hindi"],
    updated_at: new Date().toISOString()
  };

  const { data: aptData, error: aptError } = await supabase
    .from("apartments")
    .update(apartmentPayload)
    .eq("slug", slug)
    .select();

  if (aptError) {
    console.error("Error updating apartments table:", aptError);
  } else {
    console.log("Successfully updated apartments table:", aptData?.[0]?.title);
  }
}

updateRegalia();
