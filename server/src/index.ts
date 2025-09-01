import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
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
  origin: process.env.FRONTEND_URL, // Changed to match your Vite frontend URL
  optionsSuccessStatus: 200
}));

app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes); // Removed rate limiter for development
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});