# Google OAuth Configuration Guide

## Overview
The Google OAuth callback URL is now dynamically configured using the `BACKEND_URL` environment variable, making deployment across different environments seamless.

## Environment Configuration

### Development
```env
NODE_ENV=development
PORT=5000
BACKEND_URL=http://localhost:5000
```

### Production
```env
NODE_ENV=production
PORT=5000
BACKEND_URL=https://your-backend-domain.com
```

### Staging
```env
NODE_ENV=staging
PORT=5000
BACKEND_URL=https://staging-api.your-domain.com
```

## Google OAuth Console Configuration

You need to update your Google OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/):

### 1. Navigate to Google Cloud Console
- Go to Google Cloud Console
- Select your project
- Go to "APIs & Services" → "Credentials"

### 2. Update OAuth 2.0 Client IDs
Find your OAuth 2.0 client ID and update the **Authorized redirect URIs**:

#### Development:
```
http://localhost:5000/api/auth/google/callback
```

#### Production:
```
https://your-backend-domain.com/api/auth/google/callback
```

#### Multiple Environments (Recommended):
Add all your environments:
```
http://localhost:5000/api/auth/google/callback
https://staging-api.your-domain.com/api/auth/google/callback
https://your-backend-domain.com/api/auth/google/callback
```

## Benefits of Dynamic Configuration

### ✅ Environment Flexibility
- No code changes needed between environments
- Easy deployment to staging/production
- Supports multiple developers with different localhost ports

### ✅ Security
- Environment-specific callback URLs
- Validation ensures required variables are set
- No hardcoded URLs in source code

### ✅ Debugging
- Console logging shows configured callback URL
- Easy to verify correct configuration
- Clear error messages for missing variables

## Troubleshooting

### Common Issues:

#### 1. "Error: redirect_uri_mismatch"
**Problem**: Google OAuth callback URL doesn't match configured URLs
**Solution**: Ensure `BACKEND_URL` matches exactly what's configured in Google Console

#### 2. "BACKEND_URL is required in environment variables"
**Problem**: Environment variable not set
**Solution**: Add `BACKEND_URL` to your `.env` file

#### 3. Callback working locally but not in production
**Problem**: Production `BACKEND_URL` not updated
**Solution**: Verify production environment variables and Google Console settings

### Debugging Steps:

1. **Check console output** for the configured callback URL:
   ```
   🔧 [passport]: Google OAuth callback URL configured: http://localhost:5000/api/auth/google/callback
   ```

2. **Verify Google Console** has matching redirect URI

3. **Test the callback URL** directly in browser to ensure server is reachable

## Environment Variable Validation

The passport configuration now includes validation:
- `GOOGLE_CLIENT_ID` - Required
- `GOOGLE_CLIENT_SECRET` - Required  
- `BACKEND_URL` - Required

Missing variables will cause the server to fail at startup with clear error messages.

## Production Deployment Checklist

- [ ] Set `BACKEND_URL` to production domain (https://your-domain.com)
- [ ] Update Google OAuth Console with production callback URL
- [ ] Verify SSL certificate is valid for production domain
- [ ] Test OAuth flow in production environment
- [ ] Monitor logs for callback URL confirmation message
