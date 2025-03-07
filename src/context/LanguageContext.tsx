
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import en from '../translations/en';
import ru from '../translations/ru';
import es from '../translations/es';
import { LanguageContextType } from './LanguageContextTypes';

// Create a context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  t: ru,
  setLanguage: () => {}
});

// Create the LanguageProvider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize language from localStorage or default to 'ru'
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return (storedLanguage && ['ru', 'en', 'es'].includes(storedLanguage)) ? storedLanguage : 'ru';
  });

  // Get the appropriate translation based on the current language
  const getTranslation = (lang: string) => {
    switch (lang) {
      case 'en':
        return en;
      case 'es':
        return es;
      case 'ru':
      default:
        return ru;
    }
  };

  // Set the translation based on the current language
  const [translation, setTranslation] = useState(getTranslation(language));

  // Update translation when language changes
  useEffect(() => {
    const newTranslation = getTranslation(language);
    setTranslation(newTranslation);
    localStorage.setItem('language', language);
  }, [language]);

  // Create the context value
  const contextValue: LanguageContextType = {
    language,
    t: translation,
    setLanguage
  };

  // Return the provider with the context value
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
