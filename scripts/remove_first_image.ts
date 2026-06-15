import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

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
  
  const { data, error } = await supabase
    .from("apartments")
    .select("images")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return;
  }

  const images = data?.images || [];
  
  if (images.length === 0) {
    console.log("No images found for this property.");
    return;
  }

  console.log(`Original images count: ${images.length}`);
  console.log(`Removing first image: ${images[0]}`);
  
  const newImages = images.slice(1);

  const { error: updateError } = await supabase
    .from("apartments")
    .update({ images: newImages })
    .eq("slug", slug);

  if (updateError) {
    console.error("Error updating property:", updateError);
  } else {
    console.log(`Successfully removed the first image. New images count: ${newImages.length}`);
  }
}

main().catch(console.error);
