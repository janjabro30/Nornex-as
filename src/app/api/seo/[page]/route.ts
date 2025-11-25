import { NextRequest, NextResponse } from 'next/server';

// Mock SEO data (in production, this would come from the database)
const mockSeoData: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'Nornex AS - Bærekraftige IT-løsninger',
    description: 'Kvalitets refurbished teknologi med miljøansvar. Vi gir IT-utstyr nytt liv.',
    keywords: 'refurbished, IT, bærekraftig, resirkulering, Norge'
  },
  '/nettbutikk': {
    title: 'Nettbutikk - Nornex AS',
    description: 'Kjøp kvalitets refurbished IT-utstyr. Bærbare, stasjonære og tilbehør.',
    keywords: 'nettbutikk, refurbished, PC, laptop, tilbehør'
  },
  '/selg-til-oss': {
    title: 'Selg til oss - Nornex AS',
    description: 'Få betalt for brukt IT-utstyr. Vi kjøper datamaskiner, telefoner og nettbrett.',
    keywords: 'selg, brukt IT, innbytte, gjenbruk'
  }
};

interface RouteParams {
  params: Promise<{ page: string }>;
}

/**
 * GET /api/seo/:page
 * Returns SEO metadata for a specific page
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { page } = await params;
    // Decode the page path (it will be encoded in the URL)
    const pagePath = decodeURIComponent(page).startsWith('/') 
      ? decodeURIComponent(page) 
      : `/${decodeURIComponent(page)}`;
    
    // In production, this would query the database:
    // const seoMeta = await prisma.seoMeta.findUnique({
    //   where: { pagePath }
    // });

    const seoData = mockSeoData[pagePath];
    
    if (!seoData) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No SEO data found for this page'
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        pagePath,
        ...seoData,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching SEO meta:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SEO metadata' },
      { status: 500 }
    );
  }
}
