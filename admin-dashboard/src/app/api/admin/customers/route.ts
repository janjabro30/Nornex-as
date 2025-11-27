/**
 * NORNEX AS - Admin Customers API
 */

import { NextRequest, NextResponse } from 'next/server';

// Demo data
const customers = [
  { id: 'CUS-001', name: 'Acme Norge AS', email: 'post@acme.no', type: 'business', orders: 12 },
  { id: 'CUS-002', name: 'Erik Johansen', email: 'erik@example.com', type: 'private', orders: 3 },
  { id: 'CUS-003', name: 'Nordic Tech AS', email: 'info@nordictech.no', type: 'business', orders: 8 },
];

export async function GET() {
  return NextResponse.json({ customers });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newCustomer = {
    id: `CUS-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, customer: newCustomer });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Customer updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Customer deleted' });
}
