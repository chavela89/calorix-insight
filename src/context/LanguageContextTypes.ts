
export type SupportedLanguage = 'ru' | 'en' | 'es' | 'fr' | 'de';

export type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: Record<string, string>;
};
