/**
 * Data Migration Script
 * Run this ONCE after setting up Supabase to migrate existing data from content.json
 */

import { servicesAPI, galleryAPI, testimonialsAPI, pricesAPI, settingsAPI } from './supabase-api';
import contentData from '../data/content.json';

export async function migrateData() {
  console.log('🚀 Starting data migration...');

  try {
    // Migrate Services
    console.log('📦 Migrating services...');
    for (const service of contentData.services) {
      await servicesAPI.create({
        title: service.title,
        excerpt: service.excerpt,
        description: service.description,
        image_url: service.imageUrl,
        order: service.order,
      });
    }
    console.log(`✅ Migrated ${contentData.services.length} services`);

    // Migrate Gallery
    console.log('🖼️  Migrating gallery...');
    for (const item of contentData.gallery) {
      await galleryAPI.create({
        image_url: item.url,
        title: `Gallery Image ${item.id}`,
        description: item.category || null,
        order: item.order,
      });
    }
    console.log(`✅ Migrated ${contentData.gallery.length} gallery images`);

    // Migrate Testimonials
    console.log('⭐ Migrating testimonials...');
    for (const testimonial of contentData.testimonials) {
      await testimonialsAPI.create({
        name: testimonial.name,
        text: testimonial.text,
        rating: testimonial.stars,
        image_url: testimonial.imageUrl || null,
      });
    }
    console.log(`✅ Migrated ${contentData.testimonials.length} testimonials`);

    // Migrate Prices
    console.log('💰 Migrating prices...');
    let order = 1;
    for (const price of contentData.prices) {
      await pricesAPI.create({
        category: price.category,
        items: price.items,
        order: order++,
      });
    }
    console.log(`✅ Migrated ${contentData.prices.length} price categories`);

    // Migrate Settings
    console.log('⚙️  Migrating settings...');

    await settingsAPI.upsert('siteSettings', contentData.siteSettings);
    console.log('✅ Migrated site settings');

    await settingsAPI.upsert('openingHours', contentData.openingHours);
    console.log('✅ Migrated opening hours');

    await settingsAPI.upsert('legal', contentData.legal);
    console.log('✅ Migrated legal content');

    console.log('🎉 Data migration completed successfully!');
    return {
      success: true,
      message: 'All data migrated successfully'
    };
  } catch (error) {
    console.error('❌ Migration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper function to check if migration is needed
export async function checkMigrationStatus() {
  try {
    const services = await servicesAPI.getAll();
    const gallery = await galleryAPI.getAll();

    return {
      needsMigration: services.length === 0 && gallery.length === 0,
      servicesCount: services.length,
      galleryCount: gallery.length,
    };
  } catch (error) {
    console.error('Error checking migration status:', error);
    return {
      needsMigration: true,
      servicesCount: 0,
      galleryCount: 0,
    };
  }
}
