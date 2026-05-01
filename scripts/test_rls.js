const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

async function testRLS() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from('lands').select('id').limit(1);
  if (error) {
    console.log('ANON_KEY_FAIL:', error.message);
  } else {
    console.log('ANON_KEY_SUCCESS:', data);
  }
  
  const { data: pData, error: pError } = await supabase.from('properties').select('id').limit(1);
  if (pError) {
    console.log('PROPERTIES_ANON_FAIL:', pError.message);
  } else {
    console.log('PROPERTIES_ANON_SUCCESS:', pData);
  }
}

testRLS();
