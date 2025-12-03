-- Migration: Add service_id and additional fields to prices table
-- Execute this SQL in your Supabase SQL Editor

-- Step 1: Add new columns to prices table
ALTER TABLE prices
ADD COLUMN IF NOT EXISTS service_id TEXT,
ADD COLUMN IF NOT EXISTS duration_range TEXT,
ADD COLUMN IF NOT EXISTS starting_price NUMERIC,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;

-- Step 2: Update existing records with service_id
-- For Wimpernverlängerung categories
UPDATE prices
SET service_id = 'wimpernverlaengerung'
WHERE category IN (
  'Volumen',
  'Leichtes Volumen',
  'Megavolumen',
  'Neuanlage 1:1',
  'Wimpernverlängerung - Volumen',
  'Wimpernverlängerung - Leichtes Volumen',
  'Wimpernverlängerung - Megavolumen',
  'Wimpernverlängerung - Neulage 1:1 Technik',
  'Wimpernverlängerung - Entfernen',
  'Entfernung'
);

-- For Augenbrauen & Wimpern categories
UPDATE prices
SET service_id = 'augenbrauen-wimpern-behandlungen'
WHERE category IN (
  'Färben & Zupfen'
);

-- Step 3: Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_prices_service_id ON prices(service_id);

-- Step 4: Verify the migration
SELECT
  id,
  service_id,
  category,
  duration_range,
  starting_price,
  "order"
FROM prices
ORDER BY service_id, "order";

-- INSTRUCTIONS:
-- 1. Open Supabase Dashboard
-- 2. Go to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute
-- 5. Check the output to verify all records have service_id assigned
