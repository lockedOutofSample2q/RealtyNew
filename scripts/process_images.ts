import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const PROJECTS_SOURCE = "C:\\Users\\Magicbook\\mohali_projects";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DEST = path.join(PUBLIC_DIR, "images", "properties");
const DOCS_DEST = path.join(PUBLIC_DIR, "documents");

const folderToSlug: Record<string, string> = {
  "ambika_la_parisian": "ambika-la-parisian",
  "ananda_crown": "ananda-crown",
  "beverly_golf_hills": "beverly-golf-hills",
  "evoq_antalia": "evoq-antalia",
  "hero_homes": "hero-homes",
  "horizon_belmond": "horizon-belmond",
  "jlpl_sky_garden": "jlpl-sky-garden",
  "joy_grand": "joy-grand",
  "jubilee_city_gardens": "jubilee-city-gardens",
  "marbella_grand": "marbella-grand",
  "marbella_royce": "marbella-royce",
  "noble_callista": "noble-callista",
  "wellington_heights": "wellington-heights"
};

async function createPDF(imagePaths: string[], destPath: string) {
  const pdfDoc = await PDFDocument.create();
  for (const imgPath of imagePaths) {
    try {
      let imgBytes = fs.readFileSync(imgPath);
      let img: any;
      
      const lowerPath = imgPath.toLowerCase();
      if (lowerPath.endsWith(".webp")) {
        // Convert webp to jpg for embedding
        const jpgBuffer = await sharp(imgBytes).jpeg().toBuffer();
        img = await pdfDoc.embedJpg(jpgBuffer);
      } else if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
        img = await pdfDoc.embedJpg(imgBytes);
      } else if (lowerPath.endsWith(".png")) {
        img = await pdfDoc.embedPng(imgBytes);
      } else {
        continue;
      }

      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      });
    } catch (e) {
      console.error(`Error embedding image ${imgPath}:`, e);
    }
  }
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(destPath, pdfBytes);
}

async function processProjects() {
  const folders = fs.readdirSync(PROJECTS_SOURCE);
  
  for (const folder of folders) {
    const slug = folderToSlug[folder];
    if (!slug) {
      console.warn(`No slug mapping for folder: ${folder}`);
      continue;
    }

    console.log(`Processing ${folder} -> ${slug}...`);
    const projectPath = path.join(PROJECTS_SOURCE, folder);
    const destPath = path.join(IMAGES_DEST, slug);

    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    // Collect all images in the main folder and subfolders
    const images: string[] = [];
    const floorplanImages: string[] = [];

    function walkDir(currentPath: string, isPlanDir: boolean = false) {
      const items = fs.readdirSync(currentPath);
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          walkDir(itemPath, isPlanDir || item.toLowerCase().includes("plan"));
        } else if (item.match(/\.(jpg|jpeg|png|webp)$/i)) {
          if (isPlanDir || item.toLowerCase().includes("plan")) {
            floorplanImages.push(itemPath);
          } else {
            // Copy to public only if it's a direct image (not in a plan subfolder)
            // Actually, we should probably copy ALL images to public if they are not specifically "plans"
            // Or maybe even plans should be in the gallery? 
            // The user said "add images to all projects based on the folder name" and "create pdf of floor plan...".
            // Let's copy all images to public/[slug]/ but only use non-plans for the gallery?
            // Usually, plans are also in the gallery.
            
            const relativePath = path.relative(projectPath, itemPath);
            const destFile = path.join(destPath, relativePath.replace(/\\/g, '_')); // Flat structure in public
            fs.copyFileSync(itemPath, destFile);
            images.push(`/images/properties/${slug}/${path.basename(destFile)}`);
          }
        }
      }
    }

    walkDir(projectPath);

    const documents = [];

    if (floorplanImages.length > 0) {
      const pdfName = `${slug}-floor-plan.pdf`;
      const pdfPath = path.join(DOCS_DEST, pdfName);
      console.log(`Creating PDF for ${slug} with ${floorplanImages.length} images...`);
      await createPDF(floorplanImages, pdfPath);
      documents.push({ name: "Floor Plan / Site Plan", url: `/documents/${pdfName}` });
    }

    // Update Supabase
    console.log(`Updating Supabase for ${slug}...`);
    const { error } = await supabase
      .from("apartments")
      .update({
        images: images,
        documents: documents as any,
        image_count: images.length
      })
      .eq("slug", slug);

    if (error) {
      console.error(`Error updating ${slug}:`, error);
    } else {
      console.log(`Successfully updated ${slug}`);
    }
  }
}

processProjects();

