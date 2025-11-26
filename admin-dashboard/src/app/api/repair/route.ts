/**
 * NORNEX AS - Repair Form API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    deviceType,
    brand,
    model,
    problemCategory,
    problemDescription,
    customer,
  } = body;

  // Validate required fields
  if (!deviceType || !problemCategory || !customer?.name || !customer?.email || !customer?.phone) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Generate repair ID
  const repairId = `REP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // In production, this would:
  // 1. Create repair ticket in database
  // 2. Send confirmation email
  // 3. Notify technicians

  return NextResponse.json({
    success: true,
    repairId,
    message: 'Reparasjonsforespørsel mottatt!',
    repair: {
      id: repairId,
      deviceType,
      brand,
      model,
      problemCategory,
      problemDescription,
      customer,
      status: 'received',
      createdAt: new Date().toISOString(),
    },
  });
}
