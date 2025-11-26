/**
 * NORNEX AS - Warranty Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { Shield, CheckCircle, Wrench } from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

export default function GarantiPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-blue-400 mx-auto" />
          <h1 className="mt-6 text-4xl font-bold text-white">Garanti</h1>
          <p className="mt-4 text-lg text-slate-300">
            Vi står bak produktene og arbeidet vårt
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="p-6 bg-slate-50 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2 år</div>
              <h3 className="font-semibold text-slate-900">Produktgaranti</h3>
              <p className="mt-2 text-sm text-slate-600">
                Standard garanti på alle produkter
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">12 mnd</div>
              <h3 className="font-semibold text-slate-900">Reparasjonsgaranti</h3>
              <p className="mt-2 text-sm text-slate-600">
                Garanti på alle reparasjoner
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5 år</div>
              <h3 className="font-semibold text-slate-900">Utvidet garanti</h3>
              <p className="mt-2 text-sm text-slate-600">
                Tilleggskjøp for utvalgte produkter
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>Produktgaranti</h2>
            <p>
              Alle produkter kjøpt hos NORNEX AS har minimum 2 års garanti i henhold 
              til forbrukerkjøpsloven. Garantien dekker fabrikasjonsfeil og mangler.
            </p>

            <h3>Hva dekker garantien?</h3>
            <ul>
              <li>Fabrikasjonsfeil</li>
              <li>Defekte komponenter</li>
              <li>Mangler som var tilstede ved kjøp</li>
              <li>Programvarefeil på leverte systemer</li>
            </ul>

            <h3>Hva dekker garantien IKKE?</h3>
            <ul>
              <li>Skader forårsaket av uhell, misbruk eller feilaktig bruk</li>
              <li>Normal slitasje</li>
              <li>Skader fra væske eller fukt</li>
              <li>Modifikasjoner gjort av tredjepart</li>
              <li>Forbruksartikler som batterier (etter 6 måneder)</li>
            </ul>

            <h2>Reparasjonsgaranti</h2>
            <p>
              Alle reparasjoner utført av NORNEX AS har 12 måneders garanti. Dette 
              betyr at hvis samme feil oppstår igjen innen 12 måneder, fikser vi 
              det gratis.
            </p>

            <h2>Utvidet garanti</h2>
            <p>
              For utvalgte produkter tilbyr vi muligheten til å kjøpe utvidet 
              garanti i opptil 5 år. Dette gir deg ekstra trygghet og beskyttelse 
              for investeringen din.
            </p>
            <p>Utvidet garanti kan kjøpes:</p>
            <ul>
              <li>Ved kjøp av produktet</li>
              <li>Innen 30 dager etter kjøp</li>
            </ul>

            <h2>Slik bruker du garantien</h2>
            <ol>
              <li>
                <strong>Kontakt oss:</strong> Send e-post til garanti@nornex.no med 
                ordrenummer, beskrivelse av feilen og bilder (om mulig).
              </li>
              <li>
                <strong>Diagnostikk:</strong> Vi vurderer saken og gir deg beskjed 
                om hvordan vi vil løse problemet.
              </li>
              <li>
                <strong>Reparasjon eller erstatning:</strong> Vi reparerer produktet 
                eller sender deg et nytt hvis reparasjon ikke er mulig.
              </li>
              <li>
                <strong>Retur:</strong> Hvis du ønsker det, kan du få pengene tilbake 
                i stedet for reparasjon/erstatning.
              </li>
            </ol>

            <h2>Bedriftsgaranti</h2>
            <p>
              Bedriftskunder med serviceavtale har egne garantivilkår som fremgår 
              av avtalen. Kontakt din kundeansvarlig for detaljer.
            </p>

            <h2>Kontakt</h2>
            <p>
              Spørsmål om garanti? Kontakt oss:<br />
              E-post: garanti@nornex.no<br />
              Telefon: +47 22 12 34 56
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
