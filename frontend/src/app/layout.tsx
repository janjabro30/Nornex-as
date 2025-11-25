import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Nornex AS | IT-tjenester i Bergen',
    template: '%s | Nornex AS',
  },
  description:
    'Nornex AS leverer profesjonelle IT-tjenester til bedrifter i Bergen og hele Norge. Managed IT, sikkerhet, utvikling og reparasjon.',
  keywords: [
    'IT-tjenester',
    'Bergen',
    'Managed IT',
    'IT-support',
    'Sikkerhet',
    'GDPR',
    'Nettstedsutvikling',
    'App-utvikling',
    'MSP',
    'Norge',
  ],
  authors: [{ name: 'Nornex AS' }],
  creator: 'Nornex AS',
  publisher: 'Nornex AS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nornex.no'),
  alternates: {
    canonical: '/',
    languages: {
      'no-NO': '/no',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Nornex AS | IT-tjenester i Bergen',
    description:
      'Profesjonelle IT-tjenester for bedrifter. Managed IT, sikkerhet, utvikling og reparasjon.',
    url: 'https://nornex.no',
    siteName: 'Nornex AS',
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nornex AS | IT-tjenester i Bergen',
    description: 'Profesjonelle IT-tjenester for bedrifter i Norge.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
