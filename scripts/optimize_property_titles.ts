import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

if (fs.existsSync(".env.local")) {
  const envFile = fs.readFileSync(".env.local", "utf8");
  envFile.split("\n").forEach((line) => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim().replace(/^"|"$/g, "");
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function optimizeTitles() {
  console.log("Optimizing under-length and unoptimized titles...");

  // 1. Update Short/Informal Apartment Titles
  const apartmentUpdates = [
    {
      slug: "beverly-golf-avenue",
      title: "Beverly Golf Avenue | 3 & 4 BHK in Sector 91, Mohali",
      og_title: "Beverly Golf Avenue | 3 & 4 BHK in Sector 91, Mohali"
    },
    {
      slug: "purab-premium-apartments-sector-88-mohali",
      title: "Purab Premium Apartments | 3 BHK in Sector 88, Mohali",
      og_title: "Purab Premium Apartments | 3 BHK in Sector 88, Mohali"
    }
  ];

  for (const apt of apartmentUpdates) {
    console.log(`Updating apartment: ${apt.slug}...`);
    const { error } = await supabase
      .from("apartments")
      .update({ title: apt.title, og_title: apt.og_title })
      .eq("slug", apt.slug);
    if (error) {
      console.error(`Error updating apartment ${apt.slug}:`, error);
    } else {
      console.log(`Successfully updated ${apt.slug} to "${apt.title}"`);
    }
  }

  // 2. Update Short/Informal Land Titles
  const landUpdates = [
    {
      slug: "land-j2pihwj-3334",
      title: "1 Kanal Land on Link Road in Govindgarh, Mohali",
      og_title: "1 Kanal Land on Link Road in Govindgarh, Mohali | RHMC"
    },
    {
      slug: "land-5tzufrm-4688",
      title: "2.5 Kanal Agricultural Land in Ucha Khehra, Mohali",
      og_title: "2.5 Kanal Agricultural Land in Ucha Khehra, Mohali | RHMC"
    },
    {
      slug: "land-9q20jd7-3872",
      title: "2.5 Acre Land for Sale in Gurditpura, Mohali",
      og_title: "2.5 Acre Land for Sale in Gurditpura, Mohali | RHMC"
    },
    {
      slug: "75-biggah-150ft-front-land",
      title: "75 Bigha Plot with 150ft Front in Zirakpur",
      og_title: "75 Bigha Plot with 150ft Front in Zirakpur | RHMC"
    },
    {
      slug: "5-75cr-killa-redzone-land",
      title: "Industrial Red Zone Land for Sale in Pilkhani, Rajpura",
      og_title: "Industrial Red Zone Land for Sale in Pilkhani, Rajpura | RHMC"
    },
    {
      slug: "land-us3t0jv-4516",
      title: "3 Kanal Agricultural Land in Mindha Majra, Mohali",
      og_title: "3 Kanal Agricultural Land in Mindha Majra, Mohali | RHMC"
    },
    {
      slug: "land-lvnghpn-4266",
      title: "7 Kanal Land with 80ft Frontage in Saneta, Mohali",
      og_title: "7 Kanal Land with 80ft Frontage in Saneta, Mohali | RHMC"
    },
    {
      slug: "42-5-biggah-khaspur-village-land",
      title: "42.5 Bigha Agricultural Land in Khaspur Village, Banur",
      og_title: "42.5 Bigha Agricultural Land in Khaspur Village, Banur | RHMC"
    }
  ];

  for (const land of landUpdates) {
    console.log(`Updating land: ${land.slug}...`);
    const { error } = await supabase
      .from("lands")
      .update({ title: land.title, og_title: land.og_title })
      .eq("slug", land.slug);
    if (error) {
      console.error(`Error updating land ${land.slug}:`, error);
    } else {
      console.log(`Successfully updated ${land.slug} to "${land.title}"`);
    }
  }

  console.log("Title optimization complete!");
}

optimizeTitles();
