

import express, { Response } from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import { signup, verifyOtp, login, sendLoginOtp, verifyLoginOtp, getMe } from '../controllers/authController';
import { generateToken } from '../utils/token';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// --- Standard Authentication Routes ---
router.post(
  '/signup',
  [
    body('name', 'Name is required').trim().not().isEmpty(),
    body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  signup
);

router.post(
  '/verify-otp',
  [
    body('email', 'Email is required').isEmail().normalizeEmail(),
    body('otp', 'OTP must be a 6-digit number').isLength({ min: 6, max: 6 }),
  ],
  verifyOtp
);

router.post(
  '/login',
  [
    body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').not().isEmpty(),
  ],
  login
);

router.post(
  '/send-login-otp',
  [
    body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  ],
  sendLoginOtp
);

router.post(
  '/verify-login-otp',
  [
    body('email', 'Email is required').isEmail().normalizeEmail(),
    body('otp', 'OTP must be a 6-digit number').isLength({ min: 6, max: 6 }),
  ],
  verifyLoginOtp
);

// --- Get Current User ---
router.get('/me', protect, getMe);

// --- Google OAuth Routes ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req: any, res: Response) => {
    const token = generateToken(req.user._id);
  res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?token=${token}`);
  }
);

export default router;
