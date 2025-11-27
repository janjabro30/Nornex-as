/**
 * NORNEX AS - Login API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  // Demo login - in production, validate against database
  if (email === 'admin@nornex.no' && password === 'admin123') {
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 'usr-001',
        email,
        name: 'Admin User',
        role: 'admin',
      },
      token: 'demo-jwt-token-' + Date.now(),
    });
  }

  return NextResponse.json(
    { error: 'Ugyldig e-post eller passord' },
    { status: 401 }
  );
}
