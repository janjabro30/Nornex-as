"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ArrowLeft, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const { language } = useAppStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs: FAQItem[] = [
    // Levering
    {
      category: language === "no" ? "Levering" : "Shipping",
      question: language === "no" ? "Hvor lang tid tar levering?" : "How long does delivery take?",
      answer: language === "no"
        ? "Leveringstiden avhenger av valgt fraktmetode: Norgespakke leveres på 1-3 virkedager, Pakke i postkassen på 2-4 virkedager, og Hjemlevering på 1-3 virkedager. Henting i butikk er samme dag hvis varen er på lager."
        : "Delivery time depends on the chosen shipping method: Norway package is delivered in 1-3 business days, Mailbox package in 2-4 business days, and Home delivery in 1-3 business days. Store pickup is same day if the item is in stock.",
    },
    {
      category: language === "no" ? "Levering" : "Shipping",
      question: language === "no" ? "Tilbyr dere gratis frakt?" : "Do you offer free shipping?",
      answer: language === "no"
        ? "Ja! Vi tilbyr gratis frakt på alle bestillinger over 500 kr. For bestillinger under 500 kr starter frakten fra 49 kr."
        : "Yes! We offer free shipping on all orders over 500 NOK. For orders under 500 NOK, shipping starts from 49 NOK.",
    },
    // Retur
    {
      category: language === "no" ? "Retur" : "Returns",
      question: language === "no" ? "Hvordan returnerer jeg en vare?" : "How do I return an item?",
      answer: language === "no"
        ? "Du kan returnere varer innen 14 dager fra mottak. Kontakt oss på retur@nornex.no eller ring +47 123 45 678 for å starte returprosessen. Vi sender deg en returetikett."
        : "You can return items within 14 days of receipt. Contact us at retur@nornex.no or call +47 123 45 678 to start the return process. We will send you a return label.",
    },
    {
      category: language === "no" ? "Retur" : "Returns",
      question: language === "no" ? "Når får jeg pengene tilbake?" : "When will I get my refund?",
      answer: language === "no"
        ? "Når vi har mottatt og godkjent returen, refunderes beløpet innen 14 dager til din opprinnelige betalingsmetode."
        : "Once we have received and approved the return, the amount will be refunded within 14 days to your original payment method.",
    },
    // Garanti
    {
      category: language === "no" ? "Garanti" : "Warranty",
      question: language === "no" ? "Hva dekker garantien?" : "What does the warranty cover?",
      answer: language === "no"
        ? "Garantien dekker fabrikasjonsfeil, defekte komponenter og funksjonsfeil som ikke skyldes bruker. Den dekker ikke skader forårsaket av bruker, væskeskader, normal slitasje eller uautoriserte reparasjoner."
        : "The warranty covers manufacturing defects, defective components, and functional errors not caused by the user. It does not cover damage caused by user, liquid damage, normal wear and tear, or unauthorized repairs.",
    },
    {
      category: language === "no" ? "Garanti" : "Warranty",
      question: language === "no" ? "Hvor lang er garantiperioden?" : "How long is the warranty period?",
      answer: language === "no"
        ? "Nye produkter har 24 måneders garanti, refurbished produkter har 12 måneders garanti, og reparasjoner har 3 måneders garanti. I tillegg har forbrukere 5 års reklamasjonsrett."
        : "New products have 24 months warranty, refurbished products have 12 months warranty, and repairs have 3 months warranty. In addition, consumers have a 5-year right of complaint.",
    },
    // Betaling
    {
      category: language === "no" ? "Betaling" : "Payment",
      question: language === "no" ? "Hvilke betalingsmetoder aksepterer dere?" : "What payment methods do you accept?",
      answer: language === "no"
        ? "Vi aksepterer Visa, Mastercard, Vipps, Klarna (delbetaling og faktura), og bankoverføring for bedriftskunder."
        : "We accept Visa, Mastercard, Vipps, Klarna (installment and invoice), and bank transfer for business customers.",
    },
    {
      category: language === "no" ? "Betaling" : "Payment",
      question: language === "no" ? "Tilbyr dere faktura for bedrifter?" : "Do you offer invoices for businesses?",
      answer: language === "no"
        ? "Ja, bedriftskunder med godkjent kreditt kan betale med faktura. Betalingsfristen er 14 dager."
        : "Yes, business customers with approved credit can pay by invoice. The payment deadline is 14 days.",
    },
    // Tjenester
    {
      category: language === "no" ? "Tjenester" : "Services",
      question: language === "no" ? "Tilbyr dere support 24/7?" : "Do you offer 24/7 support?",
      answer: language === "no"
        ? "Ja, vi tilbyr 24/7 support for våre managed IT-kunder. For generelle henvendelser er vi tilgjengelige mandag-fredag 08:00-17:00."
        : "Yes, we offer 24/7 support for our managed IT customers. For general inquiries, we are available Monday-Friday 08:00-17:00.",
    },
    {
      category: language === "no" ? "Tjenester" : "Services",
      question: language === "no" ? "Hvordan kan jeg bestille en konsultasjon?" : "How can I book a consultation?",
      answer: language === "no"
        ? "Du kan bestille en uforpliktende konsultasjon via kontaktskjemaet vårt, ved å ringe +47 123 45 678, eller sende e-post til post@nornex.no."
        : "You can book a non-binding consultation via our contact form, by calling +47 123 45 678, or sending an email to post@nornex.no.",
    },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const categories = [...new Set(filteredFaqs.map((faq) => faq.category))];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "no" ? "Tilbake" : "Back"}
            </Button>
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                FAQ
              </h1>
              <p className="text-gray-400">
                {language === "no"
                  ? "Ofte stilte spørsmål"
                  : "Frequently Asked Questions"}
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {language === "no"
              ? "Finn svar på de vanligste spørsmålene om våre tjenester, levering, retur og garanti."
              : "Find answers to the most common questions about our services, shipping, returns, and warranty."}
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder={language === "no" ? "Søk i spørsmål..." : "Search questions..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {categories.map((category) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {filteredFaqs
                    .filter((faq) => faq.category === category)
                    .map((faq, index) => {
                      const globalIndex = faqs.indexOf(faq);
                      const isOpen = openIndex === globalIndex;
                      
                      return (
                        <div key={index} className="py-4 first:pt-0 last:pb-0">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full flex items-center justify-between text-left gap-4"
                            aria-expanded={isOpen}
                          >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <p className="mt-3 text-gray-600 text-sm animate-accordion">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {language === "no"
                    ? "Ingen spørsmål matcher søket ditt."
                    : "No questions match your search."}
                </p>
              </div>
            )}
          </div>

          {/* Still have questions */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === "no" ? "Fant du ikke svar?" : "Didn't find an answer?"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "no"
                    ? "Ta kontakt med oss, så hjelper vi deg gjerne."
                    : "Contact us and we'll be happy to help."}
                </p>
                <Link href="/kontakt">
                  <Button>
                    {language === "no" ? "Kontakt oss" : "Contact us"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
