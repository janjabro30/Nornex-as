import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  servicesSchema,
  faqSchema,
  generateStructuredData,
} from "@/lib/schema";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nornex.no"),
  title: {
    default: "Nornex AS | Profesjonelle IT-tjenester Norge | 24/7 Support",
    template: "%s | Nornex AS",
  },
  description:
    "Profesjonelle IT-tjenester i Norge. Administrert IT, cybersikkerhet, skyløsninger og 24/7 helpdesk. Få ekspert IT-support for din bedrift. Gratis konsultasjon.",
  keywords: [
    "IT-tjenester Norge",
    "IT-support Oslo",
    "Administrert IT",
    "cybersikkerhet",
    "skyløsninger",
    "IT-hjelp bedrift",
    "dataassistanse",
    "managed IT services Norway",
    "IT support Oslo",
    "cybersecurity Norway",
    "cloud solutions",
    "helpdesk 24/7",
  ],
  authors: [{ name: "Nornex AS", url: "https://nornex.no" }],
  creator: "Nornex AS",
  publisher: "Nornex AS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    url: "https://nornex.no",
    siteName: "Nornex AS",
    title: "Nornex AS - Profesjonelle IT-tjenester Norge",
    description:
      "Ekspert IT-support, sikkerhet og skyløsninger for norske bedrifter. 24/7 helpdesk og proaktiv overvåking.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nornex AS - IT-tjenester Norge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nornexas",
    creator: "@nornexas",
    title: "Nornex AS - Profesjonelle IT-tjenester Norge",
    description:
      "Ekspert IT-support, sikkerhet og skyløsninger for norske bedrifter",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nornex.no",
    languages: {
      "nb-NO": "https://nornex.no",
      en: "https://nornex.no/en",
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData([
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    ...servicesSchema,
    faqSchema,
  ]);

  return (
    <html lang="nb">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
