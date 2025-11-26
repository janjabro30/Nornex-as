/**
 * NORNEX AS - Contact Form API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    phone,
    company,
    subject,
    message,
  } = body;

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and message are required' },
      { status: 400 }
    );
  }

  // Generate contact ID
  const contactId = `CNT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // In production, this would:
  // 1. Save to database
  // 2. Send email notification
  // 3. Send auto-reply to customer

  return NextResponse.json({
    success: true,
    contactId,
    message: 'Takk for din henvendelse! Vi kontakter deg snart.',
    contact: {
      id: contactId,
      name,
      email,
      phone,
      company,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    },
  });
}
