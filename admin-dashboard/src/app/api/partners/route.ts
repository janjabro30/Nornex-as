/**
 * NORNEX AS - Partners API
 */

import { NextResponse } from 'next/server';

const partners = [
  { id: 1, name: 'Microsoft', logo: '/partners/microsoft.svg', url: 'https://microsoft.com' },
  { id: 2, name: 'HP', logo: '/partners/hp.svg', url: 'https://hp.com' },
  { id: 3, name: 'Lenovo', logo: '/partners/lenovo.svg', url: 'https://lenovo.com' },
  { id: 4, name: 'Dell', logo: '/partners/dell.svg', url: 'https://dell.com' },
  { id: 5, name: 'Apple', logo: '/partners/apple.svg', url: 'https://apple.com' },
  { id: 6, name: 'Cisco', logo: '/partners/cisco.svg', url: 'https://cisco.com' },
];

export async function GET() {
  return NextResponse.json({ partners });
}
