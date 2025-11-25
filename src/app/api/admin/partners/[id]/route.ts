import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/admin/partners/:id
 * Update a partner
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);
    
    if (isNaN(partnerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, logoUrl, testimonialText, testimonialAuthor, displayOrder, isActive } = body;

    // In production, this would update the database:
    // const partner = await prisma.partner.update({
    //   where: { id: partnerId },
    //   data: { name, logoUrl, testimonialText, testimonialAuthor, displayOrder, isActive }
    // });

    const updatedPartner = {
      id: partnerId,
      name,
      logoUrl: logoUrl || null,
      testimonialText: testimonialText || null,
      testimonialAuthor: testimonialAuthor || null,
      displayOrder: displayOrder || 0,
      isActive: isActive ?? true,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedPartner
    });
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update partner' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/partners/:id
 * Delete a partner
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);
    
    if (isNaN(partnerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    // In production, this would delete from the database:
    // await prisma.partner.delete({ where: { id: partnerId } });

    return NextResponse.json({
      success: true,
      message: `Partner ${partnerId} deleted`
    });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete partner' },
      { status: 500 }
    );
  }
}
