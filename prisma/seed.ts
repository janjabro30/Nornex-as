import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        slug: 'laptops',
        sortOrder: 1,
        translations: {
          create: [
            { language: 'en', name: 'Laptops & Computers', description: 'Powerful machines for work and gaming' },
            { language: 'no', name: 'Bærbare datamaskiner', description: 'Kraftige maskiner for arbeid og spill' },
          ],
        },
        filters: {
          create: [
            { filterKey: 'processor', filterType: 'select', sortOrder: 1, translations: { create: [{ language: 'en', label: 'Processor', options: '["Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9", "Apple M1", "Apple M2", "Apple M3"]' }] } },
            { filterKey: 'ram', filterType: 'select', sortOrder: 2, translations: { create: [{ language: 'en', label: 'RAM', options: '["8GB", "16GB", "32GB", "64GB"]' }] } },
            { filterKey: 'storage', filterType: 'select', sortOrder: 3, translations: { create: [{ language: 'en', label: 'Storage', options: '["256GB", "512GB", "1TB", "2TB"]' }] } },
            { filterKey: 'screen_size', filterType: 'select', sortOrder: 4, translations: { create: [{ language: 'en', label: 'Screen Size', options: '["13\"", "14\"", "15\"", "16\"", "17\""]' }] } },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        slug: 'smartphones',
        sortOrder: 2,
        translations: {
          create: [
            { language: 'en', name: 'Smartphones & Tablets', description: 'Latest mobile devices and accessories' },
            { language: 'no', name: 'Smarttelefoner og nettbrett', description: 'Nyeste mobile enheter og tilbehør' },
          ],
        },
        filters: {
          create: [
            { filterKey: 'brand', filterType: 'multiselect', sortOrder: 1, translations: { create: [{ language: 'en', label: 'Brand', options: '["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"]' }] } },
            { filterKey: 'storage', filterType: 'select', sortOrder: 2, translations: { create: [{ language: 'en', label: 'Storage', options: '["64GB", "128GB", "256GB", "512GB", "1TB"]' }] } },
            { filterKey: 'ram', filterType: 'select', sortOrder: 3, translations: { create: [{ language: 'en', label: 'RAM', options: '["4GB", "6GB", "8GB", "12GB", "16GB"]' }] } },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        slug: 'components',
        sortOrder: 3,
        translations: {
          create: [
            { language: 'en', name: 'Computer Components', description: 'CPUs, GPUs, RAM, and storage' },
            { language: 'no', name: 'Datamaskinkomponenter', description: 'Prosessorer, grafikkort, RAM og lagring' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        slug: 'peripherals',
        sortOrder: 4,
        translations: {
          create: [
            { language: 'en', name: 'Peripherals', description: 'Keyboards, mice, and monitors' },
            { language: 'no', name: 'Tilbehør', description: 'Tastaturer, mus og skjermer' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        slug: 'networking',
        sortOrder: 5,
        translations: {
          create: [
            { language: 'en', name: 'Networking Equipment', description: 'Routers, switches, and cables' },
            { language: 'no', name: 'Nettverksutstyr', description: 'Rutere, switcher og kabler' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        slug: 'repair-parts',
        sortOrder: 6,
        translations: {
          create: [
            { language: 'en', name: 'Repair Parts', description: 'Replacement parts and tools' },
            { language: 'no', name: 'Reservedeler', description: 'Reservedeler og verktøy' },
          ],
        },
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  // Create social media accounts
  const socialAccounts = await Promise.all([
    prisma.socialMediaAccount.create({
      data: {
        platform: 'facebook',
        accountName: 'Nornex AS',
        profileUrl: 'https://facebook.com/nornexas',
        isConnected: false,
        isActive: true,
      },
    }),
    prisma.socialMediaAccount.create({
      data: {
        platform: 'instagram',
        accountName: '@nornexas',
        profileUrl: 'https://instagram.com/nornexas',
        isConnected: false,
        isActive: true,
      },
    }),
    prisma.socialMediaAccount.create({
      data: {
        platform: 'linkedin',
        accountName: 'Nornex AS',
        profileUrl: 'https://linkedin.com/company/nornexas',
        isConnected: false,
        isActive: true,
      },
    }),
    prisma.socialMediaAccount.create({
      data: {
        platform: 'tiktok',
        accountName: '@nornexas',
        profileUrl: 'https://tiktok.com/@nornexas',
        isConnected: false,
        isActive: true,
      },
    }),
  ])

  console.log(`Created ${socialAccounts.length} social media accounts`)

  // Create site settings
  const settings = await Promise.all([
    prisma.siteSetting.create({
      data: {
        key: 'site_name',
        value: 'Nornex AS',
        type: 'text',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'tagline',
        value: 'NORNEX— Build, Repair, Protect.',
        type: 'text',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'primary_color',
        value: '#1e40af',
        type: 'text',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'contact_email',
        value: 'contact@nornex.no',
        type: 'text',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'phone',
        value: '+47 123 45 678',
        type: 'text',
      },
    }),
  ])

  console.log(`Created ${settings.length} site settings`)

  // Create sample products
  const laptopCategory = categories.find(c => c.slug === 'laptops')
  const smartphonesCategory = categories.find(c => c.slug === 'smartphones')
  const componentsCategory = categories.find(c => c.slug === 'components')
  const peripheralsCategory = categories.find(c => c.slug === 'peripherals')

  if (laptopCategory && smartphonesCategory && componentsCategory && peripheralsCategory) {
    const products = await Promise.all([
      prisma.product.create({
        data: {
          sku: 'LAP-001',
          categoryId: laptopCategory.id,
          brand: 'Dell',
          price: 12999,
          salePrice: 9999,
          stock: 15,
          condition: 'new',
          featured: true,
          rating: 4.5,
          reviewCount: 23,
          specs: JSON.stringify({ processor: 'Intel i7', ram: '16GB', storage: '512GB SSD' }),
          translations: {
            create: [
              { language: 'en', name: 'Dell XPS 15 Laptop', description: 'Powerful laptop with stunning display', shortDescription: '15.6" display, Intel i7, 16GB RAM' },
            ],
          },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', alt: 'Dell XPS 15', sortOrder: 0 },
            ],
          },
        },
      }),
      prisma.product.create({
        data: {
          sku: 'PH-001',
          categoryId: smartphonesCategory.id,
          brand: 'Apple',
          price: 14999,
          stock: 25,
          condition: 'new',
          featured: true,
          rating: 4.8,
          reviewCount: 156,
          specs: JSON.stringify({ storage: '256GB', display: '6.7"', camera: '48MP' }),
          translations: {
            create: [
              { language: 'en', name: 'iPhone 15 Pro Max', description: 'The most powerful iPhone ever', shortDescription: '6.7" Super Retina XDR, A17 Pro chip' },
            ],
          },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', alt: 'iPhone 15 Pro Max', sortOrder: 0 },
            ],
          },
        },
      }),
      prisma.product.create({
        data: {
          sku: 'GPU-001',
          categoryId: componentsCategory.id,
          brand: 'NVIDIA',
          price: 18999,
          salePrice: 16999,
          stock: 8,
          condition: 'new',
          rating: 4.9,
          reviewCount: 89,
          specs: JSON.stringify({ vram: '24GB', cuda_cores: '16384', power: '450W' }),
          translations: {
            create: [
              { language: 'en', name: 'NVIDIA RTX 4090 Graphics Card', description: 'Ultimate gaming and AI performance', shortDescription: '24GB GDDR6X, Ray Tracing, DLSS 3' },
            ],
          },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500', alt: 'NVIDIA RTX 4090', sortOrder: 0 },
            ],
          },
        },
      }),
      prisma.product.create({
        data: {
          sku: 'KB-001',
          categoryId: peripheralsCategory.id,
          brand: 'Logitech',
          price: 1499,
          stock: 50,
          condition: 'new',
          rating: 4.6,
          reviewCount: 234,
          specs: JSON.stringify({ type: 'Mechanical', switches: 'GX Blue', backlight: 'RGB' }),
          translations: {
            create: [
              { language: 'en', name: 'Logitech G Pro Mechanical Keyboard', description: 'Pro-grade gaming keyboard', shortDescription: 'Mechanical switches, RGB lighting' },
            ],
          },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500', alt: 'Logitech G Pro', sortOrder: 0 },
            ],
          },
        },
      }),
    ])

    console.log(`Created ${products.length} sample products`)
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
