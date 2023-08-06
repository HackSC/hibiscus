import { lucia } from 'lucia';
import { express } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';
import { environment } from '../environments/environment';
import { prismaClient } from './prisma';

// Need to polyfill Web Crypto API for NodeJS <= 18
import 'lucia/polyfill/node';

const env = environment.production ? 'PROD' : 'DEV';

// Initialize Lucia
export const auth = lucia({
  env,
  adapter: prisma(prismaClient),
  middleware: express(),

  getUserAttributes: (data) => {
    return {
      email: data.email,
      emailVerified: data.emailVerified,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };
  },
});

export type Auth = typeof auth;
