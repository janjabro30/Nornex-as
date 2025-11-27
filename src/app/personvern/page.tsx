/**
 * NORNEX AS - Privacy Policy Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { PublicHeader, PublicFooter } from '@/components/public';

export default function PersonvernPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900">Personvernerklæring</h1>
        <p className="mt-4 text-slate-500">Sist oppdatert: {new Date().toLocaleDateString('nb-NO')}</p>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>1. Innledning</h2>
          <p>
            NORNEX AS («vi», «oss» eller «vår») er behandlingsansvarlig for personopplysninger 
            som samles inn via våre nettsider og tjenester. Denne personvernerklæringen 
            forklarer hvordan vi samler inn, bruker, deler og beskytter dine personopplysninger.
          </p>
          <p>
            Vi er forpliktet til å beskytte ditt personvern og behandle dine personopplysninger 
            i samsvar med personopplysningsloven og EUs personvernforordning (GDPR).
          </p>

          <h2>2. Hvem er vi?</h2>
          <p>
            <strong>NORNEX AS</strong><br />
            Brynsveien 18<br />
            0667 Oslo, Norge<br />
            Org.nr: 123 456 789<br />
            E-post: personvern@nornex.no
          </p>

          <h2>3. Hvilke opplysninger samler vi inn?</h2>
          <p>Vi samler inn følgende typer personopplysninger:</p>
          <ul>
            <li><strong>Kontaktinformasjon:</strong> Navn, e-postadresse, telefonnummer, adresse</li>
            <li><strong>Bedriftsinformasjon:</strong> Bedriftsnavn, organisasjonsnummer</li>
            <li><strong>Teknisk informasjon:</strong> IP-adresse, nettlesertype, operativsystem</li>
            <li><strong>Bruksinformasjon:</strong> Sider du besøker, tidspunkt for besøk</li>
            <li><strong>Ordreinformasjon:</strong> Bestillingshistorikk, betalingsinformasjon</li>
          </ul>

          <h2>4. Hvorfor samler vi inn opplysninger?</h2>
          <p>Vi bruker personopplysningene dine til følgende formål:</p>
          <ul>
            <li>Levere tjenester og produkter du har bestilt</li>
            <li>Kommunisere med deg om ordrer og support</li>
            <li>Forbedre våre nettsider og tjenester</li>
            <li>Sende markedsføring (kun med ditt samtykke)</li>
            <li>Overholde juridiske forpliktelser</li>
          </ul>

          <h2>5. Rettslig grunnlag</h2>
          <p>Vi behandler personopplysninger basert på følgende rettslige grunnlag:</p>
          <ul>
            <li><strong>Avtale:</strong> Nødvendig for å oppfylle en avtale med deg</li>
            <li><strong>Samtykke:</strong> Du har gitt ditt samtykke til behandlingen</li>
            <li><strong>Berettiget interesse:</strong> Vi har en legitim interesse som ikke overstyres av dine rettigheter</li>
            <li><strong>Rettslig forpliktelse:</strong> Nødvendig for å overholde loven</li>
          </ul>

          <h2>6. Deling av opplysninger</h2>
          <p>Vi deler personopplysninger med følgende parter:</p>
          <ul>
            <li><strong>Leverandører:</strong> IT-tjenester, hosting, betalingsløsninger</li>
            <li><strong>Fraktselskaper:</strong> For levering av produkter</li>
            <li><strong>Myndigheter:</strong> Når loven krever det</li>
          </ul>
          <p>Vi selger aldri dine personopplysninger til tredjeparter.</p>

          <h2>7. Dine rettigheter</h2>
          <p>Du har følgende rettigheter under GDPR:</p>
          <ul>
            <li><strong>Innsyn:</strong> Du kan be om kopi av dine personopplysninger</li>
            <li><strong>Retting:</strong> Du kan be om retting av feilaktige opplysninger</li>
            <li><strong>Sletting:</strong> Du kan be om sletting av dine opplysninger</li>
            <li><strong>Begrensning:</strong> Du kan be om begrensning av behandlingen</li>
            <li><strong>Dataportabilitet:</strong> Du kan be om å få dine data overført</li>
            <li><strong>Protest:</strong> Du kan protestere mot behandlingen</li>
          </ul>
          <p>
            For å utøve dine rettigheter, kontakt oss på personvern@nornex.no.
          </p>

          <h2>8. Lagring og sikkerhet</h2>
          <p>
            Vi lagrer personopplysninger så lenge det er nødvendig for formålet de ble 
            samlet inn for, eller så lenge loven krever. Vi har implementert tekniske 
            og organisatoriske tiltak for å beskytte dine opplysninger.
          </p>

          <h2>9. Cookies</h2>
          <p>
            Vi bruker cookies for å forbedre din opplevelse på nettsidene våre. 
            Se vår <a href="/cookie-policy">cookie-policy</a> for mer informasjon.
          </p>

          <h2>10. Endringer</h2>
          <p>
            Vi kan oppdatere denne personvernerklæringen fra tid til annen. 
            Vesentlige endringer vil bli varslet på nettsiden eller via e-post.
          </p>

          <h2>11. Klage</h2>
          <p>
            Hvis du mener at vi behandler personopplysninger i strid med loven, 
            kan du klage til Datatilsynet: <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">www.datatilsynet.no</a>
          </p>

          <h2>12. Kontakt</h2>
          <p>
            Har du spørsmål om vår behandling av personopplysninger? Kontakt oss:
          </p>
          <p>
            E-post: personvern@nornex.no<br />
            Telefon: +47 22 12 34 56<br />
            Adresse: Brynsveien 18, 0667 Oslo
          </p>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
