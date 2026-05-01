import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const coordinates = [
  { slug: "wellington-heights", lat: 30.735075, lng: 76.671391 },
  { slug: "evoq-antalia", lat: 30.682664, lng: 76.732498 },
  { slug: "jubilee-city-gardens", lat: 30.727500, lng: 76.666944 },
  { slug: "horizon-belmond", lat: 30.686667, lng: 76.689722 },
  { slug: "hero-homes", lat: 30.683333, lng: 76.686111 },
  { slug: "beverly-golf-hills", lat: 30.681111, lng: 76.726389 },
  { slug: "ambika-la-parisian", lat: 30.655833, lng: 76.746111 },
  { slug: "noble-callista", lat: 30.654167, lng: 76.750278 },
  { slug: "marbella-royce", lat: 30.648611, lng: 76.721389 },
  { slug: "marbella-grand", lat: 30.652778, lng: 76.725833 },
  { slug: "jlpl-sky-garden", lat: 30.665833, lng: 76.736944 },
  { slug: "ananda-crown", lat: 30.684444, lng: 76.702222 },
  { slug: "joy-grand", lat: 30.680833, lng: 76.690833 }
];

async function updateCoordinates() {
  for (const item of coordinates) {
    console.log(`Updating ${item.slug}...`);
    const { error } = await supabase
      .from("apartments")
      .update({
        latitude: item.lat,
        longitude: item.lng
      })
      .eq("slug", item.slug);

    if (error) {
      console.error(`Error updating ${item.slug}:`, error);
    } else {
      console.log(`Successfully updated ${item.slug}`);
    }
  }
}

updateCoordinates();
