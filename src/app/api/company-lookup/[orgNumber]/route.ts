import { NextResponse } from 'next/server';
import type { BronnysundCompanyData } from '@/types/portal';

// Brønnøysund Register API endpoint
const BRREG_API_URL = 'https://data.brreg.no/enhetsregisteret/api/enheter';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orgNumber: string }> }
) {
  try {
    const { orgNumber } = await params;

    // Validate organization number (9 digits)
    const cleanOrgNumber = orgNumber.replace(/\s/g, '');
    if (!/^\d{9}$/.test(cleanOrgNumber)) {
      return NextResponse.json(
        { error: 'Ugyldig organisasjonsnummer. Må være 9 siffer.' },
        { status: 400 }
      );
    }

    // Fetch from Brønnøysund Register
    const response = await fetch(`${BRREG_API_URL}/${cleanOrgNumber}`, {
      headers: {
        'Accept': 'application/json',
      },
      // Cache for 1 hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Organisasjonsnummer ikke funnet i Brønnøysundregistrene.' },
          { status: 404 }
        );
      }
      throw new Error(`API returned status ${response.status}`);
    }

    const data: BronnysundCompanyData = await response.json();

    // Transform data for frontend
    const address = data.forretningsadresse || data.postadresse;
    
    const result = {
      orgNumber: data.organisasjonsnummer,
      companyName: data.navn,
      organizationType: data.organisasjonsform?.beskrivelse || '',
      organizationCode: data.organisasjonsform?.kode || '',
      website: data.hjemmeside || '',
      industry: data.naeringskode1?.beskrivelse || '',
      industryCode: data.naeringskode1?.kode || '',
      address: {
        street: address?.adresse?.join(', ') || '',
        postalCode: address?.postnummer || '',
        city: address?.poststed || '',
        country: address?.land || 'Norge',
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { error: 'Kunne ikke hente bedriftsinformasjon. Vennligst prøv igjen.' },
      { status: 500 }
    );
  }
}
