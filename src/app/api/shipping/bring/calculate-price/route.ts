/**
 * NORNEX AS - Bring Shipping Calculate Price API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculatePrice } from '@/lib/bring-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const weight = parseFloat(searchParams.get('weight') || '0');
    const fromZip = searchParams.get('from_zip') || '';
    const toZip = searchParams.get('to_zip') || '';
    const serviceType = searchParams.get('service_type') || 'servicepakke';

    if (!weight || !fromZip || !toZip) {
      return NextResponse.json(
        { error: 'Weight, from_zip, and to_zip are required' },
        { status: 400 }
      );
    }

    const result = await calculatePrice(weight, fromZip, toZip, serviceType);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Calculate price error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate price' },
      { status: 500 }
    );
  }
}
