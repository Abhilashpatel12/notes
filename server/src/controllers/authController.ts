import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import User from '../models/User';
import { generateToken } from '../utils/token';
import { sendOtpEmail } from '../services/email.service';

// --- User Registration ---
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check 1: Does a user with this email already exist?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Conflict: A user with this email already exists.' });
    }

    // Always hash passwords before saving. 10 salt rounds is a strong, standard choice.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a simple 6-digit numeric OTP for easy user entry.
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    await newUser.save();

    // Send OTP email
    await sendOtpEmail(newUser.email, otp);

    return res.status(201).json({ message: 'User successfully registered. An OTP has been sent to your email.' });

  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// --- OTP Verification ---
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const userToVerify = await User.findOne({ email });

    // Check 1: Ensure the user exists in our database.
    if (!userToVerify) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check 2: Has this user already been verified?
    if (userToVerify.isVerified) {
      return res.status(400).json({ message: 'This account has already been verified.' });
    }

    // Check 3: Does the provided OTP match the one in the database?
    if (userToVerify.otp !== otp) {
      return res.status(400).json({ message: 'The OTP provided is invalid.' });
    }

    // OTP is a one-time use token, clear it after successful verification for security.
    userToVerify.isVerified = true;
    userToVerify.otp = undefined;
    await userToVerify.save();

    // Generate a token to log the user in immediately after verification.
    const token = generateToken(String(userToVerify._id));

    return res.status(200).json({
      message: 'Account verified successfully.',
      token,
      user: {
        id: userToVerify._id,
        name: userToVerify.name,
        email: userToVerify.email,
      },
    });

  } catch (error) {
    console.error('Error during OTP verification:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc    Generate and send an OTP for an existing user to log in.
 * @route   POST /api/auth/send-login-otp
 */
export const sendLoginOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // 1. Find the user by email.
    const user = await User.findOne({ email });
    if (!user) {
      // Send a generic message to prevent exposing which emails are registered.
      return res.status(404).json({ message: 'If a user with this email exists, an OTP has been sent.' });
    }

    // 2. Ensure the user's account is verified.
    if (!user.isVerified) {
      return res.status(403).json({ message: 'This account is not verified. Please complete the signup process.' });
    }

    // 3. Generate a new OTP.
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // 4. Save the new OTP to the user's document and set an expiration.
    user.otp = otp;
    // Optional: You can also add an otpExpires field to your User model
    // for enhanced security, but for now, we'll just overwrite the OTP.
    await user.save();

    // 5. Send the OTP via email.
    await sendOtpEmail(user.email, otp);

    return res.status(200).json({ message: 'An OTP has been sent to your email.' });

  } catch (error) {
    console.error('Error sending login OTP:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// --- User Login ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by their email address.
    const user = await User.findOne({ email });
    if (!user) {
      // Use a generic error message to avoid revealing if an email is registered.
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check if the user has verified their account.
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Account not verified. Please check your email for an OTP.' });
    }

    // 3. Compare the provided password with the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. If credentials are correct, generate a JWT.
    const token = generateToken(String(user._id));

    return res.status(200).json({
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// --- Login OTP Verification ---
export const verifyLoginOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    // Check 1: Ensure the user exists in our database.
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check 2: Ensure the user's account is verified.
    if (!user.isVerified) {
      return res.status(403).json({ message: 'This account is not verified. Please complete the signup process.' });
    }

    // Check 3: Does the provided OTP match the one in the database?
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'The OTP provided is invalid.' });
    }

    // OTP is correct, clear it for security and generate login token.
    user.otp = undefined;
    await user.save();

    // Generate a token to log the user in.
    const token = generateToken(String(user._id));

    return res.status(200).json({
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Error during login OTP verification:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// --- Get Current User ---
export const getMe = async (req: Request, res: Response) => {
  try {
    // req.user should be populated by the protect middleware
    const user = req.user as any;
    
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error('Error getting current user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
