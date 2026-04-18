-- Migration to add comprehensive off-plan/project details matching new designs
-- Run this in your Supabase SQL Editor

-- 1. Add new columns to accommodate the level of detail seen in the designs
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS completion_date TEXT,
ADD COLUMN IF NOT EXISTS handover_date TEXT,
ADD COLUMN IF NOT EXISTS size_range TEXT,
ADD COLUMN IF NOT EXISTS bedroom_range TEXT,
ADD COLUMN IF NOT EXISTS highlights TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS building_name TEXT,
ADD COLUMN IF NOT EXISTS interior_description TEXT,
ADD COLUMN IF NOT EXISTS amenities TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS amenities_gallery JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS payment_plan JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS unit_types JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS floor_plan_url TEXT,
ADD COLUMN IF NOT EXISTS brochure_url TEXT,
ADD COLUMN IF NOT EXISTS terms_url TEXT,
ADD COLUMN IF NOT EXISTS location_coordinates JSONB,
ADD COLUMN IF NOT EXISTS nearby_landmarks JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS agent_contact JSONB,
ADD COLUMN IF NOT EXISTS price_on_request BOOLEAN DEFAULT false;

-- 2. Update existing entries to fill out some of these new fields with placeholder but realistic data
UPDATE properties 
SET 
  price_on_request = false,
  size_range = area_sqft || ' sqft',
  bedroom_range = COALESCE(bedrooms::text, 'Studio'),
  completion_date = 'Q4 2026',
  handover_date = 'Q4 2026',
  highlights = ARRAY['Premium finishes', 'Prime location centrally located', 'Floor to ceiling windows'],
  interior_description = 'Sophisticated modern spaces with seamless indoor-outdoor transition and panoramic views.',
  amenities = ARRAY['Pool', 'GYM', '24/7 Security', 'Concierge Service'],
  payment_plan = '[
    {"stage": "Down Payment", "percentage": "20%", "milestone": "Upon booking"}, 
    {"stage": "During Construction", "percentage": "40%", "milestone": "In installments"}, 
    {"stage": "On Handover", "percentage": "40%", "milestone": "Final payment"}
  ]'::jsonb,
  agent_contact = '{
    "name": "Armina Crnovrsanin", "role": "CEO", "email": "armina@monterealestate.ae", "phone": "+971 50 529 8618", 
    "languages": ["German", "English"], "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
  }'::jsonb
WHERE slug IN ('enara-by-omniyat', 'marina-heights-penthouse', 'creek-harbour-1-bed');

-- 3. Insert The Alba Residences 2
INSERT INTO properties (
  title, slug, type, status, listing_type, price_on_request, price, price_currency,
  location, community, developer, furnishing, 
  size_range, bedroom_range, bathrooms, completion_date, handover_date,
  highlights, building_name, interior_description,
  amenities, amenities_gallery, payment_plan, unit_types,
  floor_plan_url, brochure_url, terms_url, location_coordinates, nearby_landmarks,
  agent_contact, description, images
) VALUES (
  'The Alba Residences 2', 'the-alba-residences-2', 'apartment', 'off-plan', 'off-plan', true, 0, 'AED',
  'East Crescent, Palm Jumeirah, Dubai, UAE', 'Palm Jumeirah', 'OMNIYAT', 'unfurnished',
  '4,700 - 42,900 sqft', '3-4', 1, 'March 1, 2028', 'March 1, 2028',
  ARRAY[
    'Architecture by Zaha Hadid Architects',
    'Expansive resort-style landscaping by Vladimir Djurovic',
    'Branded spa & well-living program',
    'Managed by Dorchester Collection',
    '250 metres of private beachfront',
    'Breathtaking views of Arabian Gulf, Burj Al Arab, and Burj Khalifa'
  ],
  'The Alba Residences',
  'Expansive outdoor terraces, Seamless indoor-outdoor living, Private plunge pools, Elevated sun lounging platform, Private balconies, Outdoor jacuzzis, Juliette balconies, Dual balconies',
  ARRAY['Pool', 'GYM', 'Sauna', 'Steam Room', 'Rooftop Terrace', 'Kids zone', 'Playground', '24/7 Security', 'Concierge Service', 'Garden', 'Spa & Wellness'],
  '[
    {"name": "Pool", "image": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?width=800"},
    {"name": "Rooftop Terrace", "image": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?width=800"},
    {"name": "Concierge Service", "image": "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?width=800"},
    {"name": "Garden", "image": "https://images.unsplash.com/photo-1558904541-efa843a96f09?width=800"},
    {"name": "Spa & Wellness", "image": "https://images.unsplash.com/photo-1544161515-4ab0ce6df7ce?width=800"}
  ]'::jsonb,
  '[
    {"stage": "Down Payment", "percentage": "25%", "milestone": "Upon booking"},
    {"stage": "During Construction", "percentage": "35%", "milestone": "In installments"},
    {"stage": "On Handover", "percentage": "40%", "milestone": "Final payment"}
  ]'::jsonb,
  '[]'::jsonb,
  '#', '#', '#', 
  '{"lat": 25.1328, "lng": 55.1383}'::jsonb,
  '[
    {"name": "Burj Al Arab", "time": "27 min", "by": "CAR"},
    {"name": "Burj Khalifa", "time": "33 min", "by": "CAR"}
  ]'::jsonb,
  '{
    "name": "Armina Crnovrsanin", "role": "CEO", "email": "armina@monterealestate.ae", "phone": "+971 50 529 8618", 
    "languages": ["German", "English"], "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?width=150"
  }'::jsonb,
  'The Alba Residences redefines luxury living on Palm Jumeirah''s Eastern Crescent, offering an exclusive sanctuary focused on well-living. Designed by Zaha Hadid Architects and managed by Dorchester Collection, this mixed-use masterpiece features 60 luxury residences, including 3 and 4-bedroom simplex and duplex units, plus super penthouses. Residents enjoy 250 meters of private beachfront, expansive resort-style landscaping by Vladimir Djurovic, and seamless indoor-outdoor living with private plunge pools and balconies. A dedicated 3,000 m² wellness program includes longevity therapies, state-of-the-art fitness, and serene spaces, all set against breathtaking views of the Arabian Gulf, Burj Al Arab, and Burj Khalifa.',
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800']
) ON CONFLICT (slug) DO UPDATE SET 
  payment_plan = EXCLUDED.payment_plan,
  amenities = EXCLUDED.amenities,
  highlights = EXCLUDED.highlights,
  interior_description = EXCLUDED.interior_description,
  amenities_gallery = EXCLUDED.amenities_gallery,
  unit_types = EXCLUDED.unit_types,
  nearby_landmarks = EXCLUDED.nearby_landmarks,
  agent_contact = EXCLUDED.agent_contact;

-- 4. Insert Eltiera Heights
INSERT INTO properties (
  title, slug, type, status, listing_type, price_on_request, price, price_currency,
  location, community, developer, furnishing, 
  size_range, bedroom_range, bathrooms, completion_date, handover_date,
  highlights, building_name, interior_description,
  amenities, amenities_gallery, payment_plan, unit_types,
  floor_plan_url, brochure_url, terms_url, location_coordinates, nearby_landmarks,
  agent_contact, description, images
) VALUES (
  'Eltiera Heights', 'eltiera-heights', 'apartment', 'off-plan', 'off-plan', true, 0, 'AED',
  'Jumeirah Second, Dubai, Dubai, United Arab Emirates', 'Jumeirah', 'Ellington Properties', 'unfurnished',
  '800 sqft', '1-4', 1, 'December 1, 2028', 'December 1, 2028',
  ARRAY[
    'Urban living reimagined by Ellington',
    'Clean lines and expressive materials with reverence for form and function',
    'Rhythmic facade with glazing, screens, and metallic accents',
    'Expansive windows and reflective surfaces choreograph natural light',
    'Refined lobby with tone-on-tone flooring and sculpted organic forms',
    'Located in Jumeirah Islands with tranquil waterways and sculpted greenery',
    'Dual aspect residences with soft light and curated perspectives',
    'Organic silhouette with layered materials for passive cooling',
    'Landscaped forecourt with textured paving and soft lighting',
    '40-meter natural infinity pool with vanishing edge'
  ],
  'Eltiera Heights',
  'Expansive windows, reflective surfaces, natural light, soft tone-on-tone flooring, white portals, sculpted organic forms, minimal furnishings, blackened steel frames, burned orange marble reception desk, curved forms, diffused ambient lighting, white marble feature walls, lush outdoor views, warm greys, deep oranges, sleek finishes, state-of-the-art equipment, premium materials, integrated appliances, soft textures, clean lines, refined fixtures',
  ARRAY['Park', 'Lobby Lounge', 'Infinity Pool', 'Promenade', 'Garden', 'Club', 'Boutique Fitness Studios', 'Indoor Kids Play Area', 'Outdoor Kids Play Area', 'Cinema Room', 'Outdoor Seating', 'Club Lounge', 'Vitality Pool', 'Sauna', 'Change Rooms', 'Kids Club', 'Fitness Studio', 'Yoga Studio', 'Outdoor Yoga Area', 'Outdoor Fitness Area', 'Outdoor Shower', 'EV Charging', 'Lobby Reception'],
  '[
    {"name": "Lobby Lounge", "image": "https://images.unsplash.com/photo-1545624898-024c08e5e8e8?width=800"},
    {"name": "Infinity Pool", "image": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?width=800"},
    {"name": "Club Lounge", "image": "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?width=800"},
    {"name": "Fitness Studio", "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?width=800"},
    {"name": "Outdoor Shower", "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?width=800"}
  ]'::jsonb,
  '[
    {"stage": "Down Payment", "percentage": "20%", "milestone": "Upon booking"},
    {"stage": "During Construction", "percentage": "50%", "milestone": "In installments"},
    {"stage": "On Handover", "percentage": "30%", "milestone": "Final payment"}
  ]'::jsonb,
  '[
    {"bedrooms": "1 Bedroom", "types": "4 Types", "size": "820 - 844 sqft"},
    {"bedrooms": "2 Bedrooms", "types": "4 Types", "size": "1,237 - 1,501 sqft"},
    {"bedrooms": "3 Bedrooms", "types": "1 Type", "size": "1,640 sqft"},
    {"bedrooms": "4 Bedrooms", "types": "2 Types", "size": "5,810 - 8,085 sqft"},
    {"bedrooms": "Other", "types": "2 Types", "size": "1,252 - 3,572 sqft"}
  ]'::jsonb,
  '#', '#', '#', 
  '{"lat": 25.1388, "lng": 55.1500}'::jsonb,
  '[
    {"name": "Burj Khalifa", "time": "5 min", "by": "CAR"},
    {"name": "Dubai Mall", "time": "6 min", "by": "CAR"},
    {"name": "Dubai Airport", "time": "22 min", "by": "CAR"},
    {"name": "Burj Al Arab", "time": "17 min", "by": "CAR"},
    {"name": "Palm Jumeirah", "time": "26 min", "by": "CAR"},
    {"name": "Dubai Marina", "time": "31 min", "by": "CAR"}
  ]'::jsonb,
  '{
    "name": "Armina Crnovrsanin", "role": "CEO", "email": "armina@monterealestate.ae", "phone": "+971 50 529 8618", 
    "languages": ["German", "English"], "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?width=150"
  }'::jsonb,
  'A sculptural residential tower in Jumeirah Islands featuring a rhythmic facade of glazing, screens, and metallic accents that responds to sunlight. The development offers serene living spaces with expansive windows, rooftop amenities, and a focus on light, form, and wellbeing, designed by Ellington Properties.',
  ARRAY['https://images.unsplash.com/photo-1600607687933-ce3d6a71388d?w=800']
) ON CONFLICT (slug) DO UPDATE SET 
  payment_plan = EXCLUDED.payment_plan,
  amenities = EXCLUDED.amenities,
  highlights = EXCLUDED.highlights,
  interior_description = EXCLUDED.interior_description,
  amenities_gallery = EXCLUDED.amenities_gallery,
  unit_types = EXCLUDED.unit_types,
  nearby_landmarks = EXCLUDED.nearby_landmarks,
  agent_contact = EXCLUDED.agent_contact;