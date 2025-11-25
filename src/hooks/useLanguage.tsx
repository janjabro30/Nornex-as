"use client";

import React, { createContext, useContext, useState, useCallback, useSyncExternalStore } from "react";
import { translations } from "@/i18n/translations";
import type { Language } from "@/types";

type Translations = typeof translations.no | typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getLanguageFromStorage(): Language {
  if (typeof window === "undefined") return "no";
  const stored = localStorage.getItem("nornex-language") as Language | null;
  if (stored && (stored === "no" || stored === "en")) {
    return stored;
  }
  return "no";
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): Language {
  return "no";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const storedLanguage = useSyncExternalStore(
    subscribeToStorage,
    getLanguageFromStorage,
    getServerSnapshot
  );
  
  const [language, setLanguageState] = useState<Language>(storedLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("nornex-language", lang);
    document.documentElement.lang = lang === "no" ? "nb" : "en";
  }, []);

  const t: Translations = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
