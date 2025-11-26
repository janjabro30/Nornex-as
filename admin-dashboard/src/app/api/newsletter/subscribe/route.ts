/**
 * NORNEX AS - Newsletter Subscribe API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name } = body;

  // Validate email
  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  // In production, this would:
  // 1. Check if email already exists
  // 2. Add to newsletter list
  // 3. Send welcome email

  return NextResponse.json({
    success: true,
    message: 'Takk for at du abonnerer på vårt nyhetsbrev!',
    subscriber: {
      email,
      name,
      subscribedAt: new Date().toISOString(),
    },
  });
}
