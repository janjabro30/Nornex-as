"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";

export function Footer() {
  const { language } = useAppStore();
  const t = getTranslation(language);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Nornex<span className="text-green-500">AS</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              {language === "no"
                ? "Bærekraftige IT-løsninger for en grønnere fremtid. Vi gir teknologi nytt liv."
                : "Sustainable IT solutions for a greener future. We give technology new life."}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "no" ? "Hurtiglenker" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nettbutikk"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link
                  href="/selg-til-oss"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  {t.nav.sellToUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/miljo"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  {t.nav.environment}
                </Link>
              </li>
              <li>
                <Link
                  href="/om-oss"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "no" ? "Tjenester" : "Services"}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 text-sm">
                  {language === "no" ? "IT-utstyr salg" : "IT Equipment Sales"}
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">
                  {language === "no" ? "Enhetsinnkjøp" : "Device Buyback"}
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">
                  {language === "no" ? "Datasletting" : "Data Destruction"}
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">
                  {language === "no" ? "E-avfall resirkulering" : "E-Waste Recycling"}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t.nav.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Brynsveien 18<br />
                  0667 Oslo, Norway
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a
                  href="tel:+4712345678"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  +47 123 45 678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a
                  href="mailto:post@nornex.no"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  post@nornex.no
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} Nornex AS. {language === "no" ? "Alle rettigheter reservert." : "All rights reserved."}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/personvern"
                className="text-sm text-gray-500 hover:text-green-500 transition-colors"
              >
                {language === "no" ? "Personvern" : "Privacy Policy"}
              </Link>
              <Link
                href="/vilkar"
                className="text-sm text-gray-500 hover:text-green-500 transition-colors"
              >
                {language === "no" ? "Vilkår" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
