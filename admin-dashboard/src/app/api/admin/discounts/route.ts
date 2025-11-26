/**
 * NORNEX AS - Admin Discounts API
 */

import { NextRequest, NextResponse } from 'next/server';

const discountCodes = [
  { id: 1, code: 'VELKOMST10', type: 'percentage', value: 10, description: '10% rabatt for nye kunder', active: true, uses: 45 },
  { id: 2, code: 'BEDRIFT20', type: 'percentage', value: 20, description: '20% rabatt for bedrifter', active: true, uses: 12 },
  { id: 3, code: 'NORNEX500', type: 'fixed', value: 500, description: '500 kr rabatt', active: true, uses: 78 },
];

export async function GET() {
  return NextResponse.json({ discounts: discountCodes });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newDiscount = {
    id: Date.now(),
    ...body,
    uses: 0,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, discount: newDiscount });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Discount updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Discount deleted' });
}
