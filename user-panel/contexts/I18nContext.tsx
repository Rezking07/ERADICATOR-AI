import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../locales';

type Locale = 'id' | 'en';
type Translations = typeof translations.id;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // FIX: Changed `keyof Translations` to `string` to allow for nested keys like 'parent.child'.
  // The original type was too restrictive and caused type errors when using dot notation for translations.
  t: (key: string, options?: any) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper function for nested keys
function getNestedTranslation(translations: any, key: string): string | undefined {
    return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), translations);
}


export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('locale');
    return (savedLocale as Locale) || 'id'; // Default to Indonesian
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations[locale], key) || key;
    return translation;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
