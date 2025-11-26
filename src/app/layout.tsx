import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nornex - IT-tjenester og Rådgivning",
    template: "%s | Nornex",
  },
  description: "Nornex leverer IT-infrastruktur, cybersikkerhet, skyløsninger, support, hardware, reparasjoner, webutvikling, mobilapplikasjoner og webapplikasjoner. Lokalisert i Brynsveien 18, 0667 Oslo, Norge.",
  keywords: ["IT-tjenester", "cybersikkerhet", "skyløsninger", "IT-support", "webutvikling", "mobilapp", "Oslo", "Norge", "Nornex"],
  authors: [{ name: "Nornex" }],
  creator: "Nornex",
  publisher: "Nornex",
  metadataBase: new URL("https://nornex.no"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/blogg/feed",
    },
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://nornex.no",
    siteName: "Nornex",
    title: "Nornex - IT-tjenester og Rådgivning",
    description: "Profesjonelle IT-tjenester for bedrifter i Oslo og Norge.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nornex - IT-tjenester og Rådgivning",
    description: "Profesjonelle IT-tjenester for bedrifter i Oslo og Norge.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
