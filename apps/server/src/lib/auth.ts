import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { db } from '../db';
import { account, session, user, verification } from '../db/schema/auth';
import { todo } from '../db/schema/todo';

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: { user, session, account, verification, todo },
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
    passwordStrength: 'medium',
    // autoSignIn: true,
    sendResetPassword: async ({
      user: _authUser,
      token: _token,
      url: _url,
    }) => {
      // TODO: Implement actual email sending logic
      // For now, just return without doing anything
      await Promise.resolve();
    },
    resetPasswordTokenExpiresIn: 60 * 60 * 24 * 1, // 1 day
  },
  emailVerification: {
    sendVerificationEmail: async ({
      user: _authUser,
      token: _token,
      url: _url,
    }) => {
      // TODO: Implement actual email sending logic
      // For now, just return without doing anything
      await Promise.resolve();
    },
    sendOnSignUp: true,
    // autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    redirectTo: '/',
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [admin()],
});
