import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, services, getRelatedServices } from "@/lib/services-data";
import { getPortfolioByService } from "@/lib/portfolio-data";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all services
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Tjeneste ikke funnet | NORNEX",
    };
  }

  return {
    title: `${service.name} | NORNEX - IT-tjenester Oslo`,
    description: service.description,
    keywords: [
      service.name,
      ...service.features.slice(0, 5),
      "IT-tjenester Oslo",
      "NORNEX",
    ],
    openGraph: {
      title: `${service.name} | NORNEX`,
      description: service.subtitle,
      type: "website",
      locale: "nb_NO",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get related portfolio projects
  const portfolioProjects = getPortfolioByService(slug).slice(0, 4);
  
  // Get related services
  const relatedServicesList = getRelatedServices(service.relatedServices);

  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "NORNEX AS",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Brynsveien 18",
        addressLocality: "Oslo",
        postalCode: "0667",
        addressCountry: "NO",
      },
    },
    offers: service.pricing.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "NOK",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServiceDetailClient
        service={service}
        portfolioProjects={portfolioProjects}
        relatedServices={relatedServicesList}
      />
    </>
  );
}
