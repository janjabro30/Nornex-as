import Link from 'next/link'
import { ArrowRight, Monitor, Cpu, Smartphone, Shield, Wrench, Headphones } from 'lucide-react'
import { Button } from '@/components/ui'

const categories = [
  {
    name: 'Laptops & Computers',
    description: 'Powerful machines for work and gaming',
    icon: Monitor,
    href: '/products?category=laptops',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Smartphones & Tablets',
    description: 'Latest mobile devices and accessories',
    icon: Smartphone,
    href: '/products?category=smartphones',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Computer Components',
    description: 'CPUs, GPUs, RAM, and storage',
    icon: Cpu,
    href: '/products?category=components',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Peripherals',
    description: 'Keyboards, mice, and monitors',
    icon: Headphones,
    href: '/products?category=peripherals',
    color: 'bg-orange-100 text-orange-600',
  },
]

const services = [
  {
    name: 'Computer Repair',
    description: 'Fast and reliable repair services for all devices',
    icon: Wrench,
  },
  {
    name: 'Security Solutions',
    description: 'Protect your business with our security services',
    icon: Shield,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Build, Repair, Protect.
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Your trusted partner for IT services, electronics, and tech solutions.
              Quality products and expert support since 2020.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Shop Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of electronics and tech products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional IT Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert solutions for all your technology needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help With Your Tech?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you with any IT challenge.
            Contact us today for a free consultation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
