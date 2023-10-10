'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg, } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string) =>
        import(`./locales/${language}.json`),
    ),
  )
  .init({
    fallbackLng: 'fr',
    lng: 'fr',
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  });

export function useTranslation() {
  return useTranslationOrg();
}
