# NORNEX AS Admin Dashboard - Plesk VPS Deployment Guide

This guide provides step-by-step instructions for deploying the NORNEX Admin Dashboard on a VPS with Plesk.

## Prerequisites

Before starting, ensure you have:
- A VPS with Plesk installed
- SSH access to your server
- A domain or subdomain pointed to your VPS (e.g., `admin.yourdomain.com`)
- Node.js 18+ installed on your server

---

## Step 1: Access Your Plesk Panel

1. Open your browser and go to `https://your-server-ip:8443`
2. Log in with your Plesk credentials

---

## Step 2: Install Node.js on Plesk

1. In Plesk, go to **Extensions** → **Extensions Catalog**
2. Search for **Node.js** and click **Install**
3. Wait for installation to complete

---

## Step 3: Create a Subdomain for the Admin Dashboard

1. In Plesk, go to **Websites & Domains**
2. Click **Add Subdomain**
3. Enter subdomain name (e.g., `admin`)
4. Select your main domain
5. Click **OK**

---

## Step 4: Connect to Your Server via SSH

1. Open Terminal (Mac/Linux) or PuTTY (Windows)
2. Connect to your server:
   ```bash
   ssh root@your-server-ip
   ```
3. Enter your password when prompted

---

## Step 5: Clone the Repository

1. Navigate to your subdomain's document root:
   ```bash
   cd /var/www/vhosts/yourdomain.com/admin.yourdomain.com
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/janjabro30/Nornex-as.git .
   ```

3. Navigate to the admin-dashboard folder:
   ```bash
   cd admin-dashboard
   ```

---

## Step 6: Install Dependencies

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Wait for all packages to install (this may take a few minutes)

---

## Step 7: Configure Environment Variables

1. Create the environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit the environment file:
   ```bash
   nano .env.local
   ```

3. Update the following values:
   ```env
   # REQUIRED: Generate a secure random string (minimum 32 characters)
   JWT_SECRET=your-secure-random-string-here-minimum-32-characters
   
   # Optional: AI Provider API Keys
   # OPENAI_API_KEY=sk-your-openai-api-key
   # GOOGLE_AI_API_KEY=your-google-ai-api-key
   
   # Optional: Bring Shipping API
   # BRING_API_KEY=your-bring-api-key
   ```

4. Save and exit: Press `Ctrl+X`, then `Y`, then `Enter`

---

## Step 8: Build the Application

1. Build the production version:
   ```bash
   npm run build
   ```

2. Wait for the build to complete (this may take 2-3 minutes)

---

## Step 9: Set Up Process Manager (PM2)

PM2 keeps your app running and restarts it automatically if it crashes.

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application with PM2:
   ```bash
   pm2 start npm --name "nornex-admin" -- start
   ```

3. Set PM2 to start on server reboot:
   ```bash
   pm2 startup
   pm2 save
   ```

---

## Step 10: Configure Plesk Proxy (Reverse Proxy)

1. In Plesk, go to your subdomain **admin.yourdomain.com**
2. Click on **Apache & nginx Settings**
3. Scroll down to **Additional nginx directives**
4. Add the following configuration:

   ```nginx
   location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_cache_bypass $http_upgrade;
   }
   ```

5. Click **OK** to save

---

## Step 11: Enable SSL Certificate

1. In Plesk, go to your subdomain
2. Click on **SSL/TLS Certificates**
3. Click **Install** under Let's Encrypt
4. Check the boxes for your subdomain
5. Click **Get it Free**

---

## Step 12: Test Your Installation

1. Open your browser and go to `https://admin.yourdomain.com`
2. You should see the NORNEX Admin Dashboard

---

## Troubleshooting

### Application Not Loading

1. Check if the app is running:
   ```bash
   pm2 status
   ```

2. View logs for errors:
   ```bash
   pm2 logs nornex-admin
   ```

3. Restart the application:
   ```bash
   pm2 restart nornex-admin
   ```

### Port Already in Use

1. Check what's using port 3000:
   ```bash
   lsof -i :3000
   ```

2. Kill the process or change the port in your configuration

### Build Errors

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

### SSL Certificate Issues

1. Make sure your domain DNS is pointing to your VPS IP
2. Wait 5-10 minutes after DNS changes
3. Try installing Let's Encrypt certificate again

---

## Updating the Application

To update to the latest version:

```bash
cd /var/www/vhosts/yourdomain.com/admin.yourdomain.com/admin-dashboard
git pull origin main
npm install
npm run build
pm2 restart nornex-admin
```

---

## Security Recommendations

1. **Change default passwords** immediately after installation
2. **Enable 2FA** in the Security settings
3. **Keep dependencies updated** by running `npm update` regularly
4. **Back up your data** regularly
5. **Use strong JWT secrets** (32+ characters, random)

---

## Support

If you encounter any issues:
1. Check the [GitHub Issues](https://github.com/janjabro30/Nornex-as/issues)
2. Review the application logs with `pm2 logs nornex-admin`

---

© 2025 NORNEX AS - All rights reserved
