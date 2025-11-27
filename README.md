# NORNEX AS - Complete IT Services Platform

**Version 2.0.0 | © 2025 NORNEX AS**

A complete, deployable Next.js 16 application for NORNEX AS - Professional IT services company in Oslo, Norway.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## 🌐 Public Pages (Norwegian)

### Main Pages
- `/` - Homepage with hero, services, stats
- `/tjenester` - All services overview
- `/tjenester/[slug]` - Individual service pages (11 services)
- `/nettbutikk` - Webshop with products
- `/nettbutikk/[slug]` - Product detail pages
- `/blogg` - Blog with articles
- `/blogg/[category]/[slug]` - Blog post detail
- `/kontakt` - Contact form
- `/om-oss` - About us

### Service Forms
- `/reparasjon` - Device repair form
- `/innbytte` - Trade-in form
- `/selg-til-oss` - Sell to us form
- `/handlekurv` - Shopping cart
- `/kasse` - Checkout

### Legal Pages
- `/personvern` - Privacy policy
- `/vilkar` - Terms and conditions
- `/faq` - FAQ
- `/garanti` - Warranty info
- `/retur` - Return policy
- `/tilgjengelighet` - Accessibility
- `/cookie-policy` - Cookie policy

### Portals
- `/min-portal` - Customer portal
- `/bedrift-portal` - Business portal

## 👨‍💼 Admin Backend

Access at `/AdminBackend` with query parameters:
- `?view=dashboard` - Metrics, charts
- `?view=orders` - Order management
- `?view=repairs` - Repair tickets
- `?view=products` - Product CRUD
- `?view=customers` - Customer list
- `?view=blog` - Blog management
- `?view=settings` - Site settings

## 🔧 11 IT Services

1. **Managed IT** - `/tjenester/managed-it`
2. **IT-sikkerhet** - `/tjenester/it-sikkerhet`
3. **Skyløsninger** - `/tjenester/skylosninger`
4. **24/7 Support** - `/tjenester/support`
5. **Hardware** - `/tjenester/hardware`
6. **Reparasjon** - `/tjenester/reparasjon`
7. **Nettside-utvikling** - `/tjenester/nettside-utvikling`
8. **App-utvikling** - `/tjenester/app-utvikling`
9. **Webapplikasjoner** - `/tjenester/webapplikasjoner`
10. **API-integrasjoner** - `/tjenester/api-integrasjoner`
11. **IT-konsultering** - `/tjenester/konsultering`

## 📁 Project Structure

```
/
├── package.json              # Dependencies
├── next.config.ts            # Next.js config
├── tailwind.config.js        # (via postcss.config.mjs)
├── tsconfig.json             # TypeScript config
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with Header/Footer
│   │   ├── page.tsx          # Homepage
│   │   ├── globals.css       # Global styles
│   │   ├── tjenester/        # Services pages
│   │   ├── nettbutikk/       # Webshop pages
│   │   ├── blogg/            # Blog pages
│   │   ├── AdminBackend/     # Admin dashboard
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── public/           # Header, Footer, CartProvider
│   │   ├── dashboard/        # Dashboard widgets
│   │   └── layout/           # Sidebar, Header
│   └── lib/
│       ├── constants.ts      # Site constants
│       ├── services-data.ts  # Services data
│       ├── products-data.ts  # Products data
│       └── blog-data.ts      # Blog posts data
```

## 🤖 AI & Automation Features

### AI-Powered Insights
- Customer Lifetime Value predictions
- Churn Risk Score (0-100)
- Revenue Forecast (30/60/90 days)
- Anomaly Detection alerts
- Predictive Maintenance alerts

### AI Automation Suite
- Order categorization
- Smart task assignment
- Repair scheduling
- Invoice generation
- Email response suggestions

## 🚚 Norwegian Integrations

### Bring Shipping (Posten Norge)
- Create shipments
- Package tracking
- Price calculation with VAT
- Delivery options: Servicepakke, På Døren, Express

### Brønnøysundregistrene
- Organization number validation
- Company information lookup
- B2B customer verification

## 📜 API Endpoints

### Public APIs
- `GET /api/products` - List products
- `GET /api/products/[slug]` - Product detail
- `GET /api/services` - List services
- `POST /api/contact` - Contact form
- `POST /api/repair` - Repair request
- `POST /api/trade-in` - Trade-in request
- `POST /api/sell` - Sell request

### Admin APIs
- `POST /api/ai/categorize-order`
- `POST /api/ai/assign-task`
- `POST /api/ai/schedule-repair`
- `POST /api/ai/generate-invoice`

### Shipping APIs
- `POST /api/shipping/bring/create`
- `GET /api/shipping/bring/track/[trackingNumber]`
- `GET /api/shipping/bring/calculate-price`

## 🔒 Security Features

- JWT token authentication
- Role-based access control (RBAC)
- Two-factor authentication (2FA)
- Password hashing (bcrypt)
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- GDPR & Personopplysningsloven compliance

## 🌐 Language

- **Public pages**: Norwegian (Bokmål)
- **Admin interface**: English/Norwegian

## 🏗️ Tech Stack

- **Framework**: Next.js 16
- **UI**: Tailwind CSS 4
- **Language**: TypeScript 5
- **State**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Auth**: NextAuth.js
- **Database**: Prisma (PostgreSQL ready)

## 📦 Production Deployment

See `DEPLOYMENT-PLESK.md` for Plesk deployment instructions.

---

**NORNEX AS** | Brynsveien 18, 0667 Oslo, Norway | www.nornex.no