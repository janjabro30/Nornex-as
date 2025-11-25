import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language } from "@/lib/translations";

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "no",
      setLanguage: (language) => set({ language }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
    }),
    {
      name: "nornex-app",
      partialize: (state) => ({ language: state.language }),
    }
  )
);
