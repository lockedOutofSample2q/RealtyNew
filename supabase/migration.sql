-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Adds all extended property fields

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS building_name       text,
  ADD COLUMN IF NOT EXISTS address             text,
  ADD COLUMN IF NOT EXISTS bedrooms_max        integer,
  ADD COLUMN IF NOT EXISTS highlights          text[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS amenities           text[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS amenities_gallery   text[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS interior_features   text[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS nearby_landmarks    jsonb     DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS latitude            numeric,
  ADD COLUMN IF NOT EXISTS longitude           numeric,
  ADD COLUMN IF NOT EXISTS developer_website   text,
  ADD COLUMN IF NOT EXISTS image_count         integer,
  ADD COLUMN IF NOT EXISTS payment_plan        jsonb,
  ADD COLUMN IF NOT EXISTS documents           jsonb     DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS unit_types_image    text,
  ADD COLUMN IF NOT EXISTS unit_types_coming_soon boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS agent_name          text,
  ADD COLUMN IF NOT EXISTS agent_title         text,
  ADD COLUMN IF NOT EXISTS agent_email         text,
  ADD COLUMN IF NOT EXISTS agent_phone         text,
  ADD COLUMN IF NOT EXISTS agent_photo         text,
  ADD COLUMN IF NOT EXISTS agent_languages     text[]    DEFAULT '{}';
