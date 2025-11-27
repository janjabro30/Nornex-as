/**
 * NORNEX AS - Admin Repairs API
 */

import { NextRequest, NextResponse } from 'next/server';

// Demo data
const repairs = [
  { id: 'REP-001', device: 'MacBook Pro', customer: 'Ole Nordmann', status: 'in-progress', date: '2024-11-24' },
  { id: 'REP-002', device: 'iPhone 15', customer: 'Kari Nordmann', status: 'waiting-parts', date: '2024-11-23' },
  { id: 'REP-003', device: 'HP EliteBook', customer: 'Per Hansen', status: 'completed', date: '2024-11-22' },
];

export async function GET() {
  return NextResponse.json({ repairs });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newRepair = {
    id: `REP-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, repair: newRepair });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Repair updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Repair deleted' });
}
