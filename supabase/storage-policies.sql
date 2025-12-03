-- Storage Policies for Images Bucket
-- Run this SQL in Supabase SQL Editor AFTER creating the 'images' bucket

-- Enable public read access to images bucket
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow anyone to upload images (we handle auth in the app)
CREATE POLICY "Allow upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow anyone to update images
CREATE POLICY "Allow update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

-- Allow anyone to delete images
CREATE POLICY "Allow delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
