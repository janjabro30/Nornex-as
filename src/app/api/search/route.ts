import { NextRequest, NextResponse } from "next/server";

interface SearchResult {
  type: "service" | "product" | "page" | "faq";
  title: string;
  description: string;
  href: string;
}

// Mock search data - in production this would query the database
const searchData: SearchResult[] = [
  // Services
  { type: "service", title: "Webutvikling", description: "Profesjonelle nettsider og webapplikasjoner", href: "/tjenester#web" },
  { type: "service", title: "App-utvikling", description: "Native og cross-platform mobilapper", href: "/tjenester#app" },
  { type: "service", title: "Webapplikasjoner", description: "Skreddersydde webapplikasjoner", href: "/tjenester#webapp" },
  { type: "service", title: "Managed IT", description: "Komplett IT-drift og support", href: "/tjenester#managed-it" },
  { type: "service", title: "IT-sikkerhet", description: "Beskyttelse mot digitale trusler", href: "/tjenester#sikkerhet" },
  { type: "service", title: "Skyløsninger", description: "Fleksible og skalerbare løsninger", href: "/tjenester#sky" },
  { type: "service", title: "24/7 Support", description: "Rask og effektiv IT-support", href: "/tjenester#support" },
  { type: "service", title: "Hardware", description: "Kvalitetsutstyr for bedrifter", href: "/nettbutikk" },
  { type: "service", title: "Reparasjon", description: "Profesjonell reparasjon av IT-utstyr", href: "/reparasjon" },
  // Products
  { type: "product", title: "Laptop", description: "Business laptops og refurbished", href: "/nettbutikk?category=laptops" },
  { type: "product", title: "Desktop PC", description: "Stasjonære datamaskiner", href: "/nettbutikk?category=desktops" },
  { type: "product", title: "Monitorer", description: "Skjermer for kontor og hjemme", href: "/nettbutikk?category=monitors" },
  { type: "product", title: "Tilbehør", description: "Kabler, mus, tastatur og mer", href: "/nettbutikk?category=accessories" },
  // Pages
  { type: "page", title: "Om oss", description: "Lær mer om NORNEX AS", href: "/om-oss" },
  { type: "page", title: "Kontakt", description: "Ta kontakt med oss", href: "/kontakt" },
  { type: "page", title: "Priser", description: "Se våre priser", href: "/pricing" },
  { type: "page", title: "Miljø", description: "Vårt fokus på bærekraft", href: "/miljo" },
  { type: "page", title: "Personvern", description: "Personvernerklæring", href: "/personvern" },
  { type: "page", title: "Vilkår", description: "Kjøpsvilkår og betingelser", href: "/vilkar" },
  // FAQ
  { type: "faq", title: "Leveringstid", description: "Hvor lang tid tar levering?", href: "/frakt" },
  { type: "faq", title: "Returrett", description: "Hvordan returnerer jeg varer?", href: "/retur" },
  { type: "faq", title: "Garanti", description: "Hva dekker garantien?", href: "/garanti" },
  { type: "faq", title: "Betalingsmetoder", description: "Hvilke betalingsmetoder aksepteres?", href: "/vilkar" },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const searchQuery = query.toLowerCase().trim();
    
    // Filter results based on query
    const results = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
    );

    // Group results by type
    const groupedResults = {
      services: results.filter((r) => r.type === "service"),
      products: results.filter((r) => r.type === "product"),
      pages: results.filter((r) => r.type === "page"),
      faq: results.filter((r) => r.type === "faq"),
    };

    return NextResponse.json(
      { 
        query,
        results: groupedResults,
        totalCount: results.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
