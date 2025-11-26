// Portfolio data for Nornex case studies
// Phase 8: Service Detail Pages & Portfolio

export interface PortfolioResult {
  metric: string;
  value: string;
  description: string;
}

export interface PortfolioImplementation {
  phase: string;
  description: string;
  duration: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  clientLogo?: string;
  industry: string;
  category: "it" | "development";
  serviceSlug: string;
  serviceName: string;
  date: string;
  duration: string;
  featured: boolean;
  shortDescription: string;
  challenge: string;
  solution: string;
  implementation: PortfolioImplementation[];
  results: PortfolioResult[];
  technologies: string[];
  images: string[];
  testimonial?: {
    name: string;
    role: string;
    content: string;
    avatar?: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  // IT Projects
  {
    slug: "tech-solutions-managed-it",
    title: "Komplett IT-drift for Tech Solutions AS",
    client: "Tech Solutions AS",
    industry: "Teknologi",
    category: "it",
    serviceSlug: "managed-it",
    serviceName: "Managed IT",
    date: "2024-01",
    duration: "Løpende",
    featured: true,
    shortDescription: "Overtok komplett IT-drift for teknologibedrift med 50 ansatte",
    challenge: "Tech Solutions AS hadde utdatert infrastruktur, hyppige nedetider og manglet intern IT-kompetanse. De trengte en pålitelig partner som kunne ta over hele IT-driften.",
    solution: "Vi implementerte en komplett managed IT-løsning med 24/7 overvåking, proaktiv vedlikehold, modernisert infrastruktur og dedikert support-team.",
    implementation: [
      { phase: "Kartlegging", description: "Grundig analyse av eksisterende systemer og identifisering av sårbarheter", duration: "2 uker" },
      { phase: "Planlegging", description: "Utarbeidet migrasjonsplan og ny systemarkitektur", duration: "1 uke" },
      { phase: "Implementering", description: "Moderniserte servere, nettverk og sikkerhetsløsninger", duration: "4 uker" },
      { phase: "Overgang", description: "Smidig overgang til vårt support-team med parallellkjøring", duration: "2 uker" }
    ],
    results: [
      { metric: "Oppetid", value: "99.9%", description: "Fra 95% til 99.9% oppetid" },
      { metric: "Responstid", value: "-80%", description: "Redusert responstid på support" },
      { metric: "Kostnader", value: "-30%", description: "Reduserte IT-kostnader" },
      { metric: "Produktivitet", value: "+25%", description: "Økt ansattproduktivitet" }
    ],
    technologies: ["Microsoft 365", "Azure", "VMware", "Veeam", "Fortinet"],
    images: ["/images/portfolio/tech-solutions-1.jpg", "/images/portfolio/tech-solutions-2.jpg"],
    testimonial: {
      name: "Erik Hansen",
      role: "IT-sjef, Tech Solutions AS",
      content: "Nornex har transformert vår IT-drift. Vi har 99.9% oppetid og slipper å bekymre oss for tekniske problemer. De ansatte kan fokusere på jobben sin."
    }
  },
  {
    slug: "finans-as-sikkerhet",
    title: "Omfattende sikkerhetsløsning for Finans AS",
    client: "Finans AS",
    industry: "Finans",
    category: "it",
    serviceSlug: "it-sikkerhet",
    serviceName: "IT-sikkerhet",
    date: "2023-09",
    duration: "3 måneder",
    featured: true,
    shortDescription: "Implementerte enterprise-grade sikkerhetsløsning for finansselskap",
    challenge: "Finans AS håndterer sensitive kundedata og trengte å møte strenge regulatoriske krav samtidig som de beskyttet mot økende cybertrusler.",
    solution: "Vi gjennomførte en omfattende sikkerhetsvurdering og implementerte en flerlagsløsning med brannmur, kryptering, MFA og kontinuerlig overvåking.",
    implementation: [
      { phase: "Risikoanalyse", description: "Kartla sårbarheter, trusler og compliance-gap", duration: "3 uker" },
      { phase: "Strategi", description: "Utviklet sikkerhetsstrategi og handlingsplan", duration: "2 uker" },
      { phase: "Implementering", description: "Rullet ut brannmur, VPN, MFA og overvåking", duration: "6 uker" },
      { phase: "Opplæring", description: "Sikkerhetsopplæring for alle ansatte", duration: "2 uker" }
    ],
    results: [
      { metric: "Sikkerhetshendelser", value: "0", description: "Ingen sikkerhetsbrudd etter implementering" },
      { metric: "Compliance", value: "100%", description: "Full GDPR og bransje-compliance" },
      { metric: "Phishing", value: "-95%", description: "Reduksjon i vellykkede phishing-forsøk" },
      { metric: "Responstid", value: "<15 min", description: "Responstid ved sikkerhetshendelser" }
    ],
    technologies: ["Fortinet", "CrowdStrike", "Microsoft Defender", "KnowBe4"],
    images: ["/images/portfolio/finans-security-1.jpg"],
    testimonial: {
      name: "Anders Berg",
      role: "CFO, Finans AS",
      content: "Etter at Nornex tok over sikkerheten har vi ikke hatt ett eneste sikkerhetsbrudd. Verdt hver krone investert."
    }
  },
  {
    slug: "startup-sky-migrering",
    title: "Skymigrering for Startup Hub",
    client: "Startup Hub",
    industry: "Teknologi",
    category: "it",
    serviceSlug: "skylosninger",
    serviceName: "Skyløsninger",
    date: "2024-03",
    duration: "6 uker",
    featured: false,
    shortDescription: "Migrerte startup-inkubator til Microsoft 365 og Azure",
    challenge: "Startup Hub hadde spredd datalagring, ineffektiv samhandling og høye kostnader på lokale servere. De trengte en moderne, skalerbar løsning.",
    solution: "Komplett migrering til Microsoft 365 med Teams, SharePoint og Azure-hosting. Implementerte hybrid arbeidsmodell med sikker fjerntilgang.",
    implementation: [
      { phase: "Planlegging", description: "Kartla data og applikasjoner for migrering", duration: "1 uke" },
      { phase: "Migrering", description: "Flyttet e-post, filer og applikasjoner", duration: "3 uker" },
      { phase: "Opplæring", description: "Trente ansatte i nye verktøy", duration: "1 uke" },
      { phase: "Optimalisering", description: "Finjusterte ytelse og kostnader", duration: "1 uke" }
    ],
    results: [
      { metric: "Kostnader", value: "-40%", description: "Reduserte infrastrukturkostnader" },
      { metric: "Samarbeid", value: "+60%", description: "Forbedret teamsamarbeid" },
      { metric: "Mobilitet", value: "100%", description: "Full fjerntilgang for alle" },
      { metric: "Backup", value: "Automatisk", description: "Automatisk backup og gjenoppretting" }
    ],
    technologies: ["Microsoft 365", "Azure", "SharePoint", "Teams"],
    images: ["/images/portfolio/startup-cloud-1.jpg"],
    testimonial: {
      name: "Thomas Eriksen",
      role: "CEO, Startup Hub",
      content: "Skiftet til Microsoft 365 var det beste vi gjorde. Alle kan jobbe fra hvor som helst."
    }
  },
  // Development Projects
  {
    slug: "kaffebar-nettside",
    title: "Moderne nettside for Kaffebar Oslo",
    client: "Kaffebar Oslo",
    industry: "Restaurant/Café",
    category: "development",
    serviceSlug: "nettside-utvikling",
    serviceName: "Nettside-utvikling",
    date: "2024-02",
    duration: "5 uker",
    featured: true,
    shortDescription: "Designet og utviklet merkevarebyggende nettside med online bestilling",
    challenge: "Kaffebar Oslo trengte en moderne nettside som reflekterte deres premium merkevare og tillot kunder å bestille online.",
    solution: "Vi utviklet en visuelt slående Next.js-nettside med skreddersydd design, online bestillingssystem og CMS for enkel oppdatering.",
    implementation: [
      { phase: "Briefing", description: "Forstod merkevaren og målene", duration: "1 uke" },
      { phase: "Design", description: "Laget visuell identitet og wireframes", duration: "1.5 uke" },
      { phase: "Utvikling", description: "Bygget nettside og bestillingssystem", duration: "2 uker" },
      { phase: "Lansering", description: "Publiserte og optimaliserte", duration: "0.5 uke" }
    ],
    results: [
      { metric: "Trafikk", value: "+200%", description: "Økt nettrafikk" },
      { metric: "Bestillinger", value: "+150%", description: "Flere online bestillinger" },
      { metric: "Lastetid", value: "<1s", description: "Rask lastetid" },
      { metric: "Mobilbruk", value: "70%", description: "Av trafikken er mobil" }
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "Vercel"],
    images: ["/images/portfolio/kaffebar-1.jpg", "/images/portfolio/kaffebar-2.jpg"],
    testimonial: {
      name: "Kristin Hansen",
      role: "Eier, Kaffebar Oslo",
      content: "Fantastisk nettside som virkelig representerer merkevaren vår. Økt trafikk med 200%!"
    }
  },
  {
    slug: "fitapp-mobilapp",
    title: "Treningsapp for FitApp AS",
    client: "FitApp AS",
    industry: "Helse/Fitness",
    category: "development",
    serviceSlug: "app-utvikling",
    serviceName: "App-utvikling",
    date: "2023-11",
    duration: "14 uker",
    featured: true,
    shortDescription: "Utviklet fitness-app med over 50.000 nedlastinger",
    challenge: "FitApp AS hadde en idé om en treningsapp, men manglet teknisk kompetanse til å realisere den. De trengte en partner som kunne ta prosjektet fra konsept til lansering.",
    solution: "Vi utviklet en cross-platform app med React Native, inkludert treningsprogrammer, ernæringsplaner, fremgangssporing og sosiale funksjoner.",
    implementation: [
      { phase: "Konsept", description: "Definerte funksjoner og brukerreiser", duration: "2 uker" },
      { phase: "Design", description: "Laget UX/UI design og prototyper", duration: "3 uker" },
      { phase: "Utvikling", description: "Bygget app og backend", duration: "7 uker" },
      { phase: "Testing & Lansering", description: "Kvalitetssikring og publisering", duration: "2 uker" }
    ],
    results: [
      { metric: "Nedlastinger", value: "50K+", description: "Nedlastinger første året" },
      { metric: "Rating", value: "4.7/5", description: "App Store rating" },
      { metric: "Aktive brukere", value: "15K", description: "Månedlig aktive brukere" },
      { metric: "Retention", value: "40%", description: "30-dagers retention rate" }
    ],
    technologies: ["React Native", "Node.js", "Firebase", "AWS"],
    images: ["/images/portfolio/fitapp-1.jpg", "/images/portfolio/fitapp-2.jpg"],
    testimonial: {
      name: "Fredrik Berg",
      role: "Gründer, FitApp AS",
      content: "Nornex leverte en fantastisk app som brukerne elsker. Over 50.000 nedlastinger første året!"
    }
  },
  {
    slug: "logistikk-webapplikasjon",
    title: "Ordresystem for Logistikk AS",
    client: "Logistikk AS",
    industry: "Logistikk",
    category: "development",
    serviceSlug: "webapplikasjoner",
    serviceName: "Webapplikasjoner",
    date: "2024-04",
    duration: "12 uker",
    featured: true,
    shortDescription: "Bygget skreddersydd ordresystem som kuttet behandlingstid med 70%",
    challenge: "Logistikk AS brukte manuelt arbeid og Excel for ordrehåndtering. De trengte en skreddersydd løsning for å automatisere prosessene.",
    solution: "Vi utviklet en webapplikasjon med automatisk ordrehåndtering, lageradministrasjon, ruting og rapportering, integrert mot eksisterende ERP.",
    implementation: [
      { phase: "Analyse", description: "Kartla prosesser og krav", duration: "2 uker" },
      { phase: "Design", description: "Spesifiserte løsning og brukergrensesnitt", duration: "2 uker" },
      { phase: "Utvikling", description: "Bygget applikasjon og integrasjoner", duration: "6 uker" },
      { phase: "Testing & Lansering", description: "Testet og rullet ut", duration: "2 uker" }
    ],
    results: [
      { metric: "Behandlingstid", value: "-70%", description: "Redusert ordrebehandlingstid" },
      { metric: "Feil", value: "-90%", description: "Reduserte feil i ordrer" },
      { metric: "Produktivitet", value: "+50%", description: "Økt ansattproduktivitet" },
      { metric: "ROI", value: "6 mnd", description: "Tilbakebetalt innen 6 måneder" }
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    images: ["/images/portfolio/logistikk-1.jpg"],
    testimonial: {
      name: "Henrik Olsen",
      role: "CTO, Logistikk AS",
      content: "Den nye ordre-applikasjonen har kuttet behandlingstiden med 70%. Fantastisk investering!"
    }
  },
  {
    slug: "import-api-integrasjon",
    title: "ERP-integrasjon for Import AS",
    client: "Import AS",
    industry: "Import/Handel",
    category: "development",
    serviceSlug: "api-integrasjoner",
    serviceName: "API-integrasjoner",
    date: "2024-02",
    duration: "4 uker",
    featured: false,
    shortDescription: "Integrerte nettbutikk med ERP for automatisk ordreflyt",
    challenge: "Import AS hadde en voksende nettbutikk, men måtte manuelt overføre ordrer til ERP-systemet, noe som tok timer hver dag.",
    solution: "Vi bygget en skreddersydd API-integrasjon mellom WooCommerce og Visma ERP med sanntidssynkronisering av ordrer, lager og kunder.",
    implementation: [
      { phase: "Kartlegging", description: "Analyserte dataflyt og systemkrav", duration: "1 uke" },
      { phase: "Utvikling", description: "Bygget integrasjon og API-er", duration: "2 uker" },
      { phase: "Testing & Lansering", description: "Testet og lanserte", duration: "1 uke" }
    ],
    results: [
      { metric: "Manuelt arbeid", value: "-4 timer/dag", description: "Spart daglig manuelt arbeid" },
      { metric: "Synkronisering", value: "Sanntid", description: "Ordrer synkronisert umiddelbart" },
      { metric: "Lagernøyaktighet", value: "99%+", description: "Forbedret lagernøyaktighet" },
      { metric: "Feil", value: "-95%", description: "Reduserte registreringsfeil" }
    ],
    technologies: ["Node.js", "WooCommerce", "Visma API", "AWS Lambda"],
    images: ["/images/portfolio/import-1.jpg"],
    testimonial: {
      name: "Per Eriksen",
      role: "IT-sjef, Import AS",
      content: "Integrasjonen mellom nettbutikken og ERP-et har spart oss for timer med manuelt arbeid daglig."
    }
  },
  {
    slug: "industri-konsultering",
    title: "IT-strategi for Industri AS",
    client: "Industri AS",
    industry: "Industri",
    category: "development",
    serviceSlug: "konsultering",
    serviceName: "IT-konsultering",
    date: "2023-12",
    duration: "8 uker",
    featured: false,
    shortDescription: "Utviklet 5-års IT-strategi for industribedrift",
    challenge: "Industri AS trengte en langsiktig IT-strategi for å støtte vekstambisjonene og digitalisere produksjonen.",
    solution: "Vi gjennomførte en omfattende analyse og utarbeidet en 5-års IT-strategi med fokus på digitalisering, automatisering og IoT.",
    implementation: [
      { phase: "Analyse", description: "Kartla nåsituasjon og behov", duration: "3 uker" },
      { phase: "Strategi", description: "Utviklet IT-strategi og roadmap", duration: "3 uker" },
      { phase: "Presentasjon", description: "Presenterte for ledelse og styre", duration: "2 uker" }
    ],
    results: [
      { metric: "Strategi", value: "5 år", description: "Langsiktig IT-roadmap" },
      { metric: "Prosjekter", value: "12", description: "Identifiserte digitaliseringsprosjekter" },
      { metric: "Besparelser", value: "20M+", description: "Potensielle årlige besparelser" },
      { metric: "Godkjenning", value: "100%", description: "Styregodkjent strategi" }
    ],
    technologies: ["Strategisk rådgivning", "Prosessanalyse", "Industri 4.0"],
    images: ["/images/portfolio/industri-1.jpg"],
    testimonial: {
      name: "Geir Haugen",
      role: "CEO, Industri AS",
      content: "Nornex hjalp oss med å legge en solid IT-strategi. Pengene godt investert!"
    }
  }
];

export function getPortfolioBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find(p => p.slug === slug);
}

export function getPortfolioByService(serviceSlug: string): PortfolioProject[] {
  return portfolioProjects.filter(p => p.serviceSlug === serviceSlug);
}

export function getPortfolioByCategory(category: "it" | "development" | "all"): PortfolioProject[] {
  if (category === "all") return portfolioProjects;
  return portfolioProjects.filter(p => p.category === category);
}

export function getFeaturedPortfolio(): PortfolioProject[] {
  return portfolioProjects.filter(p => p.featured);
}
