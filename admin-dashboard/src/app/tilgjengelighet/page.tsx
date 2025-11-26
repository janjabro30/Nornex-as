/**
 * NORNEX AS - Accessibility Statement Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { PublicHeader, PublicFooter } from '@/components/public';

export default function TilgjengelighetPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900">Tilgjengelighetserklæring</h1>
        <p className="mt-4 text-slate-500">Sist oppdatert: {new Date().toLocaleDateString('nb-NO')}</p>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>Vår forpliktelse</h2>
          <p>
            NORNEX AS er forpliktet til å gjøre våre nettsider tilgjengelige for alle, 
            uavhengig av funksjonsevne. Vi jobber kontinuerlig med å forbedre 
            tilgjengeligheten på nettsidene våre i henhold til WCAG 2.1-retningslinjene.
          </p>

          <h2>Tilgjengelighetstiltak</h2>
          <p>Vi har implementert følgende tiltak for å forbedre tilgjengeligheten:</p>
          <ul>
            <li>Alle bilder har alternativ tekst</li>
            <li>Nettsiden kan navigeres med tastatur</li>
            <li>Skjemaer har tydelige ledetekster</li>
            <li>God fargekontrast mellom tekst og bakgrunn</li>
            <li>Responsivt design for ulike skjermstørrelser</li>
            <li>Strukturert HTML med riktig bruk av overskrifter</li>
            <li>Skip-lenker for å hoppe over navigasjon</li>
          </ul>

          <h2>Samsvarsstatus</h2>
          <p>
            Vi streber etter å oppfylle WCAG 2.1 nivå AA. Noen deler av nettsiden 
            kan fortsatt ha utfordringer, og vi jobber kontinuerlig med å forbedre disse.
          </p>

          <h2>Kjente utfordringer</h2>
          <p>Vi er klar over følgende tilgjengelighetsproblemer:</p>
          <ul>
            <li>Noen tredjepartsvideoer kan mangle undertekster</li>
            <li>Enkelte PDF-dokumenter er ikke fullt ut tilgjengelige</li>
            <li>Noen interaktive elementer kan ha forbedringspotensial</li>
          </ul>
          <p>Vi jobber aktivt med å løse disse problemene.</p>

          <h2>Hjelpemidler vi støtter</h2>
          <p>Nettsiden er testet med følgende hjelpemidler:</p>
          <ul>
            <li>Skjermlesere (NVDA, VoiceOver, JAWS)</li>
            <li>Tastaturnavigasjon</li>
            <li>Skjermforstørrere</li>
            <li>Høykontrastmodus</li>
          </ul>

          <h2>Nettleserstøtte</h2>
          <p>Nettsiden er optimalisert for følgende nettlesere:</p>
          <ul>
            <li>Chrome (siste versjon)</li>
            <li>Firefox (siste versjon)</li>
            <li>Safari (siste versjon)</li>
            <li>Edge (siste versjon)</li>
          </ul>

          <h2>Tilbakemelding</h2>
          <p>
            Vi setter pris på tilbakemeldinger om tilgjengeligheten på nettsidene 
            våre. Hvis du opplever problemer eller har forslag til forbedringer, 
            kontakt oss:
          </p>
          <p>
            E-post: tilgjengelighet@nornex.no<br />
            Telefon: +47 22 12 34 56
          </p>
          <p>
            Vi vil svare på henvendelser innen 5 virkedager og vil gjøre vårt 
            beste for å løse eventuelle problemer du opplever.
          </p>

          <h2>Klage</h2>
          <p>
            Hvis du mener at vi ikke oppfyller kravene til universell utforming, 
            kan du sende en klage til Diskrimineringsnemnda:
          </p>
          <p>
            <a href="https://www.diskrimineringsnemnda.no" target="_blank" rel="noopener noreferrer">
              www.diskrimineringsnemnda.no
            </a>
          </p>

          <h2>Teknisk informasjon</h2>
          <p>
            Nettsiden er bygget med moderne teknologier som følger nettstandarder 
            og beste praksis for tilgjengelighet. Vi bruker semantisk HTML5, 
            ARIA-attributter der nødvendig, og responsivt design.
          </p>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
