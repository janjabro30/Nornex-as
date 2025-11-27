/**
 * NORNEX AS - AI Suggest Response API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { suggestEmailResponse } from '@/lib/ai-service';
import type { AIConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { incomingEmail, context, config } = body;

    if (!incomingEmail) {
      return NextResponse.json(
        { error: 'Incoming email content is required' },
        { status: 400 }
      );
    }

    const aiConfig: AIConfig = config || {
      provider: 'free',
      model: 'microsoft/DialoGPT-large',
      language: 'no',
    };

    const result = await suggestEmailResponse(incomingEmail, context || '', aiConfig);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('AI suggest response error:', error);
    return NextResponse.json(
      { error: 'Failed to suggest response' },
      { status: 500 }
    );
  }
}
