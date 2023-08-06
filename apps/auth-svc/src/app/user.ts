import { Prisma } from '@prisma/client';
import {
  DuplicateEmailError,
  InvalidEmailError,
  NotImplementedError,
  UnauthorizedCause,
  UnauthorizedError,
} from '../types/errors';
import { HibiscusRole, HibiscusUser } from '../types/user';
import { AuditLogAction, AuditableEntity, createAuditLog } from './audit-logs';
import { auth } from './lucia';
import { User } from 'lucia';
import { verifyToken } from './token';

/**
 * Creates a user and return its data; will raise errors if not authorized
 *
 * @param details details about the user e.g first/last name, email, role etc...
 * @param password optional user password for if the user is creating their account themselves
 * @param authorization optional metadata to perform this action if requires authorization e.g only admins can create Judge + Sponsor + Volunteer account
 */
export const createUser = async (
  details: {
    firstName: string;
    lastName: string;
    role: HibiscusRole;
    email: string;
  },
  password?: string,
  authorization?: { accessToken: string }
): Promise<HibiscusUser> => {
  if (!isValidEmail(details.email)) {
    throw new InvalidEmailError();
  }

  if (details.role !== HibiscusRole.HACKER) {
    // Verify authorization
    if (authorization === undefined) {
      throw new UnauthorizedError(
        UnauthorizedCause.NO_ACCESS_TOKEN,
        UnauthorizedCause.NO_ACCESS_TOKEN
      );
    }

    const user = await verifyToken(authorization?.accessToken);
    if (user === null) {
      throw new UnauthorizedError(
        UnauthorizedCause.INVALID_ACCESS_TOKEN,
        UnauthorizedCause.INVALID_ACCESS_TOKEN
      );
    }

    if (user.role !== HibiscusRole.ADMIN) {
      throw new UnauthorizedError(
        UnauthorizedCause.PROTECTED_BY_POLICIES,
        UnauthorizedCause.PROTECTED_BY_POLICIES
      );
    }
  }

  // Create key
  const key =
    password === undefined
      ? null
      : {
          providerId: 'email',
          providerUserId: details.email.toLowerCase(),
          password,
        };

  let user: User;
  try {
    // Create user
    // Throws error if email is already in use
    user = await auth.createUser({
      key,
      attributes: {
        email: details.email.toLowerCase(),
        emailVerified: false,
        role: details.role,
        firstName: details.firstName,
        lastName: details.lastName,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new DuplicateEmailError();
      }
    }

    // Unknown error occured
    throw e;
  }

  const log = await createAuditLog({
    action: AuditLogAction.CREATE_USER,
    entity: AuditableEntity.HibiscusUser,
    entityId: user.userId,
  });

  return user;
};

/**
 * Check if the provided email is in a valid format
 *
 * @param maybeEmail provided email address
 * @returns whether the email is valid
 */
const isValidEmail = (maybeEmail: string): boolean => {
  const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
  return emailRegexp.test(maybeEmail);
};
