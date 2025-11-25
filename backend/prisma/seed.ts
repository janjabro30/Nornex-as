import { PrismaClient, UserRole, ServiceCategory, BlogPostStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.blogPostTag.deleteMany();
  await prisma.blogTag.deleteMany();
  await prisma.blogPostTranslation.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.testimonialTranslation.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.packageTranslation.deleteMany();
  await prisma.package.deleteMany();
  await prisma.serviceTranslation.deleteMany();
  await prisma.service.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.user.deleteMany();

  console.log('📧 Creating admin user...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nornex.no',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'Nornex',
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  // Create editor user
  const editorPassword = await bcrypt.hash('editor123', 10);
  const editor = await prisma.user.create({
    data: {
      email: 'redaktor@nornex.no',
      password: editorPassword,
      firstName: 'Erik',
      lastName: 'Hansen',
      role: UserRole.EDITOR,
      isActive: true,
    },
  });

  console.log('🛠️ Creating services...');

  // ============================================
  // MANAGED IT & REPAIR SERVICES
  // ============================================

  const managedEndpoints = await prisma.service.create({
    data: {
      slug: 'managed-endpoints',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Monitor',
      sortOrder: 1,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Administrerte Endepunkter & Servere',
            description:
              'Proaktiv overvåking og administrasjon av alle dine enheter. Vi holder systemene dine oppdatert, sikre og optimalisert for maksimal oppetid.',
            features: JSON.stringify([
              'Automatisk patching og oppdateringer',
              '24/7 overvåking med varsler',
              'Ytelsesoptimalisering',
              'Asset management og inventar',
              'Remote management',
            ]),
          },
          {
            language: 'en',
            title: 'Managed Endpoints & Servers',
            description:
              'Proactive monitoring and management of all your devices. We keep your systems updated, secure, and optimized for maximum uptime.',
            features: JSON.stringify([
              'Automated patching and updates',
              '24/7 monitoring with alerts',
              'Performance optimization',
              'Asset management and inventory',
              'Remote management',
            ]),
          },
        ],
      },
    },
  });

  const helpdesk = await prisma.service.create({
    data: {
      slug: 'helpdesk-support',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Headphones',
      sortOrder: 2,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Helpdesk Support',
            description:
              'Profesjonell IT-støtte når du trenger det. Vår erfarne support-team hjelper dine ansatte med tekniske utfordringer raskt og effektivt.',
            features: JSON.stringify([
              '8×5 eller 24/7 tilgjengelighet',
              'Flerspråklig support (norsk/engelsk)',
              'Telefon, e-post og chat',
              'Prioritert saksbehandling',
              'SLA-garantier',
            ]),
          },
          {
            language: 'en',
            title: 'Helpdesk Support',
            description:
              'Professional IT support when you need it. Our experienced support team helps your employees with technical challenges quickly and efficiently.',
            features: JSON.stringify([
              '8×5 or 24/7 availability',
              'Multilingual support (Norwegian/English)',
              'Phone, email and chat',
              'Prioritized case handling',
              'SLA guarantees',
            ]),
          },
        ],
      },
    },
  });

  const networking = await prisma.service.create({
    data: {
      slug: 'networking-infrastructure',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Network',
      sortOrder: 3,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Nettverk & Infrastruktur',
            description:
              'Design, implementering og vedlikehold av robuste nettverksløsninger. Vi sikrer at din infrastruktur støtter virksomhetens vekst.',
            features: JSON.stringify([
              'Nettverksdesign og -arkitektur',
              'Switch og router konfigurasjon',
              'VLAN-segmentering',
              'VPN-løsninger',
              'Nettverksovervåking',
            ]),
          },
          {
            language: 'en',
            title: 'Networking & Infrastructure',
            description:
              'Design, implementation and maintenance of robust network solutions. We ensure your infrastructure supports business growth.',
            features: JSON.stringify([
              'Network design and architecture',
              'Switch and router configuration',
              'VLAN segmentation',
              'VPN solutions',
              'Network monitoring',
            ]),
          },
        ],
      },
    },
  });

  const backup = await prisma.service.create({
    data: {
      slug: 'backup-disaster-recovery',
      category: ServiceCategory.MANAGED_IT,
      icon: 'HardDrive',
      sortOrder: 4,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Backup & Disaster Recovery',
            description:
              'Beskyttelse av dine kritiske data med automatiserte backupløsninger og gjennomtenkte gjenopprettingsplaner.',
            features: JSON.stringify([
              'Automatisert backup til sky',
              'Lokal og offsite lagring',
              'Regelmessig testing av gjenoppretting',
              'Rask RTO og RPO',
              'Dokumenterte DR-planer',
            ]),
          },
          {
            language: 'en',
            title: 'Backup & Disaster Recovery',
            description:
              'Protection of your critical data with automated backup solutions and well-thought-out recovery plans.',
            features: JSON.stringify([
              'Automated cloud backup',
              'Local and offsite storage',
              'Regular recovery testing',
              'Fast RTO and RPO',
              'Documented DR plans',
            ]),
          },
        ],
      },
    },
  });

  const cloudAdmin = await prisma.service.create({
    data: {
      slug: 'microsoft-365-google-workspace',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Cloud',
      sortOrder: 5,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Microsoft 365 & Google Workspace',
            description:
              'Full administrasjon av skybaserte produktivitetsverktøy. Vi optimaliserer bruken og sikkerheten i din organisasjon.',
            features: JSON.stringify([
              'Brukeradministrasjon',
              'E-post og kalender oppsett',
              'SharePoint/Drive konfigurasjon',
              'Teams/Meet implementering',
              'Lisenshåndtering',
            ]),
          },
          {
            language: 'en',
            title: 'Microsoft 365 & Google Workspace',
            description:
              'Full administration of cloud-based productivity tools. We optimize usage and security in your organization.',
            features: JSON.stringify([
              'User administration',
              'Email and calendar setup',
              'SharePoint/Drive configuration',
              'Teams/Meet implementation',
              'License management',
            ]),
          },
        ],
      },
    },
  });

  const wifi = await prisma.service.create({
    data: {
      slug: 'wifi-installations',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Wifi',
      sortOrder: 6,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Wi-Fi Installasjoner',
            description:
              'Profesjonelle trådløse nettverk for kontor, lager og uteområder. Vi leverer stabil dekning overalt.',
            features: JSON.stringify([
              'Site survey og planlegging',
              'Enterprise-grade utstyr',
              'Gjestenettverket',
              'Sømløs roaming',
              'Kapasitetsplanlegging',
            ]),
          },
          {
            language: 'en',
            title: 'Wi-Fi Installations',
            description:
              'Professional wireless networks for office, warehouse and outdoor areas. We deliver stable coverage everywhere.',
            features: JSON.stringify([
              'Site survey and planning',
              'Enterprise-grade equipment',
              'Guest network',
              'Seamless roaming',
              'Capacity planning',
            ]),
          },
        ],
      },
    },
  });

  const voip = await prisma.service.create({
    data: {
      slug: 'voip-systems',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Phone',
      sortOrder: 7,
      translations: {
        create: [
          {
            language: 'no',
            title: 'VoIP Telefonsystemer',
            description:
              'Moderne telefonløsninger som reduserer kostnader og øker fleksibiliteten. Perfekt for hybride arbeidsmiljøer.',
            features: JSON.stringify([
              'Skybasert telefoni',
              'Teams/Zoom-integrasjon',
              'Automatisk sentralbord',
              'Samtalerapportering',
              'Mobil-app for fjernarbeid',
            ]),
          },
          {
            language: 'en',
            title: 'VoIP Phone Systems',
            description:
              'Modern telephony solutions that reduce costs and increase flexibility. Perfect for hybrid work environments.',
            features: JSON.stringify([
              'Cloud-based telephony',
              'Teams/Zoom integration',
              'Auto attendant',
              'Call reporting',
              'Mobile app for remote work',
            ]),
          },
        ],
      },
    },
  });

  const boardRepair = await prisma.service.create({
    data: {
      slug: 'board-level-repair',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Cpu',
      sortOrder: 8,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Hovedkort-reparasjon',
            description:
              'Avansert komponentnivå-reparasjon som sparer deg for kostbar utskifting. Vi fikser det andre ikke kan.',
            features: JSON.stringify([
              'Diagnose av komplekse feil',
              'SMD-lodding',
              'GPU-reball og reballing',
              'Strømkrets-reparasjon',
              'Laptop og desktop',
            ]),
          },
          {
            language: 'en',
            title: 'Board-Level Repair',
            description:
              'Advanced component-level repair that saves you from costly replacement. We fix what others cannot.',
            features: JSON.stringify([
              'Complex fault diagnosis',
              'SMD soldering',
              'GPU reball and reballing',
              'Power circuit repair',
              'Laptop and desktop',
            ]),
          },
        ],
      },
    },
  });

  const microsoldering = await prisma.service.create({
    data: {
      slug: 'microsoldering',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Microscope',
      sortOrder: 9,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Mikrolodding',
            description:
              'Presisjonslodding for mobiltelefoner og små enheter. Reparasjon av ladekontakter, audio-chips og mer.',
            features: JSON.stringify([
              'iPhone og Android-reparasjoner',
              'Ladekontakt-utskifting',
              'Audio IC-reparasjon',
              'Touch IC-reparasjon',
              'Komponent-utskifting',
            ]),
          },
          {
            language: 'en',
            title: 'Microsoldering',
            description:
              'Precision soldering for mobile phones and small devices. Repair of charging ports, audio chips and more.',
            features: JSON.stringify([
              'iPhone and Android repairs',
              'Charging port replacement',
              'Audio IC repair',
              'Touch IC repair',
              'Component replacement',
            ]),
          },
        ],
      },
    },
  });

  const liquidDamage = await prisma.service.create({
    data: {
      slug: 'liquid-damage-recovery',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Droplets',
      sortOrder: 10,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Væskeskade-gjenoppretting',
            description:
              'Profesjonell behandling av væskeskadede enheter. Rask respons er nøkkelen til vellykket gjenoppretting.',
            features: JSON.stringify([
              'Ultralydrengjøring',
              'Korrosjonsbehandling',
              'Komponentdiagnose',
              'Reparasjon av skadede kretser',
              'Data-gjenoppretting',
            ]),
          },
          {
            language: 'en',
            title: 'Liquid Damage Recovery',
            description:
              'Professional treatment of liquid-damaged devices. Quick response is key to successful recovery.',
            features: JSON.stringify([
              'Ultrasonic cleaning',
              'Corrosion treatment',
              'Component diagnostics',
              'Damaged circuit repair',
              'Data recovery',
            ]),
          },
        ],
      },
    },
  });

  const dataRecovery = await prisma.service.create({
    data: {
      slug: 'data-recovery',
      category: ServiceCategory.MANAGED_IT,
      icon: 'Database',
      sortOrder: 11,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Datagjenoppretting',
            description:
              'Gjenoppretting av tapte data fra harddisker, SSD-er, minnekort og andre lagringsmedier. Konfidensielt og sikkert.',
            features: JSON.stringify([
              'HDD og SSD-gjenoppretting',
              'RAID-rekonstruksjon',
              'Minnekort og USB-gjenoppretting',
              'Kryptert data',
              'Konfidensialitetsgaranti',
            ]),
          },
          {
            language: 'en',
            title: 'Data Recovery',
            description:
              'Recovery of lost data from hard drives, SSDs, memory cards and other storage media. Confidential and secure.',
            features: JSON.stringify([
              'HDD and SSD recovery',
              'RAID reconstruction',
              'Memory card and USB recovery',
              'Encrypted data',
              'Confidentiality guarantee',
            ]),
          },
        ],
      },
    },
  });

  // ============================================
  // PRODUCT STUDIO SERVICES
  // ============================================

  const webDev = await prisma.service.create({
    data: {
      slug: 'website-development',
      category: ServiceCategory.PRODUCT_STUDIO,
      icon: 'Globe',
      sortOrder: 1,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Nettstedsutvikling',
            description:
              'Skreddersydde nettsider som konverterer besøkende til kunder. Moderne design, rask ytelse og SEO-optimalisert.',
            features: JSON.stringify([
              'Responsivt design',
              'CMS-integrasjon',
              'SEO-optimalisering',
              'Ytelsesoptimalisering',
              'WCAG-tilgjengelighet',
            ]),
          },
          {
            language: 'en',
            title: 'Website Development',
            description:
              'Custom websites that convert visitors into customers. Modern design, fast performance and SEO optimized.',
            features: JSON.stringify([
              'Responsive design',
              'CMS integration',
              'SEO optimization',
              'Performance optimization',
              'WCAG accessibility',
            ]),
          },
        ],
      },
    },
  });

  const ecommerce = await prisma.service.create({
    data: {
      slug: 'ecommerce-solutions',
      category: ServiceCategory.PRODUCT_STUDIO,
      icon: 'ShoppingCart',
      sortOrder: 2,
      translations: {
        create: [
          {
            language: 'no',
            title: 'E-handelsløsninger',
            description:
              'Komplette nettbutikkløsninger med Vipps, Klarna og Bring-integrasjon. Skalerbare plattformer for vekst.',
            features: JSON.stringify([
              'Vipps og Klarna-betaling',
              'Bring-frakt integrasjon',
              'Lagerstyring',
              'Ordrehåndtering',
              'Kundeportal',
            ]),
          },
          {
            language: 'en',
            title: 'E-commerce Solutions',
            description:
              'Complete online store solutions with Vipps, Klarna and Bring integration. Scalable platforms for growth.',
            features: JSON.stringify([
              'Vipps and Klarna payment',
              'Bring shipping integration',
              'Inventory management',
              'Order handling',
              'Customer portal',
            ]),
          },
        ],
      },
    },
  });

  const mobileApps = await prisma.service.create({
    data: {
      slug: 'mobile-app-development',
      category: ServiceCategory.PRODUCT_STUDIO,
      icon: 'Smartphone',
      sortOrder: 3,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Mobilapp-utvikling',
            description:
              'Native og cross-platform mobilapper for iOS og Android. Fra idé til lansering i App Store og Google Play.',
            features: JSON.stringify([
              'iOS og Android',
              'React Native / Flutter',
              'UX/UI-design',
              'Backend-integrasjon',
              'App Store-lansering',
            ]),
          },
          {
            language: 'en',
            title: 'Mobile App Development',
            description:
              'Native and cross-platform mobile apps for iOS and Android. From idea to launch in App Store and Google Play.',
            features: JSON.stringify([
              'iOS and Android',
              'React Native / Flutter',
              'UX/UI design',
              'Backend integration',
              'App Store launch',
            ]),
          },
        ],
      },
    },
  });

  const integrations = await prisma.service.create({
    data: {
      slug: 'system-integrations',
      category: ServiceCategory.PRODUCT_STUDIO,
      icon: 'Link',
      sortOrder: 4,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Systemintegrasjoner',
            description:
              'Koble sammen dine forretningssystemer for effektiv dataflyt. API-utvikling og integrasjon med norske tjenester.',
            features: JSON.stringify([
              'API-utvikling',
              'Altinn-integrasjon',
              'ERP-koblinger',
              'CRM-integrasjon',
              'Automatisering',
            ]),
          },
          {
            language: 'en',
            title: 'System Integrations',
            description:
              'Connect your business systems for efficient data flow. API development and integration with Norwegian services.',
            features: JSON.stringify([
              'API development',
              'Altinn integration',
              'ERP connections',
              'CRM integration',
              'Automation',
            ]),
          },
        ],
      },
    },
  });

  const aiAutomation = await prisma.service.create({
    data: {
      slug: 'ai-assistants-automation',
      category: ServiceCategory.PRODUCT_STUDIO,
      icon: 'Bot',
      sortOrder: 5,
      translations: {
        create: [
          {
            language: 'no',
            title: 'AI-assistenter & Automatisering',
            description:
              'Intelligente løsninger som effektiviserer arbeidsprosesser. Chatbots, dokumentbehandling og workflow-automatisering.',
            features: JSON.stringify([
              'AI-chatbots',
              'Dokumentklassifisering',
              'Workflow-automatisering',
              'NLP-løsninger',
              'Machine Learning',
            ]),
          },
          {
            language: 'en',
            title: 'AI Assistants & Automation',
            description:
              'Intelligent solutions that streamline work processes. Chatbots, document processing and workflow automation.',
            features: JSON.stringify([
              'AI chatbots',
              'Document classification',
              'Workflow automation',
              'NLP solutions',
              'Machine Learning',
            ]),
          },
        ],
      },
    },
  });

  const cloudHosting = await prisma.service.create({
    data: {
      slug: 'cloud-hosting-devops',
      category: ServiceCategory.PRODUCT_STUDIO,
      icon: 'Server',
      sortOrder: 6,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Skyhosting & DevOps',
            description:
              'Skalerbar infrastruktur i Azure, AWS eller Google Cloud. CI/CD-pipelines og automatisert deployment.',
            features: JSON.stringify([
              'Azure / AWS / GCP',
              'Kubernetes',
              'CI/CD pipelines',
              'Infrastructure as Code',
              'Overvåking og logging',
            ]),
          },
          {
            language: 'en',
            title: 'Cloud Hosting & DevOps',
            description:
              'Scalable infrastructure in Azure, AWS or Google Cloud. CI/CD pipelines and automated deployment.',
            features: JSON.stringify([
              'Azure / AWS / GCP',
              'Kubernetes',
              'CI/CD pipelines',
              'Infrastructure as Code',
              'Monitoring and logging',
            ]),
          },
        ],
      },
    },
  });

  // ============================================
  // SECURITY & COMPLIANCE SERVICES
  // ============================================

  const securityAssessments = await prisma.service.create({
    data: {
      slug: 'security-assessments',
      category: ServiceCategory.SECURITY,
      icon: 'Shield',
      sortOrder: 1,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Sikkerhetsvurderinger',
            description:
              'Grundig analyse av din IT-sikkerhet med praktiske anbefalinger. Identifiser sårbarheter før angripere gjør det.',
            features: JSON.stringify([
              'Risikovurdering',
              'Gap-analyse',
              'Penetrasjonstesting',
              'Sosial manipulering-test',
              'Handlingsplan',
            ]),
          },
          {
            language: 'en',
            title: 'Security Assessments',
            description:
              'Thorough analysis of your IT security with practical recommendations. Identify vulnerabilities before attackers do.',
            features: JSON.stringify([
              'Risk assessment',
              'Gap analysis',
              'Penetration testing',
              'Social engineering test',
              'Action plan',
            ]),
          },
        ],
      },
    },
  });

  const systemHardening = await prisma.service.create({
    data: {
      slug: 'system-hardening-monitoring',
      category: ServiceCategory.SECURITY,
      icon: 'Lock',
      sortOrder: 2,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Systemherding & Overvåking',
            description:
              'Sikre konfigurasjon av systemer og kontinuerlig overvåking for trusler. Defense-in-depth tilnærming.',
            features: JSON.stringify([
              'CIS Benchmarks',
              'Konfigurasjonshåndtering',
              'SIEM-oppsett',
              'Anomali-deteksjon',
              'Hendelsesrespons',
            ]),
          },
          {
            language: 'en',
            title: 'System Hardening & Monitoring',
            description:
              'Secure configuration of systems and continuous monitoring for threats. Defense-in-depth approach.',
            features: JSON.stringify([
              'CIS Benchmarks',
              'Configuration management',
              'SIEM setup',
              'Anomaly detection',
              'Incident response',
            ]),
          },
        ],
      },
    },
  });

  const endpointProtection = await prisma.service.create({
    data: {
      slug: 'endpoint-protection-mdm',
      category: ServiceCategory.SECURITY,
      icon: 'ShieldCheck',
      sortOrder: 3,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Endepunktbeskyttelse & MDM',
            description:
              'Omfattende beskyttelse av alle enheter med moderne EDR og mobile device management.',
            features: JSON.stringify([
              'EDR/XDR-løsninger',
              'Mobile Device Management',
              'Application whitelisting',
              'Disk-kryptering',
              'USB-kontroll',
            ]),
          },
          {
            language: 'en',
            title: 'Endpoint Protection & MDM',
            description:
              'Comprehensive protection of all devices with modern EDR and mobile device management.',
            features: JSON.stringify([
              'EDR/XDR solutions',
              'Mobile Device Management',
              'Application whitelisting',
              'Disk encryption',
              'USB control',
            ]),
          },
        ],
      },
    },
  });

  const vulnScanning = await prisma.service.create({
    data: {
      slug: 'vulnerability-scanning',
      category: ServiceCategory.SECURITY,
      icon: 'Search',
      sortOrder: 4,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Sårbarhetsskanning',
            description:
              'Automatisert og manuell identifisering av sikkerhetshull i infrastruktur og applikasjoner.',
            features: JSON.stringify([
              'Nettverksskanning',
              'Applikasjonsskanning',
              'Konfigurasjonskontroll',
              'Rapportering med prioritering',
              'Remediation-støtte',
            ]),
          },
          {
            language: 'en',
            title: 'Vulnerability Scanning',
            description:
              'Automated and manual identification of security holes in infrastructure and applications.',
            features: JSON.stringify([
              'Network scanning',
              'Application scanning',
              'Configuration review',
              'Prioritized reporting',
              'Remediation support',
            ]),
          },
        ],
      },
    },
  });

  const securityTraining = await prisma.service.create({
    data: {
      slug: 'security-awareness-training',
      category: ServiceCategory.SECURITY,
      icon: 'GraduationCap',
      sortOrder: 5,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Sikkerhetsopplæring',
            description:
              'Bygg en sikker bedriftskultur med engasjerende opplæring og phishing-simuleringer.',
            features: JSON.stringify([
              'Interaktive kurs',
              'Phishing-simuleringer',
              'Rapportering per avdeling',
              'Kontinuerlig læring',
              'Sertifiseringsspor',
            ]),
          },
          {
            language: 'en',
            title: 'Security Awareness Training',
            description:
              'Build a secure corporate culture with engaging training and phishing simulations.',
            features: JSON.stringify([
              'Interactive courses',
              'Phishing simulations',
              'Department reporting',
              'Continuous learning',
              'Certification tracks',
            ]),
          },
        ],
      },
    },
  });

  const gdpr = await prisma.service.create({
    data: {
      slug: 'gdpr-guidance',
      category: ServiceCategory.SECURITY,
      icon: 'FileCheck',
      sortOrder: 6,
      translations: {
        create: [
          {
            language: 'no',
            title: 'GDPR-veiledning',
            description:
              'Praktisk veiledning for GDPR-etterlevelse tilpasset norske virksomheter. Fra kartlegging til implementering.',
            features: JSON.stringify([
              'Personvernskartlegging',
              'Databehandleravtaler',
              'Internkontroll',
              'Konsekvensvurdering (DPIA)',
              'Beredskapsplaner',
            ]),
          },
          {
            language: 'en',
            title: 'GDPR Guidance',
            description:
              'Practical guidance for GDPR compliance tailored to Norwegian businesses. From mapping to implementation.',
            features: JSON.stringify([
              'Privacy mapping',
              'Data processing agreements',
              'Internal controls',
              'Impact assessment (DPIA)',
              'Emergency plans',
            ]),
          },
        ],
      },
    },
  });

  const secureByDesign = await prisma.service.create({
    data: {
      slug: 'secure-by-design',
      category: ServiceCategory.SECURITY,
      icon: 'Code',
      sortOrder: 7,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Secure-by-Design Gjennomgang',
            description:
              'Sikkerhetsgjennomgang av kode og arkitektur. Bygg inn sikkerhet fra starten av utviklingsprosjekter.',
            features: JSON.stringify([
              'Kodegjennomgang',
              'Arkitekturanalyse',
              'OWASP-sjekkliste',
              'Threat modeling',
              'DevSecOps-rådgivning',
            ]),
          },
          {
            language: 'en',
            title: 'Secure-by-Design Review',
            description:
              'Security review of code and architecture. Build security in from the start of development projects.',
            features: JSON.stringify([
              'Code review',
              'Architecture analysis',
              'OWASP checklist',
              'Threat modeling',
              'DevSecOps consulting',
            ]),
          },
        ],
      },
    },
  });

  const incidentResponse = await prisma.service.create({
    data: {
      slug: 'incident-response',
      category: ServiceCategory.SECURITY,
      icon: 'AlertTriangle',
      sortOrder: 8,
      translations: {
        create: [
          {
            language: 'no',
            title: 'Hendelseshåndtering',
            description:
              'Forberedte playbooks og ekspertise for håndtering av sikkerhetsbrudd. Rask respons når det gjelder.',
            features: JSON.stringify([
              'Incident playbooks',
              'Forensisk analyse',
              'Kommunikasjonsplaner',
              'Gjenoppretting',
              'Post-mortem og læring',
            ]),
          },
          {
            language: 'en',
            title: 'Incident Response',
            description:
              'Prepared playbooks and expertise for handling security breaches. Fast response when it matters.',
            features: JSON.stringify([
              'Incident playbooks',
              'Forensic analysis',
              'Communication plans',
              'Recovery',
              'Post-mortem and learning',
            ]),
          },
        ],
      },
    },
  });

  const soc = await prisma.service.create({
    data: {
      slug: '24-7-soc',
      category: ServiceCategory.SECURITY,
      icon: 'Eye',
      sortOrder: 9,
      translations: {
        create: [
          {
            language: 'no',
            title: '24/7 SOC (Partnertjeneste)',
            description:
              'Døgnkontinuerlig sikkerhetsovervåking gjennom vårt partnernett. Enterprise-nivå sikkerhet for alle bedrifter.',
            features: JSON.stringify([
              '24/7/365 overvåking',
              'Trusselanalyse',
              'Proaktiv jakt',
              'Automatisert respons',
              'Månedlig rapportering',
            ]),
          },
          {
            language: 'en',
            title: '24/7 SOC (Partner Service)',
            description:
              'Round-the-clock security monitoring through our partner network. Enterprise-level security for all businesses.',
            features: JSON.stringify([
              '24/7/365 monitoring',
              'Threat analysis',
              'Proactive hunting',
              'Automated response',
              'Monthly reporting',
            ]),
          },
        ],
      },
    },
  });

  console.log('📦 Creating pricing packages...');

  // ============================================
  // PRICING PACKAGES
  // ============================================

  const corePackage = await prisma.package.create({
    data: {
      slug: 'core-it-care',
      priceMonthly: 299,
      isFeatured: false,
      sortOrder: 1,
      translations: {
        create: [
          {
            language: 'no',
            name: 'Core IT Care',
            description: 'Grunnleggende IT-støtte for små bedrifter',
            features: JSON.stringify([
              'Helpdesk 8×5',
              'Automatisk patching',
              'Antivirus/EDR',
              'M365/Google Workspace admin',
              'Systemovervåking',
              'Grunnleggende backup',
            ]),
          },
          {
            language: 'en',
            name: 'Core IT Care',
            description: 'Basic IT support for small businesses',
            features: JSON.stringify([
              'Helpdesk 8×5',
              'Automated patching',
              'Antivirus/EDR',
              'M365/Google Workspace admin',
              'System monitoring',
              'Basic backup',
            ]),
          },
        ],
      },
    },
  });

  const plusPackage = await prisma.package.create({
    data: {
      slug: 'it-care-plus',
      priceMonthly: 499,
      isFeatured: true,
      sortOrder: 2,
      translations: {
        create: [
          {
            language: 'no',
            name: 'IT Care Plus',
            description: 'Komplett IT-omsorg for voksende bedrifter',
            features: JSON.stringify([
              'Alt i Core IT Care',
              'Mobile Device Management (MDM)',
              'Avansert e-postsikkerhet',
              'Kvartalsvis vCIO-veikart',
              'On-site timer inkludert',
            ]),
          },
          {
            language: 'en',
            name: 'IT Care Plus',
            description: 'Complete IT care for growing businesses',
            features: JSON.stringify([
              'Everything in Core IT Care',
              'Mobile Device Management (MDM)',
              'Advanced email security',
              'Quarterly vCIO roadmap',
              'On-site hours included',
            ]),
          },
        ],
      },
    },
  });

  const premiumPackage = await prisma.package.create({
    data: {
      slug: 'it-care-premium',
      priceMonthly: 799,
      isFeatured: false,
      sortOrder: 3,
      translations: {
        create: [
          {
            language: 'no',
            name: 'IT Care Premium',
            description: 'Enterprise-nivå IT for ambisiøse bedrifter',
            features: JSON.stringify([
              'Alt i IT Care Plus',
              'Server- og nettverksadministrasjon',
              'Månedlige sikkerhetsskanninger',
              'Phishing-trening',
              'Årlig DR-test',
            ]),
          },
          {
            language: 'en',
            name: 'IT Care Premium',
            description: 'Enterprise-level IT for ambitious businesses',
            features: JSON.stringify([
              'Everything in IT Care Plus',
              'Server & network management',
              'Monthly security scans',
              'Phishing training',
              'Annual DR test',
            ]),
          },
        ],
      },
    },
  });

  console.log('⭐ Creating testimonials...');

  // ============================================
  // TESTIMONIALS
  // ============================================

  const testimonial1 = await prisma.testimonial.create({
    data: {
      authorName: 'Kristian Nilsen',
      authorRole: 'Daglig leder',
      company: 'Bergen Bygg AS',
      rating: 5,
      isFeatured: true,
      sortOrder: 1,
      createdBy: admin.id,
      translations: {
        create: [
          {
            language: 'no',
            content:
              'Nornex har transformert måten vi jobber på. Før brukte vi timer på IT-problemer, nå kan vi fokusere på kjernevirksomheten vår. Deres proaktive tilnærming har eliminert nesten alle uplanlagte nedetider.',
          },
          {
            language: 'en',
            content:
              'Nornex has transformed the way we work. We used to spend hours on IT problems, now we can focus on our core business. Their proactive approach has eliminated almost all unplanned downtime.',
          },
        ],
      },
    },
  });

  const testimonial2 = await prisma.testimonial.create({
    data: {
      authorName: 'Maria Johannessen',
      authorRole: 'CFO',
      company: 'Nordic Shipping Solutions',
      rating: 5,
      isFeatured: true,
      sortOrder: 2,
      createdBy: admin.id,
      translations: {
        create: [
          {
            language: 'no',
            content:
              'Overgangen til Microsoft 365 med Nornex gikk smidigere enn forventet. De håndterte alt fra planlegging til opplæring av ansatte. IT-kostnadene våre har gått ned 30% samtidig som produktiviteten har økt.',
          },
          {
            language: 'en',
            content:
              'The transition to Microsoft 365 with Nornex went smoother than expected. They handled everything from planning to employee training. Our IT costs have decreased by 30% while productivity has increased.',
          },
        ],
      },
    },
  });

  const testimonial3 = await prisma.testimonial.create({
    data: {
      authorName: 'Anders Pedersen',
      authorRole: 'Eier',
      company: 'Pedersen Elektro',
      rating: 5,
      isFeatured: true,
      sortOrder: 3,
      createdBy: admin.id,
      translations: {
        create: [
          {
            language: 'no',
            content:
              'Som en liten bedrift trengte vi en IT-partner som forsto våre behov uten å sprenge budsjettet. Nornex leverer enterprise-kvalitet til en pris vi har råd til. Anbefales på det sterkeste!',
          },
          {
            language: 'en',
            content:
              'As a small business, we needed an IT partner that understood our needs without breaking the budget. Nornex delivers enterprise quality at a price we can afford. Highly recommended!',
          },
        ],
      },
    },
  });

  const testimonial4 = await prisma.testimonial.create({
    data: {
      authorName: 'Silje Andersen',
      authorRole: 'IT-sjef',
      company: 'Vestland Helse',
      rating: 5,
      isFeatured: false,
      sortOrder: 4,
      createdBy: admin.id,
      translations: {
        create: [
          {
            language: 'no',
            content:
              'GDPR-veiledningen fra Nornex hjalp oss med å komme i compliance uten å måtte ansette egne eksperter. De forstår norske regler og bransjeveileder. En uvurderlig partner for helsesektoren.',
          },
          {
            language: 'en',
            content:
              'The GDPR guidance from Nornex helped us achieve compliance without having to hire in-house experts. They understand Norwegian regulations and industry guidelines. An invaluable partner for the healthcare sector.',
          },
        ],
      },
    },
  });

  console.log('📝 Creating blog posts...');

  // ============================================
  // BLOG TAGS
  // ============================================

  const tagSecurity = await prisma.blogTag.create({
    data: {
      slug: 'sikkerhet',
      nameNo: 'Sikkerhet',
      nameEn: 'Security',
    },
  });

  const tagCloud = await prisma.blogTag.create({
    data: {
      slug: 'sky',
      nameNo: 'Sky',
      nameEn: 'Cloud',
    },
  });

  const tagProductivity = await prisma.blogTag.create({
    data: {
      slug: 'produktivitet',
      nameNo: 'Produktivitet',
      nameEn: 'Productivity',
    },
  });

  const tagGdpr = await prisma.blogTag.create({
    data: {
      slug: 'gdpr',
      nameNo: 'GDPR',
      nameEn: 'GDPR',
    },
  });

  const tagMsp = await prisma.blogTag.create({
    data: {
      slug: 'msp',
      nameNo: 'Managed Services',
      nameEn: 'Managed Services',
    },
  });

  // ============================================
  // BLOG POSTS
  // ============================================

  const blogPost1 = await prisma.blogPost.create({
    data: {
      slug: '5-tegn-du-trenger-managed-it',
      authorId: editor.id,
      status: BlogPostStatus.PUBLISHED,
      publishedAt: new Date('2024-01-15'),
      translations: {
        create: [
          {
            language: 'no',
            title: '5 Tegn På At Bedriften Din Trenger Managed IT',
            excerpt:
              'Hvordan vet du når det er på tide å outsource IT-driften? Her er fem klare tegn på at bedriften din kan dra nytte av profesjonell IT-støtte.',
            content: `
## Innledning

IT-infrastrukturen er ryggraden i enhver moderne bedrift. Men når blir det for mye å håndtere internt? Her er fem tegn på at det er på tide å vurdere managed IT-tjenester.

## 1. IT-problemene tar for mye tid

Bruker dine ansatte stadig mer tid på IT-relaterte oppgaver? Når tekniske problemer begynner å påvirke produktiviteten, er det et klart tegn på at profesjonell hjelp kan være verdt investeringen.

## 2. Sikkerhetshendelser øker

Ransomware, phishing og datainnbrudd rammer norske bedrifter daglig. Hvis du opplever flere sikkerhetshendelser eller er usikker på din nåværende beskyttelse, er det på høy tid å handle.

## 3. Budsjettet sprenger rammene

Uforutsigbare IT-kostnader kan være et stort problem for planleggingen. Med en fast månedlig avgift får du forutsigbarhet og ofte lavere totalkostnader.

## 4. Du mangler kompetanse

IT-landskapet utvikler seg raskt. Uten dedikerte IT-ressurser kan det være vanskelig å holde følge med nye trusler, teknologier og beste praksiser.

## 5. Veksten krever mer

Hvis bedriften vokser, vil IT-behovene også vokse. Managed IT skalerer enkelt med virksomheten din.

## Konklusjon

Gjenkjenner du noen av disse tegnene? Ta kontakt med oss for en uforpliktende IT-gjennomgang av din bedrift.
            `.trim(),
            metaTitle: '5 Tegn På At Bedriften Din Trenger Managed IT | Nornex AS',
            metaDesc:
              'Lær å gjenkjenne tegnene på at bedriften din trenger profesjonell IT-støtte. Nornex AS hjelper norske bedrifter med managed IT-tjenester.',
          },
          {
            language: 'en',
            title: '5 Signs Your Business Needs Managed IT',
            excerpt:
              'How do you know when it\'s time to outsource IT operations? Here are five clear signs that your business could benefit from professional IT support.',
            content: `
## Introduction

IT infrastructure is the backbone of any modern business. But when does it become too much to handle internally? Here are five signs that it's time to consider managed IT services.

## 1. IT Problems Take Too Much Time

Are your employees spending increasingly more time on IT-related tasks? When technical issues start affecting productivity, it's a clear sign that professional help may be worth the investment.

## 2. Security Incidents Are Increasing

Ransomware, phishing and data breaches affect Norwegian businesses daily. If you're experiencing more security incidents or are unsure about your current protection, it's time to act.

## 3. Budget Is Bursting

Unpredictable IT costs can be a major planning problem. With a fixed monthly fee, you get predictability and often lower total costs.

## 4. You Lack Expertise

The IT landscape evolves rapidly. Without dedicated IT resources, it can be difficult to keep up with new threats, technologies and best practices.

## 5. Growth Demands More

If your business is growing, your IT needs will also grow. Managed IT scales easily with your business.

## Conclusion

Do you recognize any of these signs? Contact us for a free IT review of your business.
            `.trim(),
            metaTitle: '5 Signs Your Business Needs Managed IT | Nornex AS',
            metaDesc:
              'Learn to recognize the signs that your business needs professional IT support. Nornex AS helps Norwegian businesses with managed IT services.',
          },
        ],
      },
      tags: {
        create: [{ tagId: tagMsp.id }],
      },
    },
  });

  const blogPost2 = await prisma.blogPost.create({
    data: {
      slug: 'gdpr-sjekkliste-for-sma-bedrifter',
      authorId: editor.id,
      status: BlogPostStatus.PUBLISHED,
      publishedAt: new Date('2024-01-22'),
      translations: {
        create: [
          {
            language: 'no',
            title: 'GDPR-sjekkliste For Små og Mellomstore Bedrifter',
            excerpt:
              'GDPR gjelder alle som behandler personopplysninger. Her er en praktisk sjekkliste for å sikre at din bedrift er compliant.',
            content: `
## Om GDPR

Personvernforordningen (GDPR) trådte i kraft i 2018 og gjelder alle virksomheter som behandler personopplysninger om EU/EØS-borgere.

## Sjekkliste for GDPR-etterlevelse

### 1. Kartlegg personopplysninger
- [ ] Hvilke personopplysninger samler dere inn?
- [ ] Hvor lagres opplysningene?
- [ ] Hvem har tilgang til dem?
- [ ] Hvor lenge oppbevares de?

### 2. Ha gyldig behandlingsgrunnlag
- [ ] Samtykke
- [ ] Avtale
- [ ] Rettslig forpliktelse
- [ ] Vitale interesser
- [ ] Allmennhetens interesse
- [ ] Berettiget interesse

### 3. Informer de registrerte
- [ ] Personvernerklæring på nettsiden
- [ ] Informasjon ved innsamling
- [ ] Enkle innsynsprosedyrer

### 4. Sikre personopplysningene
- [ ] Tilgangskontroll
- [ ] Kryptering
- [ ] Backup-rutiner
- [ ] Avvikshåndtering

### 5. Dokumenter
- [ ] Protokoll over behandlingsaktiviteter
- [ ] Databehandleravtaler
- [ ] Risikovurderinger
- [ ] Internkontroll

## Nornex kan hjelpe

Vi tilbyr GDPR-veiledning tilpasset norske SMB-er. Ta kontakt for en uforpliktende samtale.
            `.trim(),
            metaTitle: 'GDPR-sjekkliste For SMB | Nornex AS',
            metaDesc:
              'Praktisk GDPR-sjekkliste for små og mellomstore bedrifter. Nornex AS hjelper norske virksomheter med personvern og compliance.',
          },
          {
            language: 'en',
            title: 'GDPR Checklist For Small and Medium Businesses',
            excerpt:
              'GDPR applies to everyone who processes personal data. Here is a practical checklist to ensure your business is compliant.',
            content: `
## About GDPR

The General Data Protection Regulation (GDPR) came into force in 2018 and applies to all businesses that process personal data about EU/EEA citizens.

## Checklist for GDPR Compliance

### 1. Map Personal Data
- [ ] What personal data do you collect?
- [ ] Where is the data stored?
- [ ] Who has access to it?
- [ ] How long is it retained?

### 2. Have Valid Legal Basis
- [ ] Consent
- [ ] Contract
- [ ] Legal obligation
- [ ] Vital interests
- [ ] Public interest
- [ ] Legitimate interest

### 3. Inform Data Subjects
- [ ] Privacy policy on website
- [ ] Information at collection
- [ ] Simple access procedures

### 4. Secure Personal Data
- [ ] Access control
- [ ] Encryption
- [ ] Backup routines
- [ ] Incident handling

### 5. Document
- [ ] Records of processing activities
- [ ] Data processing agreements
- [ ] Risk assessments
- [ ] Internal controls

## Nornex Can Help

We offer GDPR guidance tailored to Norwegian SMBs. Contact us for a non-binding conversation.
            `.trim(),
            metaTitle: 'GDPR Checklist For SMB | Nornex AS',
            metaDesc:
              'Practical GDPR checklist for small and medium businesses. Nornex AS helps Norwegian businesses with privacy and compliance.',
          },
        ],
      },
      tags: {
        create: [{ tagId: tagGdpr.id }, { tagId: tagSecurity.id }],
      },
    },
  });

  const blogPost3 = await prisma.blogPost.create({
    data: {
      slug: 'sikker-fjernarbeid-guide',
      authorId: admin.id,
      status: BlogPostStatus.PUBLISHED,
      publishedAt: new Date('2024-02-05'),
      translations: {
        create: [
          {
            language: 'no',
            title: 'Guide: Sikker Fjernarbeid for Bedrifter',
            excerpt:
              'Hybridarbeid er kommet for å bli. Her er våre anbefalinger for å sikre bedriften når ansatte jobber hjemmefra.',
            content: `
## Hybridarbeid Er Den Nye Normalen

Etter pandemien har fjernarbeid blitt en permanent del av arbeidslivet for mange. Dette gir fleksibilitet, men også nye sikkerhetsutfordringer.

## Sikkerhetsutfordringer

1. **Usikre hjemmenettverk** - Hjemmeruteren har sjelden samme sikkerhetsnivå som bedriftsnettverket
2. **Personlige enheter** - BYOD kan introdusere sårbarheter
3. **Phishing** - Økt risiko når ansatte er isolert
4. **Dataeksfiltrering** - Vanskeligere å kontrollere dataflyt

## Våre Anbefalinger

### Tekniske tiltak
- Bruk alltid VPN for tilgang til bedriftsressurser
- Implementer multifaktor-autentisering (MFA)
- Hold enheter oppdatert med automatisk patching
- Bruk EDR/MDM for å beskytte endepunkter
- Krypter alle bærbare enheter

### Organisatoriske tiltak
- Utvikle retningslinjer for hjemmekontor
- Gjennomfør regelmessig sikkerhetsopplæring
- Etabler klare prosedyrer for hendelsesrapportering
- Vurder sikkerhetsnivået på leverandører og verktøy

### For IT-avdelingen
- Overvåk for uvanlig atferd
- Test backup og gjenopprettingsprosedyrer
- Gjennomfør regelmessige sikkerhetsvurderinger
- Hold oversikt over alle enheter og brukere

## Nornex Fjernarbeids-pakke

Vi tilbyr en komplett løsning for sikker fjernarbeid inkludert VPN, MFA, EDR og opplæring. Kontakt oss for mer informasjon.
            `.trim(),
            metaTitle: 'Guide: Sikker Fjernarbeid | Nornex AS',
            metaDesc:
              'Lær hvordan du sikrer bedriften når ansatte jobber hjemmefra. Komplett guide fra Nornex AS.',
          },
          {
            language: 'en',
            title: 'Guide: Secure Remote Work for Businesses',
            excerpt:
              'Hybrid work is here to stay. Here are our recommendations for securing your business when employees work from home.',
            content: `
## Hybrid Work Is The New Normal

After the pandemic, remote work has become a permanent part of work life for many. This provides flexibility but also new security challenges.

## Security Challenges

1. **Insecure home networks** - Home routers rarely have the same security level as corporate networks
2. **Personal devices** - BYOD can introduce vulnerabilities
3. **Phishing** - Increased risk when employees are isolated
4. **Data exfiltration** - Harder to control data flow

## Our Recommendations

### Technical Measures
- Always use VPN for access to company resources
- Implement multi-factor authentication (MFA)
- Keep devices updated with automatic patching
- Use EDR/MDM to protect endpoints
- Encrypt all portable devices

### Organizational Measures
- Develop home office guidelines
- Conduct regular security training
- Establish clear incident reporting procedures
- Assess security level of vendors and tools

### For the IT Department
- Monitor for unusual behavior
- Test backup and recovery procedures
- Conduct regular security assessments
- Keep track of all devices and users

## Nornex Remote Work Package

We offer a complete solution for secure remote work including VPN, MFA, EDR and training. Contact us for more information.
            `.trim(),
            metaTitle: 'Guide: Secure Remote Work | Nornex AS',
            metaDesc:
              'Learn how to secure your business when employees work from home. Complete guide from Nornex AS.',
          },
        ],
      },
      tags: {
        create: [{ tagId: tagSecurity.id }, { tagId: tagProductivity.id }],
      },
    },
  });

  console.log('⚙️ Creating site settings...');

  // ============================================
  // SITE SETTINGS
  // ============================================

  await prisma.siteSetting.createMany({
    data: [
      {
        key: 'company_name',
        valueNo: 'Nornex AS',
        valueEn: 'Nornex AS',
        type: 'text',
      },
      {
        key: 'company_tagline',
        valueNo: 'Din IT-partner i Bergen',
        valueEn: 'Your IT Partner in Bergen',
        type: 'text',
      },
      {
        key: 'company_description',
        valueNo:
          'Nornex AS leverer profesjonelle IT-tjenester til bedrifter i hele Norge. Fra managed IT og sikkerhet til utvikling av nettsider og apper.',
        valueEn:
          'Nornex AS delivers professional IT services to businesses throughout Norway. From managed IT and security to website and app development.',
        type: 'text',
      },
      {
        key: 'contact_email',
        valueNo: 'post@nornex.no',
        valueEn: 'post@nornex.no',
        type: 'text',
      },
      {
        key: 'contact_phone',
        valueNo: '+47 55 55 55 55',
        valueEn: '+47 55 55 55 55',
        type: 'text',
      },
      {
        key: 'address',
        valueNo: 'Strandgaten 123, 5004 Bergen, Norge',
        valueEn: 'Strandgaten 123, 5004 Bergen, Norway',
        type: 'text',
      },
      {
        key: 'org_number',
        valueNo: '123 456 789 MVA',
        valueEn: 'Org. no: 123 456 789',
        type: 'text',
      },
      {
        key: 'hero_title',
        valueNo: 'IT-løsninger som driver din bedrift fremover',
        valueEn: 'IT Solutions That Drive Your Business Forward',
        type: 'text',
      },
      {
        key: 'hero_subtitle',
        valueNo:
          'Fra proaktiv IT-drift til skreddersydde digitale løsninger. Vi er din pålitelige IT-partner i Bergen.',
        valueEn:
          'From proactive IT operations to custom digital solutions. We are your reliable IT partner in Bergen.',
        type: 'text',
      },
    ],
  });

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Users: 2 (admin@nornex.no / admin123)`);
  console.log(`   Services: 20+`);
  console.log(`   Packages: 3`);
  console.log(`   Testimonials: 4`);
  console.log(`   Blog Posts: 3`);
  console.log(`   Blog Tags: 5`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
