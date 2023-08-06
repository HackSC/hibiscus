import { LuciaError } from 'lucia';
import { auth } from './lucia';
import { LoginError } from '../types/errors';
import { issueAccessToken } from './token';

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const key = await auth.useKey('email', email.toLowerCase(), password);
    const accessToken = await issueAccessToken(key.userId);

    return accessToken;
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' ||
        e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      // user does not exist or invalid password
      throw new LoginError();
    }

    throw e;
  }
};
