import { supabase } from './supabase';

// Helper to use service role for admin operations
const getServiceRoleHeaders = () => {
  const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };
};

// Content API
export const contentAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getByKey(key: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('key', key)
      .single();

    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('category', category);

    if (error) throw error;
    return data;
  },

  async upsert(key: string, value: any, category: string) {
    const { data, error } = await supabase
      .from('content')
      .upsert({ key, value, category }, { onConflict: 'key' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(key: string) {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('key', key);

    if (error) throw error;
  },
};

// Services API
export const servicesAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(service: {
    id: string;
    title: string;
    excerpt: string;
    description: string;
    image_url: string;
    order: number;
    seo_section_title?: string | null;
    seo_section_content?: string | null;
    seo_section_image_url?: string | null;
  }) {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{
    title: string;
    excerpt: string;
    description: string;
    image_url: string;
    order: number;
    seo_section_title?: string | null;
    seo_section_content?: string | null;
    seo_section_image_url?: string | null;
  }>) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Gallery API
export const galleryAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async create(item: { image_url: string; title: string; description?: string; order: number }) {
    const { data, error } = await supabase
      .from('gallery')
      .insert(item)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{ image_url: string; title: string; description?: string; order: number }>) {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Testimonials API
export const testimonialsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(testimonial: { name: string; text: string; rating: number; image_url?: string }) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{ name: string; text: string; rating: number; image_url?: string }>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Prices API
export const pricesAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('prices')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getByServiceId(serviceId: string) {
    const { data, error } = await supabase
      .from('prices')
      .select('*')
      .eq('service_id', serviceId)
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async create(price: {
    service_id: string;
    category: string;
    duration_range?: string;
    starting_price?: number;
    description?: string;
    items: any;
    order: number;
  }) {
    const { data, error } = await supabase
      .from('prices')
      .insert(price)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{
    service_id: string;
    category: string;
    duration_range?: string;
    starting_price?: number;
    description?: string;
    items: any;
    order: number;
  }>) {
    const { data, error } = await supabase
      .from('prices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('prices')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Settings API
export const settingsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;
    return data;
  },

  async getByKey(key: string) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .single();

    if (error) throw error;
    return data;
  },

  async upsert(key: string, value: any) {
    const { data, error } = await supabase
      .from('settings')
      .upsert({ key, value }, { onConflict: 'key' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(key: string) {
    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('key', key);

    if (error) throw error;
  },
};

// Promotions API
export const promotionsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getAllAdmin() {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(promotion: {
    title: string;
    description: string;
    image_url: string;
    active: boolean;
    order: number;
  }) {
    const { data, error } = await supabase
      .from('promotions')
      .insert(promotion)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{
    title: string;
    description: string;
    image_url: string;
    active: boolean;
    order: number;
  }>) {
    const { data, error } = await supabase
      .from('promotions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('promotions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Storage/Upload API
export const uploadAPI = {
  async uploadImage(file: File, folder: string = 'general'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    return publicUrl;
  },

  async deleteImage(url: string) {
    // Extract path from URL
    const urlParts = url.split('/storage/v1/object/public/images/');
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    const path = urlParts[1];

    const { error } = await supabase.storage
      .from('images')
      .remove([path]);

    if (error) throw error;
  },

  getPublicUrl(path: string): string {
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(path);

    return publicUrl;
  },
};
