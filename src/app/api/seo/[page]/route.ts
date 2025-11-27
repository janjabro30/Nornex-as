/**
 * NORNEX AS - SEO Meta API
 */

import { NextRequest, NextResponse } from 'next/server';

const seoMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  home: {
    title: 'NORNEX AS - IT-løsninger for bedrifter | Oslo',
    description: 'NORNEX AS tilbyr profesjonelle IT-tjenester, cybersikkerhet, skytjenester og 24/7 support. Kontakt oss for en gratis konsultasjon.',
    keywords: ['IT-tjenester', 'cybersikkerhet', 'skytjenester', 'Oslo', 'Norge'],
  },
  services: {
    title: 'Våre IT-tjenester | NORNEX AS',
    description: 'Utforsk vårt komplette utvalg av IT-tjenester: Managed IT, sikkerhet, sky, support, hardware og utvikling.',
    keywords: ['IT-tjenester', 'managed IT', 'cybersikkerhet', 'skyløsninger'],
  },
  shop: {
    title: 'Nettbutikk - IT-utstyr | NORNEX AS',
    description: 'Kjøp kvalitets IT-utstyr fra NORNEX. PC-er, bærbare, monitorer og tilbehør med garanti.',
    keywords: ['IT-utstyr', 'PC', 'bærbar', 'nettbutikk'],
  },
  contact: {
    title: 'Kontakt oss | NORNEX AS',
    description: 'Ta kontakt med NORNEX AS for IT-løsninger. Vi hjelper deg gjerne med dine IT-behov.',
    keywords: ['kontakt', 'IT-hjelp', 'support'],
  },
};

interface Params {
  params: Promise<{ page: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { page } = await params;
  const meta = seoMeta[page];

  if (!meta) {
    return NextResponse.json(
      { error: 'SEO meta not found for this page' },
      { status: 404 }
    );
  }

  return NextResponse.json(meta);
}
