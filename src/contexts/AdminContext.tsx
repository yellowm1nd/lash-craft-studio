import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AdminContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Allowed admin emails
const ADMIN_EMAILS = [
  'info@lashesbydanesh.at',
  't.uhlir@immo.red', // Test account (hidden)
];

// DEV ONLY: Parse credentials from environment variable (Base64 encoded for obfuscation)
// Format: email1:password1,email2:password2
const getDevCredentials = (): Record<string, string> => {
  if (!import.meta.env.DEV || !import.meta.env.VITE_DEV_CREDENTIALS) {
    return {};
  }

  try {
    // Decode Base64 credentials
    const decoded = atob(import.meta.env.VITE_DEV_CREDENTIALS);
    const pairs = decoded.split(',');
    const credentials: Record<string, string> = {};

    pairs.forEach(pair => {
      const [email, password] = pair.split(':');
      if (email && password) {
        credentials[email] = password;
      }
    });

    return credentials;
  } catch (e) {
    console.error('Failed to parse dev credentials');
    return {};
  }
};

const DEV_CREDENTIALS = getDevCredentials();

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
        setUser(session.user);
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // DEV ONLY: Check for dev session
      if (import.meta.env.DEV) {
        const devSession = localStorage.getItem('dev_admin_session');
        if (devSession) {
          try {
            const { email, timestamp } = JSON.parse(devSession);
            const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

            if (Date.now() - timestamp < SESSION_DURATION && ADMIN_EMAILS.includes(email)) {
              const mockUser = {
                id: email === 'info@lashesbydanesh.at' ? 'dev-user-1' : 'dev-user-2',
                email,
                created_at: new Date().toISOString(),
              } as User;

              setUser(mockUser);
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('dev_admin_session');
            }
          } catch (e) {
            localStorage.removeItem('dev_admin_session');
          }
        }
      }

      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if email is allowed
      if (!ADMIN_EMAILS.includes(email)) {
        return { success: false, error: 'Zugriff verweigert' };
      }

      // Try Supabase Auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      }

      // DEV ONLY: Fallback for local development
      if (error && import.meta.env.DEV) {
        const devPassword = DEV_CREDENTIALS[email as keyof typeof DEV_CREDENTIALS];
        if (devPassword && password === devPassword) {
          // Create mock user for dev mode
          const mockUser = {
            id: email === 'info@lashesbydanesh.at' ? 'dev-user-1' : 'dev-user-2',
            email,
            created_at: new Date().toISOString(),
          } as User;

          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('dev_admin_session', JSON.stringify({ email, timestamp: Date.now() }));
          return { success: true };
        }
      }

      return { success: false, error: error?.message || 'Falsches Passwort' };
    } catch (error) {
      return { success: false, error: 'Ein Fehler ist aufgetreten' };
    }
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    localStorage.removeItem('dev_admin_session'); // DEV ONLY
    setUser(null);
    setIsAuthenticated(false);
    navigate('/l-787');
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if email is allowed
      if (!ADMIN_EMAILS.includes(email)) {
        return { success: false, error: 'Zugriff verweigert' };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/l-787/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ein Fehler ist aufgetreten' };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ein Fehler ist aufgetreten' };
    }
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, loading, login, logout, resetPassword, updatePassword }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
