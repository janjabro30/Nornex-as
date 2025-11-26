import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug, services } from "@/lib/services-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceSlug = searchParams.get("service");

    if (serviceSlug) {
      const service = getServiceBySlug(serviceSlug);
      
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
          testimonials: service.testimonials
        }
      });
    }

    // Return all testimonials grouped by service
    const allTestimonials = services.map(s => ({
      serviceSlug: s.slug,
      serviceName: s.name,
      testimonials: s.testimonials
    }));

    return NextResponse.json({
      success: true,
      data: allTestimonials
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
