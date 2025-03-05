
import { ruTranslations } from './ru';
import { enTranslations } from './en';
import { esTranslations } from './es';
import { frTranslations } from './fr';
import { deTranslations } from './de';

export const translations = {
  ru: ruTranslations,
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations
};

// Type for our translation keys
export type TranslationKey = keyof typeof ruTranslations;
