import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const envPath = path.join(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
envContent.split("\n").forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const IMAGE_PATH = "C:\\Users\\Magicbook\\.gemini\\antigravity\\brain\\fd158df6-1810-4840-8cbb-553651f8afe9\\media__1777711032660.png";
const BUCKET = "property-images";
const DEST_PATH = "lands/cholta-khurd-bypass.png";
const SLUG = "land-kurali-bypass-cholta-khurd";

async function uploadAndUpdate() {
  console.log("Uploading image to Supabase Storage...");
  const fileBuffer = fs.readFileSync(IMAGE_PATH);
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(DEST_PATH, fileBuffer, {
      contentType: "image/png",
      upsert: true
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return;
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${DEST_PATH}`;
  console.log("Image uploaded. URL:", imageUrl);

  console.log("Updating database record...");
  const { data: dbData, error: dbError } = await supabase
    .from("lands")
    .update({ 
      images: [imageUrl] 
    })
    .eq("slug", SLUG)
    .select();

  if (dbError) {
    console.error("Error updating database:", dbError);
  } else {
    console.log("Successfully updated database:", dbData);
  }
}

uploadAndUpdate();
