import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/admin/partners
 * Add a new partner
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logoUrl, testimonialText, testimonialAuthor, displayOrder } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Partner name is required' },
        { status: 400 }
      );
    }

    // In production, this would insert into the database:
    // const partner = await prisma.partner.create({
    //   data: { name, logoUrl, testimonialText, testimonialAuthor, displayOrder, isActive: true }
    // });

    const newPartner = {
      id: Date.now(),
      name,
      logoUrl: logoUrl || null,
      testimonialText: testimonialText || null,
      testimonialAuthor: testimonialAuthor || null,
      displayOrder: displayOrder || 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newPartner
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create partner' },
      { status: 500 }
    );
  }
}
