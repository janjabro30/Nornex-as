# Nornex AS - IT Services Platform

A complete, production-ready full-stack IT services platform for Nornex AS, a Bergen-based IT company serving Norwegian businesses.

![Nornex AS](https://img.shields.io/badge/Nornex-AS-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![NestJS](https://img.shields.io/badge/NestJS-10-red)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 🚀 Features

### Backend (NestJS + PostgreSQL + Prisma)
- ✅ Complete REST API with Swagger documentation
- ✅ JWT authentication system
- ✅ User management with roles (Admin, Editor, User)
- ✅ Services module (Managed IT, Product Studio, Security)
- ✅ Packages/pricing management
- ✅ Inquiry/contact form handling
- ✅ Testimonials management
- ✅ Blog system with tags
- ✅ Multi-language support (Norwegian + English)
- ✅ Database seeding with realistic Norwegian content

### Frontend (Next.js 14 + Tailwind + shadcn/ui)
- ✅ Modern, responsive design
- ✅ Bilingual support (Norwegian default, English switchable)
- ✅ Home page with hero, services overview, pricing, testimonials
- ✅ Services overview and detail pages
- ✅ Pricing page with package comparison
- ✅ Contact page with form
- ✅ About page with company information
- ✅ Blog section
- ✅ SEO optimization
- ✅ WCAG 2.1 AA accessibility

### Services Included

**Managed IT & Repair**
- Managed endpoints/servers
- Helpdesk support (8×5 or 24/7)
- Networking & infrastructure
- Backup & Disaster Recovery
- Microsoft 365/Google Workspace admin
- Wi-Fi installations
- VoIP systems
- Board-level repair
- Microsoldering
- Liquid damage recovery
- Data recovery

**Product Studio**
- Website development
- E-commerce solutions (Vipps, Klarna, Bring)
- Mobile app development
- System integrations (Altinn, BankID)
- AI assistants & automation
- Cloud hosting & DevOps

**Security & Compliance**
- Security assessments
- System hardening & monitoring
- Endpoint protection/MDM
- Vulnerability scanning
- Security awareness training
- GDPR guidance
- Secure-by-design reviews
- Incident response playbooks
- 24/7 SOC (partner service)

### Pricing Packages

| Package | Price | Description |
|---------|-------|-------------|
| Core IT Care | 299 NOK/mo | Basic IT support for small businesses |
| IT Care Plus | 499 NOK/mo | Complete IT care for growing businesses (Featured) |
| IT Care Premium | 799 NOK/mo | Enterprise-level IT for ambitious businesses |

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

## 🛠️ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/janjabro30/Nornex-as.git
cd Nornex-as
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://postgres:password@localhost:5432/nornex_db"

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:4000/api`
Swagger documentation at `http://localhost:4000/api/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🐳 Docker Setup

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=nornex_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# URLs
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Environment
NODE_ENV=production
```

## 📚 API Documentation

API documentation is available at `/api/docs` when the backend is running.

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login with email/password |
| POST | /api/auth/register | Register new user |
| GET | /api/services | Get all services |
| GET | /api/packages | Get pricing packages |
| POST | /api/inquiries | Submit contact form |
| GET | /api/testimonials | Get testimonials |
| GET | /api/blog/posts | Get blog posts |
| GET | /api/settings | Get site settings |

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete documentation.

## 🔐 Default Admin User

After seeding the database:
- **Email:** admin@nornex.no
- **Password:** admin123

## 🏗️ Project Structure

```
Nornex-as/
├── backend/                 # NestJS Backend
│   ├── prisma/             # Database schema and migrations
│   │   ├── schema.prisma   # Prisma schema
│   │   └── seed.ts         # Database seeder
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── services/       # IT services module
│   │   ├── packages/       # Pricing packages
│   │   ├── inquiries/      # Contact form handling
│   │   ├── testimonials/   # Customer testimonials
│   │   ├── blog/           # Blog posts and tags
│   │   └── common/         # Shared modules (Prisma, Settings)
│   └── Dockerfile
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and API client
│   │   └── i18n/          # Translations
│   └── Dockerfile
├── docker-compose.yml      # Docker orchestration
├── README.md              # This file
├── API_DOCUMENTATION.md   # API documentation
└── PLESK_DEPLOYMENT.md    # Plesk deployment guide
```

## 🌐 Norwegian Context

This platform is specifically designed for Norwegian businesses:

- **Language:** Norwegian (Bokmål) as default, English available
- **Currency:** All prices in NOK
- **Integrations:** Ready for Vipps, Klarna, Bring, Altinn, BankID
- **Compliance:** GDPR-compliant, Datatilsynet guidelines
- **Local support:** Norwegian-speaking support team

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ♿ Accessibility

Follows WCAG 2.1 AA guidelines:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## 🔧 Development

### Backend Commands

```bash
npm run start:dev    # Start in development mode
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
npm run prisma:studio # Open Prisma Studio
```

### Frontend Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run start        # Start production server
```

## 📄 License

This project is private and proprietary to Nornex AS.

## 📞 Support

For questions or support:
- **Email:** post@nornex.no
- **Phone:** +47 55 55 55 55
- **Address:** Strandgaten 123, 5004 Bergen, Norway