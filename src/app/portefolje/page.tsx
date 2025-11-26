import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { portfolioProjects, getFeaturedPortfolio } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portefølje | NORNEX - Våre prosjekter og referanser",
  description:
    "Se våre referanseprosjekter innen IT-tjenester, webutvikling og app-utvikling. Casestudier fra fornøyde kunder.",
  keywords: [
    "IT-prosjekter",
    "Case studies",
    "Referanser",
    "Webutvikling prosjekter",
    "App-utvikling prosjekter",
    "NORNEX portefølje",
  ],
  openGraph: {
    title: "Portefølje | NORNEX",
    description: "Se våre referanseprosjekter og casestudier",
    type: "website",
    locale: "nb_NO",
  },
};

export default function PortfolioPage() {
  const featured = getFeaturedPortfolio();

  // Structured data for portfolio
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NORNEX Portefølje",
    description: "Våre referanseprosjekter og casestudier",
    provider: {
      "@type": "Organization",
      name: "NORNEX AS",
    },
    hasPart: portfolioProjects.slice(0, 5).map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.shortDescription,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioClient 
        projects={portfolioProjects} 
        featuredProjects={featured}
      />
    </>
  );
}
