/**
 * NORNEX AS - Sell Form API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    devices,
    customer,
    totalEstimatedValue,
  } = body;

  // Validate required fields
  if (!devices || devices.length === 0 || !customer?.name || !customer?.email || !customer?.phone) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Generate sellback ID
  const sellbackId = `SELL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  return NextResponse.json({
    success: true,
    sellbackId,
    message: 'Salgsforespørsel mottatt!',
    sellback: {
      id: sellbackId,
      devices,
      customer,
      estimatedTotalValue: totalEstimatedValue,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  });
}
