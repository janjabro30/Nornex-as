/**
 * NORNEX AS - Admin Partners API
 */

import { NextRequest, NextResponse } from 'next/server';

const partners = [
  { id: 1, name: 'Microsoft', logo: '/partners/microsoft.svg', url: 'https://microsoft.com', active: true },
  { id: 2, name: 'HP', logo: '/partners/hp.svg', url: 'https://hp.com', active: true },
  { id: 3, name: 'Lenovo', logo: '/partners/lenovo.svg', url: 'https://lenovo.com', active: true },
  { id: 4, name: 'Dell', logo: '/partners/dell.svg', url: 'https://dell.com', active: true },
  { id: 5, name: 'Apple', logo: '/partners/apple.svg', url: 'https://apple.com', active: true },
  { id: 6, name: 'Cisco', logo: '/partners/cisco.svg', url: 'https://cisco.com', active: true },
];

export async function GET() {
  return NextResponse.json({ partners });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newPartner = {
    id: Date.now(),
    ...body,
  };
  return NextResponse.json({ success: true, partner: newPartner });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Partner updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Partner deleted' });
}
