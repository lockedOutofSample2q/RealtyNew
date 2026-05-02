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

const IMAGE_PATH = "public/images/lands/1-kanal-land-detail.png";
const BUCKET = "property-images";
const DEST_PATH = "lands/1-kanal-land-detail.png";
const LAND_ID = "3cbbb315-cb29-45fc-8c6a-8792ebf2ee56";

async function uploadAndAppend() {
  console.log("Uploading land image to Supabase Storage...");
  const fileBuffer = fs.readFileSync(path.join(process.cwd(), IMAGE_PATH));
  
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

  console.log("Fetching current images...");
  const { data: currentLand, error: fetchError } = await supabase
    .from("lands")
    .select("images")
    .eq("id", LAND_ID)
    .single();

  if (fetchError || !currentLand) {
    console.error("Error fetching current land:", fetchError);
    return;
  }

  const currentImages = currentLand.images || [];
  if (!currentImages.includes(imageUrl)) {
    currentImages.push(imageUrl);
  }

  console.log("Updating database record with new image array...");
  const { data: dbData, error: dbError } = await supabase
    .from("lands")
    .update({ 
      images: currentImages 
    })
    .eq("id", LAND_ID)
    .select();

  if (dbError) {
    console.error("Error updating database:", dbError);
  } else {
    console.log("Successfully updated database:", dbData);
  }
}

uploadAndAppend();
