import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/admin/social-media
 * Add a new social media platform
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url, displayOrder } = body;

    // Validate required fields
    if (!platform || !url) {
      return NextResponse.json(
        { success: false, error: 'Platform and URL are required' },
        { status: 400 }
      );
    }

    // In production, this would insert into the database:
    // const socialMedia = await prisma.socialMedia.create({
    //   data: { platform, url, displayOrder, isActive: true }
    // });

    const newSocialMedia = {
      id: Date.now(),
      platform,
      url,
      displayOrder: displayOrder || 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newSocialMedia
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating social media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create social media platform' },
      { status: 500 }
    );
  }
}
