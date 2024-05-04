import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import BackEnd from 'i18next-http-backend'

i18n
  .use(BackEnd)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { // for symbols
      escapeValue: false, 
    },
  });

export default i18n;