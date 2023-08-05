import express, { NextFunction, Request, Response } from 'express';
import {
  RoleError,
  UnauthorizedCause,
  UnauthorizedError,
} from './types/errors';
import { HibiscusRole } from './types/user';
import { createResponseBody, validRole } from './app/utils';
import { createUser } from './app/user';
import { issueAccessToken, verifyToken } from './app/token';
import { access } from 'fs';

const authorize =
  (roles?: HibiscusRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token === undefined) {
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

app.get('/:role/register', async (req, res, next) => {
  // each route should issue a JWT token with the role in the claims
  const role = req.params.role.toUpperCase() as HibiscusRole;
  if (!validRole(role)) {
    return next(new RoleError(400, 'Invalid role.'));
  }
  const { firstName, lastName, email } = req.body;
  const accessToken = req.headers.authorization;
  // TODO: verify correct body via Zod
  // try to create the user
  try {
    const user = await createUser(
      { firstName, lastName, email, role },
      accessToken ? { accessToken } : undefined
    );
    return res.json(
      createResponseBody({
        data: {
          id: user.id,
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
    } else {
      return next(error);
    }
  }
});

app.get('/login', authorize(), (req, res, next) => {
  // each route should issue a JWT token with enough scopes according to the role
  // audit log this login
  return;
});

app.get('/logout', async (req, res) => {
  //
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: unknown, res: Response, _next: unknown) => {
  if (err instanceof RoleError) {
    return res.json({
      meta: {
        status: err.httpCode,
        message: err.message,
      },
    });
  } else {
    console.error('Unknown error', err);
    return res.json({
      meta: {
        status: 500,
        message: 'Something went wrong',
      },
    });
  }
});

const port = 3333;
app.listen(port, () => {
  console.log('Listening on ' + port);
});
