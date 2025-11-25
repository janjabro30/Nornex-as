import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language } from "@/lib/translations";

type CustomerType = "private" | "business";

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  customerType: CustomerType;
  setCustomerType: (type: CustomerType) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "no",
      setLanguage: (language) => set({ language }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
      customerType: "private",
      setCustomerType: (customerType) => set({ customerType }),
    }),
    {
      name: "nornex-app",
      partialize: (state) => ({ language: state.language, customerType: state.customerType }),
    }
  )
);
