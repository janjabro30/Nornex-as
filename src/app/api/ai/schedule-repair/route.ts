/**
 * NORNEX AS - AI Schedule Repair API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { scheduleRepair } from '@/lib/ai-service';
import type { AIConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repairDetails, config } = body;

    if (!repairDetails) {
      return NextResponse.json(
        { error: 'Repair details are required' },
        { status: 400 }
      );
    }

    const aiConfig: AIConfig = config || {
      provider: 'free',
      model: 'microsoft/DialoGPT-large',
      language: 'no',
    };

    const result = await scheduleRepair(repairDetails, aiConfig);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('AI schedule repair error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule repair' },
      { status: 500 }
    );
  }
}
