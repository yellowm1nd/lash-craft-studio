import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  resetConsent: () => void;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const STORAGE_KEY = 'lashes-cookie-preferences';
const CONSENT_KEY = 'lashes-cookie-consent';

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      } catch {
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  });

  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    return localStorage.getItem(CONSENT_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    if (hasConsented) {
      localStorage.setItem(CONSENT_KEY, 'true');
    }
  }, [preferences, hasConsented]);

  const updatePreferences = (prefs: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...prefs,
      necessary: true, // Always keep necessary cookies enabled
    }));
    setHasConsented(true);
  };

  const acceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    setHasConsented(true);
  };

  const acceptNecessaryOnly = () => {
    setPreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    setHasConsented(true);
  };

  const resetConsent = () => {
    setPreferences(defaultPreferences);
    setHasConsented(false);
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        updatePreferences,
        acceptAll,
        acceptNecessaryOnly,
        resetConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};
