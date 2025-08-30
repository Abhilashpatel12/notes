import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if a user already exists with this Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          // If not, check if a user exists with the same email
          user = await User.findOne({ email: profile.emails?.[0].value });

          if (user) {
            // If a user with that email exists but doesn't have a googleId,
            // you could link the account here. For simplicity, we'll just return the user.
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }

          // If no user exists, create a new one
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            isVerified: true, // Email is verified by Google
          });

          await newUser.save();
          done(null, newUser);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
