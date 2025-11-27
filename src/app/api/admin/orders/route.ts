/**
 * NORNEX AS - Admin Orders API
 */

import { NextRequest, NextResponse } from 'next/server';

// Demo data
const orders = [
  { id: 'ORD-001', customer: 'Erik Johansen', date: '2024-11-25', status: 'pending', total: 12990, items: [] },
  { id: 'ORD-002', customer: 'Maria Hansen', date: '2024-11-24', status: 'shipped', total: 2180, items: [] },
  { id: 'ORD-003', customer: 'Thomas Berg', date: '2024-11-23', status: 'delivered', total: 18990, items: [] },
];

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newOrder = {
    id: `ORD-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, order: newOrder });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;
  // In production, update in database
  return NextResponse.json({ success: true, message: 'Order updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // In production, delete from database
  return NextResponse.json({ success: true, message: 'Order deleted' });
}
