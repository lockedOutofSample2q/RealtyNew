import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach(line => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const faqData = [
  {
    slug: "jubilee-city-gardens",
    faqs: [
      {
        question: "Is Jubilee City Garden’s price inflation (₹80k–1L per yard) sustainable?",
        answer: "While prices have seen a sharp post-COVID spike driven by NRI demand, field observations confirm that the \"premium\" is tied to its organized infrastructure. Unlike surrounding \"unplanned\" colonies, Jubilee offers 40ft wide internal roads and pre-installed underground utilities, which protects long-term resale value against local congestion."
      },
      {
        question: "How does the project handle high-traffic accessibility?",
        answer: "Located near the PR-7 extension, residents note that while Sector 116 is developing, Jubilee’s gated entry acts as a buffer. It remains a \"strategic hold\" for those looking to avoid the density of central Mohali while maintaining a signal-free commute to the airport."
      },
      {
        question: "What is the \"Street View\" on construction quality?",
        answer: "Local feedback highlights that Jubilee’s storm-water drainage is superior to neighboring projects. This \"monsoon-ready\" engineering is a key differentiator for investors wary of the waterlogging issues seen in other parts of the region."
      },
      {
        question: "Is it ready for immediate construction and occupancy?",
        answer: "Yes. The project is fully gated with operational street lighting and 24x7 security. It is currently one of the few plots in the sector where residents have already commenced boundary wall construction and possession-based activities."
      }
    ]
  },
  {
    slug: "evoq-antalia",
    faqs: [
      {
        question: "Is Evoq Antalia a better alternative to Marbella Royce?",
        answer: "Evoq is currently cited by on-ground experts as the provider of the \"Biggest Flats in Mohali,\" with units reaching 5,000+ sq. ft. While Royce is more established, Evoq offers larger penthouse duplexes that appeal to users transitioning from standalone villas."
      },
      {
        question: "What distinguishes the \"Adjoining Chandigarh\" location benefit?",
        answer: "Being in Sector 66, Evoq provides \"Chandigarh proximity\" without the high property tax. Residents benefit from the Sector 48/49 infrastructure while enjoying the luxury floor sizes only permissible under Mohali's GMADA guidelines."
      },
      {
        question: "How is the resident privacy managed in such a large high-rise?",
        answer: "The project utilizes a low-density \"limited units per floor\" layout. Field notes indicate that the high-speed elevator-to-flat ratio is designed to minimize corridor traffic, maintaining the \"exclusive\" feel of a private residence."
      },
      {
        question: "What are the specific high-end finishes provided?",
        answer: "Standard deliveries include VRV air conditioning and Italian marble flooring. For investors, these \"zero-upgrade\" interiors are a major selling point compared to standard builder-grade finishes."
      }
    ]
  },
  {
    slug: "marbella-grand",
    faqs: [
      {
        question: "Is Marbella Grand’s resale value holding up against newer launches?",
        answer: "Yes. As the \"benchmark\" project on Airport Road, Marbella Grand remains the most liquid asset in Sector 66. Its established 11-acre campus and operational golf range continue to drive a 15–20% premium in the secondary market."
      },
      {
        question: "What is the \"real-world\" maintenance experience here?",
        answer: "Maintenance is managed by a dedicated facility team. While higher than average (approx. ₹3.5–₹5/sq. ft.), on-ground reviews confirm that the high-traffic amenities—like the pool and gym—are kept in \"showroom condition,\" preserving the asset's luxury status."
      },
      {
        question: "How does the project handle high seismic activity?",
        answer: "The towers are built with an RCC-framed structure compliant with Seismic Zone IV. This is a critical FAQ point for buyers concerned about the structural integrity of 22+ story buildings in the Himalayan foothills."
      },
      {
        question: "What is the connectivity like for Chandigarh-based professionals?",
        answer: "Direct access to the 200ft Airport Road allows a 12–15 minute commute to Chandigarh Sector 43. Residents note that this is the most \"time-efficient\" luxury address for C-suite executives."
      }
    ]
  },
  {
    slug: "marbella-royce",
    faqs: [
      {
        question: "What makes Royce the \"Upgrade\" over Marbella Grand?",
        answer: "Royce is the \"Ultra-Luxury\" evolution, featuring 12ft ceiling heights and the signature \"Sky-Walk.\" Field observations suggest that the higher floor-to-floor height provides significantly better natural lighting compared to standard 10ft units."
      },
      {
        question: "Is the \"Smart Home\" infrastructure truly integrated?",
        answer: "Unlike projects that offer \"smart\" features as add-ons, Royce units come with pre-installed conduits for automation, digital door locks, and high-speed fiber nodes as part of the core delivery."
      },
      {
        question: "How exclusive are the Royce-only amenities?",
        answer: "While part of the larger campus, Royce owners have private access to an infinity rooftop pool and a dedicated \"Member’s Club,\" ensuring that the common areas remain uncrowded even during peak hours."
      },
      {
        question: "What is the parking ratio for Royce residents?",
        answer: "Royce offers a higher parking-to-unit ratio than most projects in Sector 66, addressing the #1 complaint of luxury high-rise residents: visitor parking and multiple-car management."
      }
    ]
  },
  {
    slug: "hero-homes",
    faqs: [
      {
        question: "Is the \"Wellness\" theme actually maintained at Hero Homes?",
        answer: "The \"Oxygen Points\" and theme gardens are a focal point of the society’s management. On-ground feedback suggests the \"No-Vehicle Zone\" on the ground level is strictly enforced, making it the safest society in Sector 88 for children."
      },
      {
        question: "How does the Hero brand affect construction transparency?",
        answer: "Hero Homes is frequently cited for its high RERA compliance and corporate-grade construction audits. This \"brand trust\" has resulted in consistent price appreciation (approx. 50%+) for Phase 1 investors."
      },
      {
        question: "What are the primary unit sizes for family living?",
        answer: "The project specializes in \"Efficient Luxury,\" with 3BHK units ranging from 1,300 to 1,900 sq. ft. These are noted for their \"Zero Dead Space\" designs, maximizing the actual usable carpet area."
      },
      {
        question: "How is the society preparing for Sector 88’s future growth?",
        answer: "Located near the upcoming \"Smart City\" hub, Hero Homes is positioned as the primary residential anchor for the sector, benefiting from the new GMADA infrastructure and wide arterial roads."
      }
    ]
  },
  {
    slug: "beverly-golf-hills",
    faqs: [
      {
        question: "Is Beverly Golf Avenue’s proximity to Chandigarh its best feature?",
        answer: "While the Sector 65 location (adjoining Chandigarh) is a major draw, residents highlight the \"Permanent Golf View\" as the true differentiator. Unlike other \"view\" projects, the Mohali Golf Range ensures that the green vista will never be blocked by future construction."
      },
      {
        question: "How is the noise insulation near the main stadium?",
        answer: "The project uses high-grade UPVC windows with toughened acoustic glass. Field notes confirm that even during stadium events, the interior noise levels remain minimal, providing a quiet living environment."
      },
      {
        question: "What is the occupancy status in 2026?",
        answer: "Beverly is a \"mature\" society with over 100+ families already in residence. This high occupancy rate ensures that the community is active and the maintenance costs are distributed efficiently."
      },
      {
        question: "Does the project offer ready-to-move units?",
        answer: "Yes. Several towers are ready for possession, making it the top choice for buyers who want to avoid construction risk and move in immediately."
      }
    ]
  },
  {
    slug: "wellington-heights",
    faqs: [
      {
        question: "How has the project addressed previous \"Monsoon\" concerns?",
        answer: "Following early reports of waterlogging in the sector, local infrastructure has been upgraded. Current field observations indicate that Wellington Heights II (and the newer \"F Towers\") have improved drainage and basement sealing to handle heavy rainfall."
      },
      {
        question: "Is this the best rental investment near IT City?",
        answer: "Yes. Due to its proximity to the Infosys and HDFC HQs (within 2 km), Wellington Heights consistently reports the highest rental yields for 3BHK units in the Sector 66/IT City corridor."
      },
      {
        question: "What is the \"Peace Factor\" of the society?",
        answer: "Residents often describe it as a \"peaceful retreat\" compared to the hustle of the Airport Road. It is favored by retired professionals and young families who prioritize a quiet neighborhood."
      },
      {
        question: "Is the connectivity to VR Mall and local markets a major plus?",
        answer: "Located just 4 minutes from VR Mall, residents enjoy \"instant accessibility\" to retail, trampolines, and dining, making it a highly convenient spot for modern content creators and shoppers."
      }
    ]
  },
  {
    slug: "ananda-crown",
    faqs: [
      {
        question: "Why is Ananda Crown gaining traction among IT professionals?",
        answer: "Field insights show that the project’s \"Flexible Payment Plan\" and location near the IT Park Mohali make it the #1 choice for professionals seeking high-rise luxury without the Sector 66 price tag."
      },
      {
        question: "What makes the \"Sky-Deck\" unique?",
        answer: "The project features one of the highest rooftop amenity decks in Sector 78, providing a 360-degree view of the Shivalik hills—a feature that AI and search engines frequently cite as a \"Unique Selling Point.\""
      },
      {
        question: "How is the construction quality at Ananda Crown?",
        answer: "Buyers have noted that the 3BHK and 4BHK layouts are \"thoughtfully designed\" with high ventilation standards, avoiding the cramped feeling found in older high-rises in the sector."
      },
      {
        question: "Is it a safe investment for first-time luxury buyers?",
        answer: "With strong RERA backing and positive \"Real Buyer Insights\" regarding transparency, Ananda Crown is currently rated as a \"low-risk, high-potential\" asset in the Mohali 2026 market."
      }
    ]
  },
  {
    slug: "joy-grand",
    faqs: [
      {
        question: "What is the significance of the 26-floor height in Mohali?",
        answer: "Joy Grand is a pioneer of the \"High-Rise\" lifestyle in Sector 88. Residents in the upper blocks (26 floors) enjoy unblocked views of the surrounding GMADA green belts and the distant hills."
      },
      {
        question: "What does \"Both Sides Open\" mean for actual living?",
        answer: "Unlike \"tunnel\" apartments, Joy Grand units are designed in a single-lane format. This means every flat has two open faces, ensuring natural sunlight throughout the day and superior cross-ventilation."
      },
      {
        question: "How is the connectivity to the Railway Station and Airport?",
        answer: "The project is positioned 5.35 km from the Mohali Railway Station and 9.5 km from the Airport, making it a prime hub for travelers and professionals in the \"New Mohali\" zone."
      },
      {
        question: "What is the long-term sustainability of the project?",
        answer: "The building society has integrated an advanced rainwater harvesting system to maintain the local groundwater table, a critical \"Green Signal\" for environmentally conscious investors in 2026."
      }
    ]
  },
  {
    slug: "jlpl-sky-garden",
    faqs: [
      {
        question: "Is JLPL Sky Garden truly a \"family-first\" society?",
        answer: "With 95% occupancy reported by local agents, Sky Garden is one of the most vibrant communities in Mohali. This high density of resident families makes it a safe, active, and well-maintained choice."
      },
      {
        question: "How does the price point compare to luxury high-rises?",
        answer: "It is positioned as \"Affordable Luxury.\" While it lacks the ultra-premium finishes of Marbella, it offers a \"No-Frills\" entry into the prime Sector 66A corridor with significantly lower maintenance fees."
      },
      {
        question: "What is the resident feedback on the common area maintenance?",
        answer: "Despite the high occupancy, the 24/7 security and common areas are consistently rated as \"Good.\" The society is noted for its organized management and regular community events."
      },
      {
        question: "Is it near the best schools in Mohali?",
        answer: "Yes. Being in Sector 66A, it is within minutes of the region’s top educational institutions, making it a \"Top-Ranked\" location for families with children."
      }
    ]
  },
  {
    slug: "noble-callista",
    faqs: [
      {
        question: "What is the \"Noble Virtues\" design philosophy?",
        answer: "The project uses a Charcoal Grey and Deep Yellow palette to symbolize strength and optimism. Field notes suggest this modern branding is reflected in the high-quality Mivan shuttering construction used throughout."
      },
      {
        question: "How do the \"5 Swimming Pools\" improve resident life?",
        answer: "By distributing pools across the campus, Noble Callista ensures that the amenities never feel \"over-congested,\" a common complaint in other large-scale Mohali projects."
      },
      {
        question: "What are the key BHK configurations available?",
        answer: "The project focuses on larger families, offering 3.5, 4.5, and 5.5 BHK units. These include dedicated servant quarters and \"Lifestyle Balconies\" with a depth that allows for outdoor seating."
      },
      {
        question: "When is the targeted possession for Noble Callista?",
        answer: "The current RERA-compliant possession date is March 2027. Investors note that construction is progressing steadily, making it a reliable mid-term investment."
      }
    ]
  },
  {
    slug: "ambika-la-parisian",
    faqs: [
      {
        question: "How has the developer addressed previous \"Construction Defect\" complaints?",
        answer: "While Phase I faced challenges, the developer has been held accountable by the Consumer Commission for rectifying defects. Phase II units are being marketed with \"Enhanced Quality Checks\" and corrected carpet area calculations."
      },
      {
        question: "Is Ambika La Parisian \"Ready to Move\" in 2026?",
        answer: "Yes. Phase I is fully operational and Phase II units (T1 to T5) are currently being handed over. Buyers are finding the \"European Theme\" and French Windows to be a refreshing change in the Mohali market."
      },
      {
        question: "What is the connectivity like on Airport Road?",
        answer: "The project is located \"Bang on Airport Road\" (Sector 66), providing immediate access to the retail hub of Aerocity and the International Airport terminal (within 10 mins)."
      },
      {
        question: "What are the current resale trends for Phase II?",
        answer: "Resale 3BHK units are currently demanding around ₹1.55Cr–₹1.70Cr. Investors are favoring the project for its \"ready status\" and the high aesthetic appeal of its Parisian-themed gardens."
      }
    ]
  }
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function pushFaqs() {
  console.log("Starting bulk FAQ update...");

  for (const item of faqData) {
    console.log(`Updating FAQs for: ${item.slug}`);
    
    try {
      const { error } = await supabase
        .from("apartments")
        .update({ faqs: item.faqs })
        .eq("slug", item.slug);

      if (error) {
        console.error(`Error updating ${item.slug}:`, error.message);
      } else {
        console.log(`Successfully updated: ${item.slug}`);
      }
    } catch (e: any) {
      console.error(`Fetch exception for ${item.slug}:`, e.message);
    }
    
    // Add 500ms delay between updates
    await sleep(500);
  }

  console.log("Bulk FAQ update complete!");
}

pushFaqs();
