/**
 * NORNEX AS - Admin Products API
 */

import { NextRequest, NextResponse } from 'next/server';
import { productsData as products } from '@/lib/products-data';

export async function GET() {
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct = {
    id: `PRD-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, product: newProduct });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Product updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Product deleted' });
}
