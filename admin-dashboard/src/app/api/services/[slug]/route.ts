/**
 * NORNEX AS - Single Service API
 */

import { NextRequest, NextResponse } from 'next/server';
import { servicesData as services } from '@/lib/services-data';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return NextResponse.json(
      { error: 'Service not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(service);
}
