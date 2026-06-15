import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const slug = "jlpl-galaxy-heights-sector-66a-mohali";
  
  const faqs = [
    {
      question: "What is the current price of 2 BHK in JLPL Galaxy Heights Mohali?",
      answer: "₹0.95 Cr – ₹1.15 Cr for 710–1050 sqft."
    },
    {
      question: "Is JLPL Galaxy Heights ready to move?",
      answer: "Yes, fully occupied and operational since delivery."
    },
    {
      question: "What floor plans are available?",
      answer: "710 sqft compact, 850 sqft mid, 1045–1050 sqft large."
    },
    {
      question: "What is the maintenance cost?",
      answer: "₹2.5–4/sqft."
    }
  ];

  const updateData = {
    title: "JLPL Galaxy Heights Mohali — 2 BHK from ₹0.95 Cr | Verified Advisory",
    meta_description: "2 BHK flats from ₹0.95 Cr in Sector 66A Mohali. Ready to move. JLPL verified, PUDA compliant. Near Wipro SEZ. Book a free site visit.",
    faqs: faqs
  };

  console.log(`Updating ${slug}...`);
  const { data, error } = await supabase
    .from("apartments")
    .update(updateData)
    .eq("slug", slug)
    .select();

  if (error) {
    console.error("Error updating property:", error);
  } else {
    console.log("Successfully updated:", data?.[0]?.slug);
  }
}

main().catch(console.error);
