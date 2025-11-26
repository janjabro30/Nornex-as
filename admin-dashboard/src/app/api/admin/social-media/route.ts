/**
 * NORNEX AS - Admin Social Media API
 */

import { NextRequest, NextResponse } from 'next/server';

const socialLinks = [
  { id: 1, platform: 'facebook', url: 'https://facebook.com/nornexas', icon: 'Facebook', active: true },
  { id: 2, platform: 'linkedin', url: 'https://linkedin.com/company/nornexas', icon: 'Linkedin', active: true },
  { id: 3, platform: 'twitter', url: 'https://twitter.com/nornexas', icon: 'Twitter', active: true },
  { id: 4, platform: 'instagram', url: 'https://instagram.com/nornexas', icon: 'Instagram', active: true },
];

export async function GET() {
  return NextResponse.json({ socialLinks });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newLink = {
    id: Date.now(),
    ...body,
  };
  return NextResponse.json({ success: true, link: newLink });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Social link updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Social link deleted' });
}
