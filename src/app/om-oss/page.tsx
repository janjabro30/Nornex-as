/**
 * NORNEX AS - About Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import Link from 'next/link';
import {
  Users,
  Target,
  Award,
  Heart,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

const stats = [
  { value: '10+', label: 'År i bransjen' },
  { value: '500+', label: 'Fornøyde kunder' },
  { value: '98%', label: 'Kundetilfredshet' },
  { value: '24/7', label: 'Support' },
];

const values = [
  {
    icon: Target,
    title: 'Kvalitet',
    description: 'Vi leverer alltid arbeid av høyeste kvalitet og står bak det vi gjør.',
  },
  {
    icon: Heart,
    title: 'Kundefokus',
    description: 'Våre kunder er vår viktigste prioritet. Vi lytter og tilpasser oss dine behov.',
  },
  {
    icon: Shield,
    title: 'Sikkerhet',
    description: 'Vi tar sikkerhet på alvor og beskytter dine data som om de var våre egne.',
  },
  {
    icon: Clock,
    title: 'Pålitelighet',
    description: 'Du kan stole på at vi er der når du trenger oss - 24 timer i døgnet.',
  },
];

const team = [
  { name: 'Erik Johansen', role: 'Daglig leder', initial: 'EJ' },
  { name: 'Maria Hansen', role: 'Teknisk sjef', initial: 'MH' },
  { name: 'Thomas Berg', role: 'Utviklingsleder', initial: 'TB' },
  { name: 'Kristin Olsen', role: 'Kundeansvarlig', initial: 'KO' },
];

export default function OmOssPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Om NORNEX AS
            </h1>
            <p className="mt-6 text-xl text-slate-300">
              Vi er et IT-selskap med base i Oslo som hjelper bedrifter med å utnytte 
              teknologi for å oppnå sine mål. Med over 10 års erfaring leverer vi 
              pålitelige IT-tjenester til små og mellomstore bedrifter.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Vår historie</h2>
              <div className="mt-6 space-y-4 text-slate-600">
                <p>
                  NORNEX AS ble grunnlagt med en enkel visjon: å gjøre IT enkelt og 
                  tilgjengelig for alle bedrifter, uavhengig av størrelse.
                </p>
                <p>
                  Vi startet som en liten IT-støttetjeneste og har vokst til å bli 
                  en fullverdig IT-partner for hundrevis av bedrifter i Oslo-regionen.
                </p>
                <p>
                  I dag tilbyr vi alt fra 24/7 support og skyløsninger til 
                  webutvikling og cybersikkerhet. Vårt team av erfarne spesialister 
                  er dedikert til å levere løsninger som faktisk fungerer.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ta kontakt
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Users className="h-20 w-20 mx-auto" />
                <p className="mt-4">Bilde av teamet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Våre verdier</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Verdiene våre styrer alt vi gjør og hvordan vi behandler våre kunder.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mx-auto">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Møt teamet</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Vårt dedikerte team av IT-eksperter er her for å hjelpe deg.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="h-32 w-32 rounded-full bg-slate-200 mx-auto flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-400">
                    {member.initial}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Hvorfor velge NORNEX?
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  'Lokal ekspertise i Oslo-regionen',
                  'Over 10 års erfaring med IT-tjenester',
                  'ISO-sertifiserte prosesser',
                  'Fast pris uten overraskelser',
                  '24/7 support for alle kunder',
                  'Garanti på alt arbeid',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <Award className="h-12 w-12 text-blue-200" />
              <h3 className="mt-6 text-2xl font-bold">ISO 27001 Sertifisert</h3>
              <p className="mt-4 text-blue-100">
                NORNEX AS er sertifisert i henhold til ISO 27001-standarden for 
                informasjonssikkerhet. Dette betyr at vi følger internasjonalt 
                anerkjente beste praksis for å beskytte dine data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Klar til å bli vår neste suksesshistorie?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Ta kontakt i dag for en uforpliktende prat om dine IT-behov.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kontakt oss
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
