const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aklixeskmhzsqrlnzqjk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGl4ZXNrbWh6c3FybG56cWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk0NzYxNSwiZXhwIjoyMDkwNTIzNjE1fQ.HrqczSiLOAWObUVN3A5zD4eS8kGLxarWkkoZeOV1rPw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFaqs() {
  const { data } = await supabase
    .from('apartments')
    .select('faqs')
    .eq('slug', 'jlpl-galaxy-heights-sector-66a-mohali')
    .single();

  console.log(JSON.stringify(data.faqs, null, 2));
}
checkFaqs();
