import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/admin/seo
 * Update or create SEO metadata for a page
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagePath, title, description, keywords } = body;

    // Validate required fields
    if (!pagePath) {
      return NextResponse.json(
        { success: false, error: 'Page path is required' },
        { status: 400 }
      );
    }

    // Validate field lengths according to SEO best practices
    if (title && title.length > 60) {
      return NextResponse.json(
        { success: false, error: 'Title should not exceed 60 characters' },
        { status: 400 }
      );
    }

    if (description && description.length > 160) {
      return NextResponse.json(
        { success: false, error: 'Description should not exceed 160 characters' },
        { status: 400 }
      );
    }

    // In production, this would upsert to the database:
    // const seoMeta = await prisma.seoMeta.upsert({
    //   where: { pagePath },
    //   update: { title, description, keywords },
    //   create: { pagePath, title, description, keywords }
    // });

    const seoMeta = {
      id: Date.now(),
      pagePath,
      title: title || null,
      description: description || null,
      keywords: keywords || null,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: seoMeta
    }, { status: 201 });
  } catch (error) {
    console.error('Error updating SEO meta:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update SEO metadata' },
      { status: 500 }
    );
  }
}
