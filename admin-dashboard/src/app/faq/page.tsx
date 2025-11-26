/**
 * NORNEX AS - FAQ Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

const faqCategories = [
  {
    name: 'Generelt',
    questions: [
      {
        q: 'Hva er NORNEX AS?',
        a: 'NORNEX AS er et IT-selskap basert i Oslo som tilbyr profesjonelle IT-tjenester til bedrifter. Vi tilbyr alt fra 24/7 support og skyløsninger til reparasjon og webutvikling.',
      },
      {
        q: 'Hvor holder dere til?',
        a: 'Vi holder til i Brynsveien 18, 0667 Oslo. Du er velkommen til å besøke oss i åpningstiden (08:00-17:00 på hverdager).',
      },
      {
        q: 'Hvilke områder betjener dere?',
        a: 'Vi betjener primært bedrifter i Oslo og omegn, men kan tilby fjernhjelp og skyløsninger til kunder over hele Norge.',
      },
    ],
  },
  {
    name: 'Support',
    questions: [
      {
        q: 'Hvordan kontakter jeg support?',
        a: 'Du kan kontakte oss på telefon +47 22 12 34 56, e-post support@nornex.no, eller via kontaktskjemaet på nettsiden. Ved kritiske hendelser anbefaler vi telefon.',
      },
      {
        q: 'Hva er åpningstidene?',
        a: 'Ordinær kundeservice er åpen hverdager 08:00-17:00. Kunder med supportavtale har tilgang til 24/7 support.',
      },
      {
        q: 'Hva er responstiden?',
        a: 'For kritiske hendelser: 15 minutter. For standard saker: innen 4 timer i arbeidstiden. Eksakte SLA-er avhenger av din serviceavtale.',
      },
    ],
  },
  {
    name: 'Nettbutikk',
    questions: [
      {
        q: 'Hvilke betalingsmetoder aksepterer dere?',
        a: 'Vi aksepterer Vipps, Visa, Mastercard, Klarna og PayPal. Ved kjøp over 1000 kr tilbyr vi også faktura.',
      },
      {
        q: 'Hvor lang er leveringstiden?',
        a: 'De fleste produkter sendes innen 1-2 virkedager. Leveringstid er 2-4 virkedager med Servicepakke, eller 1-2 dager med På Døren.',
      },
      {
        q: 'Er frakt gratis?',
        a: 'Ja, frakt er gratis for alle ordrer over 1000 kr. For ordrer under dette beregnes frakt basert på valgt leveringsmetode.',
      },
      {
        q: 'Hva er returpolicyen?',
        a: 'Du har 30 dagers åpent kjøp. Produktet må være ubrukt og i original emballasje. Vi dekker returfrakten ved feil eller mangler.',
      },
    ],
  },
  {
    name: 'Reparasjon',
    questions: [
      {
        q: 'Hva koster diagnose?',
        a: 'Diagnose er helt gratis. Vi finner feilen og gir deg et pristilbud før vi starter reparasjonen.',
      },
      {
        q: 'Hvor lang tid tar reparasjon?',
        a: 'De fleste reparasjoner er ferdige innen 1-3 virkedager. Mer komplekse saker eller reparasjoner som krever spesialdeler kan ta lenger tid.',
      },
      {
        q: 'Hva med mine data under reparasjon?',
        a: 'Vi tar alltid backup av dataene dine før vi starter. Ved mer alvorlige feil kan vi også hjelpe med datarekonstruksjon.',
      },
      {
        q: 'Har dere garanti på reparasjoner?',
        a: 'Ja, alle reparasjoner har 12 måneders garanti. Hvis samme feil oppstår igjen, fikser vi det gratis.',
      },
    ],
  },
  {
    name: 'Tjenester',
    questions: [
      {
        q: 'Tilbyr dere avtaler for små bedrifter?',
        a: 'Ja, vi har fleksible løsninger tilpasset bedrifter i alle størrelser. Kontakt oss for et tilpasset tilbud.',
      },
      {
        q: 'Kan jeg få IT-støtte uten fast avtale?',
        a: 'Ja, vi tilbyr timepris på 950 kr/time for enkeltsaker. Med fast avtale får du bedre priser og prioritert support.',
      },
      {
        q: 'Hva inkluderer Managed IT?',
        a: 'Managed IT inkluderer overvåking, vedlikehold, support, backup og proaktiv drift av din IT-infrastruktur. Se tjenestesiden for full oversikt.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Ofte stilte spørsmål
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Finn svar på de vanligste spørsmålene om våre tjenester
          </p>
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Søk etter spørsmål..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Ingen spørsmål matcher søket ditt.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Fjern søk
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <div key={category.name}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((item, index) => {
                      const id = `${category.name}-${index}`;
                      const isOpen = openItems.has(id);
                      return (
                        <div
                          key={id}
                          className="border border-slate-200 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(id)}
                            className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50"
                          >
                            <span className="font-medium text-slate-900 pr-4">
                              {item.q}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 text-slate-600 bg-slate-50">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 p-8 bg-slate-50 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-slate-900">
              Fant du ikke svaret du lette etter?
            </h3>
            <p className="mt-2 text-slate-600">
              Ta kontakt med oss så hjelper vi deg.
            </p>
            <Link
              href="/kontakt"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Kontakt oss
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
