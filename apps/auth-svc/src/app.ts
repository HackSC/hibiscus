import express, { NextFunction, Request, Response } from 'express';
import {
  DuplicateEmailError,
  InvalidEmailError,
  LoginError,
  OTPValidationResult,
  RoleError,
  UnauthorizedCause,
  UnauthorizedError,
} from './types/errors';
import { HibiscusRole, HibiscusUser } from './types/user';
import { createResponseBody, validRole } from './app/utils';
import { issueAccessToken, verifyToken } from './app/token';
import { auth } from './app/lucia';
import { login } from './app/login';
import { verifyEmail } from './app/email';
import { invite, signup } from './app/signup';
import { logout } from './app/logout';

const authorize =
  (roles?: HibiscusRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = auth.readBearerToken(req.headers.authorization);
    if (token === null) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            message: 'Unauthorized',
            code: UnauthorizedCause.NO_ACCESS_TOKEN,
            statusCode: 401,
          },
        })
      );
    }
    // verify the token and get user identity
    let user = null;
    try {
      user = await verifyToken(token);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return res.status(401).json(
          createResponseBody({
            meta: {
              message: 'Unauthorized',
              code: err.cause,
              statusCode: 401,
            },
          })
        );
      } else {
        return next(err);
      }
    }
    if (user === null) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            message: 'Unauthorized',
            code: UnauthorizedCause.INVALID_ACCESS_TOKEN,
            statusCode: 401,
          },
        })
      );
    }
    // check user role satisfies if roles were specified
    if (roles?.includes(user.role)) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            message:
              "Unauthorized; you don't have the correct role(s) for this action.",
            code: UnauthorizedCause.PROTECTED_BY_POLICIES,
            statusCode: 401,
          },
        })
      );
    }
    next();
  };

const app = express();

app.use(express.json());

app.post('/:role/register', async (req, res, next) => {
  const role = req.params.role.toUpperCase() as HibiscusRole;
  if (!validRole(role)) {
    return next(new RoleError(400, 'Invalid role.'));
  }
  const { firstName, lastName, email, password } = req.body;
  const accessToken = auth.readBearerToken(req.headers.authorization);
  // TODO: verify correct body via Zod
  // try to create the user
  try {
    // Create user and send verification email
    let user: HibiscusUser;
    if (role === HibiscusRole.HACKER) {
      user = await signup({ firstName, lastName, email, role }, password);
    } else {
      // Creating any other role requires admin access
      user = await invite(
        { firstName, lastName, email, role },
        accessToken ? { accessToken } : undefined
      );
    }

    // Return session ID (access token)
    const userToken = await issueAccessToken(user.id);

    return res.json(
      createResponseBody({
        data: {
          id: user.id,
          accessToken: userToken,
        },
      })
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            statusCode: 401,
            message: 'User is not authorized',
            code: error.cause,
          },
        })
      );
    } else if (
      error instanceof InvalidEmailError ||
      error instanceof DuplicateEmailError
    ) {
      return res.status(400).json(
        createResponseBody({
          meta: {
            statusCode: 400,
            message: error.message,
          },
        })
      );
    } else {
      return next(error);
    }
  }
});

app.post('/login', async (req, res, next) => {
  // each route should issue a JWT token with enough scopes according to the role
  // audit log this login
  const { email, password } = req.body;
  try {
    const accessToken = await login(email, password);

    return res.json(
      createResponseBody({
        data: {
          accessToken,
        },
      })
    );
  } catch (error) {
    if (error instanceof LoginError) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            statusCode: 401,
            message: error.message,
          },
        })
      );
    } else {
      return next(error);
    }
  }
});

app.post('/logout', async (req, res, next) => {
  const accessToken = auth.readBearerToken(req.headers.authorization);

  if (accessToken === null) {
    return res.status(401).json(
      createResponseBody({
        meta: {
          statusCode: 401,
          message: 'No active session',
          code: UnauthorizedCause.NO_ACCESS_TOKEN,
        },
      })
    );
  }

  try {
    await logout(accessToken);

    return res.json(createResponseBody());
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            statusCode: 401,
            message: 'User is not authorized',
            code: error.cause,
          },
        })
      );
    } else {
      return next(error);
    }
  }
});

app.post('/verify-email', async (req, res, next) => {
  const { pin } = req.body;
  const accessToken = auth.readBearerToken(req.headers.authorization);

  if (accessToken === null) {
    return res.status(401).json(
      createResponseBody({
        meta: {
          statusCode: 401,
          message: 'No active session',
          code: UnauthorizedCause.NO_ACCESS_TOKEN,
        },
      })
    );
  }

  let user: HibiscusUser | null;
  try {
    user = await verifyToken(accessToken);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json(
        createResponseBody({
          meta: {
            statusCode: 401,
            message: 'User is not authorized',
            code: error.cause,
          },
        })
      );
    } else {
      return next(error);
    }
  }

  if (user === null) {
    return res.status(401).json(
      createResponseBody({
        meta: {
          statusCode: 401,
          message: 'Invalid session',
          code: UnauthorizedCause.INVALID_ACCESS_TOKEN,
        },
      })
    );
  }

  try {
    const result = await verifyEmail(pin, user.id);
    if (result === OTPValidationResult.VALIDATION_SUCCESS) {
      const newToken = await issueAccessToken(user.id);

      return res.json(
        createResponseBody({
          data: {
            accessToken: newToken,
          },
        })
      );
    } else if (result === OTPValidationResult.INVALID_OTP) {
      return res.status(400).json(
        createResponseBody({
          meta: {
            statusCode: 400,
            message: 'Invalid OTP',
          },
        })
      );
    } else if (result === OTPValidationResult.EXPIRED_OTP) {
      return res.status(400).json(
        createResponseBody({
          meta: {
            statusCode: 400,
            message: 'Expired OTP',
          },
        })
      );
    }
  } catch (error) {
    return next(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: unknown, res: Response, _next: unknown) => {
  if (err instanceof RoleError) {
    return res.status(err.httpCode).json(
      createResponseBody({
        meta: {
          statusCode: err.httpCode,
          message: err.message,
        },
      })
    );
  } else {
    console.error('Unknown error', err);
    return res.status(500).json(
      createResponseBody({
        meta: {
          statusCode: 500,
          message: 'Something went wrong',
        },
      })
    );
  }
});

export default app;
