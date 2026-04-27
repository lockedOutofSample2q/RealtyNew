const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

async function updatePropertyFull() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const slug = 'homeland-regalia-mohali';
  
  const baseDescription = "Homeland Regalia in Sector 77, Mohali, represents a significant shift towards ultra-luxury in the tri-city real estate market. Positioned on the International Airport Road, this project by Homeland Group is notable for its high-spec glass facade architecture and the massive 100,000 sq. ft. 'Club Regalia'. From our perspective, while the project offers legitimate luxury assets, buyers should be aware of the secondary market saturation and the 'lifestyle tax' associated with high maintenance costs (projected at ₹6.50 - ₹8.50 per sq. ft.). The superstructure is largely complete, and while the RERA deadline is Dec 2028, a realistic phased handover is expected by late 2027. It is an ideal choice for end-users seeking a premium lifestyle hub, though investors must evaluate exit liquidity carefully in a crowded premium segment.";

  const faqs = [
    {
      question: "When is the realistic possession of Homeland Regalia?",
      answer: "The official RERA completion date is December 2028. However, given the current progress of the superstructure, we anticipate a realistic phased handover to begin by late 2027."
    },
    {
      question: "What is the 'Club Regalia' differentiator?",
      answer: "Unlike many projects that promise small community centers, Homeland Regalia features a 100,000 sq. ft. club which is a legitimate utility asset for residents, offering top-tier amenities including indoor pools and global-standard fitness centers."
    },
    {
      question: "What are the geographical considerations for this location?",
      answer: "The project is bordered by Mataur and Sohana villages. While the front access is excellent on Airport Road, external traffic bottlenecks during peak hours near the Sohana junction are a factor to consider for daily commuters."
    },
    {
      question: "What are the hidden costs of living in a glass-facade building?",
      answer: "The extensive use of glass leads to high thermal gain in Punjab's 45°C summers, requiring higher HVAC operation. This, combined with premium services, leads to a 'lifestyle tax' reflected in maintenance fees estimated between ₹6.50 and ₹8.50 per sq. ft."
    }
  ];

  const fullDescription = `${baseDescription}\n\n[FAQS]${JSON.stringify(faqs)}[/FAQS]`;

  const updates = {
    description: fullDescription,
    highlights: [
      "Ultra-Luxury Identity: PBRERA-SAS81-PR0757",
      "Development Scale: 6 Towers (21 to 25 floors)",
      "100,000 sq. ft. Club Regalia - Premium Utility Asset",
      "Realistic phased handover: Late 2027",
      "Acoustic fatigue management from Airport Road corridor",
      "Superstructure largely complete as of 2024"
    ],
    tower_count: 6,
    floor_count: 25,
    total_units: 322, // Approximate for this scale
    project_area_acres: 8.5,
    rera_number: "PBRERA-SAS81-PR0757",
    completion_date: "Dec 2028",
    handover_date: "Late 2027",
    maintenance_fee_psft: 7.50,
    price_sqft_min: 14500,
    price_sqft_max: 16800
  };

  console.log(`Performing final data sync for ${slug}...`);

  const { error } = await supabase
    .from('apartments')
    .update(updates)
    .eq('slug', slug);
  
  if (error) console.error('Error updating apartments:', error.message);
  else console.log('✅ Successfully synced all forensic and scale data for Homeland Regalia Mohali.');
}

updatePropertyFull();
