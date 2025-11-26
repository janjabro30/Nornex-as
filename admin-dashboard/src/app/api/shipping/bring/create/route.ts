/**
 * NORNEX AS - Bring Shipping Create Shipment API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { createShipment, validateAddress } from '@/lib/bring-service';
import type { ShipmentRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ShipmentRequest = await request.json();
    const { orderId, weight, deliveryOption, toAddress } = body;

    if (!orderId || !weight || !deliveryOption) {
      return NextResponse.json(
        { error: 'Order ID, weight, and delivery option are required' },
        { status: 400 }
      );
    }

    if (toAddress) {
      const validation = validateAddress(toAddress);
      if (!validation.valid) {
        return NextResponse.json(
          { error: 'Invalid delivery address', details: validation.errors },
          { status: 400 }
        );
      }
    }

    const result = await createShipment(body);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Create shipment error:', error);
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}
