import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database types
export type Database = {
  public: {
    Tables: {
      content: {
        Row: {
          id: string;
          key: string;
          value: any;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: any;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: any;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          description: string;
          image_url: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          description: string;
          image_url: string;
          order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          description?: string;
          image_url?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          image_url: string;
          title: string;
          description: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          title: string;
          description?: string | null;
          order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          title?: string;
          description?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          text: string;
          rating: number;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          text: string;
          rating: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          text?: string;
          rating?: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      prices: {
        Row: {
          id: string;
          category: string;
          items: any;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          items: any;
          order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          items?: any;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
