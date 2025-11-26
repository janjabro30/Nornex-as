/**
 * NORNEX AS - Bring Shipping Track Package API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { trackPackage } from '@/lib/bring-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;

    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    const result = await trackPackage(trackingNumber);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Track package error:', error);
    return NextResponse.json(
      { error: 'Failed to track package' },
      { status: 500 }
    );
  }
}
