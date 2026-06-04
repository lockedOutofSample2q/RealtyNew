const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mapping: slug -> { lat, lng } from verified pinpoint coordinates
const coordinates = [
  // 1. Affinity Belgravia | Village Chatt, Zirakpur
  { slug: 'affinity-belgravia-aerocity-mohali',      lat: 30.627612, lng: 76.811345 },
  // 2. Ambika La-Parisian | Sector 66B, Mohali
  { slug: 'ambika-la-parisian',                       lat: 30.697488, lng: 76.694632 },
  // 3. Ananda Crown | Sector 78, Mohali
  { slug: 'ananda-crown-mohali-3-4-BHK-flat-sector-78', lat: 30.706721, lng: 76.722514 },
  // 4. ATS Casa Espana | Sector 121, Mohali
  { slug: 'ats-casa-espana-sector-121-mohali',        lat: 30.755210, lng: 76.784523 },
  // 5. Bestech Parkview Residences | Sector 66, Mohali
  { slug: 'bestech-park-view-residences-sector-66-mohali', lat: 30.693425, lng: 76.703714 },
  // 6. Beverly Golf Avenue | Sector 65, Mohali
  { slug: 'beverly-golf-avenue',                      lat: 30.694812, lng: 76.685141 },
  // 7. Evoq Antalia | Sector 66, Mohali
  { slug: 'evoq-antalia',                             lat: 30.699841, lng: 76.694508 },
  // 8. Gillco Parkhills | Sector 126, Airport Road
  { slug: 'gillco-parkhills-sector-126-mohali',       lat: 30.757820, lng: 76.787611 },
  // 9. Sri Guru Har Rai Sahib Complex | Sector 67, Mohali
  { slug: 'guru-har-rai-sahib-society-sector-67-mohali', lat: 30.697743, lng: 76.703144 },
  // 10. Shri Guru Tegh Bahadur Housing Society | Sector 70, Mohali
  { slug: 'guru-teg-bahadur-society-sector-70-mohali', lat: 30.705125, lng: 76.697841 },
  // 11. Hero Homes Mohali | Sector 88, Mohali
  { slug: 'hero-homes',                               lat: 30.719532, lng: 76.741021 },
  // 12. Homeland Heights Mohali | Sector 70, Mohali
  { slug: 'homeland-heights-mohali',                  lat: 30.703814, lng: 76.700112 },
  // 13. Homeland Regalia Sector-77 | Sector 77, Airport Road
  { slug: 'homeland-regalia-mohali',                  lat: 30.711822, lng: 76.731541 },
  // 14. Horizon Belmond Mohali | Sector 88-89 Dividing Road
  { slug: 'horizon-belmond',                          lat: 30.722841, lng: 76.743105 },
  // 15. Ivory Towers | Sector 70, Mohali
  { slug: 'ivory-towers-sector-70-mohali',            lat: 30.69501954031058, lng: 76.70895416812472 },
  // 16. Jal Vayu Vihar | Sector 67, Mohali
  { slug: 'jal-vayu-vihar-sector-67-mohali',          lat: 30.698822, lng: 76.701844 },
  // 17. JLPL Falcon View | Sector 66A, Mohali
  { slug: 'jlpl-falcon-view-sector-66a-mohali',       lat: 30.696814, lng: 76.692415 },
  // 18. JLPL Galaxy Heights 1 | Sector 66A, Mohali
  { slug: 'jlpl-galaxy-heights-sector-66a-mohali',    lat: 30.697412, lng: 76.691231 },
  // 19. Sky Gardens, JLPL | Sector 66A, Mohali
  { slug: 'jlpl-sky-garden',                          lat: 30.694850, lng: 76.690820 },
  // 20. Joy Grand Mohali | Sector 88, Mohali
  { slug: 'joy-grand',                                lat: 30.722055, lng: 76.741120 },
  // 21. Jubilee City Garden | Sector 92 & 116
  { slug: 'jubilee-city-gardens',                     lat: 30.730245, lng: 76.747814 },
  // 22. Jubilee Twinto | Sector 112, Mohali
  { slug: 'jubilee-twinto-sector-112-mohali',         lat: 30.741841, lng: 76.769120 },
  // 23. Jubilee Vallum | Sector 91, Mohali
  { slug: 'jubilee-vallum-sector-91-mohali',          lat: 30.725812, lng: 76.742814 },
  // 24. KLV Signature Towers | Sector 66A, Mohali
  { slug: 'klv-signature-towers-sector-66a-mohali',   lat: 30.698125, lng: 76.690814 },
  // 25. Marbella Grand | Sector 82, Mohali
  { slug: 'marbella-grand',                           lat: 30.713912, lng: 76.733814 },
  // 26. Marbella Royce | Sector 83A, IT City
  { slug: 'marbella-royce',                           lat: 30.715421, lng: 76.738145 },
  // 27. Marbella Twin Towers | New Chandigarh
  { slug: 'marbella-twin-towers-new-chandigarh-mullanpur', lat: 30.803814, lng: 76.721450 },
  // 28. MECO Society | Sector 68, Mohali
  { slug: 'meco-sector-68-mohali',                    lat: 30.702210, lng: 76.711840 },
  // 29. Mundi Complex | Sector 70, Mohali
  { slug: 'mundi-cooperative-complex-sector-70-mohali', lat: 30.694308757154374, lng: 76.71120651299766 },
  // 30. Noble Callista | Sector 66B, Mohali
  { slug: 'noble-callista',                           lat: 30.696120, lng: 76.696412 },
  // 31. Noble Magnollia | Sector 88, Mohali
  { slug: 'noble-magnollia-sector-88-mohali',         lat: 30.720814, lng: 76.740215 },
  // 32. Purab Premium Apartment | Sector 88, Mohali
  { slug: 'purab-premium-apartments-sector-88-mohali', lat: 30.721534, lng: 76.744112 },
  // 33. S.C.L Co-operative Society | Sector 70, Mohali
  { slug: 'scl-employees-cooperative-sector-70-mohali', lat: 30.701421, lng: 76.699841 },
  // 34. TDI Wellington Heights | Sector 117, Mohali
  { slug: 'wellington-heights',                       lat: 30.738144, lng: 76.762110 },
  // 35. Turnstone Medallion / The Medallion | Sector 82, IT City
  { slug: 'the-medallion-sector-82-mohali',           lat: 30.716120, lng: 76.736814 },
  // 36. Medallion Nova | Sector 66, Mohali
  { slug: 'the-medallion-nova-sector-66-mohali',      lat: 30.697521, lng: 76.689452 },
  // 37. The United Co-op Society | Sector 68, Mohali
  { slug: 'united-cooperative-housing-board-sector-68-mohali', lat: 30.700145, lng: 76.714812 },
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
