/**
 * NORNEX AS - Public Header Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  ChevronDown,
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { name: 'Managed IT', href: '/tjenester/managed-it', icon: Server },
  { name: 'IT-sikkerhet', href: '/tjenester/it-sikkerhet', icon: Shield },
  { name: 'Skyløsninger', href: '/tjenester/skylosninger', icon: Cloud },
  { name: '24/7 Support', href: '/tjenester/support', icon: Headphones },
  { name: 'Hardware', href: '/tjenester/hardware', icon: Laptop },
  { name: 'Reparasjon', href: '/tjenester/reparasjon', icon: Wrench },
  { name: 'Nettside-utvikling', href: '/tjenester/nettside-utvikling', icon: Globe },
  { name: 'App-utvikling', href: '/tjenester/app-utvikling', icon: Smartphone },
  { name: 'Webapplikasjoner', href: '/tjenester/webapplikasjoner', icon: Code },
  { name: 'API-integrasjoner', href: '/tjenester/api-integrasjoner', icon: LinkIcon },
  { name: 'IT-konsultering', href: '/tjenester/konsultering', icon: Lightbulb },
];

const navItems = [
  { name: 'Hjem', href: '/' },
  { name: 'Tjenester', href: '/tjenester', hasDropdown: true },
  { name: 'Nettbutikk', href: '/nettbutikk' },
  { name: 'Reparasjon', href: '/reparasjon' },
  { name: 'Blogg', href: '/blogg' },
  { name: 'Om oss', href: '/om-oss' },
  { name: 'Kontakt', href: '/kontakt' },
];

interface PublicHeaderProps {
  cartCount?: number;
}

export function PublicHeader({ cartCount = 0 }: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 font-bold text-white shadow-lg">
              N
            </div>
            <span className="text-xl font-bold text-slate-900">NORNEX AS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                        pathname.startsWith('/tjenester')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Mega Dropdown */}
                    {servicesOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[600px]">
                        <div className="rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5">
                          <div className="grid grid-cols-2 gap-2">
                            {services.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                                >
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-900">
                                    {service.name}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-4 border-t pt-4">
                            <Link
                              href="/tjenester"
                              className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                              Se alle tjenester →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <button
              className="hidden lg:flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Søk"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/handlekurv"
              className="relative flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Handlekurv"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/min-portal"
              className="hidden lg:flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Min konto"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/kontakt"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Få tilbud
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Lukk meny' : 'Åpne meny'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-2 text-base font-medium rounded-lg',
                          pathname.startsWith('/tjenester')
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-slate-700'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="ml-4 mt-2 space-y-1">
                        {services.slice(0, 6).map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-2 text-base font-medium rounded-lg',
                        pathname === item.href
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-700'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/min-portal"
                className="block px-4 py-2 text-base font-medium text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Min konto
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
