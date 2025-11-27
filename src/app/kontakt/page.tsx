/**
 * NORNEX AS - Contact Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      content: '+47 22 12 34 56',
      link: 'tel:+4722123456',
    },
    {
      icon: Mail,
      title: 'E-post',
      content: 'post@nornex.no',
      link: 'mailto:post@nornex.no',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Brynsveien 18, 0667 Oslo',
      link: 'https://maps.google.com/?q=Brynsveien+18+Oslo',
    },
    {
      icon: Clock,
      title: 'Åpningstider',
      content: 'Man-Fre: 08:00-17:00',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Kontakt oss
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Vi er her for å hjelpe deg. Ta kontakt så svarer vi så raskt som mulig.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="text-center py-12 px-6 bg-green-50 rounded-2xl">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    Takk for din henvendelse!
                  </h2>
                  <p className="mt-4 text-slate-600">
                    Vi har mottatt meldingen din og vil svare deg så snart som mulig.
                    Du vil motta en bekreftelse på e-post.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Send en ny henvendelse
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Send oss en melding
                      </h2>
                      <p className="text-slate-500 text-sm">
                        Vi svarer vanligvis innen 1-2 virkedager
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Navn *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ditt fulle navn"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          E-post *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="din@epost.no"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+47 XXX XX XXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Bedrift
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Bedriftsnavn"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Emne *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Velg emne</option>
                        <option value="tilbud">Få tilbud</option>
                        <option value="support">Support</option>
                        <option value="reparasjon">Reparasjon</option>
                        <option value="salg">Salg</option>
                        <option value="samarbeid">Samarbeid</option>
                        <option value="annet">Annet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Melding *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Beskriv hva du trenger hjelp med..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sender...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send melding
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  Kontaktinformasjon
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    const content = (
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">{info.title}</div>
                          <div className="font-medium text-slate-900">{info.content}</div>
                        </div>
                      </div>
                    );

                    if (info.link) {
                      return (
                        <a
                          key={info.title}
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block hover:bg-white rounded-lg p-2 -m-2 transition-colors"
                        >
                          {content}
                        </a>
                      );
                    }
                    return <div key={info.title}>{content}</div>;
                  })}
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Trenger du hjelp nå?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Ring oss direkte for rask hjelp med akutte IT-problemer.
                </p>
                <a
                  href="tel:+4722123456"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Ring nå
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-200 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Kart kommer snart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
