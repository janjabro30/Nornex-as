"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { href: "/services/managed-it", label: t.services.managedIt.title },
      { href: "/services/cybersecurity", label: t.services.cybersecurity.title },
      { href: "/services/cloud", label: t.services.cloud.title },
      { href: "/services/support", label: t.services.support.title },
      { href: "/services/network", label: t.services.network.title },
      { href: "/services/repair", label: t.services.repair.title },
    ],
    company: [
      { href: "/about", label: t.nav.about },
      { href: "/pricing", label: t.nav.pricing },
      { href: "/blog", label: t.nav.blog },
      { href: "/contact", label: t.nav.contact },
    ],
    legal: [
      { href: "/privacy", label: t.footer.privacy },
      { href: "/terms", label: t.footer.terms },
      { href: "/cookies", label: t.footer.cookies },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/nornexas", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/nornexas", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/nornexas", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/nornexas", label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Nornex AS
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.footer.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Storgata 1, 0155 Oslo, Norge</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+47 22 00 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>kontakt@nornex.no</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-8 mb-6">{t.footer.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.newsletter}</h3>
            <p className="text-gray-400 mb-4">{t.footer.newsletterDesc}</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="w-full group">
                {t.footer.subscribe}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Nornex AS. {t.footer.allRights}
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
