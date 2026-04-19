-- Migration to add land listings from Google Sheet
-- Run this in your Supabase SQL Editor

INSERT INTO properties (
  title, slug, type, status, listing_type, price, price_currency, area_sqft, 
  location, community, developer, description, images, latitude, longitude, created_at
) VALUES 
  -- 1. Khaspur
  ('42.5 Bigga Land on Banur-Tepla Road', 'land-banur-tepla-road-khaspur', 'agricultural', 'available', 'lands', 150000, 'INR', 382500, 'Banur - Tepla road, Khaspur', 'Banur', 'Independent', 'Agricultural land with approx 500ft front on Banur Tepla Road. 6.5 bigga/acre.', ARRAY['https://lh3.googleusercontent.com/pw/AP1GczNhuFKsIgIkyD9CWANbjIzNdvHoy4xva1nd6sS8jPHti8PYX4cdOQmk5mnvREDKfxwjgEZGlj10Mzce77uEHt6bKaZpUXUFt1BJWfHg1Lm2wlmhhKSZ'], 30.520298, 76.723735, NOW()),

  -- 2. ButtaSinghWala 6 Bigga
  ('6 Bigga Land in ButtaSinghWala', 'land-buttasinghwala-6-bigga', 'agricultural', 'available', 'lands', 6250000, 'INR', 54000, 'ButtaSinghWala, tepla road', 'ButtaSinghWala', 'Independent', 'Prime agricultural land on Tepla road.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.529073, 76.719371, NOW()),

  -- 3. ButtaSinghWala 8 Bigga
  ('8 Bigga Corner Plot ButtaSinghWala', 'land-buttasinghwala-8-bigga-corner', 'agricultural', 'available', 'lands', 6500000, 'INR', 72000, 'ButtaSinghWala, tepla road', 'ButtaSinghWala', 'Independent', 'Corner agricultural plot on Tepla road.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.518764, 76.711781, NOW()),

  -- 4. Rajpura
  ('Premium Land in Rajpura (500m Front)', 'land-rajpura-500m-front', 'industrial', 'available', 'lands', 0, 'INR', 43560, 'Rajpura', 'Rajpura', 'Independent', 'Prime land in Rajpura with 500m front.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.466927, 76.679169, NOW()),

  -- 5. Banur-Landran 3 Acre
  ('3 Acre Land Adjacent to MDB Lutyens', 'land-banur-landran-3-acre-mdb', 'agricultural', 'available', 'lands', 170000000, 'INR', 130680, 'Banur-Landran Road', 'Banur', 'Independent', '3 Acre land adjacent to MDB Lutyens, Ref Fauji Colony.', ARRAY['https://lh3.googleusercontent.com/pw/AP1GczNwo1aH8pFi6ssCjmyeXOxKb2kwl_2xp-gbDYMTevmkj_-c0G-0clQtc_0WMnRIbNkVBLeRbgOcmtbGGnd8wC6rjJ7tpEG_0wGOloLSUfnvY8kW1k8n'], 30.579283, 76.713349, NOW()),

  -- 6. Banur-Landran 2 Acre
  ('2 Acre Land Banur-Landran Road', 'land-banur-landran-2-acre', 'agricultural', 'available', 'lands', 0, 'INR', 87120, 'Banur-Landran Road', 'Banur', 'Independent', '2 Acre land on Banur-Landran Road, MDB Backside.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.578190, 76.715667, NOW()),

  -- 7. Banur-Landran 12 Acre
  ('12 Acre Land Banur-Landran Road', 'land-banur-landran-12-acre', 'agricultural', 'available', 'lands', 0, 'INR', 522720, 'Banur-Landran Road', 'Banur', 'Independent', 'Large 12 Acre parcel on Banur-Landran Road, MDB Backside.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.577994, 76.716672, NOW()),

  -- 8. Dyallpura
  ('150 Gaj Plot Medallion Aeropark', 'land-medallion-aeropark-dyallpura', 'residential', 'available', 'lands', 70000, 'INR', 1350, 'Medallion Aeropark, Dyallpura', 'Dyalapura', 'Medallion', 'S+3 available, 30ft road, all inclusive price.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.640000, 76.820000, NOW()),

  -- 9. Phase 8B Mohali
  ('1 Kanal Plot in Phase 8B Mohali', 'land-phase-8b-mohali-1-kanal', 'residential', 'available', 'lands', 60000000, 'INR', 5445, 'Phase 8B', 'Mohali', 'Independent', 'Prime 1 Kanal plot opposite Rabab Studio.', ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'], 30.7046, 76.6908, NOW())

ON CONFLICT (slug) DO NOTHING;
