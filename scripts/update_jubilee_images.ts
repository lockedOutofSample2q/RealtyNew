import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

const sourceFiles = [
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\xxdiuv3_1746077636_591669825_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\752071898O-1777628601500.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_93_ixaibj7_1746077634_591669813_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_103_isfpwps_1746077635_591669815_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_107_m90p9rd_1746077636_591669861_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_111_0wz5onu_1746077636_591669827_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_115_aiwm4vb_1746077638_591669869_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_90_xd5oe36_1746077634_591669809_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_119_khzeabu_1746077635_591669819_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_127_trjwrav_1746077637_591669867_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_135_sbts0cn_1746077709_591670219_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_139_4ctgask_1746077708_591670217_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\imgi_123_dq8riiy_1746077637_591669863_O.jpg",
  "C:\\Users\\Magicbook\\Downloads\\Jubilee City Gardens Sector 116 Mohali _ Price List & Brochure, Floor Plan, Location Map & Reviews\\Site location.jpg"
];

const destDir = path.join(process.cwd(), 'public', 'assets', 'images', 'properties', 'jubilee-city-gardens');

async function processImages() {
  // Ensure directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const imageUrls = [];

  for (let i = 0; i < sourceFiles.length; i++) {
    const src = sourceFiles[i];
    const indexStr = String(i + 1).padStart(2, '0');
    // Using hyphens instead of spaces for web-safe URLs as is best practice for SEO and routing
    const newFileName = `realty-holding-and-management-consultants-jubilee-city-gardens-mohali-sector-116-${indexStr}.jpg`;
    const dest = path.join(destDir, newFileName);

    try {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${path.basename(src)} -> ${newFileName}`);
        imageUrls.push(`/assets/images/properties/jubilee-city-gardens/${newFileName}`);
      } else {
        console.warn(`File not found, skipping: ${src}`);
      }
    } catch (err) {
      console.error(`Error copying ${src}:`, err);
    }
  }

  if (imageUrls.length > 0) {
    console.log(`\nUpdating Supabase for jubilee-city-gardens with ${imageUrls.length} images...`);
    const { error } = await supabase
      .from("apartments")
      .update({ images: imageUrls })
      .eq("slug", "jubilee-city-gardens");

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
