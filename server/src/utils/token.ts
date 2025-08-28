import jwt from 'jsonwebtoken';

/**
 * Generates a JWT for a given user ID.
 * @param userId The ID of the user to sign the token for.
 * @returns The generated JWT.
 */
export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // This is a critical error, the server should not run without a secret.
    console.error('JWT_SECRET is not defined in the environment variables.');
    process.exit(1);
  }

  // The payload contains the claims we want to encode in the token.
  const payload = {
    id: userId,
  };

  // Sign the token with a 1-day expiration.
  return jwt.sign(payload, secret, {
    expiresIn: '1d',
  });
};
