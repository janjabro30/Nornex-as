"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Scale, AlertTriangle, CreditCard, Truck, RefreshCw, Shield, Gavel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";

export default function TermsPage() {
  const { language } = useAppStore();

  const sections = [
    {
      icon: Scale,
      title: language === "no" ? "1. Generelle vilkår" : "1. General Terms",
      content:
        language === "no"
          ? `Disse vilkårene gjelder for alle kjøp og tjenester fra Nornex AS (org.nr. XXX XXX XXX).

Ved å bruke våre tjenester eller kjøpe produkter fra oss, godtar du disse vilkårene.

Nornex AS forbeholder seg retten til å endre disse vilkårene. Eventuelle endringer vil bli publisert på denne siden med oppdatert dato.

Disse vilkårene er utformet i samsvar med norsk forbrukerlovgivning, herunder forbrukerkjøpsloven og angrerettloven.`
          : `These terms apply to all purchases and services from Nornex AS (org. no. XXX XXX XXX).

By using our services or purchasing products from us, you accept these terms.

Nornex AS reserves the right to change these terms. Any changes will be published on this page with an updated date.

These terms are designed in accordance with Norwegian consumer legislation, including the Consumer Purchase Act and the Right of Withdrawal Act.`,
    },
    {
      icon: CreditCard,
      title: language === "no" ? "2. Priser og betaling" : "2. Prices and Payment",
      content:
        language === "no"
          ? `Alle priser på nettbutikken er oppgitt i norske kroner (NOK).

For privatpersoner er alle priser inkludert 25% MVA.
For bedriftskunder vises priser eks. MVA når du er innlogget som bedriftskunde.

Vi aksepterer følgende betalingsmetoder:
• Kort (Visa, Mastercard)
• Vipps
• Klarna (delbetaling og faktura)
• Bankoverføring (for bedriftskunder)

Betaling må være mottatt før varen sendes, med unntak av faktura til bedriftskunder med godkjent kreditt.

Ved faktura til bedrifter er betalingsfristen 14 dager. Ved forsinket betaling påløper forsinkelsesrente etter gjeldende satser.`
          : `All prices in the online store are quoted in Norwegian kroner (NOK).

For private customers, all prices include 25% VAT.
For business customers, prices are shown excl. VAT when logged in as a business customer.

We accept the following payment methods:
• Card (Visa, Mastercard)
• Vipps
• Klarna (installment and invoice)
• Bank transfer (for business customers)

Payment must be received before the item is shipped, except for invoices to business customers with approved credit.

For business invoices, the payment deadline is 14 days. Late payments incur interest at current rates.`,
    },
    {
      icon: Truck,
      title: language === "no" ? "3. Levering og frakt" : "3. Delivery and Shipping",
      content:
        language === "no"
          ? `Levering skjer via Posten/Bring til valgt leveringsadresse.

Leveringstider:
• Norgespakke: 1-3 virkedager
• Pakke i postkassen: 2-4 virkedager
• Henting i butikk: Samme dag (hvis på lager)

Fraktkostnader:
• Gratis frakt ved kjøp over 500 kr
• Standard frakt: 99-149 kr avhengig av størrelse

Ved mottak skal du kontrollere at pakken er uskadet. Eventuelle transportskader må meldes umiddelbart.

For bedriftskunder tilbyr vi gratis henting av utstyr for innkjøp/resirkulering i Oslo-området.

Adresse for henting/levering:
Brynsveien 18, 0667 Oslo`
          : `Delivery is via Posten/Bring to the selected delivery address.

Delivery times:
• Norway package: 1-3 business days
• Mailbox package: 2-4 business days
• Store pickup: Same day (if in stock)

Shipping costs:
• Free shipping for orders over 500 NOK
• Standard shipping: 99-149 NOK depending on size

Upon receipt, you should check that the package is undamaged. Any transport damage must be reported immediately.

For business customers, we offer free pickup of equipment for purchase/recycling in the Oslo area.

Address for pickup/delivery:
Brynsveien 18, 0667 Oslo`,
    },
    {
      icon: RefreshCw,
      title: language === "no" ? "4. Angrerett og retur" : "4. Right of Withdrawal and Returns",
      content:
        language === "no"
          ? `I henhold til angrerettloven har privatpersoner 14 dagers angrerett fra mottak av varen.

For å benytte angreretten må du:
• Melde fra til oss innen 14 dager
• Returnere varen i samme stand som mottatt
• Inkludere originale kabler og tilbehør

Returkostnader dekkes av kjøper med mindre annet er avtalt.

Følgende produkter er unntatt angrerett:
• Programvare der forseglingen er brutt
• Spesialtilpassede produkter
• Hygieneprodukter der forseglingen er brutt

Ved godkjent retur refunderes kjøpesummen innen 14 dager.

For bedriftskunder gjelder ikke angrerettloven, men vi tilbyr 7 dagers returrett på uåpnede produkter.`
          : `According to the Right of Withdrawal Act, private individuals have 14 days right of withdrawal from receipt of the item.

To exercise the right of withdrawal, you must:
• Notify us within 14 days
• Return the item in the same condition as received
• Include original cables and accessories

Return costs are covered by the buyer unless otherwise agreed.

The following products are exempt from the right of withdrawal:
• Software where the seal is broken
• Customized products
• Hygiene products where the seal is broken

Upon approved return, the purchase amount will be refunded within 14 days.

For business customers, the Right of Withdrawal Act does not apply, but we offer 7 days return on unopened products.`,
    },
    {
      icon: Shield,
      title: language === "no" ? "5. Garanti og reklamasjon" : "5. Warranty and Complaints",
      content:
        language === "no"
          ? `Alle produkter har minimum 12 måneders garanti fra kjøpsdato.

Garantien dekker:
• Fabrikasjonsfeil
• Defekte komponenter
• Funksjonsfeil som ikke skyldes bruker

Garantien dekker IKKE:
• Skader forårsaket av bruker
• Normal slitasje
• Skader fra væske eller støt
• Uautoriserte reparasjoner

Ved reklamasjon må du:
1. Kontakte oss med ordrenummer og beskrivelse av feilen
2. Sende inn eller levere produktet for vurdering
3. Avvente vår beslutning om reparasjon, bytte eller refusjon

Reklamasjonsrett gjelder i 2 år for forbrukere i henhold til forbrukerkjøpsloven.

For reparasjoner utført av oss gjelder 3 måneders garanti på utført arbeid og deler.`
          : `All products have a minimum 12-month warranty from the date of purchase.

The warranty covers:
• Manufacturing defects
• Defective components
• Functional errors not caused by user

The warranty does NOT cover:
• Damage caused by user
• Normal wear and tear
• Damage from liquid or impact
• Unauthorized repairs

For complaints, you must:
1. Contact us with order number and description of the fault
2. Send in or deliver the product for evaluation
3. Await our decision on repair, replacement or refund

Right of complaint applies for 2 years for consumers according to the Consumer Purchase Act.

For repairs performed by us, 3 months warranty applies to work performed and parts.`,
    },
    {
      icon: AlertTriangle,
      title: language === "no" ? "6. Ansvarsbegrensning" : "6. Limitation of Liability",
      content:
        language === "no"
          ? `Nornex AS er ikke ansvarlig for:
• Indirekte tap eller følgeskader
• Tap av data (vi anbefaler alltid backup)
• Driftsavbrudd
• Tap av fortjeneste

Vårt ansvar er begrenset til verdien av det kjøpte produktet.

Ved kjøp av brukt/refurbished utstyr aksepterer kunden at produktet kan ha kosmetiske spor av tidligere bruk.

Vi garanterer at alle data er slettet fra produkter vi selger, men anbefaler kunder å utføre egen datasletting ved salg til oss.`
          : `Nornex AS is not liable for:
• Indirect loss or consequential damages
• Loss of data (we always recommend backup)
• Business interruption
• Loss of profit

Our liability is limited to the value of the purchased product.

When purchasing used/refurbished equipment, the customer accepts that the product may have cosmetic traces of previous use.

We guarantee that all data is deleted from products we sell, but recommend customers perform their own data deletion when selling to us.`,
    },
    {
      icon: Gavel,
      title: language === "no" ? "7. Lovvalg og tvister" : "7. Governing Law and Disputes",
      content:
        language === "no"
          ? `Disse vilkårene er underlagt norsk lov.

Ved uenighet skal partene først forsøke å løse tvisten i minnelighet.

Hvis dette ikke lykkes, kan saken bringes inn for:
• Forbrukerrådet (for forbrukersaker)
• Forbrukerklageutvalget
• Alminnelig domstol med Oslo tingrett som verneting

Klager kan sendes til:
Nornex AS
Brynsveien 18
0667 Oslo
E-post: klage@nornex.no

Vi forplikter oss til å svare på alle klager innen 14 dager.`
          : `These terms are governed by Norwegian law.

In case of disagreement, the parties shall first attempt to resolve the dispute amicably.

If this fails, the case can be brought before:
• The Consumer Council (for consumer cases)
• The Consumer Disputes Commission
• Ordinary court with Oslo District Court as venue

Complaints can be sent to:
Nornex AS
Brynsveien 18
0667 Oslo
Email: klage@nornex.no

We commit to responding to all complaints within 14 days.`,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "no" ? "Tilbake" : "Back"}
            </Button>
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {language === "no" ? "Kjøpsvilkår" : "Terms & Conditions"}
              </h1>
              <p className="text-gray-400">
                {language === "no"
                  ? "Sist oppdatert: November 2024"
                  : "Last updated: November 2024"}
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {language === "no"
              ? "Les nøye gjennom våre vilkår før du handler hos oss. Ved å fullføre et kjøp aksepterer du disse vilkårene."
              : "Please read our terms carefully before shopping with us. By completing a purchase, you accept these terms."}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 whitespace-pre-line">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact for Questions */}
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {language === "no"
                ? "Har du spørsmål om våre vilkår?"
                : "Have questions about our terms?"}
            </p>
            <Link href="/om-oss#kontakt">
              <Button>
                {language === "no" ? "Kontakt oss" : "Contact us"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
