import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

const sourceFiles = [
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_89_djqtx0nk.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_162_rypdmmv_1734509475_538689009_mobile.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_168_8cjhfgdp.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_180_9fyowbem.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_82_9vdb5ev8.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_108_jeqdpj4_1734509451_538688641_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_173_56jz9hiw_large.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_177_hpoz8wvg_large.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_112_awf99jj_1734509455_538688673_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_120_gzwpmvz_1734509497_538689005_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_160_rypdmmv_1734509475_538689009_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_285_xq61fat_1758871631_652712887_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Ambika La Parisian Sector 66b Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_309_umtbsgs_1776753480_746880086_O.jpg"
];

const destDir = path.join(process.cwd(), 'public', 'assets', 'images', 'properties', 'ambika-la-parisian');

async function processImages() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const imageUrls = [];

  for (let i = 0; i < sourceFiles.length; i++) {
    const src = sourceFiles[i];
    const indexStr = String(i + 1).padStart(2, '0');
    const newFileName = `realty-holding-and-management-consultants-ambika-la-parisian-mohali-sector-66b-${indexStr}.jpg`;
    const dest = path.join(destDir, newFileName);

    try {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${path.basename(src)} -> ${newFileName}`);
        imageUrls.push(`/assets/images/properties/ambika-la-parisian/${newFileName}`);
      } else {
        console.warn(`File not found, skipping: ${src}`);
      }
    } catch (err) {
      console.error(`Error copying ${src}:`, err);
    }
  }

  if (imageUrls.length > 0) {
    console.log(`\nUpdating Supabase for ambika-la-parisian with ${imageUrls.length} images...`);
    const { error } = await supabase
      .from("apartments")
      .update({ images: imageUrls })
      .eq("slug", "ambika-la-parisian");

    if (error) {
      console.error("Supabase update failed:", error);
    } else {
      console.log("Supabase successfully updated!");
    }
  } else {
    console.log("No images processed, skipping database update.");
  }
}

processImages();
