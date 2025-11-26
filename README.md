# NORNEX AS - AI-Powered Admin Dashboard

**Version 2.0.0 | © 2025 NORNEX AS**

Enterprise-grade admin dashboard with AI automation, Norwegian integrations, and comprehensive security.

## 🚀 Features

### Dashboard Metrics
- Total Customers, Active Contracts, Monthly Revenue
- New Orders, Pending Repairs, Pending Invoices, Pending Bookings
- Growth Ads tracking with trend visualization

### 🤖 AI-Powered Insights
- **Customer Lifetime Value** - AI-calculated customer value projections
- **Churn Risk Score** - AI prediction 0-100 for customer retention
- **Revenue Forecast** - 30/60/90 day AI projections
- **Anomaly Detection** - Automatic alerts on unusual patterns
- **Business Insights Panel** - Smart actionable recommendations
- **Predictive Maintenance Alerts** - Proactive service notifications

### 📊 Charts & Analytics
- Revenue Trend (Last 6 Months) with AI Forecast overlay
- Orders Chart (Last 7 Days)
- Interactive data visualization with Recharts

### 🚚 Bring Shipping Integration (Posten Norge)
- Create shipments with delivery options
- Package tracking with event history
- Price calculation with VAT
- Delivery options: Servicepakke, På Døren, Express

### ✅ Norwegian Company Validation (Brønnøysundregistrene)
- Organization number validation
- Company information lookup
- B2B customer verification

### 🤖 AI Automation Suite
- Order categorization
- Smart task assignment
- Repair scheduling optimization
- Automated invoice generation
- Email response suggestions
- AI Content Studio (NO + EN)

### 🔒 Security Features
- JWT token authentication
- Role-based access control (RBAC)
- Two-factor authentication (2FA)
- Password hashing (bcrypt, 12 rounds)
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- GDPR & Personopplysningsloven compliance

### 🌐 Dual Language Support
- English admin interface
- Norwegian frontend (public-facing)
- Full translation system

### 📈 SEO Optimization
- Meta tags & Open Graph
- JSON-LD structured data
- Schema.org Organization markup

## 📁 Project Structure

```
admin-dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/          # AI automation endpoints
│   │   │   ├── company/     # Company validation
│   │   │   └── shipping/    # Bring integration
│   │   ├── ai-tools/        # AI Tools page
│   │   ├── security/        # Security settings
│   │   ├── settings/        # App configuration
│   │   └── shipping/        # Shipping management
│   ├── components/
│   │   ├── dashboard/       # Dashboard widgets
│   │   └── layout/          # Sidebar, Header
│   ├── lib/                 # Utilities & services
│   └── types/               # TypeScript definitions
```

## 🛠️ Getting Started

```bash
cd admin-dashboard
npm install
npm run dev
```

Visit `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
npm start
```

## 📜 API Endpoints

### AI Automation
- `POST /api/ai/categorize-order` - Auto-categorize orders
- `POST /api/ai/assign-task` - Smart task assignment
- `POST /api/ai/schedule-repair` - Repair scheduling
- `POST /api/ai/generate-invoice` - Invoice generation
- `POST /api/ai/suggest-response` - Email suggestions

### Shipping (Bring)
- `POST /api/shipping/bring/create` - Create shipment
- `GET /api/shipping/bring/track/[trackingNumber]` - Track package
- `GET /api/shipping/bring/calculate-price` - Calculate price
- `POST /api/shipping/bring/print-label/[shipmentId]` - Print label
- `GET /api/shipping/bring/delivery-options` - Get delivery options

### Company Validation
- `GET /api/company/validate/[orgNumber]` - Validate organization

## 🔐 Security Compliance

- ✅ GDPR (EU General Data Protection Regulation)
- ✅ Personopplysningsloven (Norwegian Personal Data Act)
- ✅ Data retention policies
- ✅ Privacy policy enforcement

---

**NORNEX AS** | Brynsveien 18, 0667 Oslo, Norway