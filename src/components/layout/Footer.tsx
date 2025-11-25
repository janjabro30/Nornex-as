'use client'

import Link from 'next/link'
import { SocialLinks } from '../social/SocialLinks'

const footerLinks = {
  products: [
    { name: 'Laptops & Computers', href: '/products?category=laptops' },
    { name: 'Smartphones & Tablets', href: '/products?category=smartphones' },
    { name: 'Computer Components', href: '/products?category=components' },
    { name: 'Peripherals', href: '/products?category=peripherals' },
    { name: 'Networking', href: '/products?category=networking' },
    { name: 'Repair Parts', href: '/products?category=repair-parts' },
  ],
  services: [
    { name: 'IT Consulting', href: '/services/consulting' },
    { name: 'Computer Repair', href: '/services/repair' },
    { name: 'Network Setup', href: '/services/network' },
    { name: 'Data Recovery', href: '/services/data-recovery' },
    { name: 'Security Solutions', href: '/services/security' },
    { name: 'Cloud Services', href: '/services/cloud' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-wide">NORNEX</span>
                <p className="text-sm text-gray-400">Build, Repair, Protect.</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Your trusted partner for IT services, electronics, and tech solutions.
              Quality products and expert support since 2020.
            </p>
            <SocialLinks />
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Nornex AS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
