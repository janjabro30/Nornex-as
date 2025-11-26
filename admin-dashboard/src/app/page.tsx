/**
 * NORNEX AS - Public Homepage (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import Link from 'next/link';
import {
  Server,
  Shield,
  Cloud,
  Lock,
  Laptop,
  Network,
  Database,
  Cpu,
  Settings,
  Code,
  HardDrive,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Award,
  Wrench,
  Globe,
  Smartphone,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

const heroIcons = [
  { Icon: Server, color: 'from-blue-500 to-blue-600' },
  { Icon: Shield, color: 'from-green-500 to-green-600' },
  { Icon: Cloud, color: 'from-purple-500 to-purple-600' },
  { Icon: Lock, color: 'from-red-500 to-red-600' },
  { Icon: Laptop, color: 'from-orange-500 to-orange-600' },
  { Icon: Network, color: 'from-cyan-500 to-cyan-600' },
  { Icon: Database, color: 'from-indigo-500 to-indigo-600' },
  { Icon: Cpu, color: 'from-pink-500 to-pink-600' },
  { Icon: Settings, color: 'from-amber-500 to-amber-600' },
  { Icon: Code, color: 'from-teal-500 to-teal-600' },
  { Icon: HardDrive, color: 'from-violet-500 to-violet-600' },
  { Icon: Headphones, color: 'from-emerald-500 to-emerald-600' },
];

const services = [
  {
    title: 'Managed IT',
    description: 'Komplett IT-drift og vedlikehold for din bedrift',
    icon: Server,
    href: '/tjenester/managed-it',
    color: 'blue',
  },
  {
    title: 'IT-sikkerhet',
    description: 'Beskytt bedriften mot cybertrusler og datainnbrudd',
    icon: Shield,
    href: '/tjenester/it-sikkerhet',
    color: 'green',
  },
  {
    title: 'Skyløsninger',
    description: 'Moderne skytjenester for fleksibilitet og skalerbarhet',
    icon: Cloud,
    href: '/tjenester/skylosninger',
    color: 'purple',
  },
  {
    title: '24/7 Support',
    description: 'Hjelp når du trenger det - døgnet rundt',
    icon: Headphones,
    href: '/tjenester/support',
    color: 'orange',
  },
  {
    title: 'Reparasjon',
    description: 'Profesjonell reparasjon av datautstyr',
    icon: Wrench,
    href: '/tjenester/reparasjon',
    color: 'red',
  },
  {
    title: 'Webutvikling',
    description: 'Moderne nettsider og webapplikasjoner',
    icon: Globe,
    href: '/tjenester/nettside-utvikling',
    color: 'cyan',
  },
];

const trustIndicators = [
  { value: '500+', label: 'Fornøyde kunder', icon: Users },
  { value: '24/7', label: 'Support', icon: Clock },
  { value: 'ISO', label: 'Sertifisert', icon: Award },
];

const valueProps = [
  { title: 'Lokalt i Oslo', description: 'Vi er nær deg og kan komme på besøk' },
  { title: 'Fast pris', description: 'Ingen overraskelser på fakturaen' },
  { title: 'Norsk support', description: 'Snakk med oss på ditt språk' },
  { title: 'Rask respons', description: 'Kritiske saker løses innen 15 minutter' },
  { title: 'Erfaring', description: 'Over 10 års erfaring med IT-tjenester' },
  { title: 'Garanti', description: 'Vi står bak arbeidet vårt' },
];

const stats = [
  { value: '98%', label: 'Kundetilfredshet' },
  { value: '15 min', label: 'Gjennomsnittlig responstid' },
  { value: '10+', label: 'År i bransjen' },
  { value: '1000+', label: 'Løste saker per år' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Din partner for{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  profesjonelle IT-tjenester
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-xl">
                NORNEX AS tilbyr komplette IT-løsninger for bedrifter i Oslo og omegn. 
                Fra 24/7 support til skymigrering – vi har ekspertisen du trenger.
              </p>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap gap-6">
                {trustIndicators.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{item.value}</div>
                        <div className="text-sm text-slate-400">{item.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/tjenester"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Se våre tjenester
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Kontakt oss
                </Link>
              </div>
            </div>

            {/* Right Side - Icon Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-4 gap-4">
                {heroIcons.map((item, index) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={index}
                      className={`
                        flex h-20 w-20 items-center justify-center rounded-2xl
                        bg-gradient-to-br ${item.color} text-white shadow-lg
                        transform hover:scale-110 transition-transform duration-300
                        ${index % 2 === 0 ? 'translate-y-4' : ''}
                      `}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Våre tjenester
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Vi tilbyr et bredt spekter av IT-tjenester tilpasset din bedrifts behov.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`
                    flex h-14 w-14 items-center justify-center rounded-xl
                    bg-${service.color}-100 text-${service.color}-600
                    group-hover:bg-${service.color}-600 group-hover:text-white
                    transition-colors duration-300
                  `}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    Les mer <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/tjenester"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
            >
              Se alle tjenester <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Hvorfor velge NORNEX?
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Vi leverer kvalitet og pålitelighet i alt vi gjør.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="flex items-start gap-4 p-6 rounded-xl bg-slate-50"
              >
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">{prop.title}</h3>
                  <p className="mt-1 text-slate-600">{prop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Klar til å ta IT-en din til neste nivå?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Kontakt oss for en gratis konsultasjon og få et tilpasset tilbud.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Få gratis tilbud
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/nettbutikk"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Se nettbutikk
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
