-- SQL to add the new land listing at Cholta Khurd, Kurali Bypass
-- Run this in your Supabase SQL Editor

INSERT INTO lands (
  title, 
  slug, 
  type, 
  status, 
  listing_type, 
  price, 
  price_currency, 
  area_sqft, 
  location, 
  community, 
  developer, 
  description, 
  images, 
  latitude, 
  longitude, 
  created_at
) VALUES (
  'Prime Land at Cholta Khurd, Kurali Bypass Corridor',
  'land-kurali-bypass-cholta-khurd',
  'agricultural',
  'available',
  'lands',
  0, -- Price on Request
  'INR',
  43560, -- 1 Acre placeholder (adjust if known)
  'Cholta Khurd, Kurali Bypass Corridor',
  'Kurali',
  'Independent',
  'Strategically located land parcel on the Kurali Bypass Corridor near Office Cholta Khurd. Ideal for investment or agricultural use with excellent highway connectivity.',
  ARRAY['/images/lands/kurali-bypass-cholta-khurd.png'],
  30.712041644018132,
  76.5998653208568,
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  images = EXCLUDED.images,
  location = EXCLUDED.location;
