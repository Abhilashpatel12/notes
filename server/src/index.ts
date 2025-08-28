import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes'; // Import auth routes
import noteRoutes from './routes/noteRoutes'; // Import note routes

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());


// Define routes
app.use('/api/auth', authRoutes); // Use the auth routes
app.use('/api/notes', noteRoutes); // Use the note routes

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});