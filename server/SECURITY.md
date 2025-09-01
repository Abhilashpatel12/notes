# Production Security Guide

This guide covers all the security features that have been implemented and activated in the Notes API server.

## 🛡️ Security Features Activated

### 1. Rate Limiting
- **General Routes**: 100 requests per 15 minutes per IP
- **Authentication Routes**: 20 requests per 15 minutes per IP
- **Configurable**: Via environment variables
- **Skip on Success**: Authentication rate limiting doesn't count successful requests

### 2. Security Headers (Helmet)
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### 3. Request Protection
- **NoSQL Injection Prevention**: `express-mongo-sanitize`
- **HTTP Parameter Pollution Prevention**: `hpp`
- **Request Size Limits**: 10MB for JSON and URL-encoded payloads

### 4. CORS Configuration
- Configurable origins
- Credential support
- Rate limit headers exposure
- Specific allowed methods and headers

### 5. Request Logging
- **Development**: Colored, concise logging
- **Production**: Combined format with full request details
- **Error Tracking**: Comprehensive error logging with context

### 6. Error Handling
- **Secure Error Messages**: No sensitive information leaked
- **Different Error Types**: JWT, Validation, Database, Rate Limiting
- **Request Tracking**: IP, User-Agent, and timestamp logging

### 7. Health Monitoring
- `/health` - Basic server health
- `/api/health` - API-specific health check
- **Excluded from Rate Limiting**: Health checks don't count toward limits

### 8. Graceful Shutdown
- **Signal Handling**: SIGTERM, SIGINT
- **Database Cleanup**: Proper connection closing
- **Timeout Protection**: 30-second forced shutdown
- **Process Error Handling**: Unhandled rejections and exceptions

## 🔧 Environment Configuration

### Required Environment Variables

```env
# Basic Configuration
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://your-mongo-instance/notes-app
JWT_SECRET=your-super-secure-jwt-secret-here
FRONTEND_URL=https://your-frontend-domain.com

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000          # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100          # General rate limit
AUTH_RATE_LIMIT_MAX=20               # Auth rate limit

# CORS Configuration  
CORS_ORIGIN=https://your-frontend-domain.com
CORS_CREDENTIALS=true

# Email Configuration (for OTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Set `NODE_ENV=production`
- [ ] Configure secure JWT secret (min 32 characters)
- [ ] Set up MongoDB with authentication
- [ ] Configure email service with app passwords
- [ ] Set up Google OAuth for production domain
- [ ] Review and set appropriate rate limits

### Security Checklist
- [ ] HTTPS enabled on server
- [ ] Secure database connection (MongoDB Atlas/authenticated instance)
- [ ] Environment variables secured
- [ ] Rate limiting configured for expected traffic
- [ ] CORS origins restricted to your domain(s)
- [ ] Email service using app passwords (not account password)
- [ ] Regular security audits scheduled

### Monitoring Setup
- [ ] Log aggregation service configured
- [ ] Error tracking service integrated
- [ ] Health check endpoints monitored
- [ ] Rate limiting alerts configured
- [ ] Database connection monitoring

## 🔍 Security Testing

### Rate Limiting Tests
```bash
# Test general rate limiting
for i in {1..101}; do curl -X GET http://localhost:5000/api/health; done

# Test auth rate limiting  
for i in {1..21}; do curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'; done
```

### Security Headers Test
```bash
curl -I http://localhost:5000/api/health
# Should show security headers like:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=31536000
```

### Health Check Tests
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/health
```

## 📊 Monitoring Endpoints

- `GET /health` - Server health status
- `GET /api/health` - API health status
- Both return JSON with status, timestamp, and environment info

## 🚨 Security Incident Response

### Rate Limiting Triggered
- Monitor logs for suspicious patterns
- Consider IP blocking for repeated abuse
- Adjust limits if legitimate traffic is affected

### Authentication Failures
- Monitor failed login attempts
- Implement account lockout if needed
- Review logs for brute force patterns

### Error Patterns
- Monitor error logs for unusual patterns
- Check for injection attempts
- Verify security middleware is working

## 🔄 Maintenance

### Regular Tasks
- Update dependencies monthly
- Review security headers quarterly
- Audit rate limiting effectiveness
- Monitor performance impact of security features
- Review and rotate JWT secrets periodically

### Security Updates
- Subscribe to security advisories for Node.js and dependencies
- Test security updates in staging before production
- Maintain security documentation and procedures
