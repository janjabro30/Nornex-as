/**
 * NORNEX AS - Admin Product Auto-Fill Specs API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productName, brand } = body;

  if (!productName) {
    return NextResponse.json(
      { error: 'Product name is required' },
      { status: 400 }
    );
  }

  // In production, this would use AI/ML or external API to auto-fill specs
  // For demo, return sample specs based on product type
  const specs = {
    processor: 'Intel Core i5-1235U',
    ram: '16 GB DDR4',
    storage: '512 GB NVMe SSD',
    display: '14" FHD IPS (1920x1080)',
    graphics: 'Intel Iris Xe Graphics',
    os: 'Windows 11 Pro',
    battery: '50Wh, opptil 10 timer',
    weight: '1.4 kg',
    ports: 'USB-C, USB-A, HDMI, 3.5mm',
    warranty: '2 år garanti',
  };

  return NextResponse.json({
    success: true,
    productName,
    brand,
    specs,
    message: 'Spesifikasjoner automatisk fylt ut',
  });
}
