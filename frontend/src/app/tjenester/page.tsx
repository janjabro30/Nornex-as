'use client';

import {
  Monitor,
  Headphones,
  Network,
  HardDrive,
  Cloud,
  Wifi,
  Phone,
  Cpu,
  Microscope,
  Droplets,
  Database,
  Globe,
  ShoppingCart,
  Smartphone,
  Link as LinkIcon,
  Bot,
  Server,
  Shield,
  Lock,
  ShieldCheck,
  Search,
  GraduationCap,
  FileCheck,
  Code,
  AlertTriangle,
  Eye,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Monitor,
  Headphones,
  Network,
  HardDrive,
  Cloud,
  Wifi,
  Phone,
  Cpu,
  Microscope,
  Droplets,
  Database,
  Globe,
  ShoppingCart,
  Smartphone,
  Link: LinkIcon,
  Bot,
  Server,
  Shield,
  Lock,
  ShieldCheck,
  Search,
  GraduationCap,
  FileCheck,
  Code,
  AlertTriangle,
  Eye,
};

// Static service data
const servicesData = {
  'MANAGED_IT': {
    labelNo: 'Managed IT & Reparasjon',
    labelEn: 'Managed IT & Repair',
    descNo: 'Proaktiv IT-drift, support og avansert reparasjon av elektronikk.',
    descEn: 'Proactive IT operations, support and advanced electronics repair.',
    color: 'blue',
    services: [
      {
        slug: 'managed-endpoints',
        icon: 'Monitor',
        titleNo: 'Administrerte Endepunkter & Servere',
        titleEn: 'Managed Endpoints & Servers',
        descNo: 'Proaktiv overvåking og administrasjon av alle dine enheter.',
        descEn: 'Proactive monitoring and management of all your devices.',
      },
      {
        slug: 'helpdesk-support',
        icon: 'Headphones',
        titleNo: 'Helpdesk Support',
        titleEn: 'Helpdesk Support',
        descNo: 'Profesjonell IT-støtte når du trenger det.',
        descEn: 'Professional IT support when you need it.',
      },
      {
        slug: 'networking-infrastructure',
        icon: 'Network',
        titleNo: 'Nettverk & Infrastruktur',
        titleEn: 'Networking & Infrastructure',
        descNo: 'Design, implementering og vedlikehold av robuste nettverksløsninger.',
        descEn: 'Design, implementation and maintenance of robust network solutions.',
      },
      {
        slug: 'backup-disaster-recovery',
        icon: 'HardDrive',
        titleNo: 'Backup & Disaster Recovery',
        titleEn: 'Backup & Disaster Recovery',
        descNo: 'Beskyttelse av dine kritiske data med automatiserte backupløsninger.',
        descEn: 'Protection of your critical data with automated backup solutions.',
      },
      {
        slug: 'microsoft-365-google-workspace',
        icon: 'Cloud',
        titleNo: 'Microsoft 365 & Google Workspace',
        titleEn: 'Microsoft 365 & Google Workspace',
        descNo: 'Full administrasjon av skybaserte produktivitetsverktøy.',
        descEn: 'Full administration of cloud-based productivity tools.',
      },
      {
        slug: 'wifi-installations',
        icon: 'Wifi',
        titleNo: 'Wi-Fi Installasjoner',
        titleEn: 'Wi-Fi Installations',
        descNo: 'Profesjonelle trådløse nettverk for kontor, lager og uteområder.',
        descEn: 'Professional wireless networks for office, warehouse and outdoor areas.',
      },
      {
        slug: 'voip-systems',
        icon: 'Phone',
        titleNo: 'VoIP Telefonsystemer',
        titleEn: 'VoIP Phone Systems',
        descNo: 'Moderne telefonløsninger som reduserer kostnader.',
        descEn: 'Modern telephony solutions that reduce costs.',
      },
      {
        slug: 'board-level-repair',
        icon: 'Cpu',
        titleNo: 'Hovedkort-reparasjon',
        titleEn: 'Board-Level Repair',
        descNo: 'Avansert komponentnivå-reparasjon som sparer deg for kostbar utskifting.',
        descEn: 'Advanced component-level repair that saves you from costly replacement.',
      },
      {
        slug: 'microsoldering',
        icon: 'Microscope',
        titleNo: 'Mikrolodding',
        titleEn: 'Microsoldering',
        descNo: 'Presisjonslodding for mobiltelefoner og små enheter.',
        descEn: 'Precision soldering for mobile phones and small devices.',
      },
      {
        slug: 'liquid-damage-recovery',
        icon: 'Droplets',
        titleNo: 'Væskeskade-gjenoppretting',
        titleEn: 'Liquid Damage Recovery',
        descNo: 'Profesjonell behandling av væskeskadede enheter.',
        descEn: 'Professional treatment of liquid-damaged devices.',
      },
      {
        slug: 'data-recovery',
        icon: 'Database',
        titleNo: 'Datagjenoppretting',
        titleEn: 'Data Recovery',
        descNo: 'Gjenoppretting av tapte data fra harddisker, SSD-er og minnekort.',
        descEn: 'Recovery of lost data from hard drives, SSDs and memory cards.',
      },
    ],
  },
  'PRODUCT_STUDIO': {
    labelNo: 'Produktstudio',
    labelEn: 'Product Studio',
    descNo: 'Utvikling av nettsider, apper og systemintegrasjoner.',
    descEn: 'Development of websites, apps and system integrations.',
    color: 'purple',
    services: [
      {
        slug: 'website-development',
        icon: 'Globe',
        titleNo: 'Nettstedsutvikling',
        titleEn: 'Website Development',
        descNo: 'Skreddersydde nettsider som konverterer besøkende til kunder.',
        descEn: 'Custom websites that convert visitors into customers.',
      },
      {
        slug: 'ecommerce-solutions',
        icon: 'ShoppingCart',
        titleNo: 'E-handelsløsninger',
        titleEn: 'E-commerce Solutions',
        descNo: 'Komplette nettbutikkløsninger med Vipps, Klarna og Bring-integrasjon.',
        descEn: 'Complete online store solutions with Vipps, Klarna and Bring integration.',
      },
      {
        slug: 'mobile-app-development',
        icon: 'Smartphone',
        titleNo: 'Mobilapp-utvikling',
        titleEn: 'Mobile App Development',
        descNo: 'Native og cross-platform mobilapper for iOS og Android.',
        descEn: 'Native and cross-platform mobile apps for iOS and Android.',
      },
      {
        slug: 'system-integrations',
        icon: 'Link',
        titleNo: 'Systemintegrasjoner',
        titleEn: 'System Integrations',
        descNo: 'Koble sammen dine forretningssystemer for effektiv dataflyt.',
        descEn: 'Connect your business systems for efficient data flow.',
      },
      {
        slug: 'ai-assistants-automation',
        icon: 'Bot',
        titleNo: 'AI-assistenter & Automatisering',
        titleEn: 'AI Assistants & Automation',
        descNo: 'Intelligente løsninger som effektiviserer arbeidsprosesser.',
        descEn: 'Intelligent solutions that streamline work processes.',
      },
      {
        slug: 'cloud-hosting-devops',
        icon: 'Server',
        titleNo: 'Skyhosting & DevOps',
        titleEn: 'Cloud Hosting & DevOps',
        descNo: 'Skalerbar infrastruktur i Azure, AWS eller Google Cloud.',
        descEn: 'Scalable infrastructure in Azure, AWS or Google Cloud.',
      },
    ],
  },
  'SECURITY': {
    labelNo: 'Sikkerhet & Compliance',
    labelEn: 'Security & Compliance',
    descNo: 'Sikkerhetsvurderinger, GDPR-veiledning og overvåking.',
    descEn: 'Security assessments, GDPR guidance and monitoring.',
    color: 'green',
    services: [
      {
        slug: 'security-assessments',
        icon: 'Shield',
        titleNo: 'Sikkerhetsvurderinger',
        titleEn: 'Security Assessments',
        descNo: 'Grundig analyse av din IT-sikkerhet med praktiske anbefalinger.',
        descEn: 'Thorough analysis of your IT security with practical recommendations.',
      },
      {
        slug: 'system-hardening-monitoring',
        icon: 'Lock',
        titleNo: 'Systemherding & Overvåking',
        titleEn: 'System Hardening & Monitoring',
        descNo: 'Sikre konfigurasjon av systemer og kontinuerlig overvåking.',
        descEn: 'Secure configuration of systems and continuous monitoring.',
      },
      {
        slug: 'endpoint-protection-mdm',
        icon: 'ShieldCheck',
        titleNo: 'Endepunktbeskyttelse & MDM',
        titleEn: 'Endpoint Protection & MDM',
        descNo: 'Omfattende beskyttelse av alle enheter med moderne EDR.',
        descEn: 'Comprehensive protection of all devices with modern EDR.',
      },
      {
        slug: 'vulnerability-scanning',
        icon: 'Search',
        titleNo: 'Sårbarhetsskanning',
        titleEn: 'Vulnerability Scanning',
        descNo: 'Automatisert og manuell identifisering av sikkerhetshull.',
        descEn: 'Automated and manual identification of security holes.',
      },
      {
        slug: 'security-awareness-training',
        icon: 'GraduationCap',
        titleNo: 'Sikkerhetsopplæring',
        titleEn: 'Security Awareness Training',
        descNo: 'Bygg en sikker bedriftskultur med engasjerende opplæring.',
        descEn: 'Build a secure corporate culture with engaging training.',
      },
      {
        slug: 'gdpr-guidance',
        icon: 'FileCheck',
        titleNo: 'GDPR-veiledning',
        titleEn: 'GDPR Guidance',
        descNo: 'Praktisk veiledning for GDPR-etterlevelse tilpasset norske virksomheter.',
        descEn: 'Practical guidance for GDPR compliance tailored to Norwegian businesses.',
      },
      {
        slug: 'secure-by-design',
        icon: 'Code',
        titleNo: 'Secure-by-Design Gjennomgang',
        titleEn: 'Secure-by-Design Review',
        descNo: 'Sikkerhetsgjennomgang av kode og arkitektur.',
        descEn: 'Security review of code and architecture.',
      },
      {
        slug: 'incident-response',
        icon: 'AlertTriangle',
        titleNo: 'Hendelseshåndtering',
        titleEn: 'Incident Response',
        descNo: 'Forberedte playbooks og ekspertise for håndtering av sikkerhetsbrudd.',
        descEn: 'Prepared playbooks and expertise for handling security breaches.',
      },
      {
        slug: '24-7-soc',
        icon: 'Eye',
        titleNo: '24/7 SOC (Partnertjeneste)',
        titleEn: '24/7 SOC (Partner Service)',
        descNo: 'Døgnkontinuerlig sikkerhetsovervåking gjennom vårt partnernett.',
        descEn: 'Round-the-clock security monitoring through our partner network.',
      },
    ],
  },
};

const colorClasses: { [key: string]: { bg: string; text: string } } = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
};

export default function TjenesterPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {t.services.title}
          </h1>
          <p className="text-lg text-muted-foreground">{t.services.subtitle}</p>
        </div>

        {/* Service Categories */}
        {Object.entries(servicesData).map(([categoryKey, category]) => {
          const colors = colorClasses[category.color];
          return (
            <section key={categoryKey} id={categoryKey.toLowerCase().replace('_', '-')} className="mb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'en' ? category.labelEn : category.labelNo}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'en' ? category.descEn : category.descNo}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => {
                  const IconComponent = iconMap[service.icon] || Monitor;
                  return (
                    <Card key={service.slug} className="group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} mb-4`}
                        >
                          <IconComponent className={`h-6 w-6 ${colors.text}`} />
                        </div>
                        <CardTitle className="text-lg">
                          {language === 'en' ? service.titleEn : service.titleNo}
                        </CardTitle>
                        <CardDescription>
                          {language === 'en' ? service.descEn : service.descNo}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link
                          href={`/kontakt?service=${service.slug}`}
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          {t.services.learnMore}
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Finner du ikke det du leter etter?</h2>
          <p className="text-muted-foreground mb-6">
            Vi tilbyr skreddersydde løsninger for din bedrift. Ta kontakt for en uforpliktende samtale.
          </p>
          <Button size="lg" asChild>
            <Link href="/kontakt">
              {t.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
