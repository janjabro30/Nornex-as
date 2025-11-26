/**
 * NORNEX AS - Shipping Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { Truck, Package, Clock, MapPin } from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

export default function FraktPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="h-16 w-16 text-blue-400 mx-auto" />
          <h1 className="mt-6 text-4xl font-bold text-white">Frakt og levering</h1>
          <p className="mt-4 text-lg text-slate-300">
            Vi tilbyr rask og pålitelig levering i hele Norge
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12 text-center">
            <p className="text-lg font-medium text-green-800">
              🎉 Gratis frakt på alle ordrer over 1000 kr!
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-6">Leveringsalternativer</h2>
          
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="p-6 bg-slate-50 rounded-xl">
              <Package className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">Servicepakke</h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">89 kr</p>
              <p className="text-slate-500">2-4 virkedager</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Levering til nærmeste postkontor/pakkeboks</li>
                <li>• SMS-varsling</li>
                <li>• Sporing inkludert</li>
              </ul>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <Truck className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">På Døren</h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">129 kr</p>
              <p className="text-slate-500">1-2 virkedager</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Levering til døren din</li>
                <li>• Flexilevering</li>
                <li>• SMS-varsling og sporing</li>
              </ul>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-xl">
              <Clock className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">Express</h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">249 kr</p>
              <p className="text-slate-500">Neste virkedag</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Garantert levering neste dag</li>
                <li>• Direkte til døren</li>
                <li>• Prioritert behandling</li>
              </ul>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>Leveringstid</h2>
            <p>
              Ordrer som legges inn før kl. 14:00 på hverdager sendes samme dag. 
              Ordrer etter dette tidspunktet sendes neste virkedag.
            </p>
            <p>
              Leveringstiden beregnes fra tidspunktet varen sendes fra vårt lager. 
              Ved høy aktivitet kan leveringstiden være noe lenger.
            </p>

            <h2>Leveringsområde</h2>
            <p>
              Vi leverer til hele Norge, inkludert Svalbard og Jan Mayen. 
              For leveranser utenfor fastlands-Norge kan det tilkomme ekstra kostnader.
            </p>

            <h2>Sporing av pakker</h2>
            <p>
              Når din ordre er sendt, mottar du en sporingslenke på e-post og SMS. 
              Du kan følge pakken hele veien fra vårt lager til leveringsstedet.
            </p>

            <h2>Leveringsproblemer</h2>
            <p>
              Hvis pakken ikke er levert innen forventet tid, eller du har andre 
              problemer med leveringen, kontakt oss på post@nornex.no eller 
              telefon +47 22 12 34 56.
            </p>

            <h2>Henting på lager</h2>
            <p>
              Du kan velge å hente ordren gratis på vårt lager i Brynsveien 18, Oslo. 
              Velg «Hent selv» i kassen. Ordren er klar for henting innen 2 timer etter bekreftelse.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
