const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aklixeskmhzsqrlnzqjk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGl4ZXNrbWh6c3FybG56cWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk0NzYxNSwiZXhwIjoyMDkwNTIzNjE1fQ.HrqczSiLOAWObUVN3A5zD4eS8kGLxarWkkoZeOV1rPw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixFaqs() {
  const faqs = [
    {
      question: "What are the lifestyle and connectivity advantages of living in JLPL Galaxy Heights?",
      answer: "JLPL Galaxy Heights offers strong connectivity due to its location in Sector 66A, Mohali, sitting on the 200-foot-wide International Airport Road with seamless access to Chandigarh and major highways. Residents are close to the Wipro SEZ and Infosys Mohali IT hubs, Plaksha University, ISB Mohali, Fortis Hospital, and PCA Cricket Stadium, alongside landscaped greens and a dedicated play area."
    },
    {
      question: "Is JLPL Galaxy Heights a ready-to-move-in project or under construction?",
      answer: "JLPL Galaxy Heights is a completed, ready-to-move-in residential project. The developer has delivered the majority of its 411 units, with families currently in residence across the six towers. Buyers can move in or rent out immediately without construction-related delays."
    },
    {
      question: "What are the different 2 BHK floor plan configurations available?",
      answer: "The project offers a compact 710 sq. ft. layout, a mid-sized 850 sq. ft. layout with better spatial distribution, and spacious 1,045 to 1,050 sq. ft. units with larger balconies and natural light."
    },
    {
      question: "What are the monthly maintenance charges and what do they cover?",
      answer: "Monthly maintenance is approximately ₹2.5 to ₹4 per square foot of super area, covering 24/7 security, swimming pool and landscaped garden upkeep, power backup, elevators, and common area cleaning."
    },
    {
      question: "How does Galaxy Heights compare to Falcon View?",
      answer: "Galaxy Heights is the affordable 2 BHK format (710 to 1,050 sq. ft.) priced at ₹0.95–1.15 Cr, designed for rental investment and young professionals. Falcon View is the ultra-luxury 3 to 5 BHK format priced at ₹2 Cr and above, with a golf arena and 25,000 sq. ft. clubhouse. Both are by JLPL in the same sector."
    },
    {
      question: "What is the rental yield on a 2 BHK in JLPL Galaxy Heights?",
      answer: "2 BHK rents in Sector 66A range from ₹10,000 to ₹20,000 per month. For a compact 710 sq. ft. unit purchased near ₹0.95 Cr, gross rental yield runs approximately 1.3–2.5% annually, supported by Wipro SEZ and Infosys Mohali tenant demand."
    },
    {
      question: "Is JLPL a credible developer?",
      answer: "Yes. On IREF, members noted JLPL was the only developer in Mohali completing projects on time during a period of widespread delays. Their 398-acre township in Sector 66A is built and operational, and the launch of Galaxy Heights 2 confirms continued market trust."
    },
    {
      question: "Are the specifications in JLPL Galaxy Heights premium?",
      answer: "No — this is a mid-price product with vitrified tile and marble combination flooring, plastic emulsion walls, and kota stone lobby passages, appropriate and competitive for the price point."
    },
    {
      question: "Is JLPL Galaxy Heights RERA registered?",
      answer: "Yes. Galaxy Heights is RERA registered under the Punjab RERA Act, with separate registration numbers issued for different towers and blocks within the project. Buyers should confirm the exact registration number for their specific tower on the Punjab RERA portal, rera.punjab.gov.in."
    }
  ];

  const { error } = await supabase
    .from('apartments')
    .update({ faqs })
    .eq('slug', 'jlpl-galaxy-heights-sector-66a-mohali');

  if (error) {
    console.error("Error fixing FAQs:", error);
  } else {
    console.log("Successfully fixed FAQs with all 9 exact items from the markdown!");
  }
}

fixFaqs();
