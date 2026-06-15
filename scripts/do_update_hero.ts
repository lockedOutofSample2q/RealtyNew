import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateHero() {
  const slug = "hero-homes";

  // First fetch to get existing data
  const { data: existingData, error: fetchError } = await supabase
    .from("apartments")
    .select("*")
    .eq("slug", slug)
    .single();

  if (fetchError || !existingData) {
    console.error("Error fetching existing data:", fetchError);
    return;
  }

  // Remove the previously added incorrect string
  let updatedUpcomingInfrastructure = (existingData.upcoming_infrastructure || []).filter(
    (item: string) => !item.startsWith("New Tower Launch: A new 4+Servant Room")
  );

  // Add the two correct updates
  updatedUpcomingInfrastructure.push(
    "Upcoming Tower (Current Project): A new tower is currently under construction featuring a 4 BHK + Servant Room (3,490 sq. ft.) layout. The current rate from the builder for Hero Homes is ₹10,500/sq. ft."
  );
  
  updatedUpcomingInfrastructure.push(
    "New Upcoming Project: A completely new Hero Homes project is anticipated, with RERA approval expected by August. The new project is projected to launch from ₹12,000/sq. ft."
  );

  const { data, error } = await supabase
    .from("apartments")
    .update({
      upcoming_infrastructure: updatedUpcomingInfrastructure,
      updated_at: new Date().toISOString()
    })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating:", error);
  } else {
    console.log("Successfully updated the two new points for Hero Homes in the database!");
  }
}

updateHero();
