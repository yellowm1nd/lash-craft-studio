import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import contentData from '@/data/content.json';
import { galleryAPI, servicesAPI, testimonialsAPI, pricesAPI, settingsAPI, promotionsAPI } from '@/lib/supabase-api';

export interface SiteSettings {
  brandPrimary: string;
  brandAccent: string;
  bookingUrl: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  logoUrl: string;
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface Service {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  order: number;
  seoSectionTitle?: string;
  seoSectionContent?: string;
  seoSectionImageUrl?: string;
}

export interface PriceItem {
  name: string;
  amount: number;
  duration: number;
  badge: string;
  description?: string;
}

export interface PriceCategory {
  serviceId: string;
  category: string;
  durationRange?: string;
  startingPrice?: number;
  description?: string;
  items: PriceItem[];
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  stars: number;
  imageUrl: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
  order: number;
}

export interface Legal {
  impressum: string;
  datenschutz: string;
}

export interface Content {
  siteSettings: SiteSettings;
  openingHours: OpeningHour[];
  services: Service[];
  prices: PriceCategory[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  promotions: Promotion[];
  legal: Legal;
}

interface ContentContextType {
  content: Content;
  updateContent: (newContent: Content) => void;
  resetContent: () => void;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Content>(contentData as Content);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load data from Supabase (gallery, services, etc.)
  useEffect(() => {
    loadFromSupabase();

    // Polling: Reload data every 60 seconds
    const pollingInterval = setInterval(() => {
      loadFromSupabase(true); // Silent reload without loading state
    }, 60000); // 60 seconds

    // Reload when tab/window becomes visible (user switches back from admin)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadFromSupabase(true); // Silent reload
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(pollingInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadFromSupabase = async (silent: boolean = false) => {
    if (!silent) {
      setIsLoading(true);
    }

    try {
      // Load gallery from Supabase
      const galleryData = await galleryAPI.getAll();
      if (galleryData && galleryData.length > 0) {
        const mappedGallery: GalleryImage[] = galleryData.map((item) => ({
          id: item.id,
          url: item.image_url,
          category: item.description || 'work',
          order: item.order,
        }));

        setContent((prev) => ({
          ...prev,
          gallery: mappedGallery,
        }));
      }

      // Load services from Supabase
      const servicesData = await servicesAPI.getAll();
      if (servicesData && servicesData.length > 0) {
        const mappedServices: Service[] = servicesData.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          description: item.description,
          imageUrl: item.image_url,
          order: item.order,
          seoSectionTitle: item.seo_section_title,
          seoSectionContent: item.seo_section_content,
          seoSectionImageUrl: item.seo_section_image_url,
        }));

        setContent((prev) => ({
          ...prev,
          services: mappedServices,
        }));
      }

      // Load testimonials from Supabase
      const testimonialsData = await testimonialsAPI.getAll();
      if (testimonialsData && testimonialsData.length > 0) {
        const mappedTestimonials: Testimonial[] = testimonialsData.map((item) => ({
          id: item.id,
          name: item.name,
          text: item.text,
          stars: item.rating,
          imageUrl: item.image_url || '',
        }));

        setContent((prev) => ({
          ...prev,
          testimonials: mappedTestimonials,
        }));
      }

      // Load prices from Supabase
      const pricesData = await pricesAPI.getAll();
      if (pricesData && pricesData.length > 0) {
        const mappedPrices: PriceCategory[] = pricesData.map((item) => ({
          serviceId: item.service_id || '',
          category: item.category,
          durationRange: item.duration_range,
          startingPrice: item.starting_price,
          description: item.description,
          items: item.items,
        }));

        setContent((prev) => ({
          ...prev,
          prices: mappedPrices,
        }));
      }

      // Load promotions from Supabase
      const promotionsData = await promotionsAPI.getAll();
      if (promotionsData && promotionsData.length > 0) {
        const mappedPromotions: Promotion[] = promotionsData.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.image_url,
          active: item.active,
          order: item.order,
        }));

        setContent((prev) => ({
          ...prev,
          promotions: mappedPromotions,
        }));
      }

      // Load settings from Supabase
      const settings = await settingsAPI.getAll();
      if (settings && settings.length > 0) {
        const siteSettingsData = settings.find((s) => s.key === 'siteSettings');
        const openingHoursData = settings.find((s) => s.key === 'openingHours');

        if (siteSettingsData) {
          setContent((prev) => ({
            ...prev,
            siteSettings: siteSettingsData.value,
          }));
        }

        if (openingHoursData) {
          setContent((prev) => ({
            ...prev,
            openingHours: openingHoursData.value,
          }));
        }
      }
    } catch (error) {
      console.error('Error loading from Supabase:', error);
      // Fallback to default data on error
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  const refreshContent = async () => {
    await loadFromSupabase(false);
  };

  const updateContent = (newContent: Content) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(contentData as Content);
    localStorage.removeItem('siteContent');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isLoading, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
