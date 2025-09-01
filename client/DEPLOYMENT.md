# Production Deployment Guide - HD Notes

## 🚀 Quick Deployment Steps

### 1. Environment Setup
```bash
# Copy and configure environment variables
cp .env.production.example .env.production

# Update .env.production with your values:
# VITE_API_BASE_URL=https://your-api-domain.com
# VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 2. Build Application
```bash
# Install dependencies
npm install

# Run security audit
npm run security-audit

# Type check
npm run type-check

# Build for production
npm run build:prod

# Test production build locally
npm run preview:prod
```

### 3. Deploy to Hosting Platform

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure custom domain and SSL in Vercel dashboard
```

#### Netlify Deployment
```bash
# Build command: npm run build:prod
# Publish directory: dist
# Environment variables: Set in Netlify dashboard
```

#### Static File Server
```bash
# Serve dist folder with any static file server
# Ensure server supports SPA routing (index.html fallback)
```

## ⚙️ Production Configuration

### Required Environment Variables
```env
VITE_API_BASE_URL=https://your-production-api.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_APP_NAME=HD Notes
VITE_ENABLE_DEVTOOLS=false
VITE_CSP_ENABLED=true
```

### Server Configuration
```nginx
# Example Nginx configuration
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Serve static files
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 🔍 Post-Deployment Verification

### Security Checks
1. **SSL Certificate**: Verify HTTPS is working
2. **Security Headers**: Test with securityheaders.com
3. **CSP Policy**: Check browser console for violations
4. **Authentication**: Test all auth flows
5. **Error Handling**: Test error boundaries

### Performance Checks
1. **Lighthouse Audit**: Run performance audit
2. **Core Web Vitals**: Check loading times
3. **Bundle Size**: Analyze with npm run build:analyze
4. **CDN**: Ensure assets are cached properly

### Functionality Tests
```bash
# Test all major flows:
# 1. User registration
# 2. Login with OTP
# 3. Google OAuth
# 4. Note creation/editing
# 5. Markdown rendering
# 6. Responsive design
```

## 📊 Monitoring Setup

### Error Tracking
```javascript
// Add to production environment
// Sentry, LogRocket, or similar service
const errorReporting = {
  dsn: 'your-error-tracking-dsn',
  environment: 'production',
};
```

### Analytics
```javascript
// Google Analytics, Mixpanel, etc.
// Track user interactions and performance
```

## 🔧 Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Run security audits weekly
- [ ] Monitor error logs daily
- [ ] Performance monitoring ongoing
- [ ] SSL certificate renewal (as needed)

### Emergency Procedures
1. **Security Incident**: Immediate access revocation process
2. **Service Outage**: Rollback to previous version
3. **Data Breach**: User notification and remediation steps

## 📱 Mobile PWA

The application is configured as a Progressive Web App:
- Installable on mobile devices
- Offline capability (future enhancement)
- App-like experience
- Push notifications (future enhancement)

## 🆘 Troubleshooting

### Common Issues
1. **White Screen**: Check browser console for CSP violations
2. **API Connection Blocked**: Update CSP connect-src to include your API domain
3. **Auth Issues**: Verify API endpoints and CORS settings
4. **Build Failures**: Check TypeScript errors and dependencies
5. **Performance**: Analyze bundle size and optimize imports

### CSP Configuration
The Content Security Policy is configured differently for development and production:

**Development**: Allows `http://localhost:5000` for local API
**Production**: Update CSP to include your production API domain

Example production CSP:
```
connect-src 'self' https://your-api-domain.com https://accounts.google.com
```

### Support Contacts
- Development Team: dev@hdnotes.com
- Security Issues: security@hdnotes.com
- Infrastructure: ops@hdnotes.com

---

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Security headers implemented
- [ ] Error monitoring setup
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] Domain DNS configured
- [ ] CDN configured (if applicable)
- [ ] Analytics tracking active
- [ ] User documentation updated
