/**
 * NORNEX AS - Returns Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { Undo2, CheckCircle, Package } from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

export default function ReturPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Undo2 className="h-16 w-16 text-blue-400 mx-auto" />
          <h1 className="mt-6 text-4xl font-bold text-white">Retur og bytte</h1>
          <p className="mt-4 text-lg text-slate-300">
            30 dagers åpent kjøp på alle produkter
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="p-6 bg-slate-50 rounded-xl text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">30 dager åpent kjøp</h3>
              <p className="mt-2 text-sm text-slate-600">
                Full refusjon innen 30 dager fra mottak
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto">
                <Undo2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">Gratis retur</h3>
              <p className="mt-2 text-sm text-slate-600">
                Vi dekker returfrakten ved feil eller mangler
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">Enkelt bytte</h3>
              <p className="mt-2 text-sm text-slate-600">
                Bytt til annet produkt uten ekstra kostnad
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>Slik returnerer du</h2>
            <ol>
              <li>
                <strong>Kontakt oss:</strong> Send e-post til retur@nornex.no med ordrenummer 
                og informasjon om produktet du ønsker å returnere.
              </li>
              <li>
                <strong>Motta returetikett:</strong> Vi sender deg en returetikett og 
                instruksjoner på e-post.
              </li>
              <li>
                <strong>Pakk produktet:</strong> Pakk produktet i original emballasje 
                (om mulig) og fest returetiketten.
              </li>
              <li>
                <strong>Send retur:</strong> Lever pakken på nærmeste postkontor eller 
                pakkeboks.
              </li>
              <li>
                <strong>Refusjon:</strong> Når vi har mottatt og kontrollert produktet, 
                refunderer vi beløpet innen 5-7 virkedager.
              </li>
            </ol>

            <h2>Vilkår for retur</h2>
            <p>For å kunne returnere et produkt må følgende vilkår være oppfylt:</p>
            <ul>
              <li>Produktet må være ubrukt og i samme stand som da du mottok det</li>
              <li>Original emballasje bør være intakt</li>
              <li>Alle tilbehør og manualer må følge med</li>
              <li>Produktet må returneres innen 30 dager fra mottak</li>
            </ul>

            <h2>Produkter som ikke kan returneres</h2>
            <p>Følgende produkter kan ikke returneres med mindre de er defekte:</p>
            <ul>
              <li>Programvare der forseglingen er brutt</li>
              <li>Produkter som er spesialtilpasset eller bestilt til deg</li>
              <li>Hygieniske produkter (f.eks. ørepropper)</li>
            </ul>

            <h2>Reklamasjon</h2>
            <p>
              Du har 2 års reklamasjonsrett på alle produkter i henhold til 
              forbrukerkjøpsloven. Ved reklamasjon dekker vi alle kostnader 
              for retur og reparasjon/erstatning.
            </p>

            <h2>Bytte av produkter</h2>
            <p>
              Ønsker du å bytte til et annet produkt? Kontakt oss så hjelper vi deg. 
              Ved bytte til dyrere produkt betaler du mellomlegget. Ved bytte til 
              billigere produkt refunderer vi differansen.
            </p>

            <h2>Refusjon</h2>
            <p>
              Refusjon skjer til samme betalingsmetode som ble brukt ved kjøpet. 
              Behandlingstiden er normalt 5-7 virkedager fra vi mottar returen. 
              Opprinnelig fraktkostnad refunderes kun ved feil eller mangler.
            </p>

            <h2>Kontakt</h2>
            <p>
              Spørsmål om retur? Kontakt oss:<br />
              E-post: retur@nornex.no<br />
              Telefon: +47 22 12 34 56
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
