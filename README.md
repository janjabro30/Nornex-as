# Nornex AS - Professional IT Services Website

Modern, SEO-optimized website for Nornex AS, a professional IT services company based in Norway.

## 🚀 Features

### Ultra-Modern User Experience
- **Smooth Animations**: Framer Motion powered page transitions, scroll animations, and micro-interactions
- **Interactive Components**: 3D tilt cards, typewriter effects, animated counters, carousels
- **Modern Design**: Glassmorphism, gradient backgrounds, responsive design
- **User-Friendly Navigation**: Mega menu, mobile hamburger menu, smooth scroll, back-to-top button
- **Floating Action Buttons**: WhatsApp, phone, back-to-top for easy access

### Advanced SEO Optimization
- **Next.js Metadata API**: Complete meta tags, Open Graph, Twitter Cards
- **Structured Data (JSON-LD)**: Organization, LocalBusiness, Service, FAQ, BreadcrumbList schemas
- **Performance Optimized**: Target 95+ PageSpeed score
- **XML Sitemap**: Auto-generated with next-sitemap
- **robots.txt**: Properly configured for search engines
- **Bilingual Support**: Norwegian (NO) and English (EN)

### Sections
- Hero with typewriter effect and animated gradient background
- Services showcase with interactive cards
- About section with animated statistics
- Testimonials carousel with Swiper
- Pricing tables with monthly/yearly toggle
- FAQ accordion
- Contact form with validation

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Carousel**: Swiper
- **Notifications**: React Hot Toast
- **SEO**: next-sitemap, schema-dts

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 SEO Keywords

### Norwegian Keywords
- IT-tjenester Norge
- IT-support Oslo
- Administrert IT
- Cybersikkerhet
- Skyløsninger
- IT-hjelp bedrift

### English Keywords
- Managed IT services Norway
- IT support Oslo
- Cybersecurity Norway
- Cloud solutions
- 24/7 IT helpdesk

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingButtons.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Accordion.tsx
│       └── Modal.tsx
├── hooks/
│   ├── useLanguage.tsx
│   └── useAnimations.ts
├── i18n/
│   └── translations.ts
├── lib/
│   ├── utils.ts
│   └── schema.ts
└── types/
    └── index.ts
```

## 📝 License

Copyright © 2024 Nornex AS. All rights reserved.
