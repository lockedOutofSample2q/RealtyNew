const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CSV1_PATH = path.resolve(__dirname, '../../../Downloads/Mohali_Apartments_Details.csv');
const CSV2_PATH = path.resolve(__dirname, '../../../Downloads/mohali_properties.csv');

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i+1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const header = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    header.forEach((h, i) => obj[h.trim()] = values[i] || '');
    return obj;
  });
}

function parseRange(str) {
  if (!str) return { min: null, max: null };
  const matches = str.match(/(\d+\.?\d*)/g);
  if (!matches) return { min: null, max: null };
  const nums = matches.map(Number);
  const min = Math.min(...nums);
  const max = nums.length > 1 ? Math.max(...nums) : null;
  return { min, max };
}

function parsePrice(priceStr) {
  if (!priceStr) return { min: 0, max: null };
  const matches = priceStr.match(/(\d+\.?\d*)/g);
  if (!matches) return { min: 0, max: null };
  const parseSingle = (m) => {
    let val = parseFloat(m);
    if (priceStr.toLowerCase().includes('cr')) val *= 10000000;
    else if (priceStr.toLowerCase().includes('l')) val *= 100000;
    return val;
  };
  const prices = matches.map(parseSingle);
  return { min: Math.min(...prices), max: prices.length > 1 ? Math.max(...prices) : null };
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseUnitTypes(row) {
  const rawTypes = row['Unit Types & Sizes'] || row['Configuration (BHK)'] || '';
  if (!rawTypes) return [];

  // Look for patterns like "3BHK (~2020-2850 sqft)" or "3 / 4 / 5 BHK"
  const types = [];
  const items = rawTypes.split(/[,\/]/);
  
  items.forEach(item => {
    const bhkMatch = item.match(/(\d\+?\d?BHK|Penthouse|Townhouse|Studio)/i);
    if (bhkMatch) {
      const bhk = bhkMatch[0].toUpperCase();
      const sizeRange = parseRange(item);
      types.push({
        bhk: bhk,
        type_count: 1,
        size_min: sizeRange.min || 0,
        size_max: sizeRange.max || null
      });
    }
  });
  
  return types;
}

async function run() {
  const data1 = fs.existsSync(CSV1_PATH) ? parseCSV(fs.readFileSync(CSV1_PATH, 'utf-8')) : [];
  const data2 = fs.existsSync(CSV2_PATH) ? parseCSV(fs.readFileSync(CSV2_PATH, 'utf-8')) : [];

  const properties = {};

  // Process first CSV
  data1.forEach(row => {
    const name = row['Property Name'];
    if (!name) return;
    const slug = generateSlug(name);
    const price = parsePrice(row['Starting Price']);
    const size = parseRange(row['Size Range']);
    const beds = parseRange(row['Bedroom Range']);
    const baths = parseRange(row['Bathroom Range']);
    const psft = parseRange(row['Price per sqft']);

    properties[slug] = {
      price: price.min,
      price_max: price.max,
      area_sqft: size.min,
      area_sqft_max: size.max,
      bedrooms: beds.min,
      bedrooms_max: beds.max,
      bathrooms: baths.min || 2,
      bathrooms_max: baths.max,
      price_sqft_min: psft.min,
      price_sqft_max: psft.max,
      rera_number: row['RERA'],
      completion_date: row['Completion Date'],
      handover_date: row['Handover Date'],
      payment_plan_notes: row['Payment Plan'],
      unit_types: parseUnitTypes(row)
    };
  });

  // Process second CSV
  data2.forEach(row => {
    const name = row['Property Name'];
    if (!name) return;
    const slug = generateSlug(name);
    const price = parsePrice(row['Starting Price (INR)']);
    const size = parseRange(row['Size Range (sqft)']);
    const beds = parseRange(row['Configuration (BHK)']);
    const psft = parseRange(row['Price per sqft (INR)']);

    if (!properties[slug]) properties[slug] = {};

    properties[slug] = {
      ...properties[slug],
      price: price.min || properties[slug].price,
      price_max: price.max || properties[slug].price_max,
      area_sqft: size.min || properties[slug].area_sqft,
      area_sqft_max: size.max || properties[slug].area_sqft_max,
      bedrooms: beds.min || properties[slug].bedrooms,
      bedrooms_max: beds.max || properties[slug].bedrooms_max,
      price_sqft_min: psft.min || properties[slug].price_sqft_min,
      price_sqft_max: psft.max || properties[slug].price_sqft_max,
      rera_number: row['RERA Number'] || properties[slug].rera_number,
      project_area_acres: parseFloat(row['Project Area (Acres)']) || properties[slug].project_area_acres,
      total_units: parseInt(row['Total Units']) || properties[slug].total_units,
      tower_count: parseInt(row['No. of Towers']) || properties[slug].tower_count,
      floor_count: parseInt(row['No. of Floors']) || properties[slug].floor_count,
      payment_plan_notes: row['Payment Plan Notes'] || properties[slug].payment_plan_notes,
      unit_types: properties[slug].unit_types?.length ? properties[slug].unit_types : parseUnitTypes(row)
    };
  });

  // Manual fix for types if empty or simple
  if (properties['homeland-regalia']) {
    properties['homeland-regalia'].unit_types = [
      { bhk: "3BHK", type_count: 4, size_min: 2020, size_max: 2850 },
      { bhk: "4BHK", type_count: 6, size_min: 3128, size_max: 5400 },
      { bhk: "5BHK", type_count: 2, size_min: 6500, size_max: 6500 },
      { bhk: "Penthouse", type_count: 2, size_min: 6500, size_max: 6500 }
    ];
  }

  for (const [slug, update] of Object.entries(properties)) {
    let targetSlugs = [slug];
    if (slug === 'homeland-regalia') targetSlugs.push('homeland-regalia-mohali');
    if (slug === 'beverly-golf-hills-beverly-golf-avenue') targetSlugs.push('beverly-golf-hills');
    if (slug === 'wellington-heights-tdi') targetSlugs.push('wellington-heights');

    for (const s of targetSlugs) {
      console.log(`Syncing columns for: ${s}`);
      const { error } = await supabase.from('apartments').update(update).eq('slug', s);
      if (error) console.error(`Error ${s}:`, error.message);
    }
  }
}

run();
