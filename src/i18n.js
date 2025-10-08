import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: {
        translation: require("../public/locales/fr/translation.json"),
      },
      en: {
        translation: require("../public/locales/en/translation.json"),
      },
    },
  });

export default i18n;
