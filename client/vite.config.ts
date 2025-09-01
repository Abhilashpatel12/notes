
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Build CSP connect-src based on environment
  const buildConnectSrc = () => {
    const connectSrc = ["'self'"];
    
    // Get backend URL from environment variable with fallback
    const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:5000';
    connectSrc.push(backendUrl);
    
    // Add WebSocket for dev server in development
    if (mode === 'development') {
      connectSrc.push('ws://127.0.0.1:5173');
    }
    
    // Always allow Google OAuth
    connectSrc.push('https://accounts.google.com');
    
    return connectSrc.join(' ');
  };

  const cspConnectSrc = buildConnectSrc();

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      // Production optimizations
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        output: {
          // Code splitting for better caching
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            markdown: ['react-markdown', 'remark-gfm', 'react-syntax-highlighter'],
          },
          // Clean asset names
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
        external: [
          // Exclude problematic packages
          '@radix-ui/react-dialog',
          '@radix-ui/react-toast',
          'cmdk',
          'vaul'
        ]
      },
      // Target modern browsers
      target: ['es2020', 'chrome80', 'firefox80', 'safari13'],
    },
    server: {
      // Development server security
      host: '127.0.0.1',
      port: 5173,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        // Allow localhost API in development - use environment variable
        'Content-Security-Policy': `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src ${cspConnectSrc}; frame-src https://accounts.google.com;`
      },
    },
    preview: {
      // Preview server security
      host: '127.0.0.1',
      port: 4173,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        // Production-like CSP for preview - use environment variable
        'Content-Security-Policy': `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src ${cspConnectSrc}; frame-src https://accounts.google.com;`
      },
    },
  };
});
