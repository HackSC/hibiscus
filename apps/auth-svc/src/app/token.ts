import { LuciaError } from 'lucia';
import { UnauthorizedCause, UnauthorizedError } from '../types/errors';
import { HibiscusUser } from '../types/user';
import { createKey } from './keys';
import { auth } from './lucia';
import { toHibiscusUser } from './user';

/**
 * Issue an access token for the user, which will be used for all future logins
 * and authorization/authentication of the user
 * @param userId user ID
 * @returns access token
 * @throws an error if not successful, etc...
 */
export const issueAccessToken = async (userId: string): Promise<string> => {
  // name = user ID for now
  const session = await auth.createSession({ userId, attributes: {} });
  return session.sessionId;
};

/**
 * Verify the access token and return the entity/user associated with this token.
 * Implementation could be either JWT or with sessions
 * @param accessToken
 * @returns user: user entity or null if this user doesn't exist i.e user was deleted etc...
 * @throws {UnauthorizedError} if not authorized
 */
export const verifyToken = async (
  accessToken: string
): Promise<HibiscusUser | null> => {
  try {
    const session = await auth.getSession(accessToken);

    return toHibiscusUser(session.user);
  } catch (e) {
    if (e instanceof LuciaError) {
      if (e.name === 'AUTH_INVALID_SESSION_ID') {
        throw new UnauthorizedError(
          UnauthorizedCause.INVALID_ACCESS_TOKEN,
          'Invalid access token'
        );
      }
    }

    throw e;
  }
};

interface TokenValidationResult {
  user: HibiscusUser | null;
  newToken: string | null;
}
