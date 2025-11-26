import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, BackToTop } from "@/components/layout";
import { CookieConsent, CustomerTypeModal } from "@/components/modals";

export const metadata: Metadata = {
  title: "NORNEX - Profesjonelle IT-tjenester | Oslo, Norge",
  description: "Ledende leverandør av IT-tjenester til bedrifter. Webutvikling, app-utvikling, managed IT, sikkerhet, sky, support og hardware. ISO-sertifisert. 24/7 support. Kontakt oss i dag!",
  keywords: ["IT-tjenester Norge", "Webutvikling Oslo", "App-utvikling", "Managed IT Oslo", "IT-support bedrifter", "Cybersikkerhet", "Cloud tjenester", "IT-konsulent Oslo"],
  openGraph: {
    title: "NORNEX - Profesjonelle IT-tjenester | Oslo, Norge",
    description: "Ledende leverandør av IT-tjenester til bedrifter. Webutvikling, app-utvikling, managed IT, sikkerhet og support.",
    url: "https://nornex.no",
    siteName: "NORNEX AS",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NORNEX - Profesjonelle IT-tjenester",
    description: "Ledende leverandør av IT-tjenester til bedrifter i Norge.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nornex.no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NORNEX AS",
    "url": "https://nornex.no",
    "logo": "https://nornex.no/logo.png",
    "description": "Ledende leverandør av IT-tjenester, webutvikling og app-utvikling til bedrifter i Norge",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Brynsveien 18",
      "addressLocality": "Oslo",
      "postalCode": "0667",
      "addressCountry": "NO"
    },
    "sameAs": [
      "https://www.linkedin.com/company/nornex",
      "https://www.facebook.com/nornex"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+47-123-45-678",
      "contactType": "customer service",
      "availableLanguage": ["Norwegian", "English"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Webutvikling",
            "description": "Profesjonelle nettsider og webapplikasjoner"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "App-utvikling",
            "description": "Native og cross-platform mobilapper for iOS og Android"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Managed IT",
            "description": "Komplett IT-drift og support for bedrifter"
          }
        }
      ]
    }
  };

  return (
    <html lang="no">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <CookieConsent />
        <CustomerTypeModal />
      </body>
    </html>
  );
}
