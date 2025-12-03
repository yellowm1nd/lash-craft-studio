/**
 * Storage Limits & Quota Management
 *
 * Limits:
 * - Total Storage: 500 MB
 * - Gallery Images: 75 max
 * - Service Images: 10 max
 * - Testimonial Images: 20 max
 * - Promotion Images: 3 max
 */

import { supabase } from './supabase';

// Limits in bytes
export const LIMITS = {
  TOTAL_STORAGE_MB: 500,
  TOTAL_STORAGE_BYTES: 500 * 1024 * 1024, // 500 MB

  MAX_GALLERY_IMAGES: 75,
  MAX_SERVICE_IMAGES: 10,
  MAX_TESTIMONIAL_IMAGES: 20,
  MAX_PROMOTION_IMAGES: 3,

  MAX_FILE_SIZE_MB: 5,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024, // 5 MB

  // Warning thresholds
  WARNING_60_PERCENT: 0.6,  // 300 MB
  WARNING_70_PERCENT: 0.7,  // 350 MB
  WARNING_80_PERCENT: 0.8,  // 400 MB
  WARNING_90_PERCENT: 0.9,  // 450 MB
  CRITICAL_95_PERCENT: 0.95, // 475 MB
};

export interface StorageStats {
  totalUsedBytes: number;
  totalUsedMB: number;
  totalLimitMB: number;
  percentageUsed: number;
  remainingMB: number;

  galleryCount: number;
  serviceCount: number;
  testimonialCount: number;
  promotionCount: number;

  canUpload: boolean;
  warningLevel: 'safe' | 'info' | 'warning' | 'critical' | 'blocked';
  warningMessage: string | null;
}

/**
 * Get current storage usage from Supabase
 */
export async function getStorageStats(): Promise<StorageStats> {
  try {
    // Get all files from images bucket
    const { data: files, error } = await supabase.storage
      .from('images')
      .list('', {
        limit: 1000,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;

    // Calculate total size
    const totalUsedBytes = files?.reduce((sum, file) => {
      return sum + (file.metadata?.size || 0);
    }, 0) || 0;

    const totalUsedMB = totalUsedBytes / (1024 * 1024);
    const percentageUsed = totalUsedBytes / LIMITS.TOTAL_STORAGE_BYTES;
    const remainingMB = LIMITS.TOTAL_STORAGE_MB - totalUsedMB;

    // Count images by folder
    const galleryCount = files?.filter(f => f.name.startsWith('gallery/')).length || 0;
    const serviceCount = files?.filter(f => f.name.startsWith('services/')).length || 0;
    const testimonialCount = files?.filter(f => f.name.startsWith('testimonials/')).length || 0;
    const promotionCount = files?.filter(f => f.name.startsWith('promotions/')).length || 0;

    // Determine warning level
    let warningLevel: StorageStats['warningLevel'] = 'safe';
    let warningMessage: string | null = null;
    let canUpload = true;

    if (percentageUsed >= LIMITS.CRITICAL_95_PERCENT) {
      warningLevel = 'blocked';
      warningMessage = 'LIMIT ERREICHT! Bitte Bilder löschen um weiter hochzuladen.';
      canUpload = false;
    } else if (percentageUsed >= LIMITS.WARNING_90_PERCENT) {
      warningLevel = 'critical';
      warningMessage = 'KRITISCH! Nur noch wenig Speicher frei. Bitte JETZT Bilder löschen!';
    } else if (percentageUsed >= LIMITS.WARNING_80_PERCENT) {
      warningLevel = 'warning';
      warningMessage = 'Warnung: Speicher wird knapp. Bitte bald Bilder aufräumen.';
    } else if (percentageUsed >= LIMITS.WARNING_70_PERCENT) {
      warningLevel = 'info';
      warningMessage = 'Info: Bitte demnächst alte Bilder löschen.';
    } else if (percentageUsed >= LIMITS.WARNING_60_PERCENT) {
      warningLevel = 'info';
      warningMessage = 'Speicher gut genutzt. Alles im grünen Bereich.';
    }

    return {
      totalUsedBytes,
      totalUsedMB: Math.round(totalUsedMB * 10) / 10,
      totalLimitMB: LIMITS.TOTAL_STORAGE_MB,
      percentageUsed: Math.round(percentageUsed * 100) / 100,
      remainingMB: Math.round(remainingMB * 10) / 10,

      galleryCount,
      serviceCount,
      testimonialCount,
      promotionCount,

      canUpload,
      warningLevel,
      warningMessage,
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);

    // Return safe defaults on error
    return {
      totalUsedBytes: 0,
      totalUsedMB: 0,
      totalLimitMB: LIMITS.TOTAL_STORAGE_MB,
      percentageUsed: 0,
      remainingMB: LIMITS.TOTAL_STORAGE_MB,

      galleryCount: 0,
      serviceCount: 0,
      testimonialCount: 0,
      promotionCount: 0,

      canUpload: true,
      warningLevel: 'safe',
      warningMessage: null,
    };
  }
}

/**
 * Check if upload is allowed for specific folder
 */
export async function canUploadToFolder(folder: 'gallery' | 'services' | 'testimonials' | 'promotions'): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const stats = await getStorageStats();

  // Check storage limit
  if (!stats.canUpload) {
    return {
      allowed: false,
      reason: 'Speicherlimit erreicht (500 MB). Bitte zuerst Bilder löschen.',
    };
  }

  // Check folder-specific limits
  if (folder === 'gallery' && stats.galleryCount >= LIMITS.MAX_GALLERY_IMAGES) {
    return {
      allowed: false,
      reason: `Maximum ${LIMITS.MAX_GALLERY_IMAGES} Galerie-Bilder erreicht. Bitte zuerst alte Bilder löschen.`,
    };
  }

  if (folder === 'services' && stats.serviceCount >= LIMITS.MAX_SERVICE_IMAGES) {
    return {
      allowed: false,
      reason: `Maximum ${LIMITS.MAX_SERVICE_IMAGES} Service-Bilder erreicht.`,
    };
  }

  if (folder === 'testimonials' && stats.testimonialCount >= LIMITS.MAX_TESTIMONIAL_IMAGES) {
    return {
      allowed: false,
      reason: `Maximum ${LIMITS.MAX_TESTIMONIAL_IMAGES} Testimonial-Bilder erreicht.`,
    };
  }

  if (folder === 'promotions' && stats.promotionCount >= LIMITS.MAX_PROMOTION_IMAGES) {
    return {
      allowed: false,
      reason: `Maximum ${LIMITS.MAX_PROMOTION_IMAGES} Aktions-Bilder erreicht.`,
    };
  }

  return { allowed: true };
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
}

/**
 * Get warning color for UI
 */
export function getWarningColor(level: StorageStats['warningLevel']): string {
  switch (level) {
    case 'safe':
      return 'text-green-600';
    case 'info':
      return 'text-blue-600';
    case 'warning':
      return 'text-orange-600';
    case 'critical':
      return 'text-red-600';
    case 'blocked':
      return 'text-red-800';
    default:
      return 'text-gray-600';
  }
}

/**
 * Get warning background color for UI
 */
export function getWarningBgColor(level: StorageStats['warningLevel']): string {
  switch (level) {
    case 'safe':
      return 'bg-green-50 border-green-200';
    case 'info':
      return 'bg-blue-50 border-blue-200';
    case 'warning':
      return 'bg-orange-50 border-orange-200';
    case 'critical':
      return 'bg-red-50 border-red-200';
    case 'blocked':
      return 'bg-red-100 border-red-300';
    default:
      return 'bg-gray-50 border-gray-200';
  }
}
