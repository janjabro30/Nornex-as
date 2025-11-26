/**
 * NORNEX AS - Terms and Conditions Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { PublicHeader, PublicFooter } from '@/components/public';

export default function VilkarPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900">Vilkår og betingelser</h1>
        <p className="mt-4 text-slate-500">Sist oppdatert: {new Date().toLocaleDateString('nb-NO')}</p>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>1. Generelt</h2>
          <p>
            Disse vilkårene gjelder for alle kjøp og tjenester fra NORNEX AS. 
            Ved å bruke våre tjenester eller kjøpe produkter fra oss, aksepterer 
            du disse vilkårene.
          </p>

          <h2>2. Om selskapet</h2>
          <p>
            <strong>NORNEX AS</strong><br />
            Brynsveien 18, 0667 Oslo<br />
            Org.nr: 123 456 789 MVA<br />
            E-post: post@nornex.no<br />
            Telefon: +47 22 12 34 56
          </p>

          <h2>3. Priser og betaling</h2>
          <ul>
            <li>Alle priser er oppgitt i NOK og inkluderer 25% MVA med mindre annet er spesifisert</li>
            <li>Vi forbeholder oss retten til å endre priser uten varsel</li>
            <li>Betaling skjer ved bestilling eller etter avtale</li>
            <li>Ved forsinket betaling påløper forsinkelsesrenter etter gjeldende satser</li>
          </ul>

          <h2>4. Levering</h2>
          <ul>
            <li>Leveringstid oppgis i forbindelse med bestilling</li>
            <li>Ved forsinkelser vil vi informere deg så snart som mulig</li>
            <li>Risikoen for varen går over til deg ved levering</li>
          </ul>

          <h2>5. Angrerett</h2>
          <p>
            I henhold til angrerettloven har du 14 dagers angrerett på kjøp av fysiske 
            produkter. Angreretten gjelder fra du mottar varen. For tjenester gjelder 
            angreretten fra avtaletidspunktet.
          </p>
          <p>
            For å benytte angreretten må du gi oss melding innen fristen. Produktet må 
            returneres i samme stand som du mottok det.
          </p>

          <h2>6. Reklamasjon og garanti</h2>
          <ul>
            <li>Du har 2 års reklamasjonsrett på alle produkter</li>
            <li>For tjenester reklamerer du innen rimelig tid etter at feilen ble oppdaget</li>
            <li>Reklamasjon meldes til post@nornex.no</li>
          </ul>

          <h2>7. Ansvarsbegrensning</h2>
          <p>
            NORNEX AS er ikke ansvarlig for indirekte tap som tapt fortjeneste, 
            driftstap eller andre følgeskader. Vårt maksimale ansvar er begrenset 
            til verdien av den aktuelle bestillingen.
          </p>

          <h2>8. Immaterielle rettigheter</h2>
          <p>
            Alt innhold på våre nettsider, inkludert tekst, bilder, logoer og 
            programvare, er beskyttet av opphavsrett og tilhører NORNEX AS eller 
            våre lisensgivere.
          </p>

          <h2>9. Personvern</h2>
          <p>
            Se vår <a href="/personvern">personvernerklæring</a> for informasjon om 
            hvordan vi behandler personopplysninger.
          </p>

          <h2>10. Force majeure</h2>
          <p>
            NORNEX AS er ikke ansvarlig for forsinkelser eller manglende oppfyllelse 
            som skyldes forhold utenfor vår kontroll, som naturkatastrofer, krig, 
            streik eller pandemi.
          </p>

          <h2>11. Tvister</h2>
          <p>
            Tvister løses fortrinnsvis gjennom forhandlinger. Hvis partene ikke blir 
            enige, kan saken bringes inn for Forbrukerrådet eller Oslo tingrett.
          </p>
          <p>
            Forbrukerklage kan sendes til:<br />
            <a href="https://www.forbrukerradet.no" target="_blank" rel="noopener noreferrer">Forbrukerrådet</a>
          </p>

          <h2>12. Endringer</h2>
          <p>
            Vi forbeholder oss retten til å endre disse vilkårene. Endringer trer 
            i kraft fra publiseringsdato på nettsiden.
          </p>

          <h2>13. Kontakt</h2>
          <p>
            Spørsmål om vilkårene kan rettes til:<br />
            E-post: post@nornex.no<br />
            Telefon: +47 22 12 34 56
          </p>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
