import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import User from '../models/User';
import { generateToken } from '../utils/token';

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

    // In a real application, you would integrate an email service here.
    // For this assignment, we'll log it to the console for easy testing.
    console.log(`
      --------------------
      OTP for ${email}: ${otp}
      --------------------
    `);

    return res.status(201).json({ message: 'User successfully registered. An OTP has been sent.' });

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
