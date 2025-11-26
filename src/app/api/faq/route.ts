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
          faq: service.faq
        }
      });
    }

    // Return all FAQs grouped by service
    const allFaqs = services.map(s => ({
      serviceSlug: s.slug,
      serviceName: s.name,
      faq: s.faq
    }));

    return NextResponse.json({
      success: true,
      data: allFaqs
    });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQ" },
      { status: 500 }
    );
  }
}
