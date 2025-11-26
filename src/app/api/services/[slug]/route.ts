import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug, services } from "@/lib/services-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      // Return all services
      return NextResponse.json({
        success: true,
        data: services.map(s => ({
          slug: s.slug,
          name: s.name,
          subtitle: s.subtitle,
          category: s.category,
          icon: s.icon,
          gradient: s.gradient,
          startingPrice: s.startingPrice,
          deliveryTime: s.deliveryTime
        }))
      });
    }

    const service = getServiceBySlug(slug);
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
