"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Leaf,
  Store,
  Wrench,
  ChevronDown,
  Building2,
  Users,
  FileText,
  Info,
  Phone,
  Server,
  Shield,
  Cloud,
  Headphones,
  HardDrive,
  Globe,
  Smartphone,
  Monitor,
  Code,
  ArrowRight,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useAppStore } from "@/store";
import { SearchModal } from "@/components/modals";

interface DropdownColumn {
  title: string;
  items: {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    emoji?: string;
  }[];
}

interface NavLink {
  href: string;
  label: string;
  megaDropdown?: DropdownColumn[];
  simpleDropdown?: {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, isMobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const { items } = useCartStore();

  // Handle scroll behavior - show on scroll up, hide on scroll down
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setIsScrolled(currentScrollY > 10);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (dropdownRef.current && target instanceof Node && !dropdownRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    // Handle ESC key to close dropdowns
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setIsSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleScroll, setMobileMenuOpen]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation structure with mega dropdown for services
  const navLinks: NavLink[] = [
    { 
      href: "/tjenester", 
      label: language === "no" ? "Tjenester" : "Services",
      megaDropdown: [
        {
          title: language === "no" ? "IT-tjenester" : "IT Services",
          items: [
            { href: "/tjenester#managed-it", label: "Managed IT", icon: Server },
            { href: "/tjenester#sikkerhet", label: language === "no" ? "IT-sikkerhet" : "IT Security", icon: Shield },
            { href: "/tjenester#sky", label: language === "no" ? "Skyløsninger" : "Cloud Solutions", icon: Cloud },
            { href: "/tjenester#support", label: "24/7 Support", icon: Headphones },
            { href: "/nettbutikk", label: "Hardware", icon: HardDrive },
            { href: "/reparasjon", label: language === "no" ? "Reparasjon" : "Repair", icon: Wrench },
          ],
        },
        {
          title: language === "no" ? "Utvikling" : "Development",
          items: [
            { href: "/tjenester#web", label: language === "no" ? "Nettside-utvikling" : "Website Development", icon: Globe, emoji: "🌐" },
            { href: "/tjenester#app", label: language === "no" ? "App-utvikling" : "App Development", icon: Smartphone, emoji: "📱" },
            { href: "/tjenester#webapp", label: language === "no" ? "Webapplikasjoner" : "Web Applications", icon: Monitor, emoji: "💻" },
            { href: "/tjenester#api", label: "API-integrasjoner", icon: Code },
            { href: "/tjenester#konsultering", label: language === "no" ? "Konsultering" : "Consulting", icon: Users },
          ],
        },
        {
          title: language === "no" ? "Hurtiglenker" : "Quick Actions",
          items: [
            { href: "/tjenester", label: language === "no" ? "Se alle tjenester →" : "View all services →", icon: ArrowRight },
            { href: "/kontakt", label: language === "no" ? "Bestill konsultasjon →" : "Book consultation →", icon: Calendar },
            { href: "/pricing", label: language === "no" ? "Priser →" : "Pricing →", icon: DollarSign },
          ],
        },
      ],
    },
    { 
      href: "/nettbutikk", 
      label: language === "no" ? "Nettbutikk" : "Webshop",
    },
    { 
      href: "/reparasjon", 
      label: language === "no" ? "Reparasjon" : "Repair",
    },
    { 
      href: "/om-oss", 
      label: language === "no" ? "Om oss" : "About",
      simpleDropdown: [
        { href: "/om-oss", label: language === "no" ? "Om NORNEX" : "About NORNEX", icon: Info },
        { href: "/om-oss#team", label: language === "no" ? "Vårt team" : "Our Team", icon: Users },
        { href: "/kontakt", label: language === "no" ? "Kontakt oss" : "Contact Us", icon: Phone },
        { href: "/om-oss#partnere", label: language === "no" ? "Partnere" : "Partners", icon: Building2 },
      ],
    },
  ];

  const handleDropdownToggle = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
  };

  const handleMobileAccordion = (href: string) => {
    setMobileAccordion(mobileAccordion === href ? null : href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                NORNEX
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  {link.megaDropdown || link.simpleDropdown ? (
                    <button
                      onClick={() => handleDropdownToggle(link.href)}
                      onMouseEnter={() => setOpenDropdown(link.href)}
                      className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 rounded-md hover:bg-gray-100 ${
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                      aria-expanded={openDropdown === link.href}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.href ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 rounded-md hover:bg-gray-100 ${
                        pathname === link.href
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  )}
                  
                  {/* Mega Dropdown for Services */}
                  {link.megaDropdown && openDropdown === link.href && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-6 px-6 z-50 animate-dropdown"
                      style={{ width: "720px" }}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {link.megaDropdown.map((column, idx) => (
                          <div key={idx}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                              {column.title}
                            </h3>
                            <ul className="space-y-1">
                              {column.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {item.icon && <item.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />}
                                    <span>{item.label}</span>
                                    {item.emoji && <span className="ml-1">{item.emoji}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Simple Dropdown */}
                  {link.simpleDropdown && openDropdown === link.href && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.simpleDropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.icon && <item.icon className="w-4 h-4 text-gray-400" />}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                aria-label={language === "no" ? "Søk" : "Search"}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Link href="/nettbutikk/handlekurv" className="relative">
                <Button variant="ghost" size="icon" className="relative" aria-label={language === "no" ? "Handlekurv" : "Shopping Cart"}>
                  <ShoppingCart className="w-5 h-5" />
                  {isMounted && itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              <Button variant="ghost" size="icon" aria-label={language === "no" ? "Logg inn" : "Log in"}>
                <User className="w-5 h-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Lukk meny" : "Åpne meny"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="h-full overflow-y-auto pb-20">
            <div className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href} className="border-b border-gray-100 last:border-0">
                  {link.megaDropdown || link.simpleDropdown ? (
                    <>
                      <button
                        onClick={() => handleMobileAccordion(link.href)}
                        className="flex items-center justify-between w-full px-4 py-4 text-base font-medium text-gray-700 hover:text-blue-600"
                        aria-expanded={mobileAccordion === link.href}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === link.href ? "rotate-180" : ""}`} />
                      </button>
                      
                      {mobileAccordion === link.href && (
                        <div className="pb-4 pl-4 space-y-1 animate-accordion">
                          {link.megaDropdown && link.megaDropdown.map((column, idx) => (
                            <div key={idx} className="mb-4">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 mb-2">
                                {column.title}
                              </h4>
                              {column.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileAccordion(null);
                                  }}
                                >
                                  {item.icon && <item.icon className="w-5 h-5" />}
                                  <span>{item.label}</span>
                                  {item.emoji && <span>{item.emoji}</span>}
                                </Link>
                              ))}
                            </div>
                          ))}
                          {link.simpleDropdown && link.simpleDropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileAccordion(null);
                              }}
                            >
                              {item.icon && <item.icon className="w-5 h-5" />}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-4 text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="pt-6 space-y-3 px-4">
                <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {language === "no" ? "Kontakt oss" : "Contact Us"}
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-16" />
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
