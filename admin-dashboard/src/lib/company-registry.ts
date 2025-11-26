/**
 * NORNEX AS - Norwegian Company Registry Service (Brønnøysundregistrene)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import type { CompanyValidation } from '@/types';
import { validateOrgNumber } from './utils';

// Brønnøysundregistrene API base URL for production use
// const BRREG_API_BASE = 'https://data.brreg.no/enhetsregisteret/api';

export interface CompanyDetails {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: {
    kode: string;
    beskrivelse: string;
  };
  hjemmeside?: string;
  registreringsdatoEnhetsregisteret?: string;
  registrertIMvaregisteret?: boolean;
  naeringskode1?: {
    kode: string;
    beskrivelse: string;
  };
  antallAnsatte?: number;
  forretningsadresse?: {
    adresse: string[];
    postnummer: string;
    poststed: string;
    kommunenummer: string;
    kommune: string;
    landkode: string;
    land: string;
  };
  postadresse?: {
    adresse: string[];
    postnummer: string;
    poststed: string;
    landkode: string;
    land: string;
  };
  konkurs?: boolean;
  underAvvikling?: boolean;
  underTvangsavviklingEllerTvangsopplosning?: boolean;
}

export async function validateCompany(orgNumber: string): Promise<CompanyValidation> {
  const cleanedOrgNumber = orgNumber.replace(/\s/g, '');
  
  // Validate format first
  if (!validateOrgNumber(cleanedOrgNumber)) {
    return {
      valid: false,
      name: '',
      orgNumber: cleanedOrgNumber,
      address: '',
      postalCode: '',
      city: '',
      status: 'Inactive',
      industry: '',
      verified: false,
    };
  }

  try {
    // In production, this would call the actual Brønnøysundregistrene API
    // For demo, we return simulated data for valid org numbers
    const response = await fetchCompanyData(cleanedOrgNumber);
    
    if (!response) {
      return {
        valid: false,
        name: '',
        orgNumber: cleanedOrgNumber,
        address: '',
        postalCode: '',
        city: '',
        status: 'Inactive',
        industry: '',
        verified: false,
      };
    }

    const status = determineCompanyStatus(response);
    
    return {
      valid: true,
      name: response.navn,
      orgNumber: response.organisasjonsnummer,
      address: response.forretningsadresse?.adresse?.join(', ') || '',
      postalCode: response.forretningsadresse?.postnummer || '',
      city: response.forretningsadresse?.poststed || '',
      status,
      industry: response.naeringskode1?.beskrivelse || 'Unknown',
      verified: true,
    };
  } catch (error) {
    console.error('Company validation error:', error);
    return {
      valid: false,
      name: '',
      orgNumber: cleanedOrgNumber,
      address: '',
      postalCode: '',
      city: '',
      status: 'Inactive',
      industry: '',
      verified: false,
    };
  }
}

async function fetchCompanyData(orgNumber: string): Promise<CompanyDetails | null> {
  // In production, this would be a real API call:
  // const response = await fetch(`${BRREG_API_BASE}/enheter/${orgNumber}`);
  
  // For development, return simulated data for specific org numbers
  const mockCompanies: Record<string, CompanyDetails> = {
    '123456789': {
      organisasjonsnummer: '123456789',
      navn: 'NORNEX AS',
      organisasjonsform: { kode: 'AS', beskrivelse: 'Aksjeselskap' },
      forretningsadresse: {
        adresse: ['Brynsveien 18'],
        postnummer: '0667',
        poststed: 'Oslo',
        kommunenummer: '0301',
        kommune: 'OSLO',
        landkode: 'NO',
        land: 'Norge',
      },
      naeringskode1: {
        kode: '62.010',
        beskrivelse: 'IT Services',
      },
      antallAnsatte: 10,
      konkurs: false,
      underAvvikling: false,
      underTvangsavviklingEllerTvangsopplosning: false,
    },
    '987654321': {
      organisasjonsnummer: '987654321',
      navn: 'EXAMPLE COMPANY AS',
      organisasjonsform: { kode: 'AS', beskrivelse: 'Aksjeselskap' },
      forretningsadresse: {
        adresse: ['Storgata 1'],
        postnummer: '0155',
        poststed: 'Oslo',
        kommunenummer: '0301',
        kommune: 'OSLO',
        landkode: 'NO',
        land: 'Norge',
      },
      naeringskode1: {
        kode: '46.900',
        beskrivelse: 'Wholesale Trade',
      },
      antallAnsatte: 25,
      konkurs: false,
      underAvvikling: false,
      underTvangsavviklingEllerTvangsopplosning: false,
    },
  };

  return mockCompanies[orgNumber] || null;
}

function determineCompanyStatus(company: CompanyDetails): 'Active' | 'Inactive' | 'Dissolved' {
  if (company.konkurs || company.underTvangsavviklingEllerTvangsopplosning) {
    return 'Dissolved';
  }
  if (company.underAvvikling) {
    return 'Inactive';
  }
  return 'Active';
}

export function formatOrgNumber(orgNumber: string): string {
  const cleaned = orgNumber.replace(/\s/g, '');
  if (cleaned.length !== 9) return orgNumber;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
}

export function isNorwegianOrgNumber(orgNumber: string): boolean {
  return validateOrgNumber(orgNumber);
}
