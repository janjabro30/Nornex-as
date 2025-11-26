/**
 * NORNEX AS - Forgot Password API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }

  // In production, this would:
  // 1. Check if email exists
  // 2. Generate reset token
  // 3. Send reset email

  return NextResponse.json({
    success: true,
    message: 'Hvis e-postadressen finnes i vårt system, vil du motta en e-post med instruksjoner for å tilbakestille passordet.',
  });
}
