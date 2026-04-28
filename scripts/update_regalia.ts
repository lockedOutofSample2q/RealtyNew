import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const slug = "homeland-regalia-mohali";

const faqs = [
  { 
    question: "When is the possession for Homeland Regalia?", 
    answer: "The project is currently under construction. Phased handovers for the residential towers are expected starting late 2027, with the official RERA completion deadline in December 2028." 
  },
  { 
    question: "What makes the Regalia clubhouse unique?", 
    answer: "Known as 'Club Regalia,' it spans over 100,000 sq. ft. of luxury recreation space, including all-season indoor pools, high-end gyms, and dedicated social lounges, making it one of the largest private clubhouses in North India." 
  },
  { 
    question: "Is Homeland Regalia a safe investment for long-term growth?", 
    answer: "Yes, its position on the Airport Road (PR-7) corridor makes it a high-demand asset. However, our forensic analysis suggests that secondary market premiums are already high, so investors should look for specific inventory with superior directional facing." 
  }
];

const nearby_landmarks = [
  { name: "Chandigarh International Airport", time: 20, transport: "car" },
  { name: "CP67 Mall", time: 8, transport: "car" },
  { name: "Fortis Hospital", time: 10, transport: "car" },
  { name: "ISB Mohali", time: 12, transport: "car" },
  { name: "Mohali IT City", time: 15, transport: "car" }
];

const upcoming_infrastructure = [
  "Airport Road (PR-7) Corridor Widening: Plans to expand service lanes to handle increased traffic from luxury high-rises.",
  "Sector 77 Smart Infrastructure: Implementation of advanced storm-water drainage and dedicated 66KV sub-stations for the sector.",
  "New Commercial Hubs: Development of major retail and office spaces in the immediate vicinity, enhancing walk-to-work potential."
];

const documents = [
  { name: "Official Brochure", url: "https://www.homelandgroup.org/wp-content/uploads/2022/01/homeland-heights-6926_compressed.pdf" },
  { name: "Project Specifications", url: "https://www.homelandgroup.org/wp-content/uploads/2022/01/homeland-heights-6926_compressed.pdf" }
];

async function updateRegalia() {
  console.log(`Starting update for ${slug}...`);

  const { error } = await supabase
    .from("apartments")
    .update({
      meta_description: "Verified listing for Homeland Regalia Sector 77 Mohali. Explore luxury 3/4/5 BHK apartments and penthouses. Featuring a 100,000 sq. ft. clubhouse and elite Airport Road connectivity.",
      highlights: [
        "Ultra-Luxury Icon (PBRERA Registered)",
        "6 Towers (21 to 25 floors)",
        "100,000 sq. ft. 'Club Regalia'",
        "Phased Handover starting Late 2027",
        "Acoustic Fatigue Management Design",
        "Direct International Airport Road access"
      ],
      address: "Airport Road, Sector 77, Mohali, Punjab 140308",
      developer_website: "https://www.homelandgroup.org",
      faqs: faqs as any,
      nearby_landmarks: nearby_landmarks as any,
      upcoming_infrastructure: upcoming_infrastructure,
      image_count: 18, // Based on the images array found in the DB check
      featured: true, // Marking as featured
      documents: documents as any,
      agent_name: "Amritpal Singh",
      agent_title: "Founder & CEO",
      agent_email: "hello@realtyconsultants.in",
      agent_phone: "+91 78146 13916",
      agent_photo: "/assets/images/leadership/amritpal.jpg",
      agent_languages: ["English", "Punjabi", "Hindi"],
      tower_count: 6,
      floor_count: 25
    })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating Regalia:", error);
  } else {
    console.log("Successfully updated Homeland Regalia with full premium data!");
  }
}

updateRegalia();
