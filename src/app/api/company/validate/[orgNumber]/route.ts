/**
 * NORNEX AS - Company Validation API (Brønnøysundregistrene)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateCompany, isNorwegianOrgNumber } from '@/lib/company-registry';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orgNumber: string }> }
) {
  try {
    const { orgNumber } = await params;

    if (!orgNumber) {
      return NextResponse.json(
        { error: 'Organization number is required' },
        { status: 400 }
      );
    }

    const cleanedOrgNumber = orgNumber.replace(/\s/g, '');

    if (!isNorwegianOrgNumber(cleanedOrgNumber)) {
      return NextResponse.json(
        { 
          error: 'Invalid Norwegian organization number format',
          valid: false,
          orgNumber: cleanedOrgNumber,
        },
        { status: 400 }
      );
    }

    const result = await validateCompany(cleanedOrgNumber);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Company validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate company' },
      { status: 500 }
    );
  }
}
