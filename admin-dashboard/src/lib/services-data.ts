/**
 * NORNEX AS - Services Data (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  icon: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  pricing: {
    name: string;
    price: string;
    features: string[];
    highlighted?: boolean;
  }[];
  faq: { question: string; answer: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: 'managed-it',
    title: 'Managed IT',
    shortDescription: 'Komplett IT-drift og vedlikehold for din bedrift',
    heroDescription: 'Vi tar ansvar for hele din IT-infrastruktur slik at du kan fokusere på kjernevirksomheten.',
    icon: 'Server',
    features: [
      '24/7 overvåking',
      'Proaktivt vedlikehold',
      'Helpdesk support',
      'Backup og disaster recovery',
      'Nettverksadministrasjon',
      'Lisenshåndtering',
    ],
    process: [
      { step: 1, title: 'Analyse', description: 'Vi kartlegger din nåværende IT-infrastruktur' },
      { step: 2, title: 'Plan', description: 'Utarbeider en skreddersydd driftsplan' },
      { step: 3, title: 'Implementering', description: 'Tar over driften trinnvis' },
      { step: 4, title: 'Optimalisering', description: 'Kontinuerlig forbedring og rapportering' },
    ],
    pricing: [
      {
        name: 'Basis',
        price: 'fra 2 990 kr/mnd',
        features: ['Inntil 10 enheter', 'E-post support', 'Månedlig rapport', 'Grunnleggende overvåking'],
      },
      {
        name: 'Standard',
        price: 'fra 5 990 kr/mnd',
        features: ['Inntil 30 enheter', 'Telefon og e-post', 'Ukentlig rapport', 'Avansert overvåking', 'Backup inkludert'],
        highlighted: true,
      },
      {
        name: 'Premium',
        price: 'fra 9 990 kr/mnd',
        features: ['Ubegrenset enheter', '24/7 support', 'Daglig rapport', 'Full overvåking', 'Dedikert kontakt'],
      },
    ],
    faq: [
      { question: 'Hva er inkludert i Managed IT?', answer: 'Managed IT inkluderer overvåking, vedlikehold, support og proaktiv drift av all din IT-infrastruktur.' },
      { question: 'Kan jeg beholde mitt eksisterende utstyr?', answer: 'Ja, vi tar over drift av eksisterende infrastruktur og anbefaler oppgraderinger ved behov.' },
      { question: 'Hva er responstiden?', answer: 'Kritiske hendelser håndteres innen 15 minutter, standard saker innen 4 timer.' },
    ],
  },
  {
    slug: 'it-sikkerhet',
    title: 'IT-sikkerhet',
    shortDescription: 'Beskytt bedriften mot cybertrusler og datainnbrudd',
    heroDescription: 'Avansert sikkerhet som beskytter dine data, systemer og ansatte mot moderne cybertrusler.',
    icon: 'Shield',
    features: [
      'Brannmur og nettverkssikkerhet',
      'Antivirusprogramvare',
      'E-postsikkerhet',
      'Sikkerhetsopplæring',
      'Penetrasjonstesting',
      'GDPR-tilpasning',
    ],
    process: [
      { step: 1, title: 'Sikkerhetsrevisjon', description: 'Kartlegger sårbarheter i din infrastruktur' },
      { step: 2, title: 'Risikovurdering', description: 'Prioriterer tiltak basert på risiko' },
      { step: 3, title: 'Implementering', description: 'Installerer og konfigurerer sikkerhetstiltak' },
      { step: 4, title: 'Overvåking', description: 'Kontinuerlig sikkerhetsvervåking og hendelseshåndtering' },
    ],
    pricing: [
      {
        name: 'Basis',
        price: 'fra 1 990 kr/mnd',
        features: ['Brannmur', 'Antivirus', 'E-postsikkerhet', 'Kvartalsvis rapport'],
      },
      {
        name: 'Standard',
        price: 'fra 3 990 kr/mnd',
        features: ['Alt i Basis', 'SIEM-overvåking', 'Ansattopplæring', 'Månedlig rapport'],
        highlighted: true,
      },
      {
        name: 'Premium',
        price: 'fra 7 990 kr/mnd',
        features: ['Alt i Standard', '24/7 SOC', 'Penetrasjonstesting', 'Incident response'],
      },
    ],
    faq: [
      { question: 'Hvor ofte bør vi teste sikkerheten?', answer: 'Vi anbefaler minimum årlig penetrasjonstesting, og kvartalsvis sårbarhetsskanning.' },
      { question: 'Er tjenesten GDPR-kompatibel?', answer: 'Ja, alle våre sikkerhetstjenester er designet for å støtte GDPR-krav.' },
    ],
  },
  {
    slug: 'skylosninger',
    title: 'Skyløsninger',
    shortDescription: 'Moderne skytjenester for fleksibilitet og skalerbarhet',
    heroDescription: 'Migrer til skyen og oppnå økt fleksibilitet, skalerbarhet og kostnadseffektivitet.',
    icon: 'Cloud',
    features: [
      'Skymigrering',
      'Microsoft 365',
      'Azure og AWS',
      'Hybrid cloud',
      'Cloud backup',
      'Kostnadsoptimalisering',
    ],
    process: [
      { step: 1, title: 'Vurdering', description: 'Analyserer dine skybehov' },
      { step: 2, title: 'Planlegging', description: 'Utarbeider migreringsplan' },
      { step: 3, title: 'Migrering', description: 'Sømløs overgang til skyen' },
      { step: 4, title: 'Optimalisering', description: 'Løpende forbedring og kostnadstyring' },
    ],
    pricing: [
      {
        name: 'Basis',
        price: 'fra 99 kr/bruker/mnd',
        features: ['Microsoft 365 Basic', 'E-post og kalender', 'OneDrive 1TB', 'Teknisk support'],
      },
      {
        name: 'Standard',
        price: 'fra 199 kr/bruker/mnd',
        features: ['Microsoft 365 Standard', 'Alle Office-apper', 'Teams', 'SharePoint'],
        highlighted: true,
      },
      {
        name: 'Premium',
        price: 'fra 399 kr/bruker/mnd',
        features: ['Microsoft 365 Premium', 'Avansert sikkerhet', 'Intune', 'Azure AD Premium'],
      },
    ],
    faq: [
      { question: 'Hva med våre eksisterende data?', answer: 'Vi migrerer alle data sikkert til skyen uten tap.' },
      { question: 'Kan vi jobbe offline?', answer: 'Ja, Microsoft 365-appene synkroniserer automatisk når du er tilbake online.' },
    ],
  },
  {
    slug: 'support',
    title: '24/7 Support',
    shortDescription: 'Hjelp når du trenger det - døgnet rundt',
    heroDescription: 'Profesjonell IT-support tilgjengelig 24 timer i døgnet, 7 dager i uken.',
    icon: 'Headphones',
    features: [
      'Telefonsupport',
      'E-postsupport',
      'Chat-support',
      'Fjerntilgang',
      'On-site support',
      'Eskaleringsrutiner',
    ],
    process: [
      { step: 1, title: 'Kontakt', description: 'Ring, e-post eller chat' },
      { step: 2, title: 'Registrering', description: 'Saken registreres og prioriteres' },
      { step: 3, title: 'Løsning', description: 'Teknikeren løser problemet' },
      { step: 4, title: 'Oppfølging', description: 'Vi følger opp at alt fungerer' },
    ],
    pricing: [
      {
        name: 'Basis',
        price: '950 kr/time',
        features: ['Timepris', 'Hverdager 08-17', 'E-post', 'Fjerntilgang'],
      },
      {
        name: 'Standard',
        price: '4 990 kr/mnd',
        features: ['10 timer inkludert', 'Hverdager 07-22', 'Telefon og e-post', 'Prioritert kø'],
        highlighted: true,
      },
      {
        name: 'Premium',
        price: '9 990 kr/mnd',
        features: ['Ubegrenset support', '24/7 tilgjengelighet', 'Dedikert kontakt', 'On-site'],
      },
    ],
    faq: [
      { question: 'Hva er responstiden?', answer: 'Kritiske saker besvares innen 15 minutter, standard saker innen 1 time.' },
      { question: 'Kan dere hjelpe med alt?', answer: 'Vi hjelper med alt fra enkle spørsmål til komplekse tekniske problemer.' },
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware',
    shortDescription: 'Kvalitetsutstyr fra ledende produsenter',
    heroDescription: 'Bredt utvalg av IT-utstyr til konkurransedyktige priser med full garanti.',
    icon: 'Laptop',
    features: [
      'PC og Mac',
      'Servere',
      'Nettverksutstyr',
      'Skjermer',
      'Tilbehør',
      'Garanti og support',
    ],
    process: [
      { step: 1, title: 'Behov', description: 'Vi kartlegger dine behov' },
      { step: 2, title: 'Anbefaling', description: 'Foreslår optimal løsning' },
      { step: 3, title: 'Bestilling', description: 'Bestiller og klargjør utstyret' },
      { step: 4, title: 'Levering', description: 'Leverer og setter opp utstyret' },
    ],
    pricing: [
      {
        name: 'Hjemmekontor',
        price: 'fra 7 990 kr',
        features: ['Laptop', 'Mus og tastatur', 'Skjerm', 'Webkamera'],
      },
      {
        name: 'Kontor',
        price: 'fra 12 990 kr',
        features: ['Kraftig laptop/desktop', 'To skjermer', 'Docking station', 'Headset'],
        highlighted: true,
      },
      {
        name: 'Arbeidsstasjon',
        price: 'fra 24 990 kr',
        features: ['Workstation', 'Tre skjermer', 'Premium tilbehør', 'Garanti 5 år'],
      },
    ],
    faq: [
      { question: 'Hvilke merker selger dere?', answer: 'Vi er forhandler for HP, Lenovo, Dell, Apple, Microsoft og flere.' },
      { question: 'Hvordan er garantien?', answer: 'Standard 2 års garanti, utvidet til 5 år tilgjengelig.' },
    ],
  },
  {
    slug: 'reparasjon',
    title: 'Reparasjon',
    shortDescription: 'Profesjonell reparasjon av datautstyr',
    heroDescription: 'Rask og profesjonell reparasjon av PC, Mac, mobil og nettbrett.',
    icon: 'Wrench',
    features: [
      'PC-reparasjon',
      'Mac-reparasjon',
      'Mobilreparasjon',
      'Nettbrettreparasjon',
      'Datarekonstruksjon',
      'Garanti på arbeid',
    ],
    process: [
      { step: 1, title: 'Innlevering', description: 'Lever inn eller send utstyret' },
      { step: 2, title: 'Diagnose', description: 'Vi finner feilen (gratis)' },
      { step: 3, title: 'Tilbud', description: 'Du godkjenner prisen' },
      { step: 4, title: 'Reparasjon', description: 'Reparert innen 1-3 dager' },
    ],
    pricing: [
      {
        name: 'Diagnose',
        price: 'Gratis',
        features: ['Feilsøking', 'Prisoverslag', 'Ingen forpliktelse'],
      },
      {
        name: 'Standard',
        price: 'fra 590 kr',
        features: ['Software-reparasjon', 'Virusfjerning', 'OS-reinstallasjon', '1 års garanti'],
        highlighted: true,
      },
      {
        name: 'Hardware',
        price: 'fra 990 kr',
        features: ['Komponentbytte', 'Skjermbytte', 'Batterbytte', '2 års garanti'],
      },
    ],
    faq: [
      { question: 'Hvor lang tid tar reparasjonen?', answer: 'De fleste reparasjoner er ferdige innen 1-3 virkedager.' },
      { question: 'Mister jeg dataene mine?', answer: 'Vi tar backup før alle reparasjoner for å sikre dataene dine.' },
    ],
  },
  {
    slug: 'nettside-utvikling',
    title: 'Nettside-utvikling',
    shortDescription: 'Moderne og responsive nettsider',
    heroDescription: 'Vi lager profesjonelle nettsider som konverterer besøkende til kunder.',
    icon: 'Globe',
    features: [
      'Responsivt design',
      'SEO-optimalisert',
      'CMS-integrasjon',
      'E-handel',
      'Hosting inkludert',
      'SSL-sertifikat',
    ],
    process: [
      { step: 1, title: 'Briefing', description: 'Vi forstår dine mål' },
      { step: 2, title: 'Design', description: 'Lager wireframes og design' },
      { step: 3, title: 'Utvikling', description: 'Bygger nettsiden' },
      { step: 4, title: 'Lansering', description: 'Testing og publisering' },
    ],
    pricing: [
      {
        name: 'Enkel',
        price: 'fra 14 990 kr',
        features: ['Inntil 5 sider', 'Responsivt design', 'Kontaktskjema', '1 års hosting'],
      },
      {
        name: 'Business',
        price: 'fra 29 990 kr',
        features: ['Inntil 15 sider', 'CMS', 'Blog', 'Nyhetsbrev', 'SEO'],
        highlighted: true,
      },
      {
        name: 'E-handel',
        price: 'fra 49 990 kr',
        features: ['Nettbutikk', 'Betalingsløsning', 'Lager-system', 'Frakintegrasjon'],
      },
    ],
    faq: [
      { question: 'Kan jeg oppdatere nettsiden selv?', answer: 'Ja, vi bruker brukervennlige CMS-systemer som WordPress.' },
      { question: 'Hva med hosting?', answer: 'Vi tilbyr både hosting og domeneregistrering.' },
    ],
  },
  {
    slug: 'app-utvikling',
    title: 'App-utvikling',
    shortDescription: 'Native og hybrid mobilapper',
    heroDescription: 'Vi utvikler apper for iOS og Android som engasjerer brukerne.',
    icon: 'Smartphone',
    features: [
      'iOS-utvikling',
      'Android-utvikling',
      'Cross-platform',
      'UI/UX-design',
      'Backend-integrasjon',
      'App Store-publisering',
    ],
    process: [
      { step: 1, title: 'Konsept', description: 'Definerer funksjonalitet' },
      { step: 2, title: 'Prototype', description: 'Lager klikkbar prototype' },
      { step: 3, title: 'Utvikling', description: 'Bygger appen' },
      { step: 4, title: 'Lansering', description: 'Publiserer i appbutikker' },
    ],
    pricing: [
      {
        name: 'MVP',
        price: 'fra 99 000 kr',
        features: ['Enkel app', 'En plattform', 'Grunnleggende funksjoner', '3 måneder utvikling'],
      },
      {
        name: 'Standard',
        price: 'fra 249 000 kr',
        features: ['iOS og Android', 'Avanserte funksjoner', 'Backend', '6 måneder'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'fra 499 000 kr',
        features: ['Komplett løsning', 'Skalerbar arkitektur', 'API-integrasjoner', 'Løpende support'],
      },
    ],
    faq: [
      { question: 'iOS eller Android først?', answer: 'Vi anbefaler ofte cross-platform for å nå begge markeder.' },
      { question: 'Hvor lang tid tar det?', answer: 'En enkel app tar 2-3 måneder, komplekse apper 6+ måneder.' },
    ],
  },
  {
    slug: 'webapplikasjoner',
    title: 'Webapplikasjoner',
    shortDescription: 'Skreddersydde bedriftsløsninger',
    heroDescription: 'Vi bygger webapplikasjoner som effektiviserer din virksomhet.',
    icon: 'Code',
    features: [
      'CRM-systemer',
      'ERP-løsninger',
      'Intranett',
      'Kundeportaler',
      'Bookingsystemer',
      'Dashboards',
    ],
    process: [
      { step: 1, title: 'Analyse', description: 'Forstår dine prosesser' },
      { step: 2, title: 'Spesifikasjon', description: 'Detaljert kravspesifikasjon' },
      { step: 3, title: 'Utvikling', description: 'Agil utviklingsprosess' },
      { step: 4, title: 'Implementering', description: 'Opplæring og utrulling' },
    ],
    pricing: [
      {
        name: 'Starter',
        price: 'fra 79 000 kr',
        features: ['Enkel applikasjon', 'Inntil 5 brukere', 'Standard funksjoner', 'Grunnleggende support'],
      },
      {
        name: 'Professional',
        price: 'fra 199 000 kr',
        features: ['Avansert løsning', 'Inntil 50 brukere', 'Integrasjoner', 'SLA-support'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Tilbud',
        features: ['Komplett plattform', 'Ubegrenset brukere', 'Alle integrasjoner', 'Dedikert team'],
      },
    ],
    faq: [
      { question: 'Kan det integreres med eksisterende systemer?', answer: 'Ja, vi har erfaring med de fleste API-integrasjoner.' },
      { question: 'Hvordan er supporten?', answer: 'Vi tilbyr løpende support og videreutvikling.' },
    ],
  },
  {
    slug: 'api-integrasjoner',
    title: 'API-integrasjoner',
    shortDescription: 'Koble sammen dine systemer',
    heroDescription: 'Vi integrerer dine systemer for sømløs dataflyt og automatisering.',
    icon: 'Link',
    features: [
      'REST API',
      'GraphQL',
      'Webhooks',
      'ERP-integrasjon',
      'CRM-integrasjon',
      'Betalingsløsninger',
    ],
    process: [
      { step: 1, title: 'Kartlegging', description: 'Identifiserer integrasjonsbehov' },
      { step: 2, title: 'Design', description: 'Arkitektur og dataflyt' },
      { step: 3, title: 'Utvikling', description: 'Bygger integrasjonen' },
      { step: 4, title: 'Testing', description: 'Grundig testing og dokumentasjon' },
    ],
    pricing: [
      {
        name: 'Enkel',
        price: 'fra 15 000 kr',
        features: ['En integrasjon', 'Standard API', 'Dokumentasjon', 'Testing'],
      },
      {
        name: 'Standard',
        price: 'fra 45 000 kr',
        features: ['2-5 integrasjoner', 'Custom logic', 'Error handling', 'Monitoring'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'fra 99 000 kr',
        features: ['Ubegrenset', 'Komplett plattform', 'Real-time sync', 'SLA'],
      },
    ],
    faq: [
      { question: 'Hvilke systemer kan integreres?', answer: 'Vi har erfaring med de fleste ERP, CRM og SaaS-løsninger.' },
      { question: 'Hva med sikkerheten?', answer: 'Alle integrasjoner følger beste praksis for sikkerhet.' },
    ],
  },
  {
    slug: 'konsultering',
    title: 'IT-konsultering',
    shortDescription: 'Strategisk rådgivning for din IT',
    heroDescription: 'Få ekspertråd om IT-strategi, arkitektur og digitalisering.',
    icon: 'Lightbulb',
    features: [
      'IT-strategi',
      'Digitaliseringsstrategi',
      'Arkitekturvurdering',
      'Prosessoptimalisering',
      'Teknologivalg',
      'Due diligence',
    ],
    process: [
      { step: 1, title: 'Møte', description: 'Gratis innledende samtale' },
      { step: 2, title: 'Analyse', description: 'Grundig gjennomgang' },
      { step: 3, title: 'Rapport', description: 'Konkrete anbefalinger' },
      { step: 4, title: 'Støtte', description: 'Hjelp med implementering' },
    ],
    pricing: [
      {
        name: 'Rådgivning',
        price: '1 450 kr/time',
        features: ['Timepris', 'Fleksibelt', 'Alle temaer', 'Remote eller on-site'],
      },
      {
        name: 'Prosjekt',
        price: 'fra 35 000 kr',
        features: ['Definert leveranse', 'Rapport', 'Handlingsplan', 'Oppfølging'],
        highlighted: true,
      },
      {
        name: 'Retainer',
        price: 'fra 15 000 kr/mnd',
        features: ['Fast avtale', 'Prioritert tilgang', 'Månedlig møte', 'Strategisk sparring'],
      },
    ],
    faq: [
      { question: 'Hva kan dere hjelpe med?', answer: 'Alt fra små tekniske spørsmål til store digitaliseringsprosjekter.' },
      { question: 'Hvordan starter vi?', answer: 'Book en gratis 30-minutters samtale for å diskutere dine behov.' },
    ],
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(s => s.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return servicesData.map(s => s.slug);
};
