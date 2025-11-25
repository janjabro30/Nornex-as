import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { CartDrawer, FloatingCartButton } from "@/components/cart";

export const metadata: Metadata = {
  title: "Nornex AS - Build, Repair, Protect",
  description: "Your trusted partner for IT services, electronics, and tech solutions. Quality products and expert support.",
  keywords: ["IT services", "electronics", "computer repair", "networking", "Nornex"],
  openGraph: {
    title: "Nornex AS - Build, Repair, Protect",
    description: "Your trusted partner for IT services, electronics, and tech solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Nornex AS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nornex AS - Build, Repair, Protect",
    description: "Your trusted partner for IT services, electronics, and tech solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <FloatingCartButton />
      </body>
    </html>
  );
}
