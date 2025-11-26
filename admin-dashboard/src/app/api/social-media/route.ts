/**
 * NORNEX AS - Social Media Links API
 */

import { NextResponse } from 'next/server';

const socialLinks = [
  { id: 1, platform: 'facebook', url: 'https://facebook.com/nornexas', icon: 'Facebook' },
  { id: 2, platform: 'linkedin', url: 'https://linkedin.com/company/nornexas', icon: 'Linkedin' },
  { id: 3, platform: 'twitter', url: 'https://twitter.com/nornexas', icon: 'Twitter' },
  { id: 4, platform: 'instagram', url: 'https://instagram.com/nornexas', icon: 'Instagram' },
];

export async function GET() {
  return NextResponse.json({ socialLinks });
}
