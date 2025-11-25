# Nornex AS - E-commerce & IT Services Platform

A comprehensive e-commerce platform with product management, shopping cart, social media integration, and admin backend.

## Features

### E-commerce System
- **Product Catalog**: Full product management with categories, variants, and specifications
- **Advanced Filtering**: Filter by price, brand, category, condition, rating
- **Shopping Cart**: Floating cart button with slide-in drawer, quantity controls, and persistence
- **Checkout**: Multi-step checkout with shipping and payment options (Vipps, Card, Invoice)
- **Product Categories**: Laptops, Smartphones, Components, Peripherals, Networking, Repair Parts

### Logo & Branding
- Circular blue logo with white "N" design
- "NORNEX" text in dark blue
- Tagline: "NORNEX— Build, Repair, Protect."
- Logo displayed in header, footer, and admin pages

### Social Media Management
- Platform support: Facebook, Instagram, LinkedIn, TikTok
- Account connection via API credentials
- Post creation with multi-platform publishing
- Post scheduling and drafts
- Analytics dashboard

### Admin Backend
- Dashboard with key metrics
- Product management (CRUD operations)
- Order management with status tracking
- Social media post management
- Settings for logo/tagline customization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/janjabro30/Nornex-as.git
cd Nornex-as

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data (optional)
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel pages
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── social/        # Social media management
│   │   └── settings/      # Site settings
│   ├── products/          # Product listing and details
│   ├── checkout/          # Checkout flow
│   └── api/               # API routes
├── components/            # React components
│   ├── cart/             # Cart components
│   ├── layout/           # Layout components (Header, Footer, Logo)
│   ├── products/         # Product components
│   ├── social/           # Social media components
│   └── ui/               # UI primitives (Button, Input)
├── lib/                   # Utilities and libraries
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```

## Database Schema

Key models:
- **Product**: Product information with translations and images
- **Category**: Product categories with translations and filters
- **Cart/CartItem**: Shopping cart functionality
- **Order/OrderItem**: Order management
- **SocialMediaAccount**: Social platform connections
- **SocialPost**: Social media posts with scheduling
- **SiteSetting**: Site configuration (logo, tagline, etc.)

## Responsive Design

- Mobile-first approach
- 4-column product grid on desktop, 2-column on mobile
- Touch-friendly cart controls (44x44px minimum)
- Hamburger menu for mobile navigation

## License

This project is proprietary software for Nornex AS.

## Contact

Nornex AS
- Email: contact@nornex.no
- Phone: +47 123 45 678
