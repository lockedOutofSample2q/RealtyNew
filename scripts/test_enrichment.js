const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Mock enrichProperty for testing
function enrichProperty(property) {
  if (!property.description) return property;
  let cleanDescription = property.description;
  let faqs = property.faqs;
  let metadata = {};

  const metadataMatch = cleanDescription.match(/\[METADATA\]([\s\S]*?)\[\/METADATA\]/);
  if (metadataMatch) {
    try { metadata = JSON.parse(metadataMatch[1]); } catch (e) {}
    cleanDescription = cleanDescription.replace(/\[METADATA\][\s\S]*?\[\/METADATA\]/g, '').trim();
  }

  const faqMatch = cleanDescription.match(/\[FAQS\]([\s\S]*?)\[\/FAQS\]/);
  if (faqMatch) {
    try { faqs = JSON.parse(faqMatch[1]); } catch (e) {}
    cleanDescription = cleanDescription.replace(/\[FAQS\][\s\S]*?\[\/FAQS\]/g, '').trim();
  }

  let landmarks = property.nearby_landmarks || [];
  const landmarkMatch = cleanDescription.match(/\[LANDMARKS\]([\s\S]*?)\[\/LANDMARKS\]/);
  if (landmarkMatch) {
    try { landmarks = JSON.parse(landmarkMatch[1]); } catch (e) {}
    cleanDescription = cleanDescription.replace(/\[LANDMARKS\][\s\S]*?\[\/LANDMARKS\]/g, '').trim();
  }

  return {
    ...property,
    description: cleanDescription,
    faqs: faqs,
    nearby_landmarks: landmarks
  };
}

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

async function testEnrichment() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: rawProperty } = await supabase
    .from('apartments')
    .select('*')
    .eq('slug', 'homeland-regalia-mohali')
    .single();
  
  const enriched = enrichProperty(rawProperty);
  
  console.log('--- ENRICHED DATA ---');
  console.log('Description starts with:', enriched.description.substring(0, 50));
  console.log('Description ends with:', enriched.description.substring(enriched.description.length - 50));
  console.log('FAQs count:', enriched.faqs?.length);
  console.log('Landmarks count:', enriched.nearby_landmarks?.length);
  if (enriched.nearby_landmarks) {
    console.log('First Landmark:', JSON.stringify(enriched.nearby_landmarks[0]));
  }
}

testEnrichment();
