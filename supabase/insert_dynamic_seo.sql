-- Programmatic SEO Implementation & Content Injection for RHMC
-- This script creates the dynamic SEO table and injects heavily researched, 
-- high-quality content crafted specifically in Amritpal Singh's advisory voice.

-- 1. Create the SEO Table
CREATE TABLE IF NOT EXISTS public.sector_seo (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sector_slug TEXT UNIQUE NOT NULL,
    city TEXT,
    meta_title TEXT,
    meta_description TEXT,
    h1_heading TEXT,
    intro_paragraph TEXT,
    faq_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Security (Read-only for public)
ALTER TABLE public.sector_seo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on sector_seo" ON public.sector_seo;
CREATE POLICY "Allow public read access on sector_seo" ON public.sector_seo 
FOR SELECT USING (true);

-- 3. Inject High-Quality, Researched SEO Content
INSERT INTO public.sector_seo (sector_slug, city, meta_title, meta_description, h1_heading, intro_paragraph, faq_json) VALUES
(
    'sector-82a', 
    'Mohali', 
    'Flats in Sector 82A Mohali | Real ROI & Builder Truths', 
    'Looking for flats in Sector 82A Mohali? Before you buy on Airport Road, check the actual loading factors and builder track records. Get honest advisory today.', 
    'Flats in Sector 82A Mohali: The Reality Check Before You Buy', 
    'Everyone wants a piece of Sector 82A because of its direct frontage on Airport Road. It''s the commercial and residential nervous system of Mohali right now. But here is what the brochures won''t tell you. If you are buying a flat in Sector 82A, you need to look past the sample flat and check two things immediately: the actual loading factor and the builder''s delivery history. I have seen buyers pay for a 3BHK and get the carpet area of a 2BHK because the loading was pushed past 35%. That is a red flag. Sector 82A, especially around the JLPL corridor, offers fantastic rental yields because of its proximity to IT City and the international airport, but you must enter at the right price per square foot. If we move without vision, we will buy at the wrong price. Whether you are an end-user or an investor parking capital, don''t just buy the marketing. Verify the paperwork, check the RERA status, and know exactly what you are paying for.', 
    '[{"question": "What is a safe loading factor for flats in Sector 82A?", "answer": "A healthy loading factor is between 25-30%. If a developer in Sector 82A is pushing past 35%, you are paying for super area you cannot use. Always calculate the actual carpet area before booking."}, {"question": "Are flats in Sector 82A Mohali good for rental income?", "answer": "Yes. Because of direct access to Airport Road and the rapidly expanding IT City corridor nearby, there is strong corporate tenant demand. However, your ROI depends entirely on your entry price."}, {"question": "What should I check before buying an under-construction flat here?", "answer": "Beyond the RERA number, verify the builder''s past delivery timelines in Mohali. Also check the land title and ensure the project has its environmental and municipal clearances in place, not just an application in process."}]'
),
(
    'aerocity', 
    'Mohali', 
    'Flats in Aerocity Mohali | Ground Reality & Insights', 
    'Buying a flat in Aerocity Mohali? The market is at a premium. Discover the truth about rental yields, IT City proximity, and where the real ROI hides.', 
    'Flats in Aerocity Mohali: Is the Premium Still Worth It?', 
    'Aerocity is the most talked-about pin code in Mohali. With the 1,700-acre IT City reaching critical mass and the airport expansion bringing heavy footfall, the demand for flats here is genuine. But let''s look at the numbers objectively. The entry ticket in Aerocity has surged, with premium projects commanding massive premiums simply because of the location tag. If you are buying an apartment here for end-use, you get unparalleled connectivity and elite neighborhood infrastructure. But if you are an investor, you need to be careful. Buying at a peak price kills your ROI. Are you targeting rental yield from IT professionals, or capital appreciation? Because the strategy for a luxury high-rise differs completely from an independent floor. I tell my clients clearly: do not buy just because of the ''''Aerocity'''' name. We must evaluate the builder''s delivery track record, the maintenance charges (which can hit Rs 5-8 per sq. ft.), and the true carpet area. Make a decision based on data, not hype.', 
    '[{"question": "Is buying a flat in Aerocity Mohali a good investment right now?", "answer": "It depends on your timeline. Capital appreciation has slowed down compared to 3 years ago because prices are already at a premium. However, rental yields remain strong (around 3%) due to the massive influx of professionals in the adjacent IT City."}, {"question": "What are the typical maintenance charges in Aerocity high-rises?", "answer": "For premium high-rise flats in Aerocity, expect basic maintenance around Rs 3-4 per sq ft, but with full club and luxury amenities, this easily climbs to Rs 6-8 per sq ft. Factor this into your monthly carrying cost."}, {"question": "Should I choose an independent floor or a high-rise flat in Aerocity?", "answer": "High-rises offer better security and 5-star amenities, appealing to corporate renters and NRIs. Independent floors (Stilt+3) offer faster possession and lower maintenance costs. The choice depends entirely on whether your priority is lifestyle or sheer ROI."}]'
),
(
    'it-city', 
    'Mohali', 
    'Flats in IT City Mohali | Corporate Yields & Real Advisory', 
    'Considering a flat in IT City Mohali? It is the corporate hub with massive rental demand, but the entry price determines your ROI. Get the honest picture.', 
    'Flats in IT City Mohali: The Real Numbers Behind the Hype', 
    'The 1,700-acre IT City corridor is changing Mohali. With major tech firms establishing their footprint, the demand for residential flats from corporate professionals is massive. Many investors are jumping in blindly expecting guaranteed returns. Here is the reality check: while the rental yield here is among the strongest in the Tricity, your actual ROI depends entirely on your entry price. Right now, there is a visible price gap between IT City and Sector 82A. The brochures will show you 5-star amenities, but you need to verify the loading factor, the actual carpet area, and whether the builder has a track record of delivering on time. If you are an end-user, you get a zero-commute lifestyle. If you are an investor, do the math on maintenance charges before calculating your net yield. Do not buy on hype. One 15-minute call, and I will tell you directly what I would do with your capital.', 
    '[{"question": "Are flats in IT City Mohali a good investment?", "answer": "Yes, primarily for rental yields. The proximity to corporate offices ensures a steady stream of tech professionals looking for housing. However, capital appreciation is steady, not explosive, as prices are already pricing in future growth."}, {"question": "What is the price gap between IT City and Sector 82A?", "answer": "IT City generally offers slightly more competitive entry prices compared to the immediate Airport Road commercial frontage of Sector 82A, though luxury projects in IT City are closing this gap."}, {"question": "What should I verify before booking an under-construction flat here?", "answer": "Beyond RERA compliance, check the builder''s history of delivering promised amenities. Many builders delay clubhouses and power backup systems long after offering possession."}]'
),
(
    'wave-estate', 
    'Mohali', 
    'Flats in Wave Estate Mohali | Truth About Sector 85 & 99', 
    'Wave Estate offers gated security in Sectors 85 and 99, but what about the maintenance and delivery timelines? Read our honest advisory before investing.', 
    'Flats in Wave Estate: Gated Security vs Ground Reality', 
    'Wave Estate, sprawling across Sectors 85 and 99, is marketed as one of the premier gated communities in Mohali. It promises international-standard landscaping and extreme security. For an end-user, the appeal is undeniable: it is central, the internal road network is wide, and the scale of the township provides a self-sustained feeling. But as an independent advisor, I look past the grand entrance gates. If you are buying a resale flat or a builder floor here, you must investigate the maintenance structure. High-end amenities come with high monthly carrying costs that eat directly into an investor''s yield. Furthermore, while the primary developer has delivered several blocks, the track record of secondary builders constructing independent floors within the estate varies wildly. Do not assume all properties inside the boundary wall share the same build quality or legal clarity. Always verify the occupation certificate. If what you read describes your situation, let us talk. No pitch, just the facts.', 
    '[{"question": "Is Wave Estate a secure place to live?", "answer": "Yes, it is one of the few fully walled and gated mega-townships in Mohali, offering multi-tier security which is highly appealing to NRIs and families."}, {"question": "Are the maintenance charges high in Wave Estate?", "answer": "Because of the sheer scale of the landscaping, parks, and security infrastructure, maintenance charges can be significant. You must factor this into your monthly budget or rental yield calculations."}, {"question": "Should I buy a high-rise or an independent floor in Wave Estate?", "answer": "It depends on your goal. Independent floors (often built by secondary developers on purchased plots) offer more privacy and zero-delay possession if ready, while high-rises offer centralized amenities. Always vet the specific builder of the floor, not just the Wave brand."}]'
),
(
    'sunny-enclave', 
    'Mohali', 
    'Flats in Sunny Enclave Mohali | Honest Review & Prices', 
    'Looking for flats in Sunny Enclave? It offers great connectivity to VR Punjab Mall but faces issues like potholes and power cuts. Read our honest review.', 
    'Flats in Sunny Enclave Kharar: The Honest Ground Reality', 
    'If you are looking at flats in Sunny Enclave, you are likely drawn by the affordability and the connectivity. Since the Kharar flyover opened, travel time to Chandigarh and Mohali has dropped significantly. You have VR Punjab Mall and daily markets right at your doorstep. It is a self-sustained pocket. But I will tell you exactly what you need to know before putting your money down. Sunny Enclave has a serious infrastructure debt. Because parts of it were developed privately, there is a constant tug-of-war with the Municipal Corporation over maintenance. Internal sector roads often have potholes, and low-lying blocks face severe waterlogging during the monsoon. Unscheduled power cuts are frequent, making a heavy-duty inverter mandatory. The truth is, if you are a middle-class family looking for a 2BHK or 3BHK on a strict budget, Sunny Enclave works. It gives you space that you cannot afford in Aerocity or IT City. But do not buy here expecting premium living. Verify if the building has a Partial Completion Certificate or Occupation Certificate to avoid legal traps later. One 15-minute call with me, and I will tell you directly what I would do in your position.', 
    '[{"question": "Does Sunny Enclave have waterlogging issues?", "answer": "Yes, several low-lying blocks in Sunny Enclave experience severe waterlogging during the monsoons due to drainage infrastructure gaps."}, {"question": "Is Sunny Enclave under MC Kharar?", "answer": "There is often a jurisdictional tug-of-war. While parts are under Municipal Corporation Kharar, the private developer origins mean maintenance of internal roads and parks is frequently delayed."}, {"question": "What should I check before buying a flat in Sunny Enclave?", "answer": "Always verify if the specific building has a Partial Completion Certificate or Occupation Certificate (OC). Get documents vetted by a bank for loan eligibility to avoid unauthorized constructions."}]'
),
(
    'eco-city', 
    'New Chandigarh', 
    'Flats in Eco City New Chandigarh | Real ROI & Review', 
    'Eco City offers clear GMADA titles and underground wiring, but lacks centralized power backup. Read the truth about living in New Chandigarh before investing.', 
    'Flats in Eco City New Chandigarh: Safe Investment, Basic Living', 
    'New Chandigarh is sold on the promise of the future, and Eco City is at the center of it. Let me tell you the difference between Eco City and the private gated societies nearby like Omaxe or DLF. Eco City is a GMADA project. This means you get immediate possession and clear titles. Your registry and intekaal happen without the builder delays that trap so many buyers. The layout is planned with wide roads, underground electricity wiring, and large parks facing the Shivalik hills. It feels open and green. But here is the downside that brochures will not tell you: it lacks the polish of a private luxury society. There is no centralized power backup, and frequent power cuts during the summer mean you must install your own high-capacity inverter. The area can feel isolated after dark, and quick access to food delivery or immediate amenities is still limited. If your priority is legal safety and long-term land appreciation, Eco City is one of the safest investments in New Chandigarh. If you want 100% power backup and resort-style living, you need to look at private builders—but only after rigorous due diligence. If what you read describes your situation, WhatsApp me. I will tell you directly what I would do.', 
    '[{"question": "Is Eco City New Chandigarh a GMADA project?", "answer": "Yes, Eco City 1 and 2 are developed by GMADA, which guarantees clearer titles, safer registries, and avoids the severe possession delays often seen with private builders."}, {"question": "Are there power cuts in Eco City?", "answer": "Yes, residents experience frequent power cuts, particularly in summer. Unlike private gated societies, Eco City does not provide centralized power backup, so personal inverters are essential."}, {"question": "Which is better: Eco City 1 or Eco City 2?", "answer": "Eco City 1 is more developed, has higher occupancy, and is closer to Chandigarh, but comes at a 20-30% premium. Eco City 2 is newer and cheaper but feels more isolated currently."}]'
)
ON CONFLICT (sector_slug) DO UPDATE SET 
    meta_title = EXCLUDED.meta_title, 
    meta_description = EXCLUDED.meta_description, 
    h1_heading = EXCLUDED.h1_heading, 
    intro_paragraph = EXCLUDED.intro_paragraph, 
    faq_json = EXCLUDED.faq_json;

-- 4. Dynamic Fallback Injection
-- For any sector that exists in your properties table but was NOT 
-- explicitly researched above, this will generate a baseline SEO template.
INSERT INTO public.sector_seo (sector_slug, city, meta_title, meta_description, h1_heading, intro_paragraph)
SELECT DISTINCT 
    LOWER(REPLACE(community, ' ', '-')) as sector_slug,
    'Mohali' as city,
    'Premium Flats for Sale in ' || community || ' | RHMC' as meta_title,
    'Explore verified luxury flats and apartments for sale in ' || community || '. View detailed floor plans, pricing, and amenities with Realty Holding & Management Consultants.' as meta_description,
    'Luxury Flats for Sale in ' || community as h1_heading,
    'Discover the finest residential properties in ' || community || '. Whether you are looking for ready-to-move apartments or premium pre-launch flats, our consultants evaluate every property for RERA compliance, builder track record, and fair pricing to ensure a secure investment.' as intro_paragraph
FROM public.properties
WHERE community IS NOT NULL AND community != ''
ON CONFLICT (sector_slug) DO NOTHING;
