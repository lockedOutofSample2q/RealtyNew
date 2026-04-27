const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables manually if needed
// Or assume they are in process.env when running
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CSV_PATH = path.resolve(__dirname, '../../../Downloads/Mohali_Apartments_Details.csv');

function parseCSV(content) {
  const lines = content.split(/\r?\n/);
  const result = [];
  const header = parseCSVLine(lines[0]);

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const obj = {};
    header.forEach((h, index) => {
      obj[h.trim()] = values[index] ? values[index].trim() : '';
    });
    result.push(obj);
  }
  return result;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.replace(/^"|"$/g, '').trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.replace(/^"|"$/g, '').trim());
  return values;
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // Match numbers like 2.08, 48, etc.
  const match = priceStr.match(/(\d+\.?\d*)/);
  if (!match) return 0;
  let val = parseFloat(match[1]);
  if (priceStr.toLowerCase().includes('cr')) {
    val = val * 10000000;
  } else if (priceStr.toLowerCase().includes('l')) {
    val = val * 100000;
  }
  return val;
}

function parseArea(areaStr) {
  if (!areaStr) return 0;
  const match = areaStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function parseBedrooms(bedStr) {
  if (!bedStr) return { min: null, max: null };
  const matches = bedStr.match(/(\d+)/g);
  if (!matches) return { min: null, max: null };
  const nums = matches.map(Number);
  return {
    min: Math.min(...nums),
    max: Math.max(...nums)
  };
}

function parsePaymentPlan(planStr) {
  if (!planStr) return null;
  const percentages = planStr.match(/(\d+)%/g);
  if (percentages && percentages.length >= 2) {
    const p = percentages.map(s => parseInt(s));
    return {
      down_payment: p[0] || 20,
      during_construction: p[1] || 40,
      on_handover: p[2] || (100 - (p[0] || 20) - (p[1] || 40))
    };
  }
  return {
    down_payment: 25,
    during_construction: 50,
    on_handover: 25
  };
}

function parseLandmarks(landmarksStr) {
  if (!landmarksStr) return [];
  return landmarksStr.split(/[.,]/).map(s => s.trim()).filter(s => s.length > 5).map(s => {
    const timeMatch = s.match(/(\d+)\s*min/);
    const time = timeMatch ? parseInt(timeMatch[1]) : 10;
    let name = s.split('(')[0].trim();
    return {
      name: name,
      time: time,
      transport: "car"
    };
  });
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function importData() {
  try {
    if (!fs.existsSync(CSV_PATH)) {
      console.error(`CSV file not found at ${CSV_PATH}`);
      return;
    }

    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const data = parseCSV(content);

    console.log(`Parsed ${data.length} properties from CSV.`);

    for (const row of data) {
      const title = row['Property Name'];
      if (!title) continue;

      const slug = generateSlug(title);
      const { min: bedrooms, max: bedrooms_max } = parseBedrooms(row['Bedroom Range']);
      
      const property = {
        title: title,
        slug: slug,
        type: 'apartment',
        status: row['Property Status']?.toLowerCase().includes('under construction') || row['Property Status']?.toLowerCase().includes('upcoming') ? 'off-plan' : 'available',
        listing_type: 'sale',
        price: parsePrice(row['Starting Price']),
        price_currency: 'INR',
        bedrooms: bedrooms,
        // bedrooms_max: bedrooms_max, // Missing in current schema
        bathrooms: parseInt(row['Bathroom Range']) || 1,
        area_sqft: parseArea(row['Size Range']),
        location: 'Mohali',
        // address: row['Location'], // Missing in current schema
        community: row['Location']?.split(',')[0].trim() || 'Mohali',
        developer: row['Developer'],
        description: `${row['Property Description']}\n\nLocation: ${row['Location']}\nCompletion: ${row['Completion Date']}\nHandover: ${row['Handover Date']}\nPayment Plan: ${row['Payment Plan']}`,
        highlights: row['Off-Plan Highlights']?.split('.').map(s => s.trim()).filter(s => s.length > 0) || [],
        features: row['Off-Plan Details']?.split('.').map(s => s.trim()).filter(s => s.length > 0) || [], // Using existing 'features' instead of 'interior_features'
        amenities: row['Community Amenities']?.split(',').map(s => s.trim()).filter(s => s.length > 0) || [],
        // completion_date: row['Completion Date'], // Missing in current schema
        // handover_date: row['Handover Date'], // Missing in current schema
        // payment_plan: parsePaymentPlan(row['Payment Plan']), // Missing in current schema
        // nearby_landmarks: parseLandmarks(row['Nearby Landmarks']), // Missing in current schema
        images: ['/assets/images/home/hero-bg.jpg'], // Placeholder
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log(`Upserting: ${title} (${slug})`);

      const { error } = await supabase
        .from('apartments')
        .upsert(property, { onConflict: 'slug' });

      if (error) {
        console.error(`Error upserting ${title}:`, error.message);
      }
    }

    console.log('Import completed.');
  } catch (err) {
    console.error('Runtime error:', err);
  }
}

importData();
