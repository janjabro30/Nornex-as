/**
 * NORNEX AS - Trade-In Form API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    device,
    condition,
    brand,
    model,
    selectedProduct,
    tradeInValue,
    customer,
  } = body;

  // Validate required fields
  if (!device || !condition || !customer?.name || !customer?.email || !customer?.phone) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Generate trade-in ID using crypto for better security
  const tradeInId = `TRD-${Date.now()}-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;

  return NextResponse.json({
    success: true,
    tradeInId,
    message: 'Innbytteforespørsel mottatt!',
    tradeIn: {
      id: tradeInId,
      device,
      condition,
      brand,
      model,
      selectedProduct,
      estimatedValue: tradeInValue,
      customer,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  });
}
