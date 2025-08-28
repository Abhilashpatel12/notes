import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();
connectDB();


const app: Express = express();
const port = process.env.PORT || 5000;

// --- Security Middleware ---
app.use(helmet()); // Set security headers
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL in production
  optionsSuccessStatus: 200
}));

app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});