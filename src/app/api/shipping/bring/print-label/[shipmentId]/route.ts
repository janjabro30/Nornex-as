/**
 * NORNEX AS - Bring Shipping Print Label API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateShippingLabel } from '@/lib/bring-service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params;

    if (!shipmentId) {
      return NextResponse.json(
        { error: 'Shipment ID is required' },
        { status: 400 }
      );
    }

    const labelUrl = await generateShippingLabel(shipmentId);

    return NextResponse.json({
      success: true,
      data: {
        shipmentId,
        labelUrl,
        message: 'Label generated successfully',
      },
    });
  } catch (error) {
    console.error('Print label error:', error);
    return NextResponse.json(
      { error: 'Failed to print label' },
      { status: 500 }
    );
  }
}
