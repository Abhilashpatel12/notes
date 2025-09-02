# CSP Configuration and Environment Variables

## Overview

The application now uses environment-driven Content Security Policy (CSP) configuration to resolve CSP violations and avoid hardcoded URLs. This ensures the application works correctly in both development and production environments.

## Environment Variables

### Server-side Variables

- `API_BASE_URL`: The base URL of your API server (e.g., `https://notes-mz1r.onrender.com`)
  - Used for CSP `connect-src` directive
  - Required for production deployments
  - If not set, no additional API URL will be added to CSP

- `CSP_CONNECT_SRC`: Override for complete CSP connect-src directive (space-separated)
  - Example: `"'self' https://custom-api.com https://accounts.google.com"`
  - Takes precedence over `API_BASE_URL` if set

- `NODE_ENV`: Set to `production` for production deployments
  - Controls console logging behavior
  - In production, CORS origin is not logged to avoid exposing sensitive URLs

### Client-side Variables (Build-time)

- `VITE_API_BASE_URL`: The base URL of your API server for client builds
  - Used by Vite development and preview servers for CSP headers
  - Should match the server's `API_BASE_URL` value
  - Defaults to `http://localhost:5000` if not set

## Deployment Configuration

### Production Deployment

Set these environment variables in your production environment:

```bash
# Server
NODE_ENV=production
API_BASE_URL=https://your-api-domain.com

# Client (build-time)
VITE_API_BASE_URL=https://your-api-domain.com
```

### Development

For local development, no environment variables are required. The defaults will work:
- Server CSP will not include additional API URLs
- Client will use `http://localhost:5000` by default

### Custom CSP Configuration

If you need custom CSP configuration, you can use:

```bash
# Override the entire connect-src directive
CSP_CONNECT_SRC="'self' https://custom-api.com https://another-api.com https://accounts.google.com"
```

## How It Works

### Server CSP (Production only)

The server uses Helmet middleware to set CSP headers. In production mode, it builds the `connect-src` directive as follows:

1. If `CSP_CONNECT_SRC` is set, use it directly
2. Otherwise, build from defaults: `'self'` + `API_BASE_URL` (if set) + Google OAuth domains

### Client CSP (Development/Preview)

The Vite development and preview servers set CSP headers for testing. They use `VITE_API_BASE_URL` to include the correct API URL in the CSP.

### HTML CSP Meta Tag

The hardcoded CSP meta tag has been removed from `client/index.html` to avoid conflicts with environment-driven server CSP headers.

## Testing

To verify your CSP configuration is working:

1. Check browser console for CSP violations
2. Verify API calls to your backend succeed
3. Ensure Google OAuth continues to work

## Migration from Previous Version

If you're upgrading from a version with hardcoded URLs:

1. Set `API_BASE_URL` to your production API URL
2. Set `VITE_API_BASE_URL` to the same value
3. Remove any hardcoded URL references in your deployment scripts
4. Test in staging environment before production deployment

## Troubleshooting

### CSP Violations Still Occur

- Verify `API_BASE_URL` is set correctly in production
- Check that your API URL matches exactly (including protocol and port)
- Use browser developer tools to inspect actual CSP headers

### API Calls Fail

- Ensure `VITE_API_BASE_URL` matches the actual API server URL
- Verify CORS configuration on the server allows your frontend domain

### OAuth Not Working

- Google OAuth domains are included by default
- If using custom OAuth providers, add them to `CSP_CONNECT_SRC`