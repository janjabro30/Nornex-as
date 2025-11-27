/**
 * NORNEX AS - Individual Service Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Server,
  Shield,
  Cloud,
  Headphones,
  Laptop,
  Wrench,
  Globe,
  Smartphone,
  Code,
  Link as LinkIcon,
  Lightbulb,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Phone,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';
import { servicesData, getServiceBySlug, getAllServiceSlugs, type ServiceData } from '@/lib/services-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Shield,
  Cloud,
  Headphones,
  Laptop,
  Wrench,
  Globe,
  Smartphone,
  Code,
  Link: LinkIcon,
  Lightbulb,
};

// Generate static params for all services
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Tjeneste ikke funnet' };
  
  return {
    title: `${service.title} | NORNEX AS`,
    description: service.heroDescription,
  };
}

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

function FAQAccordion({ faq }: { faq: ServiceData['faq'] }) {
  return (
    <div className="space-y-4">
      {faq.map((item, index) => (
        <details key={index} className="group rounded-xl border border-slate-200 bg-white">
          <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900">
            <span>{item.question}</span>
            <ChevronDown className="h-5 w-5 text-slate-500 group-open:hidden" />
            <ChevronUp className="h-5 w-5 text-slate-500 hidden group-open:block" />
          </summary>
          <div className="px-6 pb-6 text-slate-600">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Server;

  // Get related services (exclude current)
  const relatedServices = servicesData
    .filter(s => s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-6">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-xl text-slate-300">
              {service.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Få tilbud
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+4722123456"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Ring oss
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Hva er inkludert
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{feature}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Slik fungerer det
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Priser
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-center max-w-2xl mx-auto">
            Velg pakken som passer best for din bedrift. Alle priser er eks. mva.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {service.pricing.map((tier) => (
              <div
                key={tier.name}
                className={`
                  rounded-2xl p-8 transition-shadow
                  ${tier.highlighted
                    ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-4 shadow-xl'
                    : 'bg-white border border-slate-200 hover:shadow-lg'
                  }
                `}
              >
                {tier.highlighted && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                    <Star className="h-4 w-4" /> Mest populær
                  </div>
                )}
                <h3 className={`text-xl font-bold ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <div className={`mt-4 text-3xl font-bold ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {tier.price}
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span className={tier.highlighted ? 'text-blue-100' : 'text-slate-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt"
                  className={`
                    mt-8 block w-full py-3 px-4 rounded-lg font-medium text-center transition-colors
                    ${tier.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    }
                  `}
                >
                  Velg {tier.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Ofte stilte spørsmål
          </h2>
          <div className="mt-12">
            <FAQAccordion faq={service.faq} />
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Relaterte tjenester
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {relatedServices.map((related) => {
              const RelatedIcon = iconMap[related.icon] || Server;
              return (
                <Link
                  key={related.slug}
                  href={`/tjenester/${related.slug}`}
                  className="group rounded-2xl p-6 bg-white border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <RelatedIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-slate-600 line-clamp-2">
                    {related.shortDescription}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Klar til å komme i gang?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Kontakt oss i dag for en gratis konsultasjon og tilpasset tilbud.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors shadow-lg"
            >
              Få gratis tilbud
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+4722123456"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
            >
              <Phone className="h-5 w-5" />
              +47 22 12 34 56
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
