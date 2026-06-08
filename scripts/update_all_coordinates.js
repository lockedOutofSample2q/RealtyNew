const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mapping: slug -> { lat, lng } from verified pinpoint coordinates
const coordinates = [
  { slug: "jubilee-twinto-sector-112-mohali", lat: 30.6846423, lng: 76.6669754 },
  { slug: "ats-casa-espana-sector-121-mohali", lat: 30.7345498, lng: 76.7002047 },
  { slug: "wellington-heights", lat: 30.735075, lng: 76.671391 },
  { slug: "jubilee-vallum-sector-91-mohali", lat: 30.6994901, lng: 76.6831114 },
  { slug: "homeland-regalia-mohali", lat: 30.6865, lng: 76.718 },
  { slug: "jubilee-city-gardens", lat: 30.727500, lng: 76.666944 },
  { slug: "noble-magnollia-sector-88-mohali", lat: 30.6598299, lng: 76.718698 },
  { slug: "homeland-heights-mohali", lat: 30.703814, lng: 76.700112 },
  { slug: "noble-callista", lat: 30.654167, lng: 76.750278 },
  { slug: "klv-signature-towers-sector-66a-mohali", lat: 30.661, lng: 76.741 },
  { slug: "ambika-la-parisian", lat: 30.655833, lng: 76.746111 },
  { slug: "purab-premium-apartments-sector-88-mohali", lat: 30.685, lng: 76.690 },
  { slug: "horizon-belmond", lat: 30.686667, lng: 76.689722 },
  { slug: "beverly-golf-avenue", lat: 30.6883, lng: 76.7384 },
  { slug: "hero-homes", lat: 30.683333, lng: 76.686111 },
  { slug: "evoq-antalia", lat: 30.682664, lng: 76.732498 },
  { slug: "united-cooperative-housing-board-sector-68-mohali", lat: 30.6872925, lng: 76.7214589 },
  { slug: "meco-sector-68-mohali", lat: 30.686783, lng: 76.7218618 },
  { slug: "jal-vayu-vihar-sector-67-mohali", lat: 30.6767995, lng: 76.7261474 },
  { slug: "marbella-twin-towers-new-chandigarh-mullanpur", lat: 30.7866602, lng: 76.7546189 },
  { slug: "ivory-towers-sector-70-mohali", lat: 30.6954343, lng: 76.7089267 },
  { slug: "the-medallion-sector-82-mohali", lat: 30.6478422, lng: 76.738973 },
  { slug: "gillco-parkhills-sector-126-mohali", lat: 30.705, lng: 76.671 },
  { slug: "guru-teg-bahadur-society-sector-70-mohali", lat: 30.6969791, lng: 76.7174429 },
  { slug: "mundi-cooperative-complex-sector-70-mohali", lat: 30.6969436, lng: 76.7153696 },
  { slug: "marbella-royce", lat: 30.6333783, lng: 76.7264209 },
  { slug: "scl-society-sector-70-mohali", lat: 30.6937129, lng: 76.7102269 },
  { slug: "guru-har-rai-sahib-society-sector-67-mohali", lat: 30.679, lng: 76.724 },
  { slug: "jlpl-sky-garden", lat: 30.665833, lng: 76.736944 },
  { slug: "ananda-crown-mohali-3-4-BHK-flat-sector-78", lat: 30.684444, lng: 76.702222 },
  { slug: "jlpl-falcon-view-sector-66a-mohali", lat: 30.6600507, lng: 76.7420079 },
  { slug: "bestech-park-view-residences-sector-66-mohali", lat: 30.679, lng: 76.729 },
  { slug: "marbella-grand", lat: 30.652778, lng: 76.725833 },
  { slug: "joy-grand", lat: 30.680833, lng: 76.690833 },
  { slug: "the-medallion-nova-sector-66-mohali", lat: 30.6768376, lng: 76.7359126 },
  { slug: "affinity-belgravia-aerocity-mohali", lat: 30.627612, lng: 76.811345 },
  { slug: "jlpl-galaxy-heights-sector-66a-mohali", lat: 30.6591149, lng: 76.7418158 }
];

async function updateAllCoordinates() {
  console.log(`\n📍 Updating coordinates for ${coordinates.length} properties...\n`);
  let success = 0;
  let failed = 0;

  for (const item of coordinates) {
    const { data, error } = await supabase
      .from('apartments')
      .update({ latitude: item.lat, longitude: item.lng })
      .eq('slug', item.slug)
      .select('slug, title');

    if (error) {
      console.error(`❌ FAILED  ${item.slug}: ${error.message}`);
      failed++;
    } else if (!data || data.length === 0) {
      console.warn(`⚠️  NO ROW  ${item.slug} — slug not found in DB!`);
      failed++;
    } else {
      console.log(`✅ OK      ${item.slug} → (${item.lat}, ${item.lng})`);
      success++;
    }
  }

  console.log(`\n────────────────────────────────`);
  console.log(`✅ Success: ${success} / ${coordinates.length}`);
  if (failed > 0) console.log(`❌ Failed:  ${failed} / ${coordinates.length}`);
  console.log(`────────────────────────────────\n`);
}

updateAllCoordinates();
