'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Share2, Settings, ChevronLeft } from 'lucide-react'
import { LogoIcon } from '@/components/layout/Logo'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Social Media', href: '/admin/social', icon: Share2 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

/**
 * Determines if a navigation item is active based on the current pathname
 */
function isNavItemActive(itemHref: string, currentPath: string): boolean {
  // Exact match for dashboard
  if (itemHref === '/admin') {
    return currentPath === '/admin'
  }
  // For other items, check if current path starts with the item href
  return currentPath.startsWith(itemHref)
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-50">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-3">
            <LogoIcon size={36} />
            <div>
              <span className="font-bold text-white">NORNEX</span>
              <span className="text-xs block text-gray-400">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Back to Site */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
