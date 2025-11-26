/**
 * NORNEX AS - Admin Dashboard Root Layout
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import type { Metadata } from "next";
import "./globals.css";
import { COMPANY_INFO, SEO_DEFAULTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: SEO_DEFAULTS.title,
  description: SEO_DEFAULTS.description,
  keywords: [...SEO_DEFAULTS.keywords],
  authors: [{ name: "NORNEX Development Team" }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  openGraph: {
    title: "NORNEX AS - Admin Dashboard",
    description: SEO_DEFAULTS.description,
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    siteName: COMPANY_INFO.name,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application-name": "NORNEX Admin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address,
      addressLocality: COMPANY_INFO.city,
      postalCode: COMPANY_INFO.postalCode,
      addressCountry: COMPANY_INFO.country,
    },
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50">
        {children}
      </body>
    </html>
  );
}
