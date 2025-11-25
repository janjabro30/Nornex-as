import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/admin/social-media/:id
 * Update a social media platform
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const socialMediaId = parseInt(id);
    
    if (isNaN(socialMediaId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { platform, url, displayOrder, isActive } = body;

    // In production, this would update the database:
    // const socialMedia = await prisma.socialMedia.update({
    //   where: { id: socialMediaId },
    //   data: { platform, url, displayOrder, isActive }
    // });

    const updatedSocialMedia = {
      id: socialMediaId,
      platform,
      url,
      displayOrder: displayOrder || 0,
      isActive: isActive ?? true,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedSocialMedia
    });
  } catch (error) {
    console.error('Error updating social media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update social media platform' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/social-media/:id
 * Delete a social media platform
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const socialMediaId = parseInt(id);
    
    if (isNaN(socialMediaId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    // In production, this would delete from the database:
    // await prisma.socialMedia.delete({ where: { id: socialMediaId } });

    return NextResponse.json({
      success: true,
      message: `Social media platform ${socialMediaId} deleted`
    });
  } catch (error) {
    console.error('Error deleting social media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete social media platform' },
      { status: 500 }
    );
  }
}
