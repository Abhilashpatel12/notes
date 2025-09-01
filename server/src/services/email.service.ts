import nodemailer from 'nodemailer';

/**
 * Creates a transporter object using Nodemailer to send emails via Gmail.
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an OTP to the specified email address.
 * @param to The recipient's email address.
 * @param otp The 6-digit OTP to send.
 */
export const sendOtpEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: `"Notes App" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Your OTP for Notes App',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to Notes App!</h2>
        <p>Your One-Time Password (OTP) to verify your account is:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</p>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[server]: OTP email sent to ${to}`);
  } catch (error) {
    console.error(`[server]: Error sending OTP email to ${to}`, error);
    // In a real app, you might want to throw this error
    // so the user knows the email failed to send.
  }
};
