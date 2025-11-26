/**
 * NORNEX AS - AI Assign Task API
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { assignTask } from '@/lib/ai-service';
import type { AIConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskDescription, teamMembers, config } = body;

    if (!taskDescription) {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      );
    }

    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
      return NextResponse.json(
        { error: 'Team members array is required' },
        { status: 400 }
      );
    }

    const aiConfig: AIConfig = config || {
      provider: 'free',
      model: 'microsoft/DialoGPT-large',
      language: 'no',
    };

    const result = await assignTask(taskDescription, teamMembers, aiConfig);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('AI assign task error:', error);
    return NextResponse.json(
      { error: 'Failed to assign task' },
      { status: 500 }
    );
  }
}
