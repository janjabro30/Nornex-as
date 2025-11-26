/**
 * NORNEX AS - AI Categorize Order API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { categorizeOrder } from '@/lib/ai-service';
import type { AIConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderContent, config } = body;

    if (!orderContent) {
      return NextResponse.json(
        { error: 'Order content is required' },
        { status: 400 }
      );
    }

    const aiConfig: AIConfig = config || {
      provider: 'free',
      model: 'microsoft/DialoGPT-large',
      language: 'no',
    };

    const result = await categorizeOrder(orderContent, aiConfig);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('AI categorize order error:', error);
    return NextResponse.json(
      { error: 'Failed to categorize order' },
      { status: 500 }
    );
  }
}
