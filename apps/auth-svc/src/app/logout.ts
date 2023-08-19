import { LuciaError } from 'lucia';
import { auth } from './lucia';
import { UnauthorizedCause, UnauthorizedError } from '../types/errors';

export const logout = async (accessToken: string): Promise<void> => {
  try {
    const session = await auth.getSession(accessToken);

    await auth.invalidateSession(session.sessionId);
  } catch (e) {
    if (e instanceof LuciaError && e.message === 'AUTH_INVALID_SESSION_ID') {
      // Invalid access token/session
      throw new UnauthorizedError(
        UnauthorizedCause.INVALID_ACCESS_TOKEN,
        UnauthorizedCause.INVALID_ACCESS_TOKEN
      );
    }

    throw e;
  }
};
