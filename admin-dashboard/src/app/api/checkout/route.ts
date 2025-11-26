/**
 * NORNEX AS - Checkout API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    customer,
    items,
    shippingMethod,
    paymentMethod,
    discountCode,
    subtotal,
    shippingCost,
    discountAmount,
    total,
  } = body;

  // Validate required fields
  if (!customer?.name || !customer?.email || !customer?.phone) {
    return NextResponse.json(
      { error: 'Customer information is required' },
      { status: 400 }
    );
  }

  if (!items || items.length === 0) {
    return NextResponse.json(
      { error: 'Cart is empty' },
      { status: 400 }
    );
  }

  // Generate order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // In production, this would:
  // 1. Create order in database
  // 2. Process payment
  // 3. Send confirmation email
  // 4. Create shipping label

  return NextResponse.json({
    success: true,
    orderId,
    message: 'Ordre opprettet!',
    order: {
      id: orderId,
      customer,
      items,
      shippingMethod,
      paymentMethod,
      discountCode,
      subtotal,
      shippingCost,
      discountAmount: discountAmount || 0,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  });
}
