import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// --- Rate Limiter ---
// This will apply to all requests that start with /api/auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

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
app.use(passport.initialize()); // Initialize passport

// --- Security Middleware ---
app.use(helmet()); // Set security headers
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL in production
  optionsSuccessStatus: 200
}));

app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authLimiter, authRoutes); // Apply limiter to auth routes
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});