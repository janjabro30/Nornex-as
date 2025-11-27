/**
 * NORNEX AS - Services API
 */

import { NextResponse } from 'next/server';
import { servicesData as services } from '@/lib/services-data';

export async function GET() {
  return NextResponse.json({
    services: services.map(s => ({
      slug: s.slug,
      title: s.title,
      shortDescription: s.shortDescription,
      icon: s.icon,
    })),
  });
}
