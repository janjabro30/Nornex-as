/**
 * NORNEX AS - Cookie Policy Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { PublicHeader, PublicFooter } from '@/components/public';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900">Cookie-policy</h1>
        <p className="mt-4 text-slate-500">Sist oppdatert: {new Date().toLocaleDateString('nb-NO')}</p>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>Hva er cookies?</h2>
          <p>
            Cookies (informasjonskapsler) er små tekstfiler som lagres på din enhet 
            når du besøker nettsider. De brukes for å huske innstillinger, analysere 
            trafikk og forbedre brukeropplevelsen.
          </p>

          <h2>Hvordan vi bruker cookies</h2>
          <p>
            NORNEX AS bruker cookies til følgende formål:
          </p>

          <h3>Nødvendige cookies</h3>
          <p>
            Disse er nødvendige for at nettsiden skal fungere og kan ikke slås av. 
            De brukes for eksempel til å huske handlekurv og innlogging.
          </p>

          <h3>Analytiske cookies</h3>
          <p>
            Vi bruker analytiske verktøy for å forstå hvordan besøkende bruker 
            nettsiden. Dette hjelper oss å forbedre innhold og funksjonalitet.
          </p>

          <h3>Funksjonelle cookies</h3>
          <p>
            Disse husker valg du gjør, som språk og innstillinger, for å gi deg 
            en bedre opplevelse.
          </p>

          <h3>Markedsføringscookies</h3>
          <p>
            Med ditt samtykke bruker vi markedsføringscookies for å vise relevante 
            annonser. Disse cookies deles med annonsepartnere.
          </p>

          <h2>Cookie-oversikt</h2>
          <table>
            <thead>
              <tr>
                <th>Navn</th>
                <th>Formål</th>
                <th>Varighet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>nornex-cart</td>
                <td>Lagrer handlekurven din</td>
                <td>30 dager</td>
              </tr>
              <tr>
                <td>nornex-consent</td>
                <td>Husker dine cookie-valg</td>
                <td>1 år</td>
              </tr>
              <tr>
                <td>_ga</td>
                <td>Google Analytics</td>
                <td>2 år</td>
              </tr>
            </tbody>
          </table>

          <h2>Administrere cookies</h2>
          <p>
            Du kan når som helst endre dine cookie-innstillinger ved å klikke på 
            «Cookie-innstillinger» i bunnen av nettsiden.
          </p>
          <p>
            Du kan også slette eller blokkere cookies i nettleserens innstillinger. 
            Merk at dette kan påvirke funksjonaliteten på nettsiden.
          </p>

          <h3>Slik sletter du cookies:</h3>
          <ul>
            <li><strong>Chrome:</strong> Innstillinger → Personvern og sikkerhet → Slett nettleserdata</li>
            <li><strong>Firefox:</strong> Innstillinger → Personvern og sikkerhet → Cookies og nettstedsdata</li>
            <li><strong>Safari:</strong> Innstillinger → Personvern → Behandle nettsidedata</li>
            <li><strong>Edge:</strong> Innstillinger → Personvern → Velg hva som skal fjernes</li>
          </ul>

          <h2>Tredjepartscookies</h2>
          <p>
            Noen cookies på nettsiden vår kommer fra tredjeparter. Disse har egne 
            personvernerklæringer:
          </p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Analytics</a></li>
          </ul>

          <h2>Kontakt</h2>
          <p>
            Har du spørsmål om vår bruk av cookies? Kontakt oss på:<br />
            E-post: personvern@nornex.no
          </p>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
