/**
 * NORNEX AS - Apply Discount API
 */

import { NextRequest, NextResponse } from 'next/server';

const validDiscountCodes: Record<string, { type: 'percentage' | 'fixed'; value: number; description: string }> = {
  'VELKOMST10': { type: 'percentage', value: 10, description: '10% rabatt for nye kunder' },
  'BEDRIFT20': { type: 'percentage', value: 20, description: '20% rabatt for bedrifter' },
  'NORNEX500': { type: 'fixed', value: 500, description: '500 kr rabatt' },
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code, cartTotal } = body;

  if (!code) {
    return NextResponse.json(
      { error: 'Discount code is required' },
      { status: 400 }
    );
  }

  const discount = validDiscountCodes[code.toUpperCase()];

  if (!discount) {
    return NextResponse.json(
      { error: 'Ugyldig rabattkode', valid: false },
      { status: 400 }
    );
  }

  let discountAmount = 0;
  if (discount.type === 'percentage') {
    discountAmount = Math.round((cartTotal * discount.value) / 100);
  } else {
    discountAmount = discount.value;
  }

  return NextResponse.json({
    valid: true,
    code: code.toUpperCase(),
    type: discount.type,
    value: discount.value,
    discountAmount,
    description: discount.description,
    newTotal: cartTotal - discountAmount,
  });
}
