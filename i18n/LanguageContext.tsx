import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./index";

const LANGUAGE_KEY = "@ecofrog_language";

interface LanguageContextType {
  language: "en" | "es";
  changeLanguage: (lang: "en" | "es") => Promise<void>;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  changeLanguage: async () => {},
  isReady: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (stored === "en" || stored === "es") {
          setLanguage(stored);
          await i18n.changeLanguage(stored);
        }
      } catch {
        // Use default
      } finally {
        setIsReady(true);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: "en" | "es") => {
    setLanguage(lang);
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
