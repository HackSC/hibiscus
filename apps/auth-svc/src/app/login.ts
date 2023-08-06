import { LuciaError, Session } from 'lucia';
import { auth } from './lucia';
import { LoginError } from '../types/errors';

export const login = async (
  email: string,
  password: string
): Promise<Session> => {
  try {
    const key = await auth.useKey('email', email.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    return session;
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
