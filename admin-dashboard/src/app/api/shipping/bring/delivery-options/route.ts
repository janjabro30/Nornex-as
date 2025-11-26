/**
 * NORNEX AS - Bring Shipping Delivery Options API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextResponse } from 'next/server';
import { getDeliveryOptions } from '@/lib/bring-service';

export async function GET() {
  try {
    const options = getDeliveryOptions();

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error('Get delivery options error:', error);
    return NextResponse.json(
      { error: 'Failed to get delivery options' },
      { status: 500 }
    );
  }
}
