/**
 * NORNEX AS - Services Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import Link from 'next/link';
import {
  Server,
  Shield,
  Cloud,
  Headphones,
  Laptop,
  Wrench,
  Globe,
  Smartphone,
  Code,
  Link as LinkIcon,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Shield,
  Cloud,
  Headphones,
  Laptop,
  Wrench,
  Globe,
  Smartphone,
  Code,
  Link: LinkIcon,
  Lightbulb,
};

const allServices = [
  {
    slug: 'managed-it',
    title: 'Managed IT',
    description: 'Komplett IT-drift og vedlikehold for din bedrift. Vi tar ansvar for hele din IT-infrastruktur.',
    icon: 'Server',
    color: 'blue',
  },
  {
    slug: 'it-sikkerhet',
    title: 'IT-sikkerhet',
    description: 'Beskytt bedriften mot cybertrusler og datainnbrudd med avanserte sikkerhetsløsninger.',
    icon: 'Shield',
    color: 'green',
  },
  {
    slug: 'skylosninger',
    title: 'Skyløsninger',
    description: 'Moderne skytjenester for fleksibilitet og skalerbarhet. Microsoft 365, Azure og mer.',
    icon: 'Cloud',
    color: 'purple',
  },
  {
    slug: 'support',
    title: '24/7 Support',
    description: 'Hjelp når du trenger det - døgnet rundt. Telefon, e-post og chat-support.',
    icon: 'Headphones',
    color: 'orange',
  },
  {
    slug: 'hardware',
    title: 'Hardware',
    description: 'Kvalitetsutstyr fra ledende produsenter med full garanti og support.',
    icon: 'Laptop',
    color: 'indigo',
  },
  {
    slug: 'reparasjon',
    title: 'Reparasjon',
    description: 'Profesjonell reparasjon av PC, Mac, mobil og nettbrett. Gratis diagnose.',
    icon: 'Wrench',
    color: 'red',
  },
  {
    slug: 'nettside-utvikling',
    title: 'Nettside-utvikling',
    description: 'Moderne og responsive nettsider som konverterer besøkende til kunder.',
    icon: 'Globe',
    color: 'cyan',
  },
  {
    slug: 'app-utvikling',
    title: 'App-utvikling',
    description: 'Native og hybrid mobilapper for iOS og Android som engasjerer brukerne.',
    icon: 'Smartphone',
    color: 'pink',
  },
  {
    slug: 'webapplikasjoner',
    title: 'Webapplikasjoner',
    description: 'Skreddersydde bedriftsløsninger som effektiviserer din virksomhet.',
    icon: 'Code',
    color: 'violet',
  },
  {
    slug: 'api-integrasjoner',
    title: 'API-integrasjoner',
    description: 'Koble sammen dine systemer for sømløs dataflyt og automatisering.',
    icon: 'Link',
    color: 'teal',
  },
  {
    slug: 'konsultering',
    title: 'IT-konsultering',
    description: 'Strategisk rådgivning for din IT. IT-strategi og digitaliseringsprosjekter.',
    icon: 'Lightbulb',
    color: 'amber',
  },
];

const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-600' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', hover: 'hover:bg-cyan-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', hover: 'hover:bg-pink-600' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', hover: 'hover:bg-violet-600' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', hover: 'hover:bg-teal-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600', hover: 'hover:bg-amber-600' },
};

export default function TjenesterPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Våre tjenester
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            NORNEX AS tilbyr et komplett utvalg av IT-tjenester for bedrifter i alle størrelser. 
            Fra infrastruktur til utvikling – vi har ekspertisen du trenger.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service) => {
              const Icon = iconMap[service.icon];
              const colors = colorClasses[service.color];
              return (
                <Link
                  key={service.slug}
                  href={`/tjenester/${service.slug}`}
                  className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`
                    flex h-14 w-14 items-center justify-center rounded-xl
                    ${colors.bg} ${colors.text}
                    group-hover:bg-blue-600 group-hover:text-white
                    transition-colors duration-300
                  `}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-slate-600 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    Les mer <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Usikker på hva du trenger?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Vi hjelper deg med å finne den beste løsningen for din bedrift. 
            Book en gratis konsultasjon med en av våre eksperter.
          </p>
          <div className="mt-8">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Få gratis rådgivning
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
