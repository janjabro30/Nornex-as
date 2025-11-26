"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Loader2,
  Building2,
  Headphones,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  gdprConsent: boolean;
}

export default function ContactPage() {
  const { language } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    budget: "",
    gdprConsent: false,
  });

  const services = [
    { value: "web", label: language === "no" ? "Webutvikling" : "Web Development" },
    { value: "app", label: language === "no" ? "App-utvikling" : "App Development" },
    { value: "webapp", label: language === "no" ? "Webapplikasjoner" : "Web Applications" },
    { value: "managed-it", label: "Managed IT" },
    { value: "security", label: language === "no" ? "IT-sikkerhet" : "IT Security" },
    { value: "cloud", label: language === "no" ? "Skyløsninger" : "Cloud Solutions" },
    { value: "support", label: "24/7 Support" },
    { value: "hardware", label: "Hardware" },
    { value: "repair", label: language === "no" ? "Reparasjon" : "Repair" },
    { value: "other", label: language === "no" ? "Annet" : "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      setError(language === "no" ? "Du må godta personvernvilkårene" : "You must accept the privacy terms");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || (language === "no" ? "Noe gikk galt" : "Something went wrong"));
      }
    } catch {
      setError(language === "no" ? "Kunne ikke sende skjema. Prøv igjen." : "Could not submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "no" ? "Kontakt oss" : "Contact Us"}
            </h1>
            <p className="text-xl text-gray-300">
              {language === "no"
                ? "Vi er her for å hjelpe deg. Ta kontakt for en uforpliktende samtale om dine IT-behov."
                : "We are here to help you. Contact us for a non-binding conversation about your IT needs."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === "no" ? "Takk for din henvendelse!" : "Thank you for your inquiry!"}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {language === "no"
                          ? "Vi kontakter deg innen 24 timer."
                          : "We will contact you within 24 hours."}
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline">
                        {language === "no" ? "Send ny henvendelse" : "Send new inquiry"}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {language === "no" ? "Send oss en melding" : "Send us a message"}
                      </h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              {language === "no" ? "Navn" : "Name"} *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder={language === "no" ? "Ditt navn" : "Your name"}
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              E-post *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="din@epost.no"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              {language === "no" ? "Telefon" : "Phone"}
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+47 XXX XX XXX"
                            />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                              {language === "no" ? "Bedrift" : "Company"}
                            </label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder={language === "no" ? "Bedriftsnavn" : "Company name"}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === "no" ? "Tjeneste" : "Service"} *
                          </label>
                          <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">{language === "no" ? "Velg tjeneste..." : "Select service..."}</option>
                            {services.map((service) => (
                              <option key={service.value} value={service.value}>
                                {service.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === "no" ? "Budsjett (valgfritt)" : "Budget (optional)"}
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">{language === "no" ? "Velg budsjett..." : "Select budget..."}</option>
                            <option value="under-50k">{language === "no" ? "Under 50 000 kr" : "Under 50,000 NOK"}</option>
                            <option value="50k-100k">50 000 - 100 000 kr</option>
                            <option value="100k-250k">100 000 - 250 000 kr</option>
                            <option value="250k-500k">250 000 - 500 000 kr</option>
                            <option value="over-500k">{language === "no" ? "Over 500 000 kr" : "Over 500,000 NOK"}</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === "no" ? "Melding" : "Message"} *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={language === "no" ? "Beskriv ditt prosjekt eller behov..." : "Describe your project or needs..."}
                          />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="gdprConsent"
                            checked={formData.gdprConsent}
                            onChange={handleChange}
                            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">
                            {language === "no"
                              ? "Jeg godtar at NORNEX behandler mine personopplysninger for å besvare min henvendelse. Les vår "
                              : "I agree that NORNEX may process my personal data to respond to my inquiry. Read our "}
                            <Link href="/personvern" className="text-blue-600 hover:underline">
                              {language === "no" ? "personvernerklæring" : "privacy policy"}
                            </Link>
                            . *
                          </span>
                        </label>

                        {error && (
                          <p className="text-red-600 text-sm">{error}</p>
                        )}

                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              {language === "no" ? "Sender..." : "Sending..."}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              {language === "no" ? "Send forespørsel" : "Send request"}
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {language === "no" ? "Kontaktinformasjon" : "Contact Information"}
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === "no" ? "Besøksadresse" : "Address"}
                        </p>
                        <p className="text-gray-600">Brynsveien 18</p>
                        <p className="text-gray-600">0667 Oslo, Norway</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === "no" ? "Telefon" : "Phone"}
                        </p>
                        <a href="tel:+4712345678" className="text-blue-600 hover:underline">
                          +47 123 45 678
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">E-post</p>
                        <a href="mailto:post@nornex.no" className="text-blue-600 hover:underline">
                          post@nornex.no
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Headphones className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Support</p>
                        <a href="mailto:support@nornex.no" className="text-blue-600 hover:underline">
                          support@nornex.no
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === "no" ? "Åpningstider" : "Opening Hours"}
                        </p>
                        <p className="text-gray-600">{language === "no" ? "Mandag - Fredag: 08:00 - 17:00" : "Monday - Friday: 08:00 - 17:00"}</p>
                        <p className="text-gray-600">Support: 24/7</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">NORNEX AS</p>
                      <p className="text-gray-600">{language === "no" ? "Org.nr:" : "Org. no:"} XXX XXX XXX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {language === "no" ? "Følg oss" : "Follow us"}
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, href: "https://facebook.com/nornex", label: "Facebook" },
                      { icon: Linkedin, href: "https://linkedin.com/company/nornex", label: "LinkedIn" },
                      { icon: Instagram, href: "https://instagram.com/nornex", label: "Instagram" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      {language === "no" ? "Kart (Google Maps)" : "Map (Google Maps)"}
                    </p>
                    <p className="text-gray-400 text-xs">Brynsveien 18, 0667 Oslo</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
