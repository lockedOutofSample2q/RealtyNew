-- Migration to add Open Graph metadata columns
-- Run this in your Supabase SQL Editor

BEGIN;

-- 1. Add og_title and og_description to all physical tables
ALTER TABLE apartments 
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT;

ALTER TABLE houses 
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT;

ALTER TABLE lands 
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT;

-- Note: We do not need to recreate the properties view because the frontend 
-- has been updated to query the physical tables directly for metadata.

COMMIT;
