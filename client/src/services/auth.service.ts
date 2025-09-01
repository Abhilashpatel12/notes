import axios from 'axios';

// Use environment variable for backend URL with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
});

/**
 * Sends a request to the /signup endpoint.
 * @param userData - The user's name, email, and password.
 */
export const signup = (userData: any) => {
  return api.post('/signup', userData);
};

/**
 * Sends a request to the /verify-otp endpoint.
 * @param otpData - The user's email and OTP.
 */
export const verifyOtp = (otpData: any) => {
  return api.post('/verify-otp', otpData);
};

/**
 * Sends a request to the /login endpoint.
 * @param credentials - The user's email and password.
 */
export const login = (credentials: any) => {
  return api.post('/login', credentials);
};

/**
 * Sends a request to the /send-login-otp endpoint.
 * @param emailData - The user's email for login OTP.
 */
export const sendLoginOtp = (emailData: { email: string }) => {
  return api.post('/send-login-otp', emailData);
};

/**
 * Sends a request to the /verify-login-otp endpoint.
 * @param otpData - The user's email and OTP for login verification.
 */
export const verifyLoginOtp = (otpData: any) => {
  return api.post('/verify-login-otp', otpData);
};

/**
 * Gets current user information using the stored token.
 */
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const authService = {
  signup,
  verifyOtp,
  login,
  sendLoginOtp,
  verifyLoginOtp,
  getCurrentUser,
};

export default authService;
