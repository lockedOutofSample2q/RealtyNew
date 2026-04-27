const { createClient } = require('@supabase/supabase-js');

async function updateHomelandRegalia() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Updating Homeland Regalia with advisory info...');

  const description = `Most digital content regarding Homeland Regalia Mohali is created by uninformed brokers seeking social media traction. At Realty Holding and Management Consultants, we believe views do not comfort a buyer; the right answer does.

THE TRANSFER TRAP:
As of April 2026, the secondary market is saturated with original investors seeking exits. Buyers entering at ₹14,500 to ₹16,800 per sq. ft. are often paying a heavy premium that is the first thing to evaporate if market sentiment shifts.

THE LIFESTYLE TAX:
Projected maintenance fees range from ₹6.50 to ₹8.50 per sq. ft. (€25,000+ monthly for a 4BHK). The glass facade, while an industrial masterpiece, necessitates constant HVAC operation in Punjab’s 45°C summers.

OUR TAKE:
We evaluate this project based on its Status Floor versus its Utility Ceiling. The difference between a sound investment and a capital trap is fifteen minutes of honest data.`;

  const highlights = [
    "Legal Identity: PBRERA-SAS81-PR0757",
    "Development Scale: 6 Towers (21 to 25 floors)",
    "realistic phased handover: Late 2027",
    "Legal RERA deadline: December 2028",
    "100,000 sq. ft. Club Regalia - Legitimate asset",
    "Secondary market rates: ₹14,500 - ₹16,800/sq. ft.",
    "Acoustic fatigue from Airport Road cargo corridor"
  ];

  // Calculate price based on 14,500 per sqft for a 4BHK (approx 3128 sqft)
  // 3128 * 14500 = 45,356,000 (~4.53 Cr)
  const price = 45300000;
  const price_max = 85000000; // Penthouses go much higher

  const metadata = {
    price_max: price_max,
    area_sqft_max: 6500,
    bedrooms_max: 5,
    address: "Sector 77, International Airport Road, Mohali",
    completion_date: "December 2028 (RERA)",
    handover_date: "Late 2027 (Realistic)",
    nearby_landmarks: [
      { name: "CP67 Mall", time: 7, transport: "car" },
      { name: "International Airport", time: 20, transport: "car" },
      { name: "Mohali Railway Station", time: 8, transport: "car" }
    ]
  };

  const finalDescription = description + '\n\n' + `[METADATA]${JSON.stringify(metadata)}[/METADATA]`;

  const { error } = await supabase
    .from('apartments')
    .update({
      title: "Homeland Regalia Mohali",
      slug: "homeland-regalia-mohali",
      description: finalDescription,
      highlights: highlights,
      price: price,
      price_currency: 'INR',
      status: 'off-plan',
      updated_at: new Date().toISOString()
    })
    .eq('slug', 'homeland-regalia'); // Update existing entry

  if (error) {
    console.error('Error updating Homeland Regalia:', error);
  } else {
    console.log('Successfully updated Homeland Regalia with advisory content.');
  }
}

updateHomelandRegalia();
