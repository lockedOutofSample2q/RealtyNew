const { createClient } = require('@supabase/supabase-js');

async function mergeProperties() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Starting property merge...');

  // 1. Merge Beverly Golf Hills
  const { data: bev1 } = await supabase.from('apartments').select('*').eq('slug', 'beverly-golf-hills').single();
  const { data: bev2 } = await supabase.from('apartments').select('*').eq('slug', 'beverly-golf-hills-beverly-golf-avenue').single();

  if (bev1 && bev2) {
    const combinedBev = {
      description: bev1.description + '\n\nAdditional Info:\n' + bev2.description,
      highlights: Array.from(new Set([...bev1.highlights, ...bev2.highlights])),
      amenities: Array.from(new Set([...bev1.amenities, ...bev2.amenities])),
      features: Array.from(new Set([...bev1.features, ...bev2.features])),
      status: bev1.status === 'off-plan' || bev2.status === 'off-plan' ? 'off-plan' : 'available',
      updated_at: new Date().toISOString()
    };
    await supabase.from('apartments').update(combinedBev).eq('slug', 'beverly-golf-hills');
    await supabase.from('apartments').delete().eq('slug', 'beverly-golf-hills-beverly-golf-avenue');
    console.log('Merged Beverly Golf Hills');
  }

  // 2. Merge Wellington Heights
  const { data: wel1 } = await supabase.from('apartments').select('*').eq('slug', 'wellington-heights').single();
  const { data: wel2 } = await supabase.from('apartments').select('*').eq('slug', 'wellington-heights-tdi').single();

  if (wel1 && wel2) {
    const combinedWel = {
      description: wel1.description + '\n\nAdditional Info:\n' + wel2.description,
      highlights: Array.from(new Set([...wel1.highlights, ...wel2.highlights])),
      amenities: Array.from(new Set([...wel1.amenities, ...wel2.amenities])),
      features: Array.from(new Set([...wel1.features, ...wel2.features])),
      updated_at: new Date().toISOString()
    };
    await supabase.from('apartments').update(combinedWel).eq('slug', 'wellington-heights');
    await supabase.from('apartments').delete().eq('slug', 'wellington-heights-tdi');
    console.log('Merged Wellington Heights');
  }

  console.log('Merge completed.');
}

mergeProperties();
