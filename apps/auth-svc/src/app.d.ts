import { HibiscusRole } from './types/user.js';

/// <reference types="lucia" />

declare namespace Lucia {
  type Auth = import('./lucia.js').Auth;
  type DatabaseUserAttributes = {
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    role: HibiscusRole;
  };
  type DatabaseSessionAttributes = Record<string, never>;
}
