import { NextRequest, NextResponse } from "next/server";
import { 
  portfolioProjects, 
  getPortfolioByService, 
  getPortfolioByCategory 
} from "@/lib/portfolio-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get("service");
    const filter = searchParams.get("filter") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "12");

    let projects = portfolioProjects;

    // Filter by service if provided
    if (service) {
      projects = getPortfolioByService(service);
    } else if (filter && filter !== "all") {
      // Filter by category
      if (filter === "it" || filter === "development") {
        projects = getPortfolioByCategory(filter);
      }
    }

    // Pagination
    const total = projects.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const paginatedProjects = projects.slice(start, start + perPage);

    return NextResponse.json({
      success: true,
      data: paginatedProjects.map(p => ({
        slug: p.slug,
        title: p.title,
        client: p.client,
        industry: p.industry,
        category: p.category,
        serviceSlug: p.serviceSlug,
        serviceName: p.serviceName,
        shortDescription: p.shortDescription,
        featured: p.featured,
        technologies: p.technologies,
        results: p.results.slice(0, 2) // Only first 2 results for overview
      })),
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}
