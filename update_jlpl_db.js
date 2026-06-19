const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aklixeskmhzsqrlnzqjk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGl4ZXNrbWh6c3FybG56cWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk0NzYxNSwiZXhwIjoyMDkwNTIzNjE1fQ.HrqczSiLOAWObUVN3A5zD4eS8kGLxarWkkoZeOV1rPw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDB() {
  const slug = 'jlpl-galaxy-heights-sector-66a-mohali';

  // 1. Fetch current row
  const { data: prop, error: fetchErr } = await supabase
    .from('apartments')
    .select('*')
    .eq('slug', slug)
    .single();

  if (fetchErr) {
    console.error("Fetch Error:", fetchErr);
    return;
  }

  // 2. Prepare Updates
  const updates = {};

  // Display Name & H1
  updates.title = "JLPL Galaxy Heights \u2014 2 BHK, Sector 66A Mohali";
  
  // SEO Meta
  updates.og_title = "JLPL Galaxy Heights Mohali \u2014 2 BHK from \u20B90.95 Cr | Verified Advisory";
  updates.meta_description = "Ready-to-move 2 BHK in JLPL Galaxy Heights, Sector 66A Mohali. \u20B90.95\u20131.15 Cr. RERA registered, near Wipro SEZ and Mohali Railway Station. Advisory-audited for resale viability. Book a free site visit.";
  updates.og_description = updates.meta_description;

  // Lifestyle Tax paragraph
  updates.lifestyle_tax_analysis = "Expect maintenance and lifestyle overheads to range from \u20B92.5 to \u20B94 per sq.ft, covering standard amenities, security, and common area upkeep \u2014 typical for a fully-occupied 6-tower society of this size in Sector 66A.";

  // RERA Status
  updates.rera_number = "Registered \u2014 verify exact tower-block number on rera.punjab.gov.in";

  // Project Highlights - corrected occupancy line
  const oldHighlights = prop.highlights || [];
  updates.highlights = oldHighlights.map(h => 
    h.includes("Ready to move, fully occupied") || h.includes("Ready to move, with the majority")
      ? "\u2713 Ready to move, with the majority of the project's 411 units delivered and families already in residence across all 6 towers"
      : h
  );

  // Amenities - add Swimming Pool under Recreation
  let newAmenities = prop.amenities ? [...prop.amenities] : [];
  if (!newAmenities.includes("Swimming Pool")) {
    // find index of "Club House" to insert nearby, or just push at end
    const clubIdx = newAmenities.indexOf("Club House");
    if (clubIdx !== -1) {
      newAmenities.splice(clubIdx + 1, 0, "Recreation", "Swimming Pool");
    } else {
      newAmenities.push("Recreation", "Swimming Pool");
    }
  }
  updates.amenities = newAmenities;

  // Nearby Landmarks - additional entries
  const newLandmarks = [
    { name: "Infosys Mohali", time: "10", transport: "car" },
    { name: "Plaksha University", time: "12", transport: "car" },
    { name: "PCA Cricket Stadium", time: "12", transport: "car" },
    { name: "Fortis Hospital Mohali", time: "12", transport: "car" },
    { name: "ISB Mohali", time: "15", transport: "car" },
    { name: "Amity University Mohali", time: "15", transport: "car" },
    { name: "GMADA Aero City", time: "15", transport: "car" }
  ];
  let updatedLandmarks = prop.nearby_landmarks ? [...prop.nearby_landmarks] : [];
  // add only if not already present
  newLandmarks.forEach(nl => {
    if (!updatedLandmarks.some(l => l.name === nl.name)) {
      updatedLandmarks.push(nl);
    }
  });
  updates.nearby_landmarks = updatedLandmarks;

  // FAQs - Add 5 new
  const newFaqs = [
    {
      question: "How does Galaxy Heights compare to Falcon View?",
      answer: "Galaxy Heights is the affordable 2 BHK format (710 to 1,050 sq. ft.) designed for rental investment and young professionals, priced at \u20B90.95\u20131.15 Cr. Falcon View is the ultra-luxury 3 to 5 BHK format (2,480 to 5,570 sq. ft.) with a golf arena and 25,000 sq. ft. clubhouse, priced at \u20B92 Cr and above. Both are by JLPL in the same sector \u2014 Galaxy Heights is a value play, Falcon View is a lifestyle play."
    },
    {
      question: "What is the rental yield on a 2 BHK in JLPL Galaxy Heights?",
      answer: "2 BHK rents in Sector 66A range from \u20B910,000 to \u20B920,000 per month depending on furnishing and floor. For a compact 710 sq. ft. unit purchased at entry-level pricing near \u20B90.95 Cr, gross rental yield runs approximately 1.3\u20132.5% annually, supported by consistent demand from Wipro SEZ and Infosys Mohali tenants."
    },
    {
      question: "Is JLPL a credible developer?",
      answer: "Yes. On IREF, members specifically noted JLPL was the only developer in Mohali completing projects on time during a period of widespread delays. Their 398-acre township in Sector 66A is built and operational, and the launch of Galaxy Heights 2 confirms continued market trust in the brand."
    },
    {
      question: "Are the specifications in JLPL Galaxy Heights premium?",
      answer: "No \u2014 this is a mid-price product with vitrified tile and marble combination flooring, plastic emulsion walls, and kota stone lobby passages. These are appropriate and competitive for the price point. Buyers should not expect wooden flooring or designer finishes at Galaxy Heights pricing."
    },
    {
      question: "Is JLPL Galaxy Heights RERA registered?",
      answer: "Yes. Galaxy Heights is RERA registered under the Punjab RERA Act, with separate registration numbers issued for different towers and blocks within the project. For resale transactions, buyers should confirm the exact registration number for their specific tower directly on the Punjab RERA portal (rera.punjab.gov.in) or with the developer before purchase."
    }
  ];

  let currentFaqs = prop.faqs ? [...prop.faqs] : [];
  
  // To avoid duplicates, check if the question already exists
  newFaqs.forEach(nf => {
    const existingIndex = currentFaqs.findIndex(f => f.question === nf.question);
    if (existingIndex > -1) {
      currentFaqs[existingIndex] = nf; // update answer
    } else {
      currentFaqs.push(nf);
    }
  });

  // Also replace any old FAQ that needs correction, e.g. RERA or occupancy
  currentFaqs = currentFaqs.map(f => {
    if (f.question === "Is JLPL Galaxy Heights a ready-to-move-in project or under construction?") {
      return {
        question: f.question,
        answer: "JLPL Galaxy Heights is a completed, ready-to-move-in residential project. The developer has delivered the majority of its 411 units, with families currently in residence across the six towers. Buyers can move in or rent out immediately without construction-related delays."
      };
    }
    return f;
  });

  updates.faqs = currentFaqs;

  // 3. Perform Update
  const { data: updateData, error: updateErr } = await supabase
    .from('apartments')
    .update(updates)
    .eq('slug', slug)
    .select();

  if (updateErr) {
    console.error("Update Error:", updateErr);
  } else {
    console.log("Successfully updated JLPL Galaxy Heights in DB!");
    console.log("Updated fields:", Object.keys(updates));
  }
}

updateDB();
