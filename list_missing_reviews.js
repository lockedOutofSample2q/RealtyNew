const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aklixeskmhzsqrlnzqjk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGl4ZXNrbWh6c3FybG56cWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk0NzYxNSwiZXhwIjoyMDkwNTIzNjE1fQ.HrqczSiLOAWObUVN3A5zD4eS8kGLxarWkkoZeOV1rPw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listMissingReviews() {
  try {
    const { data: apartments, error: aptError } = await supabase
      .from('apartments')
      .select('title, slug, rating_value, developer')
      .or('rating_value.is.null, rating_value.eq.0');
      
    if (aptError) {
      console.log("Error fetching apartments:", aptError);
    }

    const { data: houses, error: houseError } = await supabase
      .from('houses')
      .select('title, slug, rating_value, developer')
      .or('rating_value.is.null, rating_value.eq.0');

    if (houseError) {
      console.log("Error fetching houses:", houseError);
    }
    
    let output = "# Properties Missing Reviews\n\n";
    output += "## Apartments (Flats)\n";
    if (apartments && apartments.length > 0) {
      apartments.forEach(a => {
        output += `- **${a.title}** (by ${a.developer || 'Unknown'})\n`;
      });
    } else {
      output += "All apartments have reviews!\n";
    }

    output += "\n## Houses\n";
    if (houses && houses.length > 0) {
      houses.forEach(h => {
        output += `- **${h.title}** (by ${h.developer || 'Unknown'})\n`;
      });
    } else {
      output += "All houses have reviews!\n";
    }

    console.log(output);

  } catch (err) {
    console.error(err);
  }
}

listMissingReviews();
