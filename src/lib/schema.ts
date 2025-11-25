export const organizationSchema = {
  "@type": "Organization" as const,
  name: "Nornex AS",
  url: "https://nornex.no",
  logo: "https://nornex.no/logo.png",
  sameAs: [
    "https://facebook.com/nornexas",
    "https://twitter.com/nornexas",
    "https://linkedin.com/company/nornexas",
    "https://instagram.com/nornexas",
  ],
  contactPoint: {
    "@type": "ContactPoint" as const,
    telephone: "+47-22-00-00-00",
    contactType: "customer service",
    availableLanguage: ["Norwegian", "English"],
    areaServed: "NO",
  },
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Storgata 1",
    addressLocality: "Oslo",
    postalCode: "0155",
    addressCountry: "NO",
  },
};

export const localBusinessSchema = {
  "@type": "LocalBusiness" as const,
  "@id": "https://nornex.no/#localbusiness",
  name: "Nornex AS",
  image: "https://nornex.no/og-image.jpg",
  url: "https://nornex.no",
  telephone: "+47-22-00-00-00",
  email: "kontakt@nornex.no",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Storgata 1",
    addressLocality: "Oslo",
    postalCode: "0155",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 59.9139,
    longitude: 10.7522,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating" as const,
    ratingValue: "4.9",
    reviewCount: "100",
  },
};

export const websiteSchema = {
  "@type": "WebSite" as const,
  name: "Nornex AS",
  url: "https://nornex.no",
  potentialAction: {
    "@type": "SearchAction" as const,
    target: {
      "@type": "EntryPoint" as const,
      urlTemplate: "https://nornex.no/search?q={search_term_string}",
    },
  },
  inLanguage: ["nb-NO", "en"],
};

export const servicesSchema = [
  {
    "@type": "Service" as const,
    name: "Administrert IT / Managed IT",
    description: "Fullstendig IT-administrasjon og proaktiv overvåking for sømløs drift.",
    provider: {
      "@type": "Organization" as const,
      name: "Nornex AS",
    },
    areaServed: {
      "@type": "Country" as const,
      name: "Norway",
    },
    serviceType: "Managed IT Services",
  },
  {
    "@type": "Service" as const,
    name: "Cybersikkerhet / Cybersecurity",
    description: "Avansert sikkerhetsbeskyttelse mot moderne trusler og angrep.",
    provider: {
      "@type": "Organization" as const,
      name: "Nornex AS",
    },
    areaServed: {
      "@type": "Country" as const,
      name: "Norway",
    },
    serviceType: "Cybersecurity Services",
  },
  {
    "@type": "Service" as const,
    name: "Skyløsninger / Cloud Solutions",
    description: "Skalerbar skyinfrastruktur og migrering for optimal ytelse.",
    provider: {
      "@type": "Organization" as const,
      name: "Nornex AS",
    },
    areaServed: {
      "@type": "Country" as const,
      name: "Norway",
    },
    serviceType: "Cloud Computing Services",
  },
  {
    "@type": "Service" as const,
    name: "IT-Support 24/7",
    description: "Døgnåpen helpdesk med rask responstid og ekspertise.",
    provider: {
      "@type": "Organization" as const,
      name: "Nornex AS",
    },
    areaServed: {
      "@type": "Country" as const,
      name: "Norway",
    },
    serviceType: "IT Support Services",
  },
  {
    "@type": "Service" as const,
    name: "Nettverksløsninger / Network Solutions",
    description: "Design, implementering og vedlikehold av bedriftsnettverk.",
    provider: {
      "@type": "Organization" as const,
      name: "Nornex AS",
    },
    areaServed: {
      "@type": "Country" as const,
      name: "Norway",
    },
    serviceType: "Network Services",
  },
  {
    "@type": "Service" as const,
    name: "Datamaskinreparasjon / Computer Repair",
    description: "Profesjonell reparasjon inkludert mikrolodding og datainnhenting.",
    provider: {
      "@type": "Organization" as const,
      name: "Nornex AS",
    },
    areaServed: {
      "@type": "Country" as const,
      name: "Norway",
    },
    serviceType: "Computer Repair Services",
  },
];

export const faqSchema = {
  "@type": "FAQPage" as const,
  mainEntity: [
    {
      "@type": "Question" as const,
      name: "Hva inkluderer administrert IT-tjenester?",
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: "Våre administrert IT-tjenester inkluderer proaktiv overvåking av alle systemer, regelmessige sikkerhetsoppdateringer, backup-administrasjon, helpdesk-support, nettverksadministrasjon, og strategisk IT-rådgivning.",
      },
    },
    {
      "@type": "Question" as const,
      name: "Hvor raskt kan jeg forvente svar på support-henvendelser?",
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: "For kritiske problemer garanterer vi respons innen 15 minutter. For vanlige henvendelser er gjennomsnittlig responstid under 1 time.",
      },
    },
    {
      "@type": "Question" as const,
      name: "Tilbyr dere cybersikkerhetsløsninger?",
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: "Ja, vi tilbyr omfattende cybersikkerhetsløsninger inkludert brannmur-administrasjon, antivirus, e-postsikkerhet, sikkerhetsopplæring, og døgnkontinuerlig overvåking.",
      },
    },
    {
      "@type": "Question" as const,
      name: "Er tjenestene deres GDPR-kompatible?",
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: "Ja, alle våre tjenester er fullt GDPR-kompatible. Alle data lagres i sikre datasentre lokalisert i Norge eller EU.",
      },
    },
  ],
};

export const contactPageSchema = {
  "@type": "ContactPage" as const,
  name: "Kontakt Nornex AS",
  description: "Ta kontakt med Nornex AS for IT-support, rådgivning og tjenester.",
  url: "https://nornex.no/contact",
};

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList" as const,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateStructuredData(schemas: object[]): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
  return JSON.stringify(graph);
}
