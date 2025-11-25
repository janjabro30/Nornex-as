"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { Accordion } from "@/components/ui";

interface FAQItem {
  id: string;
  questionNo: string;
  questionEn: string;
  answerNo: string;
  answerEn: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    questionNo: "Hva inkluderer administrert IT-tjenester?",
    questionEn: "What is included in managed IT services?",
    answerNo: "Våre administrert IT-tjenester inkluderer proaktiv overvåking av alle systemer, regelmessige sikkerhetsoppdateringer, backup-administrasjon, helpdesk-support, nettverksadministrasjon, og strategisk IT-rådgivning. Vi sørger for at din IT-infrastruktur alltid fungerer optimalt.",
    answerEn: "Our managed IT services include proactive monitoring of all systems, regular security updates, backup management, helpdesk support, network administration, and strategic IT consulting. We ensure your IT infrastructure always operates optimally.",
  },
  {
    id: "2",
    questionNo: "Hvor raskt kan jeg forvente svar på support-henvendelser?",
    questionEn: "How quickly can I expect a response to support requests?",
    answerNo: "For kritiske problemer garanterer vi respons innen 15 minutter. For vanlige henvendelser er gjennomsnittlig responstid under 1 time. Vårt 24/7 supportteam er alltid tilgjengelig for å hjelpe deg.",
    answerEn: "For critical issues, we guarantee a response within 15 minutes. For regular inquiries, the average response time is under 1 hour. Our 24/7 support team is always available to help you.",
  },
  {
    id: "3",
    questionNo: "Tilbyr dere cybersikkerhetsløsninger?",
    questionEn: "Do you offer cybersecurity solutions?",
    answerNo: "Ja, vi tilbyr omfattende cybersikkerhetsløsninger inkludert brannmur-administrasjon, antivirus og anti-malware, e-postsikkerhet, sikkerhetsopplæring for ansatte, penetrasjonstesting, og overvåking av sikkerhetstrusler døgnet rundt.",
    answerEn: "Yes, we offer comprehensive cybersecurity solutions including firewall management, antivirus and anti-malware, email security, employee security training, penetration testing, and 24/7 security threat monitoring.",
  },
  {
    id: "4",
    questionNo: "Kan dere hjelpe med migrering til skyen?",
    questionEn: "Can you help with cloud migration?",
    answerNo: "Absolutt! Vi har omfattende erfaring med skymigrering til Microsoft Azure, AWS, og Google Cloud. Vi planlegger og gjennomfører migreringen med minimal nedetid, og sørger for at alle data overføres sikkert.",
    answerEn: "Absolutely! We have extensive experience with cloud migration to Microsoft Azure, AWS, and Google Cloud. We plan and execute the migration with minimal downtime, ensuring all data is transferred securely.",
  },
  {
    id: "5",
    questionNo: "Tilbyr dere datainnhenting etter harddiskfeil?",
    questionEn: "Do you offer data recovery after hard drive failure?",
    answerNo: "Ja, vi tilbyr profesjonell datainnhenting fra alle typer lagringsmedier. Vårt team har spesialkompetanse innen mikrolodding og kan ofte gjenopprette data selv fra alvorlig skadede enheter.",
    answerEn: "Yes, we offer professional data recovery from all types of storage media. Our team has specialized expertise in micro-soldering and can often recover data even from severely damaged devices.",
  },
  {
    id: "6",
    questionNo: "Hvor i Norge opererer dere?",
    questionEn: "Where in Norway do you operate?",
    answerNo: "Vi har hovedkontor i Oslo, men tilbyr tjenester over hele Norge. Med fjernstøtte kan vi hjelpe kunder hvor som helst, og for fysisk tilstedeværelse har vi partnere i alle større norske byer.",
    answerEn: "We are headquartered in Oslo, but offer services throughout Norway. With remote support, we can help customers anywhere, and for physical presence, we have partners in all major Norwegian cities.",
  },
  {
    id: "7",
    questionNo: "Hvordan fungerer prissettingen deres?",
    questionEn: "How does your pricing work?",
    answerNo: "Vi tilbyr fleksible prismodeller som passer forskjellige behov. Fra månedlige pakker med fast pris til timer-baserte løsninger. Ta kontakt for en gratis vurdering og et skreddersydd tilbud for din bedrift.",
    answerEn: "We offer flexible pricing models to suit different needs. From monthly packages with fixed prices to hourly-based solutions. Contact us for a free assessment and a customized offer for your business.",
  },
  {
    id: "8",
    questionNo: "Er tjenestene deres GDPR-kompatible?",
    questionEn: "Are your services GDPR compliant?",
    answerNo: "Ja, alle våre tjenester er fullt GDPR-kompatible. Vi følger strenge retningslinjer for databeskyttelse og personvern. Alle data lagres i sikre datasentre lokalisert i Norge eller EU.",
    answerEn: "Yes, all our services are fully GDPR compliant. We follow strict guidelines for data protection and privacy. All data is stored in secure data centers located in Norway or the EU.",
  },
];

export function FAQSection() {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const accordionItems = faqData.map((faq) => ({
    id: faq.id,
    trigger: (
      <span className="text-left font-medium text-gray-900">
        {language === "no" ? faq.questionNo : faq.questionEn}
      </span>
    ),
    content: (
      <p className="text-gray-600 leading-relaxed">
        {language === "no" ? faq.answerNo : faq.answerEn}
      </p>
    ),
  }));

  return (
    <section ref={ref} className="py-24 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.faq.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion items={accordionItems} />
        </motion.div>
      </div>
    </section>
  );
}
