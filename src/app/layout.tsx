import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { CookieConsent, CustomerTypeModal } from "@/components/modals";

export const metadata: Metadata = {
  title: "Nornex AS - Bærekraftige IT-løsninger",
  description: "Kvalitets refurbished teknologi med miljøansvar. Vi gir IT-utstyr nytt liv.",
  keywords: ["refurbished", "IT", "bærekraftig", "resirkulering", "Norge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <CustomerTypeModal />
      </body>
    </html>
  );
}
