"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Globe,
  Leaf,
  Recycle,
  Store,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, isMobileMenuOpen, setMobileMenuOpen } =
    useAppStore();
  const { items } = useCartStore();
  const t = getTranslation(language);

  useEffect(() => {
    // Use a microtask to avoid synchronous setState warning
    Promise.resolve().then(() => setIsMounted(true));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/nettbutikk", label: t.nav.shop, icon: Store },
    { href: "/tjenester", label: language === "no" ? "Tjenester" : "Services", icon: Wrench },
    { href: "/selg-til-oss", label: t.nav.sellToUs, icon: Recycle },
    { href: "/miljo", label: t.nav.environment, icon: Leaf },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "no" ? "en" : "no");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Nornex<span className="text-green-600">AS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Cart */}
            <Link href="/nettbutikk/handlekurv" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {isMounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-green-600 ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-green-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
