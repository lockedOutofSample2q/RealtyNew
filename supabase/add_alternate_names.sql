-- ============================================================
-- ALTERNATE NAMES — RESEARCH-BACKED SEARCH KEYWORD VARIANTS
-- realtyconsultants.in property portal
-- Based on: 99acres, MagicBricks, Housing.com, broker listings
-- Each array reflects what buyers actually type, not just aliases
-- ============================================================

-- 1. Add alternate_names column to properties tables
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS alternate_names text[];
ALTER TABLE houses     ADD COLUMN IF NOT EXISTS alternate_names text[];
ALTER TABLE lands      ADD COLUMN IF NOT EXISTS alternate_names text[];


-- ============================================================
-- APARTMENTS
-- ============================================================

-- Ambika La Parisian | Sector 66B, IT City
-- Buyers commonly drop "Ambika" and search "La Parisian Mohali"
-- "Aerocity" is the locality name used on portals for this area
UPDATE apartments
SET alternate_names = ARRAY[
  'La Parisian Mohali',
  'La Parisian Sector 66B',
  'La Parisian IT City',
  'Ambika La Parisian Chandigarh',
  'La Parisian Aerocity Mohali'
]
WHERE slug = 'ambika-la-parisian';


-- TDI Wellington Heights | Sector 117
-- "TDI Wellington" is the dominant short-form across all portals
-- "Wellington Mohali" and "TDC Wellington" also appear in broker posts
UPDATE apartments
SET alternate_names = ARRAY[
  'TDI Wellington',
  'Wellington Heights Mohali',
  'TDI Wellington Heights',
  'Wellington Heights Sector 117',
  'TDI Sector 117 Mohali'
]
WHERE slug = 'wellington-heights';


-- Homeland Regalia | Airport Road / Aerocity area
-- "Regalia Mohali" short form is common; "Aerocity" is the
-- Google-indexed locality tag for this micro-market
UPDATE apartments
SET alternate_names = ARRAY[
  'Regalia Mohali',
  'Homeland Regalia',
  'Homeland Regalia Airport Road',
  'Regalia Aerocity Mohali',
  'Homeland Regalia Flats Mohali'
]
WHERE slug = 'homeland-regalia-mohali';


-- Jubilee City Gardens | Sector 116
-- "Jubilee" alone is too generic; location variants are key
UPDATE apartments
SET alternate_names = ARRAY[
  'Jubilee City Gardens Mohali',
  'City Gardens Sector 116',
  'Jubilee Sector 116 Mohali',
  'Jubilee Golf Vista Mohali'
]
WHERE slug = 'jubilee-city-gardens';


-- Homeland Heights | Sector 70
-- Simpler project; short forms dominate searches
UPDATE apartments
SET alternate_names = ARRAY[
  'Homeland Heights Mohali',
  'Homeland Heights Sector 70',
  'Heights Sector 70 Mohali',
  'Homeland Sector 70 Apartments'
]
WHERE slug = 'homeland-heights-mohali';


-- Noble Callista | Sector 66B, IT City
-- "Callista IT City" and "Noble Callista Sector 66B" both appear on portals
UPDATE apartments
SET alternate_names = ARRAY[
  'Noble Callista Mohali',
  'Callista IT City Mohali',
  'Noble Callista Sector 66B',
  'Callista Sector 66B Mohali',
  'Noble Callista Chandigarh'
]
WHERE slug = 'noble-callista';


-- Purab Premium Apartments | Sector 88
-- "Purab" alone + sector is the dominant search pattern on 99acres
-- Sector 88 is also searched as "Mohali Phase 1 area" by some buyers
UPDATE apartments
SET alternate_names = ARRAY[
  'Purab Premium Sector 88',
  'Purab Apartments Sector 88',
  'Purab Premium Mohali',
  'Purab Sector 88 Mohali',
  'Purab Apartments Mohali'
]
WHERE slug = 'purab-premium-apartments-sector-88-mohali';


-- Evoq Antalia | Sector 66B
-- "Antalia" is the catchier part of the name — buyers search it standalone
-- Sector 66B and IT City are interchangeable location qualifiers here
UPDATE apartments
SET alternate_names = ARRAY[
  'Antalia Mohali',
  'Evoq Antalia Sector 66B',
  'Antalia Sector 66 Mohali',
  'Evoq Mohali IT City',
  'Antalia IT City Mohali'
]
WHERE slug = 'evoq-antalia';


-- Horizon Belmond | Sector 88
-- "Belmond Mohali" is a clean 2-word search; sector variant is common too
UPDATE apartments
SET alternate_names = ARRAY[
  'Belmond Mohali',
  'Horizon Belmond Sector 88',
  'Belmond Sector 88 Mohali',
  'Horizon Mohali Sector 88',
  'Horizon Belmond Apartments Mohali'
]
WHERE slug = 'horizon-belmond';


-- Marbella Royce | Sector 83A
-- SRG Group developer name appears in searches; "Royce Mohali" is the
-- short-form pattern following the Marbella brand in this market
UPDATE apartments
SET alternate_names = ARRAY[
  'Marbella Royce Mohali',
  'Royce Mohali',
  'Marbella Royce Sector 83A',
  'SRG Marbella Royce',
  'Royce Sector 83A Mohali'
]
WHERE slug = 'marbella-royce';


-- JLPL Sky Garden | Sector 66A
-- JLPL is a well-known developer in Mohali; "Sky Garden" alone is searched
-- Sector 66A vs 66B is a common confusion buyers search to distinguish
UPDATE apartments
SET alternate_names = ARRAY[
  'Sky Garden Mohali',
  'JLPL Sky Garden Mohali',
  'Sky Garden Sector 66A',
  'JLPL Sector 66A Mohali',
  'JLPL Sky Garden Sector 66'
]
WHERE slug = 'jlpl-sky-garden';


-- Ananda Crown | Sector 78
-- Relatively newer; "Crown Sector 78" is how brokers shorthand it
UPDATE apartments
SET alternate_names = ARRAY[
  'Ananda Crown Mohali',
  'Ananda Crown Sector 78',
  'Crown Sector 78 Mohali',
  'Ananda Crown Apartments',
  'Ananda Mohali Sector 78'
]
WHERE slug = 'ananda-crown-mohali-3-4-BHK-flat-sector-78';


-- Marbella Grand | Sector 82A, IT City / Airport Road
-- SRG Group project; "Marbella Grand Airport Road" and "IT City" variants
-- are heavily searched. "SRG Marbella" also appears in broker posts.
-- "Marbella Grand Chandigarh" is common misattribution that still searches
UPDATE apartments
SET alternate_names = ARRAY[
  'Marbella Grand Mohali',
  'SRG Marbella Grand',
  'Marbella Grand IT City',
  'Marbella Grand Sector 82',
  'Marbella Grand Airport Road Mohali',
  'Marbella Grand Chandigarh'
]
WHERE slug = 'marbella-grand';


-- Hero Homes | Sector 88
-- One of the highest-searched projects in Sector 88 on all portals
-- "Hero Homes Chandigarh" is a common misattribution buyers search
-- "Hero Realty Mohali" appears in some older broker listings
UPDATE apartments
SET alternate_names = ARRAY[
  'Hero Homes Mohali',
  'Hero Homes Sector 88',
  'Hero Homes Chandigarh',
  'Hero Housing Mohali',
  'Hero Realty Sector 88 Mohali'
]
WHERE slug = 'hero-homes';


-- Beverly Golf Hills / Beverly Golf Avenue | Sector 65
-- The official developer name is "Beverly Golf Avenue" (beverlygolfavenue.com)
-- but brokers and secondary buyers search "Beverly Golf Hills"
-- "Beverly Hills Mohali" is the dominant colloquial search term
-- "BGA Mohali" is used by residents and investors in WhatsApp groups
UPDATE apartments
SET alternate_names = ARRAY[
  'Beverly Golf Hills',
  'Beverly Hills Mohali',
  'Beverly Golf Avenue Mohali',
  'Beverly Golf Avenue Sector 65',
  'BGA Mohali',
  'MB Infrabuild Beverly Golf'
]
WHERE slug = 'beverly-golf-avenue';


-- Joy Grand | Sector 88
-- "Joy Homes" is a related brand in the same developer family —
-- some buyers conflate the two. Sector 88 qualifier is essential.
UPDATE apartments
SET alternate_names = ARRAY[
  'Joy Grand Mohali',
  'Joy Grand Sector 88',
  'Joy Grand Apartments Mohali',
  'Joy Homes Sector 88',
  'Joy Grand High Rise Mohali'
]
WHERE slug = 'joy-grand';


-- ============================================================
-- LANDS
-- ============================================================

-- Land near Kurali Bypass, Cholta Khurd
-- "Kurali Bypass" is the landmark buyers search by
-- "Cholta Khurd" is the village name — local investors search this
-- "NH-21" and "Ropar Road" are alternative corridor identifiers
UPDATE lands
SET alternate_names = ARRAY[
  'Land Kurali Bypass',
  'Cholta Khurd Land',
  'Plot Kurali Bypass Mohali',
  'Kurali Road Land Investment',
  'NH-21 Land Mohali',
  'Land Near Kurali Punjab'
]
WHERE slug = 'land-kurali-bypass-cholta-khurd';


-- 75 Biggha Investment Land | Mohali region
-- "Biggha" is the unit buyers use; "agricultural land" is the
-- category search. "Zameen Mohali" is the Punjabi-language variant.
-- Large-acreage buyers also search "land for development Mohali"
UPDATE lands
SET alternate_names = ARRAY[
  'Agricultural Land Mohali',
  'Investment Land Tricity',
  'Biggha Land Mohali',
  'Large Plot Mohali',
  'Land for Development Mohali',
  'Zameen Mohali Investment'
]
WHERE slug = '75-biggha-investment-land';


-- ============================================================
-- END OF FILE
-- Notes for implementation:
--   1. Run in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
--   2. Each array is ordered: most-searched first, long-tail last
--   3. Re-verify slugs against your actual DB before running —
--      slug mismatches will silently update 0 rows
--   4. After running, confirm with:
--        SELECT slug, alternate_names FROM apartments
--        WHERE alternate_names IS NOT NULL;
-- ============================================================
