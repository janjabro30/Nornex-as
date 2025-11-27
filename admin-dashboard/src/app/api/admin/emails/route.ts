/**
 * NORNEX AS - Admin Email Templates API
 */

import { NextRequest, NextResponse } from 'next/server';

// Demo email templates
const emailTemplates = [
  { id: 'TPL-001', name: 'Ordrebekreftelse', subject: 'Takk for din bestilling', type: 'order' },
  { id: 'TPL-002', name: 'Forsendelsesvarsel', subject: 'Din ordre er sendt', type: 'shipping' },
  { id: 'TPL-003', name: 'Reparasjon mottatt', subject: 'Vi har mottatt din enhet', type: 'repair' },
  { id: 'TPL-004', name: 'Nyhetsbrev velkommen', subject: 'Velkommen til NORNEX', type: 'newsletter' },
];

export async function GET() {
  return NextResponse.json({ templates: emailTemplates });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newTemplate = {
    id: `TPL-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, template: newTemplate });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Email template updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Email template deleted' });
}
