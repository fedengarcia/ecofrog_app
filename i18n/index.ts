import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enProducts from "./locales/en/products.json";
import enVideos from "./locales/en/videos.json";
import enContact from "./locales/en/contact.json";
import enEcofrog from "./locales/en/ecofrog.json";

import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esProducts from "./locales/es/products.json";
import esVideos from "./locales/es/videos.json";
import esContact from "./locales/es/contact.json";
import esEcofrog from "./locales/es/ecofrog.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      products: enProducts,
      videos: enVideos,
      contact: enContact,
      ecofrog: enEcofrog,
    },
    es: {
      common: esCommon,
      home: esHome,
      products: esProducts,
      videos: esVideos,
      contact: esContact,
      ecofrog: esEcofrog,
    },
  },
  lng: "es",
  fallbackLng: "es",
  defaultNS: "common",
  ns: ["common", "home", "products", "videos", "contact", "ecofrog"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
