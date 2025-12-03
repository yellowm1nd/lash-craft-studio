-- Migration: Add SEO section fields to services table
-- Created: 2025-10-17
-- Description: Adds seo_section_title, seo_section_content, and seo_section_image_url fields to services table

-- Add new columns to services table
ALTER TABLE services
ADD COLUMN IF NOT EXISTS seo_section_title TEXT,
ADD COLUMN IF NOT EXISTS seo_section_content TEXT,
ADD COLUMN IF NOT EXISTS seo_section_image_url TEXT;

-- Create indexes for better performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_services_seo_section_title ON services(seo_section_title);

-- Comment on columns for documentation
COMMENT ON COLUMN services.seo_section_title IS 'Title for the SEO information section on service detail pages';
COMMENT ON COLUMN services.seo_section_content IS 'Markdown content for the SEO information section';
COMMENT ON COLUMN services.seo_section_image_url IS 'Image URL for the SEO information section (displayed on the right)';
