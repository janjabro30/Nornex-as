/**
 * NORNEX AS - Logout API
 */

import { NextResponse } from 'next/server';

export async function POST() {
  // In production, invalidate session/token
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
