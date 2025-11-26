import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPortfolioBySlug,
  portfolioProjects,
  getPortfolioByService,
} from "@/lib/portfolio-data";
import CaseStudyClient from "./CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all portfolio projects
export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) {
    return {
      title: "Prosjekt ikke funnet | NORNEX",
    };
  }

  return {
    title: `${project.title} | NORNEX Portefølje`,
    description: project.shortDescription,
    keywords: [
      project.serviceName,
      project.industry,
      ...project.technologies.slice(0, 5),
      "Case study",
      "NORNEX",
    ],
    openGraph: {
      title: `${project.title} | NORNEX`,
      description: project.shortDescription,
      type: "article",
      locale: "nb_NO",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get related projects from the same service
  const relatedProjects = getPortfolioByService(project.serviceSlug)
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.shortDescription,
    author: {
      "@type": "Organization",
      name: "NORNEX AS",
    },
    publisher: {
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
    datePublished: project.date,
    about: {
      "@type": "Service",
      name: project.serviceName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CaseStudyClient project={project} relatedProjects={relatedProjects} />
    </>
  );
}
