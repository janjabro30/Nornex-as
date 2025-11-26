/**
 * NORNEX AS - Blog Data (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  authorImage?: string;
  featuredImage?: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}

export const blogCategories = [
  { name: 'IT-sikkerhet', slug: 'it-sikkerhet' },
  { name: 'Skyløsninger', slug: 'skylosninger' },
  { name: 'Tips og triks', slug: 'tips-triks' },
  { name: 'Nyheter', slug: 'nyheter' },
  { name: 'Guider', slug: 'guider' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'beskytt-bedriften-mot-phishing',
    title: 'Slik beskytter du bedriften mot phishing-angrep',
    excerpt: 'Phishing er en av de vanligste truslene mot norske bedrifter. Lær hvordan du gjenkjenner og unngår disse angrepene.',
    content: `
## Hva er phishing?

Phishing er en type sosial manipulering der angripere utgir seg for å være en pålitelig kilde for å lure ofre til å avsløre sensitiv informasjon som passord, kredittkortopplysninger eller persondata.

## De vanligste typene phishing

### 1. E-post phishing
Den mest utbredte formen der angripere sender e-poster som ser ut til å komme fra kjente selskaper eller kolleger.

### 2. Spear phishing
Målrettede angrep mot spesifikke personer eller organisasjoner med skreddersydde meldinger.

### 3. Smishing (SMS phishing)
Phishing via tekstmeldinger, ofte med lenker til falske nettsider.

## Slik beskytter du bedriften

- **Opplæring**: Tren ansatte til å gjenkjenne mistenkelige e-poster
- **To-faktor autentisering**: Aktiver 2FA på alle viktige kontoer
- **E-postfiltrering**: Bruk avanserte spamfiltre
- **Rapporteringsrutiner**: Opprett enkle måter å rapportere mistenkelige meldinger
- **Regelmessig testing**: Gjennomfør phishing-simuleringer

## Oppsummering

Phishing-angrep blir stadig mer sofistikerte. Ved å kombinere tekniske tiltak med god opplæring kan bedriften din betydelig redusere risikoen for å bli et offer.

Trenger du hjelp med IT-sikkerhet? [Kontakt oss](/kontakt) for en gratis sikkerhetsgjennomgang.
    `,
    category: 'IT-sikkerhet',
    categorySlug: 'it-sikkerhet',
    author: 'Erik Johansen',
    publishedAt: '2024-11-15',
    readingTime: 5,
    tags: ['sikkerhet', 'phishing', 'opplæring', 'e-post'],
  },
  {
    id: '2',
    slug: 'microsoft-365-for-sma-bedrifter',
    title: 'Microsoft 365 for små bedrifter: En komplett guide',
    excerpt: 'Alt du trenger å vite om Microsoft 365 og hvordan det kan effektivisere arbeidshverdagen for din bedrift.',
    content: `
## Hvorfor Microsoft 365?

Microsoft 365 (tidligere Office 365) er mer enn bare Word og Excel. Det er en komplett plattform for produktivitet og samarbeid som passer perfekt for små og mellomstore bedrifter.

## Hva er inkludert?

### Produktivitetsapper
- **Word, Excel, PowerPoint**: Kjente verktøy i skyen
- **Outlook**: Profesjonell e-post med egen domene
- **OneNote**: Digitale notatblokker for organisering

### Samarbeidsverktøy
- **Teams**: Videomøter, chat og samarbeid
- **SharePoint**: Dokumentdeling og intranett
- **OneDrive**: Skylagring for filer

### Sikkerhet
- **Defender**: Beskyttelse mot trusler
- **Compliance**: GDPR-vennlige verktøy
- **Conditional Access**: Sikker tilgangsstyring

## Hvilken plan passer for deg?

| Plan | Pris/bruker | Best for |
|------|-------------|----------|
| Business Basic | 99 kr | E-post og samarbeid |
| Business Standard | 199 kr | Alle Office-apper |
| Business Premium | 399 kr | Alt + avansert sikkerhet |

## Kom i gang

Vi hjelper deg med migrering, oppsett og opplæring. [Kontakt oss](/kontakt) for et uforpliktende tilbud.
    `,
    category: 'Skyløsninger',
    categorySlug: 'skylosninger',
    author: 'Maria Hansen',
    publishedAt: '2024-11-10',
    readingTime: 7,
    tags: ['Microsoft 365', 'sky', 'produktivitet', 'samarbeid'],
  },
  {
    id: '3',
    slug: '10-tips-raskere-pc',
    title: '10 tips for en raskere PC',
    excerpt: 'Er PC-en treg? Her er 10 enkle tips som kan gjøre datamaskinen din raskere uten å kjøpe nytt utstyr.',
    content: `
## Er PC-en din treg?

En treg datamaskin kan være frustrerende og koste bedriften verdifull tid. Her er 10 tips som kan hjelpe.

## De 10 beste tipsene

### 1. Rydd opp i oppstartsprogrammer
Mange programmer starter automatisk og bruker ressurser. Gå til Oppgavebehandling > Oppstart og deaktiver unødvendige programmer.

### 2. Frigjør diskplass
Slett midlertidige filer og avinstaller programmer du ikke bruker. Bruk Windows' innebygde Diskopprydding.

### 3. Defragmenter harddisken
Gjelder kun for tradisjonelle harddisker (HDD), ikke SSD. Windows gjør dette ofte automatisk.

### 4. Oppdater drivere
Utdaterte drivere kan påvirke ytelsen. Sjekk produsentens nettsider for oppdateringer.

### 5. Skann etter virus
Kjør en full skanning med antivirusprogrammet ditt regelmessig.

### 6. Øk RAM
Hvis PC-en ofte går tom for minne, kan mer RAM hjelpe betydelig.

### 7. Bytt til SSD
Den største ytelsesøkningen får du ved å bytte fra HDD til SSD.

### 8. Deaktiver visuelle effekter
Slå av unødvendige animasjoner og effekter i Windows.

### 9. Hold Windows oppdatert
Sørg for at operativsystemet er oppdatert med siste patcher.

### 10. Start på nytt regelmessig
En omstart kan løse mange problemer og frigjøre ressurser.

## Trenger du hjelp?

Hvis disse tipsene ikke hjelper, kan problemet være mer komplekst. [Book en diagnose](/reparasjon) så finner vi ut hva som er galt.
    `,
    category: 'Tips og triks',
    categorySlug: 'tips-triks',
    author: 'Thomas Berg',
    publishedAt: '2024-11-05',
    readingTime: 4,
    tags: ['PC', 'ytelse', 'tips', 'vedlikehold'],
  },
  {
    id: '4',
    slug: 'ny-versjon-windows-11',
    title: 'Windows 11 24H2: Hva er nytt?',
    excerpt: 'Microsoft har sluppet en stor oppdatering til Windows 11. Her er de viktigste endringene og forbedringene.',
    content: `
## Windows 11 24H2 er her

Den nyeste oppdateringen til Windows 11 bringer en rekke forbedringer og nye funksjoner.

## De viktigste nyhetene

### Copilot-integrasjon
Microsofts AI-assistent er nå dypere integrert i operativsystemet og kan hjelpe med alt fra tekstskriving til systeminnstillinger.

### Forbedret Start-meny
Start-menyen har fått nytt design med bedre organisering og raskere tilgang til ofte brukte apper.

### Nye tilgjengelighetsfunksjoner
- Live Captions for video og lyd
- Forbedret Voice Access
- Bedre skjermleser-støtte

### Ytelsesoptimaliseringer
- Raskere oppstart
- Bedre minnehåndtering
- Lavere strømforbruk på bærbare

### Sikkerhetsforbedringer
- Passkeys-støtte
- Forbedret Windows Hello
- Strengere apptillatelser

## Bør du oppdatere?

Vi anbefaler å vente noen uker etter lansering for å sikre at oppdateringen er stabil. Test gjerne på en maskin før utrulling til hele bedriften.

## Trenger du hjelp med oppgradering?

[Kontakt oss](/kontakt) for profesjonell hjelp med Windows-oppdateringer for din bedrift.
    `,
    category: 'Nyheter',
    categorySlug: 'nyheter',
    author: 'Erik Johansen',
    publishedAt: '2024-10-28',
    readingTime: 5,
    tags: ['Windows 11', 'oppdatering', 'Microsoft', 'nyheter'],
  },
  {
    id: '5',
    slug: 'guide-backup-strategi',
    title: 'Komplett guide: Backup-strategi for små bedrifter',
    excerpt: 'En god backup-strategi kan redde bedriften din. Lær hvordan du setter opp pålitelig backup uten å bruke formue.',
    content: `
## Hvorfor backup er kritisk

3-2-1-regelen er grunnmuren i enhver god backup-strategi:
- **3** kopier av dataene dine
- **2** forskjellige medier
- **1** kopi off-site (utenfor kontoret)

## Trinn 1: Identifiser kritiske data

Start med å kartlegge hva som må sikkerhetskopies:
- Kundedatabaser
- Regnskap og fakturering
- E-post og dokumenter
- Prosjektfiler
- Konfigurasjonsfiler

## Trinn 2: Velg backup-løsning

### Lokale backup-løsninger
- **NAS (Network Attached Storage)**: Synology, QNAP
- **Ekstern harddisk**: Enkel og rimelig
- **Tape**: For store datamengder

### Sky-backup
- **Microsoft 365 Backup**: For Office-data
- **Veeam**: Enterprise-klasse
- **Acronis**: Hybrid-løsning

## Trinn 3: Automatiser

Backup bør kjøre automatisk:
- Daglig inkrementell backup
- Ukentlig full backup
- Månedlig arkivering

## Trinn 4: Test regelmessig

En backup er verdiløs om den ikke fungerer. Test gjenoppretting minst:
- Ukentlig: Enkeltfiler
- Månedlig: Hele systemer
- Kvartalsvis: Full disaster recovery

## Vi hjelper deg

Trenger du hjelp med å sette opp en pålitelig backup-løsning? [Book en konsultasjon](/kontakt) med våre eksperter.
    `,
    category: 'Guider',
    categorySlug: 'guider',
    author: 'Maria Hansen',
    publishedAt: '2024-10-20',
    readingTime: 8,
    tags: ['backup', 'sikkerhet', 'guide', 'sky'],
  },
  {
    id: '6',
    slug: 'gdpr-sjekkliste-2024',
    title: 'GDPR-sjekkliste for 2024',
    excerpt: 'Er bedriften din GDPR-kompatibel? Bruk denne sjekklisten for å sikre at du oppfyller kravene.',
    content: `
## GDPR-krav i 2024

GDPR (General Data Protection Regulation) stiller strenge krav til hvordan bedrifter håndterer personopplysninger.

## Sjekkliste for overholdelse

### Dokumentasjon
- [ ] Behandlingsprotokoll er oppdatert
- [ ] Personvernerklæring er publisert
- [ ] Databehandleravtaler er på plass
- [ ] Rutiner for innsynsbegjæringer

### Sikkerhetstiltak
- [ ] Kryptering av sensitive data
- [ ] Tilgangskontroll og logging
- [ ] Regelmessige sikkerhetsvurderinger
- [ ] Rutiner for sikkerhetsbrudd

### Rettigheter
- [ ] Rett til innsyn håndteres
- [ ] Rett til sletting ("bli glemt")
- [ ] Rett til dataportabilitet
- [ ] Protest mot behandling

### Opplæring
- [ ] Ansatte er opplært i GDPR
- [ ] Rutiner er kommunisert
- [ ] Regelmessig oppdatering

## Konsekvenser av brudd

- Bøter opptil 4% av global omsetning
- Reputasjonsskade
- Tap av kundetillit

## Vi hjelper deg

Usikker på om bedriften er GDPR-kompatibel? [Kontakt oss](/kontakt) for en GDPR-revisjon.
    `,
    category: 'IT-sikkerhet',
    categorySlug: 'it-sikkerhet',
    author: 'Thomas Berg',
    publishedAt: '2024-10-15',
    readingTime: 6,
    tags: ['GDPR', 'personvern', 'compliance', 'sikkerhet'],
  },
];

export const getBlogPostBySlug = (category: string, slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.categorySlug === category && p.slug === slug);
};

export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(p => p.categorySlug === categorySlug);
};

export const getFeaturedPost = (): BlogPost => {
  return blogPosts[0];
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
};
