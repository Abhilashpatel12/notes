import express from 'express';
import { signup, verifyOtp } from '../controllers/authController';
import { body } from 'express-validator';

const router = express.Router();

// Route for handling the initial user registration.
// We apply a validation chain to ensure the incoming data is clean.
router.post(
  '/signup',
  [
    body('name', 'Name is required').trim().not().isEmpty(),
    body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  signup
);

// Route for verifying the OTP sent to the user's email.
router.post(
  '/verify-otp',
  [
    body('email', 'Email is required').isEmail().normalizeEmail(),
    body('otp', 'OTP must be a 6-digit number').isLength({ min: 6, max: 6 }),
  ],
  verifyOtp
);

export default router;
