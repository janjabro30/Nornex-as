/**
 * NORNEX AS - AI Generate Invoice API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateInvoice } from '@/lib/ai-service';
import type { AIConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderDetails, config } = body;

    if (!orderDetails || !orderDetails.items || !orderDetails.customerId) {
      return NextResponse.json(
        { error: 'Order details with items and customerId are required' },
        { status: 400 }
      );
    }

    const aiConfig: AIConfig = config || {
      provider: 'free',
      model: 'microsoft/DialoGPT-large',
      language: 'no',
    };

    const result = await generateInvoice(orderDetails, aiConfig);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('AI generate invoice error:', error);
    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    );
  }
}
