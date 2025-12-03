-- Check and fix services table IDs
-- Execute this AFTER the prices migration

-- Step 1: Check current services
SELECT id, title, excerpt
FROM services
ORDER BY "order";

-- Step 2: If you see UUIDs like '7b0414bb-5ec9-48ae-b87d-ae4b2dca979c',
-- we need to update them to SEO-friendly slugs

-- Option A: Update existing service IDs (ONLY if you want to keep existing data)
-- WARNING: This will change the ID, make sure no other references exist!
-- UPDATE services SET id = 'wimpernverlaengerung' WHERE title = 'Wimpernverlängerungen';
-- UPDATE services SET id = 'augenbrauen-wimpern-behandlungen' WHERE title = 'Augenbrauen & Wimpernbehandlungen';

-- Option B: Delete old services and let the app recreate them with correct IDs
-- This is safer if services are managed from the admin panel
-- DELETE FROM services WHERE id LIKE '%-%-%-%-%';

-- Step 3: Verify services after update
SELECT id, title, excerpt
FROM services
ORDER BY "order";

-- INSTRUCTIONS:
-- 1. First run the SELECT to see current services
-- 2. If IDs are UUIDs, uncomment EITHER Option A OR Option B
-- 3. Run the chosen option
-- 4. Verify with the final SELECT
