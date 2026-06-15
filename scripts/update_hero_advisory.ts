import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAdvisory() {
  const slug = "hero-homes-mohali-sector-88";

  const { data: existingData } = await supabase
    .from("apartments")
    .select("description, faqs")
    .eq("slug", slug)
    .single();

  let newDesc = existingData?.description || "";
  let newFaqs = existingData?.faqs || [];

  // Update description
  newDesc = newDesc.replace(/₹9,400\/sqft/g, "₹10,500/sqft");
  newDesc = newDesc.replace(/as of Q1 2026/g, "as of mid-2026");

  // Update FAQs
  newFaqs = newFaqs.map((faq: any) => {
    if (faq.answer.includes("₹9,400/sqft")) {
      return {
        ...faq,
        answer: faq.answer.replace("₹9,400/sqft", "₹10,500/sqft")
      };
    }
    return faq;
  });

  const { error } = await supabase
    .from("apartments")
    .update({ description: newDesc, faqs: newFaqs, updated_at: new Date().toISOString() })
    .eq("slug", slug);

  if (error) console.error("Error updating advisory:", error);
  else console.log("Successfully updated the advisory and description with 10,500/sqft pricing!");
}

updateAdvisory();
