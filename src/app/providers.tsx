"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Header, Footer, FloatingButtons } from "@/components/layout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </LanguageProvider>
  );
}
