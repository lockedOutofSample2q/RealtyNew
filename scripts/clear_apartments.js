const { createClient } = require('@supabase/supabase-js');

async function clearApartments() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Removing all apartments from Supabase...');

  // Delete all records from apartments table
  const { error } = await supabase
    .from('apartments')
    .delete()
    .neq('title', 'KEEP_NONE'); // Standard way to delete all rows

  if (error) {
    console.error('Error clearing apartments:', error);
    process.exit(1);
  }

  console.log('Successfully cleared all apartments.');
}

clearApartments();
