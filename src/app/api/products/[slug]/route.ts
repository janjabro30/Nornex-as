/**
 * NORNEX AS - Single Product API
 */

import { NextRequest, NextResponse } from 'next/server';
import { productsData as products } from '@/lib/products-data';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
