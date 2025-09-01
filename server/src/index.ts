import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import morgan from 'morgan';
import passport from 'passport';
import { configurePassport } from './config/passport';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();
connectDB();
configurePassport(); // Configure passport

const app: Express = express();
const port = process.env.PORT || 5000;

// --- Request Logging ---
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined')); // Detailed logging for production
} else {
  app.use(morgan('dev')); // Colored logging for development
}

// --- Security Middleware ---
// Disable CSP in development to avoid blocking frontend connections
const cspConfig = process.env.NODE_ENV === 'development' ? false : {
  directives: {
    defaultSrc: [process.env.CSP_DEFAULT_SRC || "'self'"],
    styleSrc: [process.env.CSP_STYLE_SRC || "'self'", "'unsafe-inline'"],
    scriptSrc: [process.env.CSP_SCRIPT_SRC || "'self'"],
    imgSrc: [process.env.CSP_IMG_SRC || "'self'", "data:", "https:"],
    connectSrc: process.env.CSP_CONNECT_SRC ? 
      process.env.CSP_CONNECT_SRC.split(' ') : 
      ["'self'", ...(process.env.API_BASE_URL ? [process.env.API_BASE_URL] : []), "https://accounts.google.com", "https://api.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  },
};

app.use(helmet({
  contentSecurityPolicy: cspConfig,
  crossOriginEmbedderPolicy: false, // Allow cross-origin requests for API
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  } : false // Disable HSTS in development
})); // Enhanced security headers

app.use(cors({
  origin: process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: process.env.CORS_CREDENTIALS === 'true' || true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset'],
}));

// Rate limiting for all routes
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Limit each IP to 100 requests per windowMs default
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health checks in production
    return req.path === '/health' || req.path === '/api/health';
  },
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes default
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '20'), // Limit each IP to 20 auth requests per windowMs default
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

app.use(generalLimiter); // Apply general rate limiting to all routes
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Additional security middleware
app.use(mongoSanitize()); // Prevent NoSQL injection attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution attacks

app.use(passport.initialize()); // Initialize passport

// --- API Routes ---
app.use('/api/auth', authLimiter, authRoutes); // Apply stricter rate limiting to auth routes
app.use('/api/notes', noteRoutes);

// Health check endpoint (excluded from rate limiting)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    api: 'Notes API v1.0',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging
  console.error(`${new Date().toISOString()} - Error:`, {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Handle different types of errors
  let status = err.status || err.statusCode || 500;
  let message = 'Internal Server Error';

  // Rate limiting error
  if (err.status === 429) {
    status = 429;
    message = 'Too many requests, please try again later';
  }
  
  // Validation errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation Error';
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }
  
  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }

  // MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    status = 500;
    message = 'Database error';
  }

  // Don't leak error details in production
  const response: any = {
    message,
    timestamp: new Date().toISOString(),
    path: req.url
  };

  if (process.env.NODE_ENV === 'development') {
    response.error = err.message;
    response.stack = err.stack;
  }

  res.status(status).json(response);
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  console.log(`${new Date().toISOString()} - 404: ${req.method} ${req.originalUrl} from ${req.ip}`);
  res.status(404).json({ 
    message: 'Route not found',
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
});

const server = app.listen(port, () => {
  console.log(`🚀 [server]: Server is running at http://localhost:${port}`);
  console.log(`🛡️ [security]: Rate limiting enabled`);
  console.log(`🔒 [security]: Enhanced security headers enabled`);
  console.log(`🔍 [security]: Request logging enabled (${process.env.NODE_ENV || 'development'} mode)`);
  console.log(`🚫 [security]: NoSQL injection protection enabled`);
  console.log(`🛡️ [security]: HTTP Parameter Pollution protection enabled`);
  console.log(`🌐 [cors]: CORS enabled${process.env.NODE_ENV === 'production' ? '' : ` for origin: ${process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173'}`}`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  console.log(`\n🔄 [server]: Received ${signal}. Starting graceful shutdown...`);
  
  server.close((err) => {
    if (err) {
      console.error('❌ [server]: Error during server shutdown:', err);
      process.exit(1);
    }
    
    console.log('✅ [server]: Server closed successfully');
    
    // Close database connection
    import('mongoose').then((mongoose) => {
      if (mongoose.default && mongoose.default.connection) {
        mongoose.default.connection.close().then(() => {
          console.log('✅ [database]: Database connection closed');
          process.exit(0);
        }).catch((err) => {
          console.error('❌ [database]: Error closing database connection:', err);
          process.exit(1);
        });
      } else {
        console.log('✅ [database]: No active connection to close');
        process.exit(0);
      }
    }).catch((err) => {
      console.error('❌ [database]: Error importing mongoose:', err);
      process.exit(1);
    });
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('⚠️ [server]: Forced shutdown after 30 seconds');
    process.exit(1);
  }, 30000);
};

// Listen for shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any, promise) => {
  console.error('❌ [error]: Unhandled Promise Rejection at:', promise, 'reason:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ [error]: Uncaught Exception thrown:', err);
  server.close(() => {
    process.exit(1);
  });
});