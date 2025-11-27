/**
 * NORNEX AS - Public Footer Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import Link from 'next/link';
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
} from 'lucide-react';

const footerLinks = {
  tjenester: [
    { name: 'Managed IT', href: '/tjenester/managed-it' },
    { name: 'IT-sikkerhet', href: '/tjenester/it-sikkerhet' },
    { name: 'Skyløsninger', href: '/tjenester/skylosninger' },
    { name: '24/7 Support', href: '/tjenester/support' },
    { name: 'Hardware', href: '/tjenester/hardware' },
    { name: 'Reparasjon', href: '/tjenester/reparasjon' },
  ],
  selskap: [
    { name: 'Om oss', href: '/om-oss' },
    { name: 'Blogg', href: '/blogg' },
    { name: 'Karriere', href: '/karriere' },
    { name: 'Partnere', href: '/partnere' },
  ],
  support: [
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Garanti', href: '/garanti' },
    { name: 'Frakt', href: '/frakt' },
    { name: 'Retur', href: '/retur' },
  ],
  juridisk: [
    { name: 'Personvern', href: '/personvern' },
    { name: 'Vilkår', href: '/vilkar' },
    { name: 'Cookies', href: '/cookie-policy' },
    { name: 'Tilgjengelighet', href: '/tilgjengelighet' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/nornex', icon: Facebook },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/nornex', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com/nornex', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/nornex', icon: Youtube },
];

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Få IT-tips rett i innboksen</h3>
              <p className="mt-1 text-slate-400">
                Meld deg på vårt nyhetsbrev for ukentlige tips og nyheter.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="din@epost.no"
                className="flex-1 rounded-lg border-0 bg-slate-800 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 font-bold text-white">
                N
              </div>
              <span className="text-xl font-bold">NORNEX AS</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Profesjonelle IT-tjenester for bedrifter i Oslo og omegn. Vi er din 
              pålitelige partner for alt innen IT.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Brynsveien 18, 0667 Oslo</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+4722123456" className="hover:text-white">
                  +47 22 12 34 56
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:post@nornex.no" className="hover:text-white">
                  post@nornex.no
                </a>
              </div>
            </div>
          </div>

          {/* Tjenester */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tjenester</h4>
            <ul className="space-y-2">
              {footerLinks.tjenester.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Selskap */}
          <div>
            <h4 className="font-semibold text-white mb-4">Selskap</h4>
            <ul className="space-y-2">
              {footerLinks.selskap.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisk */}
          <div>
            <h4 className="font-semibold text-white mb-4">Juridisk</h4>
            <ul className="space-y-2">
              {footerLinks.juridisk.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Payment */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-sm">Betalingsmetoder:</span>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">
                  Vipps
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">
                  Visa
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">
                  Mastercard
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">
                  Klarna
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} NORNEX AS. Alle rettigheter reservert.</p>
            <p className="mt-1">Org.nr: 123 456 789 MVA | Medlem av NHO</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
