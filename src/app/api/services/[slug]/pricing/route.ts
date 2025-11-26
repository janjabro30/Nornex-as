import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/services-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        serviceSlug: service.slug,
        serviceName: service.name,
        pricing: service.pricing
      }
    });
  } catch (error) {
    console.error("Error fetching pricing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}
