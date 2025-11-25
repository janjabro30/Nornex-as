"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollProgress } from "@/hooks/useAnimations";
import { Button } from "@/components/ui";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Shield,
  Cloud,
  Headphones,
  Network,
  Wrench,
  Monitor,
} from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  managedIt: <Monitor className="h-5 w-5" />,
  cybersecurity: <Shield className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  support: <Headphones className="h-5 w-5" />,
  network: <Network className="h-5 w-5" />,
  repair: <Wrench className="h-5 w-5" />,
};

type ServiceKey = "managedIt" | "cybersecurity" | "cloud" | "support" | "network" | "repair";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const scrollProgress = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services, hasDropdown: true },
    { href: "/about", label: t.nav.about },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  const services: { key: ServiceKey; href: string }[] = [
    { key: "managedIt", href: "/services/managed-it" },
    { key: "cybersecurity", href: "/services/cybersecurity" },
    { key: "cloud", href: "/services/cloud" },
    { key: "support", href: "/services/support" },
    { key: "network", href: "/services/network" },
    { key: "repair", href: "/services/repair" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Nornex AS
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.href} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-gray-800 hover:text-blue-600"
                      }`}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-gray-800 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Menu for Services */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                          onMouseEnter={() => setIsServicesOpen(true)}
                          onMouseLeave={() => setIsServicesOpen(false)}
                        >
                          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 min-w-[400px] grid grid-cols-2 gap-4">
                            {services.map((service) => (
                              <Link
                                key={service.key}
                                href={service.href}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  {serviceIcons[service.key]}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">
                                    {t.services[service.key].title}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "no" ? "en" : "no")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-gray-700 hover:bg-white/50"
                }`}
              >
                <Globe className="h-4 w-4" />
                {language === "no" ? "EN" : "NO"}
              </button>

              {/* CTA Button */}
              <Button size="sm">{t.nav.getQuote}</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t mt-3"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-3 text-gray-700 font-medium hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <button
                    onClick={() => setLanguage(language === "no" ? "en" : "no")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
                  >
                    <Globe className="h-4 w-4" />
                    {language === "no" ? "English" : "Norsk"}
                  </button>
                  <Button className="flex-1">{t.nav.getQuote}</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
