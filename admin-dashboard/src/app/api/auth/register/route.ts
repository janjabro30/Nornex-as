/**
 * NORNEX AS - Register API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, phone, company } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Name, email and password are required' },
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

  // Password validation
  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  // Generate user ID
  const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  return NextResponse.json({
    success: true,
    message: 'Registration successful',
    user: {
      id: userId,
      name,
      email,
      phone,
      company,
      role: 'customer',
      createdAt: new Date().toISOString(),
    },
  });
}
