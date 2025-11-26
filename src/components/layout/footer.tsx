"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter,
  Youtube,
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const { language } = useAppStore();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      setSubscribeError(language === "no" ? "Du må godta personvernvilkårene" : "You must accept the privacy terms");
      return;
    }

    if (!email || !email.includes("@")) {
      setSubscribeError(language === "no" ? "Vennligst oppgi en gyldig e-postadresse" : "Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscribeError("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribeSuccess(true);
        setEmail("");
        setGdprConsent(false);
      } else {
        const data = await response.json();
        setSubscribeError(data.error || (language === "no" ? "Noe gikk galt" : "Something went wrong"));
      }
    } catch {
      setSubscribeError(language === "no" ? "Noe gikk galt. Prøv igjen." : "Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  // Services links
  const servicesLinks = [
    { href: "/tjenester#managed-it", label: "Managed IT" },
    { href: "/tjenester#sikkerhet", label: language === "no" ? "IT-sikkerhet" : "IT Security" },
    { href: "/tjenester#sky", label: language === "no" ? "Skyløsninger" : "Cloud Solutions" },
    { href: "/tjenester#support", label: "24/7 Support" },
    { href: "/tjenester#web", label: language === "no" ? "Nettside-utvikling" : "Website Development", featured: true },
    { href: "/tjenester#app", label: language === "no" ? "App-utvikling" : "App Development", featured: true },
    { href: "/tjenester#webapp", label: language === "no" ? "Webapplikasjoner" : "Web Applications", featured: true },
    { href: "/nettbutikk", label: "Hardware" },
    { href: "/reparasjon", label: language === "no" ? "Reparasjon" : "Repair" },
  ];

  // Company links
  const companyLinks = [
    { href: "/om-oss", label: language === "no" ? "Om oss" : "About Us" },
    { href: "/om-oss#team", label: language === "no" ? "Vårt team" : "Our Team" },
    { href: "/kontakt", label: language === "no" ? "Kontakt oss" : "Contact Us" },
    { href: "/om-oss#partnere", label: language === "no" ? "Partnere" : "Partners" },
    { href: "/miljo", label: language === "no" ? "Bærekraft" : "Sustainability" },
  ];

  // Support links
  const supportLinks = [
    { href: "/kontakt", label: language === "no" ? "Kundeservice" : "Customer Service" },
    { href: "/faq", label: "FAQ" },
    { href: "/frakt", label: language === "no" ? "Frakt og levering" : "Shipping & Delivery" },
    { href: "/retur", label: language === "no" ? "Retur og reklamasjon" : "Returns & Claims" },
    { href: "/personvern", label: language === "no" ? "Personvern" : "Privacy Policy" },
    { href: "/vilkar", label: language === "no" ? "Vilkår og betingelser" : "Terms & Conditions" },
    { href: "/cookie-policy", label: "Cookie-policy" },
  ];

  // Social media links (in production, these would come from /api/social-media)
  const socialLinks = [
    { href: "https://facebook.com/nornex", icon: Facebook, label: "Facebook" },
    { href: "https://linkedin.com/company/nornex", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/nornex", icon: Instagram, label: "Instagram" },
    { href: "https://twitter.com/nornex", icon: Twitter, label: "Twitter" },
    { href: "https://youtube.com/nornex", icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8]">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {language === "no" ? "Hold deg oppdatert" : "Stay Updated"}
            </h3>
            <p className="text-slate-400 mb-6">
              {language === "no" 
                ? "Få de siste nyhetene om IT-tjenester, tilbud og bransjetrender."
                : "Get the latest news about IT services, offers, and industry trends."}
            </p>
            
            {subscribeSuccess ? (
              <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 py-4 px-6 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>
                  {language === "no" 
                    ? "Takk for at du abonnerer! Du vil motta en bekreftelse snart."
                    : "Thanks for subscribing! You will receive a confirmation soon."}
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={language === "no" ? "Din e-postadresse" : "Your email address"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                  />
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {language === "no" ? "Abonner" : "Subscribe"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                
                <label className="flex items-start gap-3 text-sm text-slate-400 cursor-pointer max-w-lg mx-auto">
                  <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    {language === "no" 
                      ? "Jeg godtar at NORNEX kan sende meg nyhetsbrev og informasjon. Les vår "
                      : "I agree that NORNEX may send me newsletters and information. Read our "}
                    <Link href="/personvern" className="text-blue-400 hover:underline">
                      {language === "no" ? "personvernerklæring" : "privacy policy"}
                    </Link>
                    .
                  </span>
                </label>
                
                {subscribeError && (
                  <p className="text-red-400 text-sm">{subscribeError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                NORNEX
              </span>
            </Link>
            <p className="text-blue-400 font-medium">
              {language === "no" ? "Din komplette IT-partner" : "Your Complete IT Partner"}
            </p>
            <p className="text-sm text-slate-400">
              {language === "no"
                ? "Vi leverer profesjonelle IT-tjenester, webutvikling, app-utvikling og support til bedrifter i hele Norge. ISO-sertifisert kvalitet med fokus på sikkerhet og bærekraft."
                : "We deliver professional IT services, web development, app development, and support to businesses throughout Norway. ISO-certified quality with focus on security and sustainability."}
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "no" ? "Tjenester" : "Services"}
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.featured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "no" ? "Selskap" : "Company"}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "no" ? "Support" : "Support"}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "no" ? "Kontakt" : "Contact"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  Brynsveien 18<br />
                  0667 Oslo, Norway
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+4712345678"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  +47 123 45 678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:post@nornex.no"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  post@nornex.no
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-400">
                  <p>{language === "no" ? "Man-Fre: 08:00 - 17:00" : "Mon-Fri: 08:00 - 17:00"}</p>
                  <p>{language === "no" ? "Support: 24/7" : "Support: 24/7"}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-slate-500">
              © {currentYear} NORNEX AS. {language === "no" ? "Alle rettigheter reservert." : "All rights reserved."}
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/personvern"
                className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                {language === "no" ? "Personvern" : "Privacy"}
              </Link>
              <span className="text-slate-700 hidden md:inline">|</span>
              <Link
                href="/vilkar"
                className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                {language === "no" ? "Vilkår" : "Terms"}
              </Link>
              <span className="text-slate-700 hidden md:inline">|</span>
              <Link
                href="/cookie-policy"
                className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
            
            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 mr-2">
                {language === "no" ? "Betalingsmetoder:" : "Payment methods:"}
              </span>
              <div className="flex items-center gap-2">
                {/* Vipps */}
                <div className="w-10 h-6 bg-[#FF5B24] rounded flex items-center justify-center text-white text-[10px] font-bold">
                  Vipps
                </div>
                {/* Visa */}
                <div className="w-10 h-6 bg-[#1A1F71] rounded flex items-center justify-center text-white text-[10px] font-bold">
                  VISA
                </div>
                {/* Mastercard */}
                <div className="w-10 h-6 bg-[#EB001B] rounded flex items-center justify-center text-white text-[10px] font-bold">
                  MC
                </div>
                {/* Klarna */}
                <div className="w-10 h-6 bg-[#FFB3C7] rounded flex items-center justify-center text-[#0A0B09] text-[10px] font-bold">
                  K.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
