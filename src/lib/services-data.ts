// Service data for all Nornex services
// Phase 8: Service Detail Pages & Portfolio

export interface ServicePricing {
  tier: string;
  name: string;
  price: number;
  priceLabel: string;
  features: string[];
  isPopular?: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceIncluded {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface Service {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: "it" | "development";
  icon: string;
  gradient: string;
  features: string[];
  technologies: string[];
  deliveryTime: string;
  startingPrice: number;
  included: ServiceIncluded[];
  process: ProcessStep[];
  pricing: ServicePricing[];
  faq: FAQ[];
  testimonials: Testimonial[];
  relatedServices: string[];
}

export const services: Service[] = [
  // IT Services
  {
    slug: "managed-it",
    name: "Managed IT",
    subtitle: "Komplett IT-drift og overvåking for din bedrift",
    description: "Vi tar hånd om hele din IT-infrastruktur slik at du kan fokusere på kjernevirksomheten. Med 24/7 overvåking, proaktiv vedlikehold og rask responstid sikrer vi at systemene dine alltid er operative og sikre.",
    category: "it",
    icon: "Server",
    gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)",
    features: [
      "24/7 overvåking og support",
      "Proaktiv vedlikehold",
      "Fast responstid (< 1 time)",
      "Sikkerhetskopier og disaster recovery",
      "Nettverksadministrasjon",
      "Brukerstøtte og opplæring"
    ],
    technologies: ["Microsoft 365", "Azure", "VMware", "Veeam", "Fortinet", "Cisco", "Dell", "HP"],
    deliveryTime: "1-2 uker",
    startingPrice: 4990,
    included: [
      { icon: "Monitor", title: "24/7 Overvåking", description: "Kontinuerlig overvåking av alle systemer" },
      { icon: "Shield", title: "Sikkerhet", description: "Brannmur og antivirus-administrasjon" },
      { icon: "Cloud", title: "Backup", description: "Daglige sikkerhetskopier med rask gjenoppretting" },
      { icon: "Headphones", title: "Helpdesk", description: "Norskspråklig support via telefon og e-post" },
      { icon: "Settings", title: "Vedlikehold", description: "Jevnlige oppdateringer og optimaliseringer" },
      { icon: "FileText", title: "Rapportering", description: "Månedlige statusrapporter" }
    ],
    process: [
      { step: 1, title: "Analyse", description: "Vi kartlegger din nåværende IT-infrastruktur", icon: "Search" },
      { step: 2, title: "Planlegging", description: "Utarbeider skreddersydd løsning", icon: "FileText" },
      { step: 3, title: "Implementering", description: "Installerer overvåking og verktøy", icon: "Settings" },
      { step: 4, title: "Overgang", description: "Smidig overgang til vårt team", icon: "Users" },
      { step: 5, title: "Drift", description: "Kontinuerlig overvåking og support", icon: "Monitor" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Basis",
        price: 4990,
        priceLabel: "per måned",
        features: [
          "Opptil 10 brukere",
          "E-post og telefonsupport",
          "Månedlig backup",
          "Grunnleggende overvåking",
          "Responstid: 4 timer"
        ]
      },
      {
        tier: "standard",
        name: "Standard",
        price: 9990,
        priceLabel: "per måned",
        features: [
          "Opptil 25 brukere",
          "24/7 support",
          "Daglig backup",
          "Avansert overvåking",
          "Responstid: 1 time",
          "Månedlige rapporter"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Premium",
        price: 19990,
        priceLabel: "per måned",
        features: [
          "Ubegrenset brukere",
          "Dedikert tekniker",
          "Sanntids backup",
          "Proaktiv vedlikehold",
          "Responstid: 15 min",
          "On-site support inkludert",
          "Kvartalsvis gjennomgang"
        ]
      }
    ],
    faq: [
      { question: "Hva inkluderer Managed IT?", answer: "Managed IT inkluderer komplett drift av din IT-infrastruktur, inkludert overvåking, vedlikehold, support, sikkerhet og backup." },
      { question: "Hvor raskt får vi hjelp ved problemer?", answer: "Responstiden avhenger av pakken du velger. Vår Premium-pakke garanterer respons innen 15 minutter." },
      { question: "Kan dere håndtere eksisterende systemer?", answer: "Ja, vi tilpasser oss din eksisterende infrastruktur og kan jobbe med de fleste systemer og plattformer." },
      { question: "Hva skjer med data ved kontraktsslutt?", answer: "All data tilhører deg. Vi leverer komplett dokumentasjon og assisterer med overgang." },
      { question: "Tilbyr dere on-site support?", answer: "Ja, on-site support er inkludert i Premium-pakken eller kan bestilles separat." },
      { question: "Hvordan fungerer overvåkingen?", answer: "Vi bruker avanserte verktøy som kontinuerlig overvåker servere, nettverk og applikasjoner for å oppdage problemer før de påvirker driften." }
    ],
    testimonials: [
      { name: "Erik Hansen", company: "Tech Solutions AS", role: "IT-sjef", content: "Nornex har transformert vår IT-drift. Vi har 99.9% oppetid og slipper å bekymre oss for tekniske problemer.", rating: 5 },
      { name: "Maria Olsen", company: "Konsulentfirmaet", role: "Daglig leder", content: "Fantastisk support og profesjonell håndtering. Anbefales!", rating: 5 }
    ],
    relatedServices: ["it-sikkerhet", "skylosninger", "support"]
  },
  {
    slug: "it-sikkerhet",
    name: "IT-sikkerhet",
    subtitle: "Beskytt bedriften din mot cybertrusler",
    description: "Moderne cybertrusler krever moderne forsvar. Vi tilbyr omfattende sikkerhetsløsninger som beskytter din bedrift mot hacking, malware, phishing og datainnbrudd.",
    category: "it",
    icon: "Shield",
    gradient: "linear-gradient(135deg, #EC4899, #9333EA)",
    features: [
      "Sikkerhetsanalyse og penetrasjonstesting",
      "Brannmur og VPN-løsninger",
      "Antivirus og malware-beskyttelse",
      "E-postsikkerhet",
      "Sikkerhetsopplæring for ansatte",
      "Incident response"
    ],
    technologies: ["Fortinet", "Cisco", "Palo Alto", "CrowdStrike", "Microsoft Defender", "Sophos", "Proofpoint", "KnowBe4"],
    deliveryTime: "1-4 uker",
    startingPrice: 7990,
    included: [
      { icon: "Shield", title: "Brannmur", description: "Enterprise-grade brannmurbeskyttelse" },
      { icon: "Lock", title: "VPN", description: "Sikker fjerntilgang for ansatte" },
      { icon: "Mail", title: "E-postsikkerhet", description: "Beskyttelse mot phishing og spam" },
      { icon: "Eye", title: "Overvåking", description: "24/7 sikkerhetsmonitering" },
      { icon: "Users", title: "Opplæring", description: "Sikkerhetsbevissthet for ansatte" },
      { icon: "AlertTriangle", title: "Incident Response", description: "Rask respons ved sikkerhetshendelser" }
    ],
    process: [
      { step: 1, title: "Risikoanalyse", description: "Kartlegger sårbarheter og trusler", icon: "Search" },
      { step: 2, title: "Strategi", description: "Utarbeider sikkerhetsplan", icon: "FileText" },
      { step: 3, title: "Implementering", description: "Installerer sikkerhetsløsninger", icon: "Shield" },
      { step: 4, title: "Testing", description: "Verifiserer beskyttelsen", icon: "CheckCircle" },
      { step: 5, title: "Overvåking", description: "Kontinuerlig sikkerhetsmonitering", icon: "Eye" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Basis",
        price: 7990,
        priceLabel: "per måned",
        features: [
          "Brannmuradministrasjon",
          "Antivirus for alle enheter",
          "Månedlig sikkerhetsrapport",
          "E-post support"
        ]
      },
      {
        tier: "standard",
        name: "Standard",
        price: 14990,
        priceLabel: "per måned",
        features: [
          "Alt i Basis",
          "VPN-løsning",
          "E-postsikkerhet",
          "Kvartalsvis penetrasjonstest",
          "Sikkerhetsopplæring",
          "24/7 overvåking"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Premium",
        price: 29990,
        priceLabel: "per måned",
        features: [
          "Alt i Standard",
          "SOC as a Service",
          "Månedlig penetrasjonstest",
          "Dedikert sikkerhetsrådgiver",
          "Incident response team",
          "Compliance-rapportering"
        ]
      }
    ],
    faq: [
      { question: "Hvorfor trenger vi IT-sikkerhet?", answer: "Cybertrusler øker hvert år. En sikkerhetshendelse kan koste millioner i tapt omsetning, bøter og omdømmetap." },
      { question: "Hva er penetrasjonstesting?", answer: "Penetrasjonstesting er simulerte angrep på systemene dine for å finne sårbarheter før hackere gjør det." },
      { question: "Inkluderer dere opplæring av ansatte?", answer: "Ja, vi tilbyr sikkerhetsopplæring og phishing-simuleringer for å øke bevisstheten." },
      { question: "Hva skjer ved et sikkerhetsbrudd?", answer: "Vi har dedikerte incident response-team som reagerer umiddelbart for å begrense skaden." },
      { question: "Er løsningene GDPR-kompatible?", answer: "Ja, alle våre sikkerhetsløsninger er designet for å støtte GDPR-compliance." }
    ],
    testimonials: [
      { name: "Anders Berg", company: "Finans AS", role: "CFO", content: "Etter at Nornex tok over sikkerheten har vi ikke hatt ett eneste sikkerhetsbrudd. Verdt hver krone.", rating: 5 },
      { name: "Kari Johansen", company: "Helse Vest", role: "IT-leder", content: "Profesjonell og grundig sikkerhetsvurdering. Vi føler oss trygge.", rating: 5 }
    ],
    relatedServices: ["managed-it", "skylosninger", "konsultering"]
  },
  {
    slug: "skylosninger",
    name: "Skyløsninger",
    subtitle: "Fleksible og skalerbare sky-tjenester",
    description: "Flytt virksomheten til skyen og få fleksibilitet, skalerbarhet og kostnadsbesparelser. Vi hjelper deg med migrering, drift og optimalisering av skyløsninger.",
    category: "it",
    icon: "Cloud",
    gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
    features: [
      "Microsoft 365 og Azure",
      "Skymigrering",
      "Hybrid sky-løsninger",
      "Backup og disaster recovery",
      "Kostnadsoptimalisering",
      "Cloud security"
    ],
    technologies: ["Microsoft Azure", "Microsoft 365", "AWS", "Google Cloud", "Veeam", "VMware", "Citrix", "SharePoint"],
    deliveryTime: "2-6 uker",
    startingPrice: 2990,
    included: [
      { icon: "Cloud", title: "Microsoft 365", description: "E-post, Teams, og Office-apper" },
      { icon: "Database", title: "Skylagring", description: "Sikker lagring i skyen" },
      { icon: "RefreshCw", title: "Backup", description: "Automatisk backup av skydata" },
      { icon: "Lock", title: "Sikkerhet", description: "Enterprise-grade sikkerhet" },
      { icon: "TrendingUp", title: "Skalerbarhet", description: "Voks etter behov" },
      { icon: "Headphones", title: "Support", description: "Teknisk support og veiledning" }
    ],
    process: [
      { step: 1, title: "Evaluering", description: "Vurderer behov og nåværende systemer", icon: "Search" },
      { step: 2, title: "Design", description: "Planlegger skyarkitektur", icon: "Layout" },
      { step: 3, title: "Migrering", description: "Flytter data og applikasjoner", icon: "Upload" },
      { step: 4, title: "Testing", description: "Verifiserer funksjonalitet", icon: "CheckCircle" },
      { step: 5, title: "Optimalisering", description: "Finjusterer ytelse og kostnader", icon: "Settings" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Basis",
        price: 2990,
        priceLabel: "per måned",
        features: [
          "Microsoft 365 Business Basic",
          "1TB skylagring per bruker",
          "E-post support",
          "Grunnleggende backup"
        ]
      },
      {
        tier: "standard",
        name: "Standard",
        price: 5990,
        priceLabel: "per måned",
        features: [
          "Microsoft 365 Business Standard",
          "Azure-hosting",
          "Avansert backup",
          "24/7 support",
          "Månedlig optimalisering"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Premium",
        price: 12990,
        priceLabel: "per måned",
        features: [
          "Microsoft 365 E3/E5",
          "Dedikert Azure-miljø",
          "Disaster recovery",
          "Hybrid sky-løsning",
          "Dedikert rådgiver",
          "SLA 99.9%"
        ]
      }
    ],
    faq: [
      { question: "Hva er fordelene med skyen?", answer: "Skyen gir fleksibilitet, skalerbarhet, lavere investeringskostnader og tilgang fra hvor som helst." },
      { question: "Er data sikre i skyen?", answer: "Ja, skyløsninger fra Microsoft og andre store leverandører har bedre sikkerhet enn de fleste lokale løsninger." },
      { question: "Kan vi beholde noen systemer lokalt?", answer: "Ja, vi tilbyr hybridløsninger som kombinerer sky og lokale systemer." },
      { question: "Hvor lang tid tar migrering?", answer: "Avhengig av kompleksitet tar migrering vanligvis 2-6 uker." },
      { question: "Hva skjer med eksisterende data?", answer: "Vi migrerer all data sikkert til skyen og verifiserer integriteten." }
    ],
    testimonials: [
      { name: "Thomas Eriksen", company: "Startup AS", role: "CEO", content: "Skiftet til Microsoft 365 var det beste vi gjorde. Alle kan jobbe fra hvor som helst.", rating: 5 },
      { name: "Lise Andersen", company: "Regnskap & Co", role: "Partner", content: "Nornex gjorde migreringen smertefri. Anbefales!", rating: 5 }
    ],
    relatedServices: ["managed-it", "it-sikkerhet", "support"]
  },
  {
    slug: "support",
    name: "24/7 Support",
    subtitle: "Rask og profesjonell IT-hjelp når du trenger det",
    description: "Vår norskspråklige helpdesk er tilgjengelig døgnet rundt for å hjelpe deg med alle IT-relaterte problemer. Fra enkle spørsmål til komplekse tekniske utfordringer.",
    category: "it",
    icon: "Headphones",
    gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    features: [
      "24/7 norskspråklig support",
      "Fjernhjelp og feilsøking",
      "SLA-garantier",
      "Eskaleringsrutiner",
      "Ticket-system",
      "On-site support ved behov"
    ],
    technologies: ["ServiceNow", "Zendesk", "TeamViewer", "AnyDesk", "Microsoft Teams", "Jira", "Confluence"],
    deliveryTime: "Umiddelbart",
    startingPrice: 1990,
    included: [
      { icon: "Phone", title: "Telefonsupport", description: "Ring oss når som helst" },
      { icon: "Mail", title: "E-postsupport", description: "Send forespørsel via e-post" },
      { icon: "MessageSquare", title: "Chat", description: "Live chat med tekniker" },
      { icon: "Monitor", title: "Fjernhjelp", description: "Vi kobler oss på din PC" },
      { icon: "Truck", title: "On-site", description: "Tekniker kommer til deg" },
      { icon: "FileText", title: "Dokumentasjon", description: "Brukerveiledninger og FAQ" }
    ],
    process: [
      { step: 1, title: "Kontakt", description: "Ring, send e-post eller chat", icon: "Phone" },
      { step: 2, title: "Registrering", description: "Saken registreres i vårt system", icon: "FileText" },
      { step: 3, title: "Analyse", description: "Tekniker analyserer problemet", icon: "Search" },
      { step: 4, title: "Løsning", description: "Problemet løses via fjernhjelp eller on-site", icon: "CheckCircle" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Basis",
        price: 1990,
        priceLabel: "per måned",
        features: [
          "Kontortid support (08-17)",
          "E-post og telefon",
          "Responstid: 4 timer",
          "Max 5 henvendelser/mnd"
        ]
      },
      {
        tier: "standard",
        name: "Standard",
        price: 3990,
        priceLabel: "per måned",
        features: [
          "Utvidet åpningstid (07-22)",
          "Chat, e-post og telefon",
          "Responstid: 1 time",
          "Ubegrensede henvendelser",
          "Fjernhjelp inkludert"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Premium",
        price: 7990,
        priceLabel: "per måned",
        features: [
          "24/7 support",
          "Alle kanaler",
          "Responstid: 15 min",
          "Prioritert kø",
          "Dedikert kontaktperson",
          "On-site inkludert"
        ]
      }
    ],
    faq: [
      { question: "Når er supporten tilgjengelig?", answer: "Tilgjengeligheten avhenger av pakken. Premium har 24/7 support." },
      { question: "Hva er responstiden?", answer: "Fra 15 minutter til 4 timer avhengig av valgt pakke." },
      { question: "Støtter dere alle systemer?", answer: "Vi støtter Windows, Mac, Linux, samt de fleste programvarer og skyløsninger." },
      { question: "Kan dere komme on-site?", answer: "Ja, on-site support er tilgjengelig i Oslo-området og kan bestilles." },
      { question: "Hva hvis problemet ikke kan løses?", answer: "Vi eskalerer til spesialister og holder deg informert underveis." }
    ],
    testimonials: [
      { name: "Petter Nilsen", company: "Advokatfirma DA", role: "Partner", content: "Rask og kompetent hjelp. Alltid noen å ringe til.", rating: 5 },
      { name: "Ingrid Svendsen", company: "Eiendom AS", role: "Kontorsjef", content: "Problemene løses før de blir store. Utrolig service!", rating: 5 }
    ],
    relatedServices: ["managed-it", "hardware", "reparasjon"]
  },
  {
    slug: "hardware",
    name: "Hardware",
    subtitle: "Kvalitetsutstyr tilpasset dine behov",
    description: "Vi leverer og installerer hardware til bedrifter. Fra bærbare PC-er og arbeidsstasjoner til servere og nettverksutstyr. Alt med garanti og support.",
    category: "it",
    icon: "Laptop",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    features: [
      "Bærbare og stasjonære PC-er",
      "Servere og lagring",
      "Nettverksutstyr",
      "Skjermer og periferiutstyr",
      "Refurbished alternativer",
      "Installasjon og konfigurasjon"
    ],
    technologies: ["Dell", "HP", "Lenovo", "Apple", "Microsoft Surface", "Cisco", "Ubiquiti", "Synology"],
    deliveryTime: "1-5 dager",
    startingPrice: 5990,
    included: [
      { icon: "Laptop", title: "PC-er", description: "Bærbare og stasjonære" },
      { icon: "Server", title: "Servere", description: "On-premise og edge" },
      { icon: "Wifi", title: "Nettverk", description: "Switcher, rutere, access points" },
      { icon: "Monitor", title: "Skjermer", description: "Fra 24 til 49 tommer" },
      { icon: "Printer", title: "Skrivere", description: "Multifunksjon og etiketter" },
      { icon: "Settings", title: "Installasjon", description: "Levering og oppsett" }
    ],
    process: [
      { step: 1, title: "Behovsanalyse", description: "Vi kartlegger dine behov", icon: "Search" },
      { step: 2, title: "Anbefaling", description: "Foreslår passende utstyr", icon: "FileText" },
      { step: 3, title: "Bestilling", description: "Bestiller utstyret", icon: "ShoppingCart" },
      { step: 4, title: "Konfigurasjon", description: "Setter opp og konfigurerer", icon: "Settings" },
      { step: 5, title: "Levering", description: "Leverer og installerer", icon: "Truck" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Arbeidsstasjon",
        price: 5990,
        priceLabel: "fra",
        features: [
          "Bærbar PC eller stasjonær",
          "Windows 11 Pro",
          "Microsoft 365-ready",
          "2 års garanti"
        ]
      },
      {
        tier: "standard",
        name: "Komplett arbeidsplass",
        price: 12990,
        priceLabel: "fra",
        features: [
          "PC med skjerm",
          "Tastatur og mus",
          "Headset",
          "Docking station",
          "Installasjon inkludert",
          "3 års garanti"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Enterprise-pakke",
        price: 24990,
        priceLabel: "fra",
        features: [
          "Høyytelse arbeidsstasjon",
          "Dobbel skjerm",
          "Premium periferi",
          "Server-integrasjon",
          "On-site support 1 år",
          "5 års garanti"
        ]
      }
    ],
    faq: [
      { question: "Hvilke merker tilbyr dere?", answer: "Vi er partner med Dell, HP, Lenovo, Apple og flere andre ledende produsenter." },
      { question: "Har dere refurbished utstyr?", answer: "Ja, vi tilbyr kvalitetstestet refurbished utstyr med full garanti." },
      { question: "Inkluderer dere installasjon?", answer: "Ja, installasjon og konfigurasjon kan inkluderes i pakken." },
      { question: "Hva med garanti?", answer: "Alt utstyr leveres med minimum 2 års garanti." },
      { question: "Kan dere hente gammelt utstyr?", answer: "Ja, vi tilbyr miljøvennlig avhending og innbytteordninger." }
    ],
    testimonials: [
      { name: "Ole Kristiansen", company: "Arkitektfirma AS", role: "Innkjøpssjef", content: "Flott utvalg og konkurransedyktige priser. Levering og installasjon gikk smertefritt.", rating: 5 },
      { name: "Hanne Larsen", company: "Startup Hub", role: "CEO", content: "Refurbished Mac-er til halv pris med full garanti. Perfekt for oppstartsbedrifter!", rating: 5 }
    ],
    relatedServices: ["managed-it", "support", "reparasjon"]
  },
  {
    slug: "reparasjon",
    name: "Reparasjon",
    subtitle: "Profesjonell reparasjon av IT-utstyr",
    description: "Rask og pålitelig reparasjon av PC-er, Mac-er, servere og annet IT-utstyr. Vi diagnostiserer problemet og fikser det - ofte samme dag.",
    category: "it",
    icon: "Wrench",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    features: [
      "PC og Mac reparasjon",
      "Server-reparasjon",
      "Skjermbytte",
      "Datarekonstruksjon",
      "Virusfjering",
      "Oppgraderinger"
    ],
    technologies: ["Dell", "HP", "Lenovo", "Apple", "Microsoft", "ASUS", "Acer"],
    deliveryTime: "1-3 dager",
    startingPrice: 590,
    included: [
      { icon: "Search", title: "Diagnose", description: "Gratis feilsøking" },
      { icon: "Wrench", title: "Reparasjon", description: "Profesjonell reparasjon" },
      { icon: "Shield", title: "Garanti", description: "90 dager på arbeid" },
      { icon: "Truck", title: "Henting", description: "Henting og levering" },
      { icon: "HardDrive", title: "Datarekonstruksjon", description: "Gjenoppretting av data" },
      { icon: "Zap", title: "Ekspressservice", description: "Samme dag ved behov" }
    ],
    process: [
      { step: 1, title: "Innlevering", description: "Lever eller vi henter utstyret", icon: "Package" },
      { step: 2, title: "Diagnose", description: "Vi finner feilen (gratis)", icon: "Search" },
      { step: 3, title: "Pristilbud", description: "Du godkjenner prisen", icon: "FileText" },
      { step: 4, title: "Reparasjon", description: "Vi fikser problemet", icon: "Wrench" },
      { step: 5, title: "Utlevering", description: "Hent eller vi leverer", icon: "Truck" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Standard",
        price: 590,
        priceLabel: "fra",
        features: [
          "Gratis diagnose",
          "Standard reparasjon",
          "3-5 dagers behandlingstid",
          "90 dagers garanti"
        ]
      },
      {
        tier: "standard",
        name: "Ekspress",
        price: 990,
        priceLabel: "fra",
        features: [
          "Prioritert diagnose",
          "1-2 dagers behandlingstid",
          "Henting i Oslo inkludert",
          "90 dagers garanti"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Samme dag",
        price: 1490,
        priceLabel: "fra",
        features: [
          "Umiddelbar diagnose",
          "Samme dag reparasjon",
          "Henting og levering inkludert",
          "1 års garanti",
          "Prioritert reservedeler"
        ]
      }
    ],
    faq: [
      { question: "Koster diagnosen noe?", answer: "Nei, diagnose er alltid gratis. Du betaler kun hvis du godkjenner reparasjonen." },
      { question: "Hvor lang tid tar reparasjonen?", answer: "Standard reparasjon tar 3-5 dager. Ekspressservice og samme dag er tilgjengelig." },
      { question: "Hva med data på enheten?", answer: "Vi tar vare på dataene dine og kan ta backup før reparasjon." },
      { question: "Reparerer dere alle merker?", answer: "Ja, vi reparerer PC, Mac og de fleste andre merker." },
      { question: "Hva hvis enheten ikke kan repareres?", answer: "Da betaler du ingenting. Vi kan også hjelpe med datarekonstruksjon." }
    ],
    testimonials: [
      { name: "Marius Lie", company: "Konsulent", role: "Frilanser", content: "Fikk Mac-en min tilbake samme dag. Rask og profesjonell service!", rating: 5 },
      { name: "Silje Berg", company: "Design Studio", role: "Designer", content: "Reddet alle filene mine fra en ødelagt harddisk. Livredder!", rating: 5 }
    ],
    relatedServices: ["hardware", "support", "managed-it"]
  },
  // Development Services
  {
    slug: "nettside-utvikling",
    name: "Nettside-utvikling",
    subtitle: "Profesjonelle nettsider som driver resultater",
    description: "Vi designer og utvikler moderne, responsive nettsider som reflekterer merkevaren din og konverterer besøkende til kunder. Fra enkle informasjonssider til avanserte bedriftsløsninger.",
    category: "development",
    icon: "Globe",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    features: [
      "Responsive design",
      "SEO-optimalisering",
      "CMS-løsninger",
      "E-handelsintegrasjon",
      "Analyse og sporing",
      "Rask lastetid"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress", "Sanity", "Strapi", "Vercel"],
    deliveryTime: "4-8 uker",
    startingPrice: 29900,
    included: [
      { icon: "Layout", title: "Design", description: "Skreddersydd design for din merkevare" },
      { icon: "Code", title: "Utvikling", description: "Moderne og effektiv kode" },
      { icon: "Smartphone", title: "Responsivt", description: "Fungerer på alle enheter" },
      { icon: "Search", title: "SEO", description: "Synlig i søkemotorer" },
      { icon: "BarChart", title: "Analyse", description: "Google Analytics integrasjon" },
      { icon: "Headphones", title: "Support", description: "6 mnd support inkludert" }
    ],
    process: [
      { step: 1, title: "Briefing", description: "Vi forstår dine behov og mål", icon: "MessageSquare" },
      { step: 2, title: "Design", description: "Lager wireframes og design", icon: "Palette" },
      { step: 3, title: "Utvikling", description: "Bygger nettsiden", icon: "Code" },
      { step: 4, title: "Testing", description: "Tester på alle enheter", icon: "CheckCircle" },
      { step: 5, title: "Lansering", description: "Publiserer og overvåker", icon: "Rocket" },
      { step: 6, title: "Optimalisering", description: "Forbedrer basert på data", icon: "TrendingUp" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Startpakke",
        price: 29900,
        priceLabel: "engangspris",
        features: [
          "Inntil 5 sider",
          "Responsivt design",
          "Kontaktskjema",
          "Grunnleggende SEO",
          "6 mnd support"
        ]
      },
      {
        tier: "standard",
        name: "Bedriftspakke",
        price: 59900,
        priceLabel: "engangspris",
        features: [
          "Inntil 15 sider",
          "CMS for enkel redigering",
          "Blogg-funksjon",
          "Avansert SEO",
          "Google Analytics",
          "1 års support",
          "Månedlig backup"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Enterprise",
        price: 149900,
        priceLabel: "engangspris",
        features: [
          "Ubegrenset sider",
          "Avansert CMS",
          "Integrasjoner",
          "E-handel ready",
          "Flerbrukerstøtte",
          "2 års support",
          "Dedikert rådgiver"
        ]
      }
    ],
    faq: [
      { question: "Hvor lang tid tar det å lage en nettside?", answer: "Avhengig av kompleksitet, tar det vanligvis 4-8 uker fra start til lansering." },
      { question: "Kan jeg redigere innholdet selv?", answer: "Ja, vi leverer med et brukervennlig CMS så du enkelt kan oppdatere tekst og bilder." },
      { question: "Er nettsiden SEO-optimalisert?", answer: "Ja, alle nettsider optimaliseres for søkemotorer med fokus på hastighet, struktur og innhold." },
      { question: "Hva koster hosting?", answer: "Hosting starter fra 199 kr/mnd inkludert SSL-sertifikat og daglig backup." },
      { question: "Inkluderer dere domene?", answer: "Vi hjelper med registrering av domene som faktureres separat (ca. 200 kr/år)." }
    ],
    testimonials: [
      { name: "Kristin Hansen", company: "Kaffebar Oslo", role: "Eier", content: "Fantastisk nettside som virkelig representerer merkevaren vår. Økt trafikk med 200%!", rating: 5 },
      { name: "Jon Andersen", company: "Advokatfirma Berg", role: "Partner", content: "Profesjonelt resultat og enkel prosess. Sterkt anbefalt.", rating: 5 }
    ],
    relatedServices: ["app-utvikling", "webapplikasjoner", "api-integrasjoner"]
  },
  {
    slug: "app-utvikling",
    name: "App-utvikling",
    subtitle: "Mobilapper for iOS og Android",
    description: "Vi utvikler native og cross-platform mobilapper som engasjerer brukerne. Fra konsept til App Store - vi håndterer hele prosessen.",
    category: "development",
    icon: "Smartphone",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    features: [
      "iOS og Android",
      "Native og cross-platform",
      "UX/UI design",
      "Backend-utvikling",
      "App Store publisering",
      "Vedlikehold og oppdateringer"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "AWS", "Google Cloud"],
    deliveryTime: "8-16 uker",
    startingPrice: 149900,
    included: [
      { icon: "Palette", title: "Design", description: "Brukersentrert UX/UI design" },
      { icon: "Code", title: "Utvikling", description: "Kvalitetskode for begge plattformer" },
      { icon: "Server", title: "Backend", description: "Skalerbar serverløsning" },
      { icon: "Play", title: "Publisering", description: "App Store og Google Play" },
      { icon: "RefreshCw", title: "Oppdateringer", description: "Løpende vedlikehold" },
      { icon: "BarChart", title: "Analyse", description: "Brukerdata og statistikk" }
    ],
    process: [
      { step: 1, title: "Konsept", description: "Definerer mål og funksjoner", icon: "Lightbulb" },
      { step: 2, title: "Design", description: "Lager brukeropplevelsen", icon: "Palette" },
      { step: 3, title: "Prototype", description: "Tester med brukere", icon: "Smartphone" },
      { step: 4, title: "Utvikling", description: "Bygger appen", icon: "Code" },
      { step: 5, title: "Testing", description: "Kvalitetssikring", icon: "CheckCircle" },
      { step: 6, title: "Lansering", description: "Publiserer i app-butikkene", icon: "Rocket" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "MVP",
        price: 149900,
        priceLabel: "engangspris",
        features: [
          "Én plattform (iOS eller Android)",
          "Kjernefunksjonalitet",
          "Grunnleggende design",
          "App Store publisering",
          "3 mnd support"
        ]
      },
      {
        tier: "standard",
        name: "Standard",
        price: 299900,
        priceLabel: "engangspris",
        features: [
          "iOS og Android",
          "Avansert UX/UI",
          "Backend inkludert",
          "Push-varsler",
          "Analytics",
          "6 mnd support"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Enterprise",
        price: 599900,
        priceLabel: "engangspris",
        features: [
          "Full-feature app",
          "Skreddersydd design",
          "Avansert backend",
          "Integrasjoner",
          "1 års support",
          "Dedikert team"
        ]
      }
    ],
    faq: [
      { question: "iOS eller Android først?", answer: "Vi anbefaler ofte å starte med én plattform (MVP) for å validere konseptet, deretter utvide til begge." },
      { question: "Native eller cross-platform?", answer: "Cross-platform (React Native/Flutter) er kostnadseffektivt. Native gir best ytelse for krevende apper." },
      { question: "Hvor lang tid tar det?", answer: "En enkel app tar 8-12 uker. Mer komplekse apper tar 12-16 uker eller mer." },
      { question: "Hva koster vedlikehold?", answer: "Vedlikehold koster typisk 10-15% av utviklingskostnaden per år." },
      { question: "Kan dere publisere i app-butikkene?", answer: "Ja, vi håndterer hele prosessen inkludert App Store og Google Play." }
    ],
    testimonials: [
      { name: "Fredrik Berg", company: "FitApp AS", role: "Gründer", content: "Nornex leverte en fantastisk app som brukerne elsker. Over 50.000 nedlastinger første året!", rating: 5 },
      { name: "Camilla Johansen", company: "EventBooking", role: "CEO", content: "Profesjonelt team som leverte på tid og budsjett. Imponerende!", rating: 5 }
    ],
    relatedServices: ["nettside-utvikling", "webapplikasjoner", "api-integrasjoner"]
  },
  {
    slug: "webapplikasjoner",
    name: "Webapplikasjoner",
    subtitle: "Skreddersydde løsninger for din bedrift",
    description: "Vi utvikler kraftige webapplikasjoner som automatiserer prosesser, øker produktiviteten og gir deg konkurransefortrinn. Fra interne verktøy til kundeportaler.",
    category: "development",
    icon: "Layout",
    gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)",
    features: [
      "Skreddersydd utvikling",
      "Moderne teknologi",
      "Skalerbar arkitektur",
      "API-integrasjoner",
      "Brukeradministrasjon",
      "Rapportering og dashboards"
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "GraphQL", "Docker", "Kubernetes"],
    deliveryTime: "8-20 uker",
    startingPrice: 99900,
    included: [
      { icon: "Code", title: "Utvikling", description: "Moderne og skalerbar kode" },
      { icon: "Database", title: "Database", description: "Sikker datahåndtering" },
      { icon: "Lock", title: "Sikkerhet", description: "Autentisering og autorisasjon" },
      { icon: "Cloud", title: "Hosting", description: "Skybasert infrastruktur" },
      { icon: "Plug", title: "Integrasjoner", description: "Kobles til dine systemer" },
      { icon: "Headphones", title: "Support", description: "Løpende vedlikehold" }
    ],
    process: [
      { step: 1, title: "Analyse", description: "Kartlegger behov og prosesser", icon: "Search" },
      { step: 2, title: "Spesifikasjon", description: "Definerer funksjonalitet", icon: "FileText" },
      { step: 3, title: "Design", description: "Lager brukergrensesnitt", icon: "Palette" },
      { step: 4, title: "Utvikling", description: "Bygger løsningen iterativt", icon: "Code" },
      { step: 5, title: "Testing", description: "Grundig kvalitetssikring", icon: "CheckCircle" },
      { step: 6, title: "Deployment", description: "Lanserer og overvåker", icon: "Rocket" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Standard",
        price: 99900,
        priceLabel: "fra",
        features: [
          "Enkel webapplikasjon",
          "Inntil 5 moduler",
          "Grunnleggende brukeradmin",
          "3 mnd support"
        ]
      },
      {
        tier: "standard",
        name: "Avansert",
        price: 249900,
        priceLabel: "fra",
        features: [
          "Kompleks applikasjon",
          "Ubegrensede moduler",
          "Rollebasert tilgang",
          "API-integrasjoner",
          "Dashboard og rapporter",
          "6 mnd support"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Enterprise",
        price: 499900,
        priceLabel: "fra",
        features: [
          "Enterprise-løsning",
          "Multitenancy",
          "Avanserte integrasjoner",
          "Skalerbar arkitektur",
          "1 års support",
          "Dedikert team"
        ]
      }
    ],
    faq: [
      { question: "Hva er en webapplikasjon?", answer: "En webapplikasjon er en skreddersydd løsning som kjører i nettleseren, f.eks. CRM, prosjektverktøy eller kundeportaler." },
      { question: "Kan den integreres med eksisterende systemer?", answer: "Ja, vi bygger integrasjoner mot ERP, CRM, regnskapssystemer og andre verktøy." },
      { question: "Hvor sikker er løsningen?", answer: "Vi følger beste praksis for sikkerhet, inkludert kryptering, autentisering og regelmessige sikkerhetsoppdateringer." },
      { question: "Kan vi utvide senere?", answer: "Absolutt. Vi bygger med skalerbarhet i tankene slik at løsningen kan vokse med bedriften." },
      { question: "Eier vi kildekoden?", answer: "Ja, du eier all kildekode og kan ta den med deg." }
    ],
    testimonials: [
      { name: "Henrik Olsen", company: "Logistikk AS", role: "CTO", content: "Den nye ordre-applikasjonen har kuttet behandlingstiden med 70%. Fantastisk investering!", rating: 5 },
      { name: "Anne Marte Lie", company: "Eiendomsmegler", role: "Daglig leder", content: "Kundeportalen har transformert måten vi jobber med kunder på.", rating: 5 }
    ],
    relatedServices: ["nettside-utvikling", "app-utvikling", "api-integrasjoner"]
  },
  {
    slug: "api-integrasjoner",
    name: "API-integrasjoner",
    subtitle: "Koble sammen systemene dine",
    description: "Vi utvikler og implementerer API-integrasjoner som lar systemene dine snakke sammen. Automatiser dataflyt og eliminer manuelle prosesser.",
    category: "development",
    icon: "Plug",
    gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    features: [
      "REST og GraphQL API-er",
      "Systemintegrasjoner",
      "Datasynkronisering",
      "Webhook-håndtering",
      "API-dokumentasjon",
      "Overvåking og logging"
    ],
    technologies: ["Node.js", "Python", "GraphQL", "REST", "Zapier", "Microsoft Power Automate", "AWS Lambda", "Azure Functions"],
    deliveryTime: "2-8 uker",
    startingPrice: 29900,
    included: [
      { icon: "Plug", title: "Integrasjon", description: "Kobling mellom systemer" },
      { icon: "Code", title: "API-utvikling", description: "Skreddersydde API-er" },
      { icon: "RefreshCw", title: "Synkronisering", description: "Automatisk dataflyt" },
      { icon: "FileText", title: "Dokumentasjon", description: "Teknisk dokumentasjon" },
      { icon: "Eye", title: "Overvåking", description: "Feilovervåking og varsler" },
      { icon: "Headphones", title: "Support", description: "Løpende vedlikehold" }
    ],
    process: [
      { step: 1, title: "Kartlegging", description: "Analyserer systemer og dataflyt", icon: "Search" },
      { step: 2, title: "Design", description: "Planlegger integrasjonsarkitektur", icon: "Layout" },
      { step: 3, title: "Utvikling", description: "Bygger integrasjonen", icon: "Code" },
      { step: 4, title: "Testing", description: "Verifiserer dataflyt", icon: "CheckCircle" },
      { step: 5, title: "Deployment", description: "Lanserer og overvåker", icon: "Rocket" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Enkel integrasjon",
        price: 29900,
        priceLabel: "fra",
        features: [
          "1 systemintegrasjon",
          "Enveis dataflyt",
          "Grunnleggende dokumentasjon",
          "3 mnd support"
        ]
      },
      {
        tier: "standard",
        name: "Standard",
        price: 59900,
        priceLabel: "fra",
        features: [
          "2-3 integrasjoner",
          "Toveis synkronisering",
          "Feilovervåking",
          "Komplett dokumentasjon",
          "6 mnd support"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Enterprise",
        price: 149900,
        priceLabel: "fra",
        features: [
          "Ubegrensede integrasjoner",
          "Skreddersydd API",
          "Sanntidssynkronisering",
          "Avansert overvåking",
          "1 års support",
          "Dedikert kontakt"
        ]
      }
    ],
    faq: [
      { question: "Hvilke systemer kan integreres?", answer: "Vi integrerer mot de fleste systemer med API, inkludert ERP, CRM, regnskapssystemer, e-handel og mer." },
      { question: "Hva er forskjellen på REST og GraphQL?", answer: "REST er standard for enkle integrasjoner. GraphQL gir mer fleksibilitet for komplekse datastrukturer." },
      { question: "Hvor lang tid tar en integrasjon?", answer: "Enkle integrasjoner tar 2-4 uker. Komplekse løsninger kan ta 6-8 uker." },
      { question: "Hva med eksisterende data?", answer: "Vi kan migrere og synkronisere eksisterende data som del av prosjektet." },
      { question: "Hvordan håndteres feil?", answer: "Vi bygger inn feilhåndtering, logging og varsler slik at problemer oppdages raskt." }
    ],
    testimonials: [
      { name: "Per Eriksen", company: "Import AS", role: "IT-sjef", content: "Integrasjonen mellom nettbutikken og ERP-et har spart oss for timer med manuelt arbeid daglig.", rating: 5 },
      { name: "Tone Bakke", company: "Markedsføring AS", role: "Digitalsjef", content: "Nå flyter all data sømløst mellom systemene våre. Fantastisk!", rating: 5 }
    ],
    relatedServices: ["webapplikasjoner", "nettside-utvikling", "konsultering"]
  },
  {
    slug: "konsultering",
    name: "IT-konsultering",
    subtitle: "Strategisk rådgivning for din digitale reise",
    description: "Våre erfarne konsulenter hjelper deg med IT-strategi, teknologivalg og digital transformasjon. Få ekspertråd tilpasset dine mål og budsjett.",
    category: "development",
    icon: "Users",
    gradient: "linear-gradient(135deg, #EC4899, #9333EA)",
    features: [
      "IT-strategi",
      "Teknologirådgivning",
      "Digital transformasjon",
      "Prosjektledelse",
      "Prosessoptimalisering",
      "Sikkerhetsrådgivning"
    ],
    technologies: ["Alle relevante teknologier"],
    deliveryTime: "Løpende",
    startingPrice: 1490,
    included: [
      { icon: "MessageSquare", title: "Rådgivning", description: "Strategisk veiledning" },
      { icon: "FileText", title: "Analyser", description: "Dokumenterte anbefalinger" },
      { icon: "Target", title: "Strategi", description: "Langsiktige planer" },
      { icon: "Users", title: "Workshops", description: "Interaktive sesjoner" },
      { icon: "CheckCircle", title: "Kvalitetssikring", description: "Review av løsninger" },
      { icon: "TrendingUp", title: "Optimalisering", description: "Forbedre eksisterende" }
    ],
    process: [
      { step: 1, title: "Møte", description: "Forstår dine utfordringer", icon: "MessageSquare" },
      { step: 2, title: "Analyse", description: "Kartlegger nåsituasjon", icon: "Search" },
      { step: 3, title: "Strategi", description: "Utarbeider anbefalinger", icon: "Target" },
      { step: 4, title: "Presentasjon", description: "Gjennomgår funn og forslag", icon: "FileText" },
      { step: 5, title: "Implementering", description: "Støtter gjennomføring", icon: "Rocket" }
    ],
    pricing: [
      {
        tier: "basis",
        name: "Timepris",
        price: 1490,
        priceLabel: "per time",
        features: [
          "Fleksibel rådgivning",
          "Teknisk ekspertise",
          "Ingen bindingstid",
          "Faktureres per time"
        ]
      },
      {
        tier: "standard",
        name: "Retainer",
        price: 14990,
        priceLabel: "per måned",
        features: [
          "10 timer per måned",
          "Fast kontaktperson",
          "Prioritert tilgang",
          "Månedlig statusmøte",
          "Rabattert timepris"
        ],
        isPopular: true
      },
      {
        tier: "premium",
        name: "Prosjekt",
        price: 49900,
        priceLabel: "fra",
        features: [
          "Definert prosjekt",
          "Fast pris",
          "Dedikert konsulent",
          "Leveransegaranti",
          "Dokumentasjon inkludert"
        ]
      }
    ],
    faq: [
      { question: "Hva kan en IT-konsulent hjelpe med?", answer: "Alt fra teknologivalg og arkitektur til prosjektledelse, sikkerhet og digital strategi." },
      { question: "Hvordan faktureres konsulentarbeid?", answer: "Vi tilbyr timepris, retainer-avtaler eller fast pris på definerte prosjekter." },
      { question: "Kan dere lede IT-prosjekter?", answer: "Ja, vi tilbyr prosjektledelse og kan styre leverandører og team." },
      { question: "Hva er retainer?", answer: "En retainer gir deg fast tilgang til konsulenttimer hver måned til rabattert pris." },
      { question: "Jobber dere remote?", answer: "Ja, vi jobber både remote og on-site etter behov." }
    ],
    testimonials: [
      { name: "Geir Haugen", company: "Industri AS", role: "CEO", content: "Nornex hjalp oss med å legge en solid IT-strategi. Pengene godt investert!", rating: 5 },
      { name: "Else Marie Vik", company: "Helseforetak", role: "IT-direktør", content: "Kompetente konsulenter som forstår både teknologi og forretning.", rating: 5 }
    ],
    relatedServices: ["managed-it", "it-sikkerhet", "webapplikasjoner"]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(category: "it" | "development"): Service[] {
  return services.filter(s => s.category === category);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return services.filter(s => slugs.includes(s.slug));
}

export const serviceCategories = [
  { id: "it", name: "IT-tjenester", description: "Drift, sikkerhet og support" },
  { id: "development", name: "Utvikling", description: "Web, app og integrasjoner" }
] as const;
