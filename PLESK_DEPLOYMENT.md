# Plesk Deployment Guide for Nornex AS

This guide covers deploying the Nornex AS platform to a Plesk-managed VPS without SSH access.

## Prerequisites

- Plesk Panel access with Node.js extension
- PostgreSQL database (can be on Plesk or external)
- Domain configured in Plesk

## Overview

The deployment consists of:
1. PostgreSQL database setup
2. Backend (NestJS API) deployment
3. Frontend (Next.js) deployment
4. Domain and SSL configuration

---

## 1. Database Setup

### Option A: Using Plesk Database

1. Go to **Databases** in Plesk
2. Click **Add Database**
3. Configure:
   - Database name: `nornex_db`
   - Database user: `nornex_user`
   - Password: Generate a secure password
   - Database server: PostgreSQL
4. Note the connection details

### Option B: External PostgreSQL

Use an external PostgreSQL service like:
- DigitalOcean Managed Database
- AWS RDS
- Supabase
- Railway

Get the connection string in format:
```
postgresql://user:password@host:5432/database
```

---

## 2. Backend Deployment

### 2.1 Prepare the Backend

On your local machine:

```bash
cd backend

# Install dependencies
npm install

# Build the project
npm run build

# Generate Prisma client
npx prisma generate
```

### 2.2 Upload Files to Plesk

1. Go to **File Manager** in Plesk
2. Create folder structure:
   ```
   /var/www/vhosts/nornex.no/
   ├── api/                    # Backend files
   │   ├── dist/              # Compiled NestJS
   │   ├── node_modules/      # Dependencies
   │   ├── prisma/            # Prisma schema
   │   └── package.json
   └── httpdocs/              # Frontend files
   ```

3. Upload these folders/files to `/api/`:
   - `dist/` folder
   - `node_modules/` folder
   - `prisma/` folder
   - `package.json`
   - `package-lock.json`

### 2.3 Configure Node.js Application

1. Go to **Websites & Domains** > Your domain
2. Click **Node.js**
3. Configure:
   - **Node.js version:** 20.x
   - **Document root:** `/api`
   - **Application mode:** Production
   - **Application startup file:** `dist/main.js`

### 2.4 Set Environment Variables

In the Node.js settings, add environment variables:

```env
DATABASE_URL=postgresql://nornex_user:password@localhost:5432/nornex_db
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://nornex.no
```

### 2.5 Run Database Migrations

In Plesk's Node.js panel, you may need to run commands via the interface or create a script:

1. Create `migrate.js` in `/api/`:
```javascript
const { execSync } = require('child_process');
execSync('npx prisma migrate deploy', { stdio: 'inherit' });
execSync('npx prisma db seed', { stdio: 'inherit' });
```

2. Run via Node.js panel or scheduled task

### 2.6 Configure API Subdomain (Optional)

For `api.nornex.no`:

1. Add subdomain in Plesk
2. Configure Node.js for the subdomain
3. Update `FRONTEND_URL` to allow CORS from main domain

---

## 3. Frontend Deployment

### 3.1 Build the Frontend

On your local machine:

```bash
cd frontend

# Install dependencies
npm install

# Set environment variables for build
export NEXT_PUBLIC_API_URL=https://api.nornex.no/api
# Or https://nornex.no/api if not using subdomain

# Build for production
npm run build
```

### 3.2 Static Export (Recommended for Plesk)

Modify `next.config.js` for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Then build:
```bash
npm run build
```

This creates an `out/` folder with static files.

### 3.3 Upload Frontend Files

1. Upload contents of `out/` folder to `/httpdocs/`
2. Ensure `index.html` is in the root

### 3.4 Alternative: Node.js Frontend (SSR)

If you need server-side rendering:

1. Upload entire frontend build:
   - `.next/` folder
   - `node_modules/`
   - `package.json`
   - `public/`

2. Configure Node.js in Plesk:
   - Startup file: `node_modules/next/dist/bin/next`
   - Or create `start.js`:
   ```javascript
   process.env.NODE_ENV = 'production';
   require('next/dist/cli/next-start');
   ```

---

## 4. Domain Configuration

### 4.1 Main Domain (Frontend)

1. In Plesk, go to **Websites & Domains**
2. Select your domain
3. Ensure document root is `/httpdocs`

### 4.2 API Routing

#### Option A: Subdomain (Recommended)
- Create `api.nornex.no` subdomain
- Point to Node.js backend

#### Option B: Path-based with Proxy

In Plesk Apache/Nginx settings, add:

**Nginx:**
```nginx
location /api {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteRule ^api/(.*)$ http://127.0.0.1:4000/api/$1 [P]
```

### 4.3 SSL Certificates

1. Go to **SSL/TLS Certificates**
2. Click **Install a free basic certificate from Let's Encrypt**
3. Enable for both domain and API subdomain (if using)
4. Enable **Redirect HTTP to HTTPS**

---

## 5. Environment Configuration

### Backend `.env` (production)

```env
# Database
DATABASE_URL="postgresql://nornex_user:SECURE_PASSWORD@localhost:5432/nornex_db"

# JWT
JWT_SECRET="your-super-secure-jwt-secret-minimum-32-characters-long"
JWT_EXPIRES_IN="7d"

# Server
PORT=4000
NODE_ENV=production

# CORS
FRONTEND_URL="https://nornex.no"
```

### Frontend Environment

For static export, environment variables must be set at build time.
Create `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://api.nornex.no/api
NEXT_PUBLIC_SITE_URL=https://nornex.no
```

---

## 6. Post-Deployment Checklist

- [ ] Database migrations applied
- [ ] Database seeded with initial data
- [ ] Backend API responding at `/api/docs`
- [ ] Frontend loading correctly
- [ ] SSL certificates active
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Contact form working
- [ ] Admin login working (`admin@nornex.no` / `admin123`)

---

## 7. Maintenance

### Updating the Application

1. Build locally
2. Upload new files via File Manager
3. Restart Node.js application in Plesk

### Database Backups

1. Use Plesk's backup features
2. Or schedule pg_dump via cron

### Logs

Access logs via:
- Plesk **Logs** section
- Node.js application logs in the panel

---

## 8. Troubleshooting

### API Not Responding

1. Check Node.js is running in Plesk
2. Verify environment variables
3. Check application logs

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check DATABASE_URL format
3. Ensure database user has permissions

### CORS Errors

1. Verify FRONTEND_URL in backend env
2. Check API_URL in frontend matches actual URL
3. Ensure SSL matches (both https or both http)

### Static Files Not Loading

1. Verify files uploaded to correct directory
2. Check file permissions (644 for files, 755 for directories)
3. Clear browser cache

---

## 9. Security Recommendations

1. **Change default admin password** immediately after first login
2. **Use strong JWT secret** (32+ characters)
3. **Enable Plesk firewall** and only allow necessary ports
4. **Regular backups** via Plesk backup manager
5. **Monitor logs** for suspicious activity
6. **Keep Node.js updated** via Plesk updates

---

## Support

For deployment assistance:
- **Email:** post@nornex.no
- **Phone:** +47 55 55 55 55
