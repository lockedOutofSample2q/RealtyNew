const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function syncRichData() {
  console.log('Starting Rich Data Sync for Apartments...');

  // 1. Target: Homeland Regalia Mohali
  const regaliaForensics = {
    transfer_trap_analysis: "The secondary market is saturated with original investors seeking exits. While brokers claim 100 percent sell-out to drive premiums, actual liquidity is significantly slower than marketing suggests. Buyers entering at current high premiums face exposure if market sentiment shifts.",
    lifestyle_tax_analysis: "Projected maintenance fees are top-tier. Furthermore, the extensive glass facade necessitates constant HVAC operation to counter thermal gain in Punjab’s 45°C summers, severely impacting utility yields.",
    maintenance_fee_psft: 7.50, // Range 6.50-8.50
    rera_number: "PBRERA-SAS81-PR0757",
    tower_count: 6,
    floor_count: 25,
    project_area_acres: 4.58,
    completion_date: "Dec 2028 (Legal)",
    handover_date: "Late 2027 (Realistic)"
  };

  const { error: err1 } = await supabase
    .from('apartments')
    .update(regaliaForensics)
    .eq('slug', 'homeland-regalia-mohali');

  if (err1) console.error('Error updating Homeland Regalia:', err1.message);
  else console.log('✅ Homeland Regalia Mohali updated with Forensics.');

  // 2. Target: Joy Grand
  const joyForensics = {
    tower_count: 7,
    floor_count: 26,
    project_area_acres: 6.5,
    rera_number: "PBRERA-SAS81-PR0928",
    completion_date: "Dec 2027",
    transfer_trap_analysis: "Single-lane flats with natural green views drive the value here, but density in Sector 88 is rising fast. Secondary market liquidity will depend on the delivery of promised commercial blocks."
  };

  await supabase.from('apartments').update(joyForensics).eq('slug', 'joy-grand');
  console.log('✅ Joy Grand updated.');

  // 3. Target: Marbella Grand
  const marbellaForensics = {
    tower_count: 10,
    floor_count: 23,
    total_units: 822,
    project_area_acres: 11.13,
    rera_number: "PBRERA-SAS81-PR0391",
    completion_date: "Oct 2024",
    transfer_trap_analysis: "The IT City premium is already priced in. Investors should look for 'Earth Villas' for genuine scarcity value; standard apartments face heavy competition from upcoming high-rises in Sector 83."
  };

  await supabase.from('apartments').update(marbellaForensics).eq('slug', 'marbella-grand');
  console.log('✅ Marbella Grand updated.');

  // 4. Move Metadata from descriptions to columns for all apartments
  const { data: allApps } = await supabase.from('apartments').select('id, description, slug');
  
  for (const app of allApps) {
    const match = app.description.match(/\[METADATA\](.*?)\[\/METADATA\]/);
    if (match) {
      try {
        const meta = JSON.parse(match[1]);
        const cleanDesc = app.description.replace(/\[METADATA\].*?\[\/METADATA\]/, '').trim();
        
        await supabase.from('apartments').update({
          price_max: meta.price_max,
          area_sqft_max: meta.area_sqft_max,
          bedrooms_max: meta.bedrooms_max,
          address: meta.address,
          description: cleanDesc
        }).eq('id', app.id);
        
        console.log(`✅ Cleaned and migrated ranges for: ${app.slug}`);
      } catch (e) {
        console.error(`Failed to migrate metadata for ${app.slug}`);
      }
    }
  }

  console.log('Rich Data Sync Completed.');
}

syncRichData();
