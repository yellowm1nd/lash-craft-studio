/**
 * Service Helper Functions
 * Validation and utility functions for service management
 */

import type { Service } from '@/contexts/ContentContext';

/**
 * Validates and sanitizes a service slug/ID
 * @param slug - The slug to validate
 * @returns Sanitized slug or error message
 */
export const validateSlug = (slug: string): { valid: boolean; sanitized: string; error?: string } => {
  if (!slug || slug.trim().length === 0) {
    return { valid: false, sanitized: '', error: 'Slug darf nicht leer sein' };
  }

  // Remove leading/trailing spaces
  let sanitized = slug.trim();

  // Convert to lowercase
  sanitized = sanitized.toLowerCase();

  // Replace spaces and underscores with hyphens
  sanitized = sanitized.replace(/[\s_]+/g, '-');

  // Remove special characters (keep only a-z, 0-9, and hyphens)
  sanitized = sanitized.replace(/[^a-z0-9-]/g, '');

  // Remove consecutive hyphens
  sanitized = sanitized.replace(/-+/g, '-');

  // Remove leading/trailing hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  // Check minimum length
  if (sanitized.length < 3) {
    return { valid: false, sanitized, error: 'Slug muss mindestens 3 Zeichen lang sein' };
  }

  // Check maximum length
  if (sanitized.length > 100) {
    return { valid: false, sanitized, error: 'Slug darf maximal 100 Zeichen lang sein' };
  }

  // Check if it starts with a letter
  if (!/^[a-z]/.test(sanitized)) {
    return { valid: false, sanitized, error: 'Slug muss mit einem Buchstaben beginnen' };
  }

  return { valid: true, sanitized };
};

/**
 * Checks if a service slug/ID already exists
 * @param slug - The slug to check
 * @param services - Array of existing services
 * @param currentServiceId - ID of current service being edited (to exclude from check)
 * @returns True if duplicate exists
 */
export const checkDuplicateService = (
  slug: string,
  services: Service[],
  currentServiceId?: string
): boolean => {
  return services.some(
    (service) => service.id === slug && service.id !== currentServiceId
  );
};

/**
 * Validates image URL
 * @param url - The URL to validate
 * @returns Validation result
 */
export const validateImageUrl = (url: string): { valid: boolean; error?: string } => {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'Bild-URL darf nicht leer sein' };
  }

  // Check if it's a valid URL
  try {
    const urlObj = new URL(url);

    // Check if it's HTTP or HTTPS
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'URL muss mit http:// oder https:// beginnen' };
    }

    // Check if it looks like an image URL (common image extensions or CDN patterns)
    const isImageExtension = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
    const isImageCDN = /unsplash\.com|cloudinary\.com|imgur\.com|supabase\.co\/storage/i.test(url);

    if (!isImageExtension && !isImageCDN) {
      return {
        valid: true, // Still valid, but warning
        error: 'Warnung: URL scheint kein Bild zu sein. Fortfahren auf eigene Gefahr.'
      };
    }

    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'Ungültige URL. Bitte überprüfen Sie die Eingabe.' };
  }
};

/**
 * Generates a slug from a title
 * @param title - The service title
 * @returns Generated slug
 */
export const generateSlugFromTitle = (title: string): string => {
  const { sanitized } = validateSlug(title);
  return sanitized;
};

/**
 * Validates all required service fields
 * @param service - The service to validate
 * @returns Validation result with errors
 */
export const validateService = (service: Partial<Service>): {
  valid: boolean;
  errors: Record<string, string>
} => {
  const errors: Record<string, string> = {};

  // Title
  if (!service.title || service.title.trim().length === 0) {
    errors.title = 'Titel ist erforderlich';
  } else if (service.title.length > 100) {
    errors.title = 'Titel darf maximal 100 Zeichen lang sein';
  }

  // Slug/ID
  if (!service.id || service.id.trim().length === 0) {
    errors.id = 'Slug/ID ist erforderlich';
  } else {
    const slugValidation = validateSlug(service.id);
    if (!slugValidation.valid) {
      errors.id = slugValidation.error || 'Ungültiger Slug';
    }
  }

  // Excerpt
  if (!service.excerpt || service.excerpt.trim().length === 0) {
    errors.excerpt = 'Kurzbeschreibung ist erforderlich';
  } else if (service.excerpt.length > 200) {
    errors.excerpt = 'Kurzbeschreibung darf maximal 200 Zeichen lang sein';
  }

  // Description
  if (!service.description || service.description.trim().length === 0) {
    errors.description = 'Beschreibung ist erforderlich';
  } else if (service.description.length < 50) {
    errors.description = 'Beschreibung sollte mindestens 50 Zeichen lang sein';
  }

  // Image URL
  if (!service.imageUrl || service.imageUrl.trim().length === 0) {
    errors.imageUrl = 'Bild-URL ist erforderlich';
  } else {
    const imageValidation = validateImageUrl(service.imageUrl);
    if (!imageValidation.valid) {
      errors.imageUrl = imageValidation.error || 'Ungültige Bild-URL';
    }
  }

  // Order
  if (service.order === undefined || service.order < 0) {
    errors.order = 'Reihenfolge muss eine positive Zahl sein';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Generates SEO-friendly meta description from service data
 * @param service - The service
 * @returns Meta description
 */
export const generateServiceMetaDescription = (service: Service): string => {
  // Take first 155 characters of excerpt or description
  const text = service.excerpt || service.description;
  if (text.length <= 155) {
    return text;
  }
  return text.substring(0, 152) + '...';
};

/**
 * Generates SEO-friendly title from service data
 * @param service - The service
 * @returns SEO title
 */
export const generateServiceSEOTitle = (service: Service): string => {
  return `${service.title} - Lashes by Danesh Wien 1220`;
};

/**
 * Calculates suggested order for new service
 * @param services - Existing services
 * @returns Suggested order value
 */
export const suggestNextOrder = (services: Service[]): number => {
  if (services.length === 0) return 1;
  const maxOrder = Math.max(...services.map(s => s.order || 0));
  return maxOrder + 1;
};
