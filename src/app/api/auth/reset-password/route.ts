/**
 * NORNEX AS - Reset Password API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, newPassword } = body;

  if (!token || !newPassword) {
    return NextResponse.json(
      { error: 'Token and new password are required' },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  // In production, this would:
  // 1. Validate reset token
  // 2. Update password in database
  // 3. Invalidate reset token

  return NextResponse.json({
    success: true,
    message: 'Passordet ditt er oppdatert. Du kan nå logge inn med ditt nye passord.',
  });
}
