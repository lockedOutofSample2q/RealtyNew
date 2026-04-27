const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CSV_PATH = path.resolve(__dirname, '../../../Downloads/mohali_properties.csv');

function parseCSV(content) {
  const lines = content.split(/\r?\n/);
  const result = [];
  if (lines.length === 0) return result;
  
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
  const min = Math.min(...prices);
  const max = prices.length > 1 ? Math.max(...prices) : null;
  
  return { min, max };
}

function parseArea(areaStr) {
  if (!areaStr) return { min: 0, max: null };
  const matches = areaStr.match(/(\d+)/g);
  if (!matches) return { min: 0, max: null };
  const nums = matches.map(Number);
  const min = Math.min(...nums);
  const max = nums.length > 1 ? Math.max(...nums) : null;
  return { min, max };
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

    console.log(`Parsed ${data.length} properties from mohali_properties.csv.`);

    for (const row of data) {
      const title = row['Property Name'];
      if (!title) continue;

      const slug = generateSlug(title);
      const { min: bedrooms, max: bedrooms_max } = parseBedrooms(row['Configuration (BHK)']);
      const { min: price, max: price_max } = parsePrice(row['Starting Price (INR)']);
      const { min: area, max: area_max } = parseArea(row['Size Range (sqft)']);
      
      const landmarks = [];
      for (let i = 1; i <= 5; i++) {
        const lm = row[`Nearby Landmark ${i}`];
        if (lm && lm !== 'N/A') {
          const parts = lm.split('–');
          const name = parts[0].trim();
          const timeMatch = lm.match(/(\d+)\s*min/);
          landmarks.push({
            name: name,
            time: timeMatch ? parseInt(timeMatch[1]) : 10,
            transport: "car"
          });
        }
      }

      // Metadata block to store ranges since we can't change schema
      const metadata = {
        price_max,
        area_sqft_max: area_max,
        bedrooms_max,
        address: row['Location / Address'],
        completion_date: row['Completion / Possession Date'],
        handover_date: row['Completion / Possession Date'],
        nearby_landmarks: landmarks
      };

      const property = {
        title: title,
        slug: slug,
        type: 'apartment',
        status: row['Status']?.toLowerCase().includes('under construction') || row['Status']?.toLowerCase().includes('upcoming') ? 'off-plan' : 'available',
        listing_type: 'sale',
        price: price,
        price_currency: 'INR',
        bedrooms: bedrooms,
        bathrooms: 2, 
        area_sqft: area,
        location: 'Mohali',
        community: row['Location / Address']?.split('Sector')[1] ? `Sector ${row['Location / Address']?.split('Sector')[1]?.trim().split(' ')[0]}` : 'Mohali',
        developer: row['Developer'],
        // Store metadata in description as a JSON block
        description: row['Description'] + '\n\n' + `[METADATA]${JSON.stringify(metadata)}[/METADATA]`,
        highlights: row['Off Plan Highlights']?.split('|').map(s => s.trim()).filter(s => s.length > 0) || [],
        features: row['Interior Style']?.split('/').map(s => s.trim()).filter(s => s.length > 0) || [],
        amenities: row['Community Amenities']?.split('/').map(s => s.trim()).filter(s => s.length > 0) || [],
        images: ['/assets/images/home/hero-bg.jpg'], 
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Keep Homeland Regalia images if it's that property
      if (slug === 'homeland-regalia') {
        const { data: existing } = await supabase.from('apartments').select('images').eq('slug', slug).single();
        if (existing && existing.images && existing.images.length > 1) {
          property.images = existing.images;
        }
      }

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
