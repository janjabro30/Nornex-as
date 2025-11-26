import { BlogCategory, BlogTag, BlogAuthor, BlogPost } from '@/types/blog';

// Blog Categories in Norwegian
export const blogCategories: BlogCategory[] = [
  {
    id: 1,
    name: 'IT-sikkerhet',
    slug: 'it-sikkerhet',
    description: 'Artikler om cybersikkerhet, trusselforebygging og best practices for å beskytte din virksomhet.',
    postCount: 12,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Skyløsninger',
    slug: 'skylosninger',
    description: 'Alt om cloud computing, skymigrering og moderne infrastrukturløsninger.',
    postCount: 8,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Nyheter',
    slug: 'nyheter',
    description: 'De siste nyhetene fra teknologibransjen og Nornex.',
    postCount: 15,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Guider',
    slug: 'guider',
    description: 'Praktiske veiledninger og steg-for-steg guider for IT-løsninger.',
    postCount: 10,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Suksesshistorier og eksempler fra våre kundeprosjekter.',
    postCount: 6,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Teknologi',
    slug: 'teknologi',
    description: 'Utforsk nye teknologier, trender og innovasjoner i IT-verdenen.',
    postCount: 9,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Blog Tags in Norwegian
export const blogTags: BlogTag[] = [
  { id: 1, name: 'Cybersikkerhet', slug: 'cybersikkerhet' },
  { id: 2, name: 'Cloud', slug: 'cloud' },
  { id: 3, name: 'Microsoft 365', slug: 'microsoft-365' },
  { id: 4, name: 'Azure', slug: 'azure' },
  { id: 5, name: 'Backup', slug: 'backup' },
  { id: 6, name: 'Nettverk', slug: 'nettverk' },
  { id: 7, name: 'IT-support', slug: 'it-support' },
  { id: 8, name: 'Webutvikling', slug: 'webutvikling' },
  { id: 9, name: 'App-utvikling', slug: 'app-utvikling' },
  { id: 10, name: 'Hardware', slug: 'hardware' },
  { id: 11, name: 'Reparasjon', slug: 'reparasjon' },
  { id: 12, name: 'SMB', slug: 'smb' },
  { id: 13, name: 'Enterprise', slug: 'enterprise' },
  { id: 14, name: 'GDPR', slug: 'gdpr' },
  { id: 15, name: 'AI', slug: 'ai' },
];

// Blog Authors
export const blogAuthors: BlogAuthor[] = [
  {
    id: 1,
    name: 'Erik Olsen',
    slug: 'erik-olsen',
    avatar: '/images/authors/erik-olsen.jpg',
    bio: 'Erik er seniorkonsulent hos Nornex med over 15 års erfaring innen IT-sikkerhet. Han hjelper bedrifter med å beskytte seg mot cybertrusler og implementere sikre IT-løsninger.',
    jobTitle: 'Seniorkonsulent IT-sikkerhet',
    email: 'erik@nornex.no',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/erik-olsen',
      twitter: 'https://twitter.com/erikolsen',
    },
    postCount: 18,
    totalViews: 45000,
  },
  {
    id: 2,
    name: 'Maria Hansen',
    slug: 'maria-hansen',
    avatar: '/images/authors/maria-hansen.jpg',
    bio: 'Maria er skyarkitekt hos Nornex og spesialiserer seg på Microsoft Azure og skymigrering. Hun har hjulpet hundrevis av bedrifter med å flytte til skyen.',
    jobTitle: 'Skyarkitekt',
    email: 'maria@nornex.no',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/maria-hansen',
    },
    postCount: 12,
    totalViews: 32000,
  },
  {
    id: 3,
    name: 'Lars Pedersen',
    slug: 'lars-pedersen',
    avatar: '/images/authors/lars-pedersen.jpg',
    bio: 'Lars er utviklingsleder hos Nornex og brenner for moderne webutvikling og mobilapplikasjoner. Han leder teamet som bygger digitale løsninger for våre kunder.',
    jobTitle: 'Utviklingsleder',
    email: 'lars@nornex.no',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lars-pedersen',
      github: 'https://github.com/larspedersen',
    },
    postCount: 10,
    totalViews: 28000,
  },
];

// Sample Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'beskytt-bedriften-mot-phishing-angrep',
    title: 'Slik beskytter du bedriften mot phishing-angrep i 2024',
    excerpt: 'Phishing-angrep blir stadig mer sofistikerte. Lær hvordan du kan beskytte din virksomhet med disse bevisste strategiene og verktøyene.',
    content: `
<h2>Hva er phishing?</h2>
<p>Phishing er en type sosial manipulasjon der angripere forsøker å lure mottakere til å avsløre sensitiv informasjon, som passord, kredittkortdetaljer eller personlige data. Disse angrepene kommer ofte i form av e-poster som ser ut til å komme fra pålitelige kilder.</p>

<h2>Vanlige typer phishing-angrep</h2>
<ul>
<li><strong>E-post phishing:</strong> Den vanligste formen, der falske e-poster sendes til mange mottakere</li>
<li><strong>Spear phishing:</strong> Målrettede angrep mot spesifikke personer eller organisasjoner</li>
<li><strong>Whaling:</strong> Angrep rettet mot toppledere og beslutningstakere</li>
<li><strong>Smishing:</strong> Phishing via SMS-meldinger</li>
</ul>

<h2>Beskyttelsesstrategier</h2>
<p>For å beskytte din bedrift mot phishing-angrep, anbefaler vi følgende tiltak:</p>

<h3>1. Opplæring av ansatte</h3>
<p>Den viktigste forsvarslinjen mot phishing er velinformerte ansatte. Regelmessig opplæring og simulerte phishing-tester kan dramatisk redusere risikoen.</p>

<h3>2. Tekniske sikkerhetstiltak</h3>
<p>Implementer følgende tekniske løsninger:</p>
<ul>
<li>Avansert e-postfiltrering</li>
<li>Flerfaktorautentisering (MFA)</li>
<li>DMARC, SPF og DKIM for e-postvalidering</li>
<li>Web-filtrering og sandboxing</li>
</ul>

<blockquote>
<p>"De fleste vellykkede cyberangrep starter med en phishing-e-post. Investering i opplæring og teknologi er essensielt for enhver moderne virksomhet."</p>
</blockquote>

<h3>3. Hendelsesresponsplan</h3>
<p>Ha en klar plan for hva som skal gjøres hvis et phishing-angrep lykkes. Rask respons kan minimere skaden betydelig.</p>

<h2>Konklusjon</h2>
<p>Phishing-angrep er en konstant trussel, men med riktig forberedelse og verktøy kan din bedrift være godt beskyttet. Kontakt Nornex for en sikkerhetsvurdering av din virksomhet.</p>
    `,
    featuredImage: '/images/blog/phishing-protection.jpg',
    category: blogCategories[0],
    author: blogAuthors[0],
    tags: [blogTags[0], blogTags[13], blogTags[12]],
    status: 'published',
    publishedAt: '2024-11-20T10:00:00Z',
    createdAt: '2024-11-18T14:30:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    views: 1542,
    readingTime: 6,
    metaTitle: 'Beskytt bedriften mot phishing-angrep | Nornex',
    metaDescription: 'Lær effektive strategier for å beskytte din virksomhet mot phishing-angrep. Tips, verktøy og beste praksis fra IT-sikkerhetseksperter.',
    focusKeyword: 'phishing-angrep',
  },
  {
    id: 2,
    slug: 'komplett-guide-til-microsoft-365-migrering',
    title: 'Komplett guide til Microsoft 365-migrering for SMB',
    excerpt: 'Planlegger du å migrere til Microsoft 365? Denne guiden dekker alt du trenger å vite for en smidig overgang.',
    content: `
<h2>Hvorfor migrere til Microsoft 365?</h2>
<p>Microsoft 365 tilbyr en komplett pakke med produktivitetsverktøy som kan transformere måten din bedrift arbeider på. Fra fleksibelt samarbeid til avansert sikkerhet, fordelene er mange.</p>

<h2>Forberedelser før migrering</h2>
<h3>Kartlegging av eksisterende infrastruktur</h3>
<p>Før du starter migreringsprosjektet, må du ha full oversikt over din nåværende IT-infrastruktur:</p>
<ul>
<li>Eksisterende e-postløsning og datamengde</li>
<li>Filserver og lagringsstruktur</li>
<li>Integrasjoner med andre systemer</li>
<li>Brukerkontoer og tilgangsnivåer</li>
</ul>

<h3>Valg av riktig lisensplan</h3>
<p>Microsoft 365 tilbyr flere lisensalternativer. For SMB anbefaler vi ofte:</p>
<ul>
<li><strong>Microsoft 365 Business Basic:</strong> For bedrifter som primært trenger e-post og samarbeidsverktøy</li>
<li><strong>Microsoft 365 Business Standard:</strong> Inkluderer desktop-applikasjoner</li>
<li><strong>Microsoft 365 Business Premium:</strong> Avansert sikkerhet og enhetsadministrasjon</li>
</ul>

<h2>Migreringsprosessen steg for steg</h2>
<h3>Steg 1: Opprett Microsoft 365-tenant</h3>
<p>Start med å sette opp din Microsoft 365-tenant og konfigurere grunnleggende innstillinger.</p>

<h3>Steg 2: Domeneverifisering</h3>
<p>Verifiser ditt domene i Microsoft 365 Admin Center for å kunne bruke dine egne e-postadresser.</p>

<h3>Steg 3: Brukeropprettelse</h3>
<p>Opprett brukerkontoer og tildel lisenser. Du kan gjøre dette manuelt eller via CSV-import for større mengder.</p>

<h3>Steg 4: E-postmigrering</h3>
<p>Migrer e-post fra din eksisterende løsning. Microsoft tilbyr flere migreringsverktøy avhengig av kildeplattformen.</p>

<h3>Steg 5: Filmigrering</h3>
<p>Flytt filer til SharePoint Online eller OneDrive for Business. Planlegg mappestrukturen nøye.</p>

<blockquote>
<p>"En godt planlagt migrering reduserer nedetid og sikrer at alle data kommer trygt over til den nye plattformen."</p>
</blockquote>

<h2>Etter migrering</h2>
<p>Suksessen til en Microsoft 365-migrering måles ikke bare på selve overgangen, men også på hvordan ansatte adopterer de nye verktøyene. Invester i opplæring og støtte.</p>
    `,
    featuredImage: '/images/blog/microsoft-365-migration.jpg',
    category: blogCategories[1],
    author: blogAuthors[1],
    tags: [blogTags[2], blogTags[1], blogTags[11]],
    status: 'published',
    publishedAt: '2024-11-18T09:00:00Z',
    createdAt: '2024-11-15T11:00:00Z',
    updatedAt: '2024-11-18T09:00:00Z',
    views: 2341,
    readingTime: 8,
    metaTitle: 'Microsoft 365 migrering guide for SMB | Nornex',
    metaDescription: 'Komplett steg-for-steg guide for migrering til Microsoft 365. Lær om forberedelser, prosessen og beste praksis for SMB.',
    focusKeyword: 'microsoft 365 migrering',
  },
  {
    id: 3,
    slug: 'nornex-lanserer-ny-it-support-portal',
    title: 'Nornex lanserer ny IT-support portal for kunder',
    excerpt: 'Vi er stolte av å presentere vår nye kundeportal som gjør det enklere enn noensinne å få IT-hjelp når du trenger det.',
    content: `
<h2>En ny æra for kundeservice</h2>
<p>Etter måneder med utvikling og testing er vi glade for å kunne lansere vår helt nye IT-support portal. Portalen er designet med én ting i tankene: å gjøre det så enkelt som mulig for våre kunder å få hjelpen de trenger.</p>

<h2>Nye funksjoner</h2>
<h3>Enkel saksopprettelse</h3>
<p>Med bare noen få klikk kan du opprette en ny supportsak. Velg kategori, beskriv problemet, og legg ved relevante filer eller skjermbilder.</p>

<h3>Sanntidssporing</h3>
<p>Følg med på statusen til dine saker i sanntid. Se hvem som jobber med saken og forventet løsningstid.</p>

<h3>Kunnskapsbase</h3>
<p>Portalen inkluderer en omfattende kunnskapsbase med artikler og guider. Finn løsninger på vanlige problemer selv, når som helst.</p>

<h3>Chat-funksjon</h3>
<p>Ny live chat lar deg snakke direkte med våre teknikere for rask hjelp med enkle spørsmål.</p>

<h2>Hvordan komme i gang</h2>
<p>Alle eksisterende kunder har fått tilsendt innloggingsinformasjon. Hvis du ikke har mottatt dette, kontakt oss på support@nornex.no.</p>

<p>Vi er overbevist om at den nye portalen vil forbedre din opplevelse som Nornex-kunde betydelig. Som alltid, ta kontakt hvis du har spørsmål eller tilbakemeldinger!</p>
    `,
    featuredImage: '/images/blog/support-portal-launch.jpg',
    category: blogCategories[2],
    author: blogAuthors[2],
    tags: [blogTags[6], blogTags[11]],
    status: 'published',
    publishedAt: '2024-11-15T12:00:00Z',
    createdAt: '2024-11-14T10:00:00Z',
    updatedAt: '2024-11-15T12:00:00Z',
    views: 876,
    readingTime: 4,
    metaTitle: 'Ny IT-support portal lansert | Nornex',
    metaDescription: 'Nornex lanserer ny kundeportal med enkel saksopprettelse, sanntidssporing og kunnskapsbase. Les om alle de nye funksjonene.',
    focusKeyword: 'it-support portal',
  },
  {
    id: 4,
    slug: 'slik-velger-du-riktig-backup-losning',
    title: 'Slik velger du riktig backup-løsning for din bedrift',
    excerpt: 'En pålitelig backup-strategi er kritisk for enhver virksomhet. Her er det du må vurdere når du velger backup-løsning.',
    content: `
<h2>Hvorfor er backup så viktig?</h2>
<p>Datatap kan skyldes alt fra hardware-feil og menneskelige feil til cyberangrep og naturkatastrofer. Uten en solid backup-strategi risikerer bedriften din alt fra produktivitetstap til fullstendig datakrise.</p>

<h2>3-2-1 regelen</h2>
<p>Den gylne standarden for backup følger 3-2-1 regelen:</p>
<ul>
<li><strong>3</strong> kopier av dataene dine</li>
<li><strong>2</strong> forskjellige lagringsmedier</li>
<li><strong>1</strong> kopi offsite (utenfor kontoret)</li>
</ul>

<h2>Backup-løsninger å vurdere</h2>
<h3>Lokal backup</h3>
<p>Backup til lokal server eller NAS gir rask gjenoppretting, men beskytter ikke mot fysiske trusler som brann eller tyveri.</p>

<h3>Skybasert backup</h3>
<p>Cloud backup til tjenester som Azure Backup eller Veeam Cloud tilbyr offsite lagring med høy sikkerhet og skalerbarhet.</p>

<h3>Hybrid backup</h3>
<p>Den beste løsningen kombinerer lokal og skybasert backup for både rask gjenoppretting og katastrofebeskyttelse.</p>

<h2>Hva bør backes opp?</h2>
<ul>
<li>Forretningskritiske dokumenter og data</li>
<li>E-post og kommunikasjon</li>
<li>Databaser og applikasjonsdata</li>
<li>Systemkonfigurasjoner</li>
</ul>

<h2>Test backupen din regelmessig</h2>
<p>En backup er bare verdt noe hvis den fungerer. Test gjenoppretting regelmessig for å sikre at dataene dine faktisk kan hentes tilbake når det trengs.</p>
    `,
    featuredImage: '/images/blog/backup-solutions.jpg',
    category: blogCategories[3],
    author: blogAuthors[0],
    tags: [blogTags[4], blogTags[1], blogTags[0]],
    status: 'published',
    publishedAt: '2024-11-12T08:00:00Z',
    createdAt: '2024-11-10T15:00:00Z',
    updatedAt: '2024-11-12T08:00:00Z',
    views: 1123,
    readingTime: 5,
    metaTitle: 'Velg riktig backup-løsning | Nornex',
    metaDescription: 'Guide til å velge backup-løsning for din bedrift. Lær om 3-2-1 regelen, lokal vs. sky backup, og beste praksis.',
    focusKeyword: 'backup løsning',
  },
  {
    id: 5,
    slug: 'oslo-bedrift-sparte-40-prosent-pa-it-kostnader',
    title: 'Oslo-bedrift sparte 40% på IT-kostnader med skymigrering',
    excerpt: 'Les hvordan vi hjalp en lokal bedrift med å transformere sin IT-infrastruktur og oppnå betydelige besparelser.',
    content: `
<h2>Om kunden</h2>
<p>En mellomstor regnskapsbedrift i Oslo med 45 ansatte hadde utfordringer med sin aldrende IT-infrastruktur. Serverne begynte å bli ustabile, og IT-kostnadene økte år for år.</p>

<h2>Utfordringene</h2>
<ul>
<li>Aldrende servere som krevde hyppig vedlikehold</li>
<li>Høye strømkostnader for serverrom</li>
<li>Begrenset fleksibilitet for hjemmekontor</li>
<li>Bekymringer rundt datasikkerhet og backup</li>
</ul>

<h2>Løsningen</h2>
<p>Nornex designet en komplett skymigrasjonsplan som inkluderte:</p>

<h3>Microsoft 365 for alle ansatte</h3>
<p>E-post, dokumenter og samarbeidsverktøy ble flyttet til Microsoft 365, noe som umiddelbart ga fleksibilitet for fjernarbeid.</p>

<h3>Azure-basert infrastruktur</h3>
<p>Kritiske applikasjoner ble migrert til Azure Virtual Machines, med automatisk skalering og høy tilgjengelighet.</p>

<h3>Sikkerhetsforbedringer</h3>
<p>Implementerte Microsoft Defender for Business og Azure Backup for omfattende sikkerhet og beskyttelse.</p>

<h2>Resultater</h2>
<ul>
<li><strong>40% reduksjon</strong> i totale IT-kostnader</li>
<li><strong>99.9% oppetid</strong> mot tidligere 95%</li>
<li><strong>Null</strong> serverromskostnader</li>
<li>Full fleksibilitet for hjemmekontor</li>
<li>Forbedret sikkerhetsnivå</li>
</ul>

<blockquote>
<p>"Nornex forstod våre behov og leverte en løsning som har transformert hvordan vi jobber. Vi skulle ønske vi hadde gjort dette tidligere."</p>
<cite>- Daglig leder, regnskapsbedriften</cite>
</blockquote>

<h2>Lær av denne suksessen</h2>
<p>Ønsker du å utforske hvordan din bedrift kan dra nytte av skyteknologi? Kontakt oss for en uforpliktende samtale.</p>
    `,
    featuredImage: '/images/blog/case-study-accounting.jpg',
    category: blogCategories[4],
    author: blogAuthors[1],
    tags: [blogTags[1], blogTags[3], blogTags[11]],
    status: 'published',
    publishedAt: '2024-11-08T10:00:00Z',
    createdAt: '2024-11-05T09:00:00Z',
    updatedAt: '2024-11-08T10:00:00Z',
    views: 654,
    readingTime: 5,
    metaTitle: 'Case Study: 40% IT-besparelser | Nornex',
    metaDescription: 'Les hvordan en Oslo-bedrift sparte 40% på IT-kostnader med skymigrering. Ekte resultater fra et Nornex-prosjekt.',
    focusKeyword: 'skymigrering case study',
  },
  {
    id: 6,
    slug: 'kunstig-intelligens-for-smb',
    title: 'Kunstig intelligens: Muligheter og utfordringer for SMB',
    excerpt: 'AI er ikke bare for storselskaper. Oppdag hvordan små og mellomstore bedrifter kan dra nytte av kunstig intelligens.',
    content: `
<h2>AI er for alle</h2>
<p>Kunstig intelligens har blitt mer tilgjengelig enn noensinne. Med tjenester som ChatGPT, Microsoft Copilot og ulike bransjespesifikke AI-verktøy, kan SMB nå dra nytte av teknologi som tidligere var forbeholdt store konserner.</p>

<h2>Praktiske AI-anvendelser for SMB</h2>

<h3>Kundeservice og chatbots</h3>
<p>AI-drevne chatbots kan håndtere vanlige kundespørsmål 24/7, frigjøre tid for ansatte, og forbedre kundeopplevelsen.</p>

<h3>Dokumenthåndtering</h3>
<p>AI kan automatisere kategorisering, søk og analyse av dokumenter, noe som er spesielt nyttig for bedrifter med mye papirarbeid.</p>

<h3>Markedsføring og innholdsproduksjon</h3>
<p>Generer ideer til innhold, skriv førsteutkast, og analyser markedsføringsdata med AI-assistanse.</p>

<h3>Økonomistyring</h3>
<p>AI-verktøy kan automatisere bokføring, oppdage anomalier og gi innsikt i økonomiske trender.</p>

<h2>Utfordringer å være oppmerksom på</h2>
<ul>
<li><strong>Personvern:</strong> Pass på hvilke data du deler med AI-tjenester</li>
<li><strong>Nøyaktighet:</strong> AI kan gjøre feil - alltid verifiser viktig informasjon</li>
<li><strong>Kompetanse:</strong> Ansatte trenger opplæring for å bruke AI effektivt</li>
<li><strong>Kostnader:</strong> Vurder ROI før du investerer i AI-løsninger</li>
</ul>

<h2>Kom i gang med AI</h2>
<p>Start i det små. Identifiser en prosess som kan forbedres med AI, test en løsning, og skaler opp etter hvert som du får erfaring.</p>

<p>Nornex kan hjelpe deg med å identifisere AI-muligheter og implementere løsninger som passer din virksomhet. Ta kontakt for en samtale!</p>
    `,
    featuredImage: '/images/blog/ai-for-smb.jpg',
    category: blogCategories[5],
    author: blogAuthors[2],
    tags: [blogTags[14], blogTags[11], blogTags[12]],
    status: 'published',
    publishedAt: '2024-11-05T11:00:00Z',
    createdAt: '2024-11-02T14:00:00Z',
    updatedAt: '2024-11-05T11:00:00Z',
    views: 1876,
    readingTime: 6,
    metaTitle: 'AI for SMB: Muligheter og utfordringer | Nornex',
    metaDescription: 'Oppdag hvordan små og mellomstore bedrifter kan dra nytte av kunstig intelligens. Praktiske tips og vurderinger.',
    focusKeyword: 'kunstig intelligens smb',
  },
  {
    id: 7,
    slug: 'zero-trust-sikkerhet-guide',
    title: 'Zero Trust: Den moderne tilnærmingen til IT-sikkerhet',
    excerpt: 'Lær om Zero Trust-arkitektur og hvorfor denne tilnærmingen er essensielt for moderne cybersikkerhet.',
    content: `
<h2>Hva er Zero Trust?</h2>
<p>Zero Trust er en sikkerhetsmodell basert på prinsippet "aldri stol på, alltid verifiser". I stedet for å anta at alt innenfor bedriftens nettverk er trygt, krever Zero Trust kontinuerlig autentisering og autorisasjon for alle brukere og enheter.</p>

<h2>Hvorfor tradisjonell sikkerhet ikke lenger holder</h2>
<p>Den tradisjonelle "borg-og-vollgrav"-tilnærmingen antok at trusler kom utenfra. Med hjemmekontor, skyløsninger og mobile enheter har denne modellen blitt utdatert.</p>

<h2>Zero Trust-prinsipper</h2>
<h3>1. Verifiser eksplisitt</h3>
<p>Autentiser og autoriser alltid basert på alle tilgjengelige datapunkter, inkludert brukeridentitet, plassering, enhetsstatus og tjenestetilgang.</p>

<h3>2. Bruk minste privilegium</h3>
<p>Gi brukere bare tilgang til det de faktisk trenger. Implementer just-in-time og just-enough-access (JIT/JEA).</p>

<h3>3. Anta kompromittering</h3>
<p>Design systemer som om bruddet allerede har skjedd. Minimer blast radius og segmenter tilgang.</p>

<h2>Implementering av Zero Trust</h2>
<ul>
<li>Identitets- og tilgangsstyring (IAM)</li>
<li>Flerfaktorautentisering (MFA)</li>
<li>Mikrosegmentering av nettverk</li>
<li>Endpoint detection and response (EDR)</li>
<li>Kontinuerlig overvåking og analyse</li>
</ul>

<h2>Start reisen mot Zero Trust</h2>
<p>Zero Trust er ikke et produkt du kjøper, men en strategi du implementerer gradvis. Start med identitetssikring og bygg derfra.</p>
    `,
    featuredImage: '/images/blog/zero-trust-security.jpg',
    category: blogCategories[0],
    author: blogAuthors[0],
    tags: [blogTags[0], blogTags[5], blogTags[12]],
    status: 'published',
    publishedAt: '2024-11-01T09:00:00Z',
    createdAt: '2024-10-28T16:00:00Z',
    updatedAt: '2024-11-01T09:00:00Z',
    views: 2103,
    readingTime: 7,
    metaTitle: 'Zero Trust sikkerhet guide | Nornex',
    metaDescription: 'Komplett guide til Zero Trust-arkitektur. Lær prinsippene og hvordan du implementerer moderne cybersikkerhet.',
    focusKeyword: 'zero trust',
  },
  {
    id: 8,
    slug: 'azure-virtual-desktop-for-hjemmekontor',
    title: 'Azure Virtual Desktop: Perfekt for hjemmekontor',
    excerpt: 'Slik kan Azure Virtual Desktop gi dine ansatte sikker og effektiv tilgang til bedriftens systemer fra hvor som helst.',
    content: `
<h2>Hva er Azure Virtual Desktop?</h2>
<p>Azure Virtual Desktop (AVD) er en sky-basert løsning som lar brukere få tilgang til en fullverdig Windows-desktop fra enhver enhet. Dette gir fleksibilitet uten å gå på kompromiss med sikkerhet.</p>

<h2>Fordeler med Azure Virtual Desktop</h2>
<h3>Sikkerhet</h3>
<p>All data forblir i skyen, noe som reduserer risikoen ved tapte eller stjålne enheter. Integrasjon med Azure AD gir robust identitetsstyring.</p>

<h3>Fleksibilitet</h3>
<p>Ansatte kan jobbe fra hvilken som helst enhet - Windows, Mac, iOS, Android eller nettleser - og få samme opplevelse.</p>

<h3>Kostnadseffektivitet</h3>
<p>Betal kun for det du bruker. Skaler opp og ned etter behov, og eliminer behovet for kraftige lokale maskiner.</p>

<h3>Enkel administrasjon</h3>
<p>Sentraliser desktop-administrasjon og oppdateringer. Rull ut nye applikasjoner til alle brukere på minutter.</p>

<h2>Bruksområder</h2>
<ul>
<li>Fjernarbeid og hjemmekontor</li>
<li>Midlertidig arbeidskraft og konsulenter</li>
<li>Utviklingsmiljøer</li>
<li>Legacy-applikasjoner</li>
</ul>

<h2>Kom i gang med AVD</h2>
<p>Nornex kan hjelpe deg med å designe, implementere og drifte en Azure Virtual Desktop-løsning tilpasset din virksomhet. Kontakt oss for mer informasjon.</p>
    `,
    featuredImage: '/images/blog/azure-virtual-desktop.jpg',
    category: blogCategories[1],
    author: blogAuthors[1],
    tags: [blogTags[3], blogTags[1], blogTags[12]],
    status: 'published',
    publishedAt: '2024-10-28T10:00:00Z',
    createdAt: '2024-10-25T11:00:00Z',
    updatedAt: '2024-10-28T10:00:00Z',
    views: 1234,
    readingTime: 5,
    metaTitle: 'Azure Virtual Desktop for hjemmekontor | Nornex',
    metaDescription: 'Lær hvordan Azure Virtual Desktop gir sikker og effektiv hjemmekontor-løsning for din bedrift.',
    focusKeyword: 'azure virtual desktop',
  },
  {
    id: 9,
    slug: 'webapplikasjon-utvikling-guide',
    title: 'Fra idé til ferdig webapplikasjon: En komplett guide',
    excerpt: 'Planlegger du å utvikle en webapplikasjon? Her er alt du trenger å vite om prosessen fra start til slutt.',
    content: `
<h2>Definere prosjektet</h2>
<p>Før en eneste linje kode skrives, må du ha en klar forståelse av hva applikasjonen skal gjøre og hvem den er for.</p>

<h3>Kravspesifikasjon</h3>
<ul>
<li>Hva er hovedfunksjonaliteten?</li>
<li>Hvem er målgruppen?</li>
<li>Hvilke integrasjoner trengs?</li>
<li>Hva er sikkerhetskravene?</li>
</ul>

<h2>Design og prototyping</h2>
<p>En god brukeropplevelse starter med gjennomtenkt design. Vi anbefaler:</p>
<ul>
<li>Wireframes for strukturen</li>
<li>Interaktive prototyper for testing</li>
<li>Brukertesting før utvikling</li>
</ul>

<h2>Teknologivalg</h2>
<p>Valg av teknologi avhenger av prosjektets behov. Populære alternativer inkluderer:</p>
<ul>
<li><strong>Frontend:</strong> React, Vue, Angular</li>
<li><strong>Backend:</strong> Node.js, .NET, Python</li>
<li><strong>Database:</strong> PostgreSQL, MongoDB, SQL Server</li>
</ul>

<h2>Utviklingsprosessen</h2>
<h3>Agil metodikk</h3>
<p>Vi anbefaler å jobbe i sprinter med regelmessige leveranser. Dette gir fleksibilitet og tidlig tilbakemelding.</p>

<h3>Testing</h3>
<p>Automatisert testing, kodegjennomgang og brukerakseptansetesting sikrer kvalitet.</p>

<h2>Lansering og drift</h2>
<p>En vellykket lansering krever:</p>
<ul>
<li>Skalerbar hosting</li>
<li>Overvåking og logging</li>
<li>Backup-rutiner</li>
<li>Support-plan</li>
</ul>

<h2>La Nornex hjelpe</h2>
<p>Vi har erfaring med å utvikle webapplikasjoner for bedrifter i alle størrelser. Kontakt oss for en uforpliktende samtale om ditt prosjekt.</p>
    `,
    featuredImage: '/images/blog/web-app-development.jpg',
    category: blogCategories[3],
    author: blogAuthors[2],
    tags: [blogTags[7], blogTags[8]],
    status: 'published',
    publishedAt: '2024-10-24T09:00:00Z',
    createdAt: '2024-10-20T14:00:00Z',
    updatedAt: '2024-10-24T09:00:00Z',
    views: 987,
    readingTime: 6,
    metaTitle: 'Guide til webapplikasjon utvikling | Nornex',
    metaDescription: 'Komplett guide til utvikling av webapplikasjoner. Fra idé og design til utvikling, testing og lansering.',
    focusKeyword: 'webapplikasjon utvikling',
  },
  {
    id: 10,
    slug: 'nettverksoppgradering-10-tegn',
    title: '10 tegn på at bedriften din trenger nettverksoppgradering',
    excerpt: 'Er nettverket ditt i stand til å håndtere dagens krav? Her er tegnene på at det er på tide med en oppgradering.',
    content: `
<h2>Moderne krav til nettverk</h2>
<p>Med økende bruk av skyløsninger, videomøter og digitale verktøy, stilles det stadig høyere krav til bedriftens nettverk. Et utdatert nettverk kan bremse produktiviteten og øke sikkerhetsrisikoen.</p>

<h2>10 tegn på at du trenger oppgradering</h2>

<h3>1. Treg internettforbindelse</h3>
<p>Hvis ansatte klager over tregt nett, kan det skyldes for liten båndbredde eller utdatert utstyr.</p>

<h3>2. Hyppige frakoblinger</h3>
<p>Ustabilt WiFi eller kablet nettverk indikerer problemer med infrastrukturen.</p>

<h3>3. Videomøter hakker</h3>
<p>Dårlig kvalitet på Teams- eller Zoom-møter er ofte et nettverksproblem.</p>

<h3>4. Gamle svitsjer og rutere</h3>
<p>Utstyr som er mer enn 5-7 år gammelt bør vurderes for utskifting.</p>

<h3>5. Sikkerhetshendelser</h3>
<p>Moderne nettverksutstyr har bedre sikkerhetsfunksjoner enn eldre enheter.</p>

<h3>6. Vanskelig å legge til nye brukere</h3>
<p>Hvis nettverket sliter med å håndtere nye enheter, kan kapasiteten være nådd.</p>

<h3>7. Ingen gjestenettwerk</h3>
<p>Et separat gjestenettverk er viktig for sikkerhet når besøkende trenger internettilgang.</p>

<h3>8. Manglende overvåking</h3>
<p>Uten synlighet i nettverket er det vanskelig å oppdage problemer før de eskalerer.</p>

<h3>9. Ingen redundans</h3>
<p>Hva skjer hvis hovedruteren svikter? Redundans sikrer kontinuitet.</p>

<h3>10. Hybrid arbeid</h3>
<p>Med hjemmekontor trenger du kanskje VPN-kapasitet eller direkte skytilgang.</p>

<h2>Neste steg</h2>
<p>Nornex kan gjennomføre en nettverksaudit og anbefale tiltak. Kontakt oss for mer informasjon.</p>
    `,
    featuredImage: '/images/blog/network-upgrade.jpg',
    category: blogCategories[5],
    author: blogAuthors[0],
    tags: [blogTags[5], blogTags[9], blogTags[6]],
    status: 'published',
    publishedAt: '2024-10-20T08:00:00Z',
    createdAt: '2024-10-17T10:00:00Z',
    updatedAt: '2024-10-20T08:00:00Z',
    views: 765,
    readingTime: 5,
    metaTitle: '10 tegn på nettverksoppgradering behov | Nornex',
    metaDescription: 'Er det på tide å oppgradere bedriftens nettverk? Her er 10 tegn på at nettverket ditt trenger en oppgradering.',
    focusKeyword: 'nettverksoppgradering',
  },
  {
    id: 11,
    slug: 'gdpr-sjekkliste-for-bedrifter',
    title: 'GDPR-sjekkliste: Er din bedrift i samsvar med personvernreglene?',
    excerpt: 'Bruk denne sjekklisten for å sikre at din bedrift overholder GDPR og unngår potensielle bøter.',
    content: `
<h2>GDPR i Norge</h2>
<p>Personvernforordningen (GDPR) gjelder alle bedrifter som behandler personopplysninger om EU/EØS-borgere. I Norge håndheves dette av Datatilsynet, og brudd kan medføre betydelige bøter.</p>

<h2>GDPR-sjekkliste</h2>

<h3>Dokumentasjon</h3>
<ul>
<li>☐ Oppdatert personvernerklæring på nettstedet</li>
<li>☐ Internkontroll for personvern</li>
<li>☐ Behandlingsprotokoll (oversikt over all databehandling)</li>
<li>☐ Databehandleravtaler med alle leverandører</li>
</ul>

<h3>Samtykke</h3>
<ul>
<li>☐ Tydelig og frivillig samtykke for markedsføring</li>
<li>☐ Enkelt å trekke tilbake samtykke</li>
<li>☐ Cookie-samtykke på nettstedet</li>
</ul>

<h3>Rettigheter</h3>
<ul>
<li>☐ Prosess for å håndtere innsynsforespørsler</li>
<li>☐ Mulighet for sletting av data ("retten til å bli glemt")</li>
<li>☐ Prosess for dataportabilitet</li>
</ul>

<h3>Sikkerhet</h3>
<ul>
<li>☐ Tilgangsstyring til personopplysninger</li>
<li>☐ Kryptering av sensitive data</li>
<li>☐ Sikker lagring og overføring</li>
<li>☐ Logging av tilgang til personopplysninger</li>
</ul>

<h3>Hendelseshåndtering</h3>
<ul>
<li>☐ Plan for håndtering av databrudd</li>
<li>☐ Rutine for varsling til Datatilsynet (72 timer)</li>
<li>☐ Rutine for varsling til berørte personer</li>
</ul>

<h2>Trenger du hjelp?</h2>
<p>Nornex kan hjelpe din bedrift med å implementere tekniske tiltak for GDPR-etterlevelse. Ta kontakt for en vurdering.</p>
    `,
    featuredImage: '/images/blog/gdpr-checklist.jpg',
    category: blogCategories[3],
    author: blogAuthors[0],
    tags: [blogTags[13], blogTags[0], blogTags[11]],
    status: 'published',
    publishedAt: '2024-10-15T10:00:00Z',
    createdAt: '2024-10-12T09:00:00Z',
    updatedAt: '2024-10-15T10:00:00Z',
    views: 1432,
    readingTime: 5,
    metaTitle: 'GDPR sjekkliste for bedrifter | Nornex',
    metaDescription: 'Komplett GDPR-sjekkliste for norske bedrifter. Sikre at din virksomhet overholder personvernreglene.',
    focusKeyword: 'gdpr sjekkliste',
  },
  {
    id: 12,
    slug: 'maskinvare-levetid-nar-bytte',
    title: 'Maskinvare levetid: Når bør du bytte ut IT-utstyret?',
    excerpt: 'Alt IT-utstyr har begrenset levetid. Lær når det lønner seg å oppgradere fremfor å reparere.',
    content: `
<h2>Levetid for vanlig IT-utstyr</h2>
<p>Å vite når du bør bytte ut IT-utstyr kan spare bedriften for nedetid og uventede kostnader.</p>

<h3>PC-er og laptoper: 3-5 år</h3>
<p>Etter 3-4 år begynner ytelsen å bli merkbart dårligere, og garantien har som regel utløpt. Windows-oppdateringer kan også slutte å støtte eldre hardware.</p>

<h3>Servere: 5-7 år</h3>
<p>Enterprise-servere er bygget for lengre levetid, men etter 5-7 år øker risikoen for feil, og driftskostnadene stiger.</p>

<h3>Nettverksutstyr: 5-7 år</h3>
<p>Svitsjer og rutere kan vare lenge, men nye standarder (WiFi 6, 10Gb Ethernet) kan gjøre oppgradering ønskelig.</p>

<h3>Skrivere: 5-7 år</h3>
<p>Forbruket av tonere og blekkpatroner blir ofte dyrere på eldre modeller, og reservedeler kan bli vanskelig å få tak i.</p>

<h2>Tegn på at utstyret bør byttes</h2>
<ul>
<li>Hyppige feil og nedetid</li>
<li>Treg ytelse som påvirker produktivitet</li>
<li>Sikkerhetsoppdateringer ikke lenger tilgjengelig</li>
<li>Reparasjonskostnader nærmer seg prisen på nytt utstyr</li>
<li>Kompatibilitetsproblemer med ny programvare</li>
</ul>

<h2>Totaløkonomi</h2>
<p>Vurder totalkostnaden, ikke bare kjøpspris. Inkluder strømforbruk, vedlikehold, produktivitetstap og risiko for nedetid.</p>

<h2>Planlegg utskifting</h2>
<p>En proaktiv utskiftingsplan forhindrer brå utgifter og nedetid. Nornex kan hjelpe med å lage en livssyklusstyring-plan for din bedrift.</p>
    `,
    featuredImage: '/images/blog/hardware-lifecycle.jpg',
    category: blogCategories[5],
    author: blogAuthors[2],
    tags: [blogTags[9], blogTags[10], blogTags[6]],
    status: 'published',
    publishedAt: '2024-10-10T11:00:00Z',
    createdAt: '2024-10-07T13:00:00Z',
    updatedAt: '2024-10-10T11:00:00Z',
    views: 543,
    readingTime: 4,
    metaTitle: 'Når bytte IT-utstyr? Maskinvare levetid | Nornex',
    metaDescription: 'Lær om levetid for PC-er, servere og nettverksutstyr. Når lønner det seg å oppgradere fremfor å reparere?',
    focusKeyword: 'maskinvare levetid',
  },
];

// Newsletter Subscribers (mock data)
export const newsletterSubscribers = [
  { id: 1, email: 'kunde1@example.com', name: 'Anders Johansen', subscribedAt: '2024-10-01T10:00:00Z', isActive: true },
  { id: 2, email: 'kunde2@example.com', name: 'Kristine Berg', subscribedAt: '2024-10-05T14:30:00Z', isActive: true },
  { id: 3, email: 'kunde3@example.com', name: 'Ole Hansen', subscribedAt: '2024-10-10T09:15:00Z', isActive: true },
  { id: 4, email: 'kunde4@example.com', name: null, subscribedAt: '2024-10-15T11:45:00Z', isActive: true },
  { id: 5, email: 'kunde5@example.com', name: 'Silje Nilsen', subscribedAt: '2024-10-20T16:00:00Z', isActive: false },
];
