import { NextResponse } from 'next/server';

// Mock data for social media platforms (in production, this would come from the database)
const mockSocialMedia = [
  { id: 1, platform: 'Facebook', url: 'https://facebook.com/nornex', displayOrder: 1, isActive: true, createdAt: new Date().toISOString() },
  { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/company/nornex', displayOrder: 2, isActive: true, createdAt: new Date().toISOString() },
  { id: 3, platform: 'Instagram', url: 'https://instagram.com/nornex', displayOrder: 3, isActive: true, createdAt: new Date().toISOString() },
];

/**
 * GET /api/social-media
 * Returns all active social media platforms
 */
export async function GET() {
  try {
    // In production, this would query the database:
    // const socialMedia = await prisma.socialMedia.findMany({
    //   where: { isActive: true },
    //   orderBy: { displayOrder: 'asc' }
    // });
    
    const activePlatforms = mockSocialMedia.filter(s => s.isActive);
    
    return NextResponse.json({
      success: true,
      data: activePlatforms
    });
  } catch (error) {
    console.error('Error fetching social media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch social media platforms' },
      { status: 500 }
    );
  }
}
