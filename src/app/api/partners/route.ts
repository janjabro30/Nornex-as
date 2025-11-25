import { NextResponse } from 'next/server';

// Mock data for partners (in production, this would come from the database)
const mockPartners = [
  { 
    id: 1, 
    name: 'Tech Partner AS', 
    logoUrl: '/partners/tech-partner.png',
    testimonialText: 'Nornex har vært en fantastisk partner for oss.',
    testimonialAuthor: 'Jan Hansen, CEO',
    displayOrder: 1, 
    isActive: true, 
    createdAt: new Date().toISOString() 
  },
  { 
    id: 2, 
    name: 'Green IT Solutions', 
    logoUrl: '/partners/green-it.png',
    testimonialText: 'Profesjonell og miljøbevisst bedrift.',
    testimonialAuthor: 'Maria Olsen, CTO',
    displayOrder: 2, 
    isActive: true, 
    createdAt: new Date().toISOString() 
  },
];

/**
 * GET /api/partners
 * Returns all active partners
 */
export async function GET() {
  try {
    // In production, this would query the database:
    // const partners = await prisma.partner.findMany({
    //   where: { isActive: true },
    //   orderBy: { displayOrder: 'asc' }
    // });
    
    const activePartners = mockPartners.filter(p => p.isActive);
    
    return NextResponse.json({
      success: true,
      data: activePartners
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
