"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  Building2,
  Users,
  FileText,
  Info,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";

interface DropdownItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  dropdown?: DropdownItem[];
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage, isMobileMenuOpen, setMobileMenuOpen } =
    useAppStore();
  const { items } = useCartStore();
  const t = getTranslation(language);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: NavLink[] = [
    { 
      href: "/tjenester", 
      label: language === "no" ? "Tjenester" : "Services",
      dropdown: [
        { href: "/tjenester", label: language === "no" ? "Alle tjenester" : "All Services", icon: Building2 },
        { href: "/nettbutikk", label: language === "no" ? "Nettbutikk" : "Shop", icon: Store },
        { href: "/reparasjon", label: language === "no" ? "Reparasjon" : "Repair", icon: Wrench },
        { href: "/selg-til-oss", label: language === "no" ? "Selg til oss" : "Sell to Us", icon: Recycle },
        { href: "/pricing", label: language === "no" ? "Priser" : "Pricing", icon: FileText },
      ]
    },
    { href: "/reparasjon", label: language === "no" ? "Reparasjon" : "Repair", icon: Wrench },
    { href: "/nettbutikk", label: language === "no" ? "Nettbutikk" : "Webshop", icon: Store },
    { 
      href: "/selg-til-oss", 
      label: language === "no" ? "Selg til oss" : "Sell to Us", 
      icon: Recycle,
      dropdown: [
        { href: "/selg-til-oss", label: language === "no" ? "Selg enhet" : "Sell Device", icon: Recycle },
        { href: "/pricing", label: language === "no" ? "Prisguide" : "Price Guide", icon: FileText },
      ]
    },
    { href: "/miljo", label: language === "no" ? "Miljø" : "Environment", icon: Leaf },
    { 
      href: "/om-oss", 
      label: language === "no" ? "Om oss" : "About",
      dropdown: [
        { href: "/om-oss", label: language === "no" ? "Om Nornex" : "About Nornex", icon: Info },
        { href: "/om-oss#kontakt", label: language === "no" ? "Kontakt" : "Contact", icon: Phone },
        { href: "/vilkar", label: language === "no" ? "Vilkår" : "Terms", icon: FileText },
        { href: "/privacy-policy", label: language === "no" ? "Personvern" : "Privacy", icon: Users },
      ]
    },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "no" ? "en" : "no");
  };

  const handleDropdownToggle = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
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
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.dropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(link.href)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors hover:text-green-600 rounded-md hover:bg-gray-100 ${
                      pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.href ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors hover:text-green-600 rounded-md hover:bg-gray-100 ${
                      pathname === link.href
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                    {link.badge && (
                      <Badge variant="success" className="ml-1 text-[10px] px-1.5 py-0">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {link.dropdown && openDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
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
              className="lg:hidden"
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
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(link.href)}
                        className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          {link.icon && <link.icon className="w-4 h-4" />}
                          <span>{link.label}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.href ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === link.href && (
                        <div className="ml-4 mt-1 space-y-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-md"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {item.icon && <item.icon className="w-4 h-4" />}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center space-x-2 px-2 py-2 text-sm font-medium transition-colors hover:text-green-600 hover:bg-gray-100 rounded-md ${
                        pathname === link.href
                          ? "text-green-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      <span>{link.label}</span>
                      {link.badge && (
                        <Badge variant="success" className="text-[10px] px-1.5 py-0">
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
