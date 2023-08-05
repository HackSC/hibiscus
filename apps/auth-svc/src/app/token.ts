import { NotImplementedError, UnauthorizedError } from '../types/errors';
import { HibiscusUser } from '../types/user';
import { createKey } from './keys';

/**
 * Issue an access token for the user, which will be used for all future logins
 * and authorization/authentication of the user
 * @param userId user ID
 * @returns access token
 * @throws an error if not successful, etc...
 */
export const issueAccessToken = async (userId: string): Promise<string> => {
  // name = user ID for now
  const key = await createKey(userId);
  return key.id;
};

/**
 * Verify the access token and return the entity/user associated with this token.
 * Implementation could be either JWT or with sessions
 * @param accessToken
 * @returns the user entity or null if this user doesn't exist i.e user was deleted etc...
 * @throws {UnauthorizedError} if not authorized
 */
export const verifyToken = async (
  accessToken: string
): Promise<HibiscusUser | null> => {
  throw new NotImplementedError();
};
