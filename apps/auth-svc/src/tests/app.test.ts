import app from '../app';
import request from 'supertest';
import { prismaClient } from '../app/prisma';
import { auth } from '../app/lucia';
import { HibiscusRole } from '../types/user';
import { generateEmailVerificationToken } from '../app/email';
import { LuciaError } from 'lucia';

let adminAccessToken = '';
let accessToken = '';

beforeAll(async () => {
  // Clear all tables
  const tablenames = await prismaClient.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.error({ error });
    throw error;
  }

  // Set up admin account
  const admin = await auth.createUser({
    key: null,
    attributes: {
      email: 'example@hacksc.com',
      emailVerified: true,
      role: HibiscusRole.ADMIN,
      firstName: 'Hack',
      lastName: 'SC',
    },
  });

  const adminSession = await auth.createSession({
    userId: admin.userId,
    attributes: {},
  });
  adminAccessToken = adminSession.sessionId;

  // Set up hacker account
  const hacker = await auth.createUser({
    key: {
      providerId: 'email',
      providerUserId: 'delivered@resend.dev',
      password: 'hackerabc123',
    },
    attributes: {
      email: 'delivered@resend.dev',
      emailVerified: true,
      role: HibiscusRole.HACKER,
      firstName: 'Hack',
      lastName: 'SC',
    },
  });

  const hackerSession = await auth.createSession({
    userId: hacker.userId,
    attributes: {},
  });
  accessToken = hackerSession.sessionId;
});

describe('/:role/register', () => {
  test('signs up a hacker', async () => {
    const res = await request(app)
      .post('/hacker/register')
      .send({
        firstName: 'Example',
        lastName: 'Hacker',
        email: 'delivered+hacker@resend.dev',
        password: 'abc123',
      })
      .set('Accept', 'application/json');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).not.toBe('');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.accessToken).not.toBe('');
  });

  test('signs up a user with a higher role', async () => {
    const res = await request(app)
      .post('/volunteer/register')
      .send({
        firstName: 'Example',
        lastName: 'Volunteer',
        email: 'delivered+volunteer@resend.dev',
        password: 'abc123',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).not.toBe('');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.accessToken).not.toBe('');
  });

  test('does not sign up a user with a higher role if not invoked by admin', async () => {
    const res = await request(app)
      .post('/sponsor/register')
      .send({
        firstName: 'Example',
        lastName: 'Volunteer',
        email: 'delivered+sponsor@resend.dev',
        password: 'abc123',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(401);
  });

  test('does not sign up a user with a duplicate email', async () => {
    const res = await request(app)
      .post('/hacker/register')
      .send({
        firstName: 'Example',
        lastName: 'Hacker',
        email: 'delivered@resend.dev',
        password: 'abc123',
      })
      .set('Accept', 'application/json');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(400);
  });
});

describe('/login', () => {
  test('logs in a user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'delivered@resend.dev',
        password: 'hackerabc123',
      })
      .set('Accept', 'application/json');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.accessToken).not.toBe('');
  });

  test('does not log in a user if an incorrect password is provided', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'delivered@resend.dev',
        password: 'abc123',
      })
      .set('Accept', 'application/json');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(401);
  });
});

describe('/logout', () => {
  test('invalidates access token upon logging out', async () => {
    // Set up hacker account
    const hacker = await auth.createUser({
      key: {
        providerId: 'email',
        providerUserId: 'delivered+hacker1@resend.dev',
        password: 'hackerabc123',
      },
      attributes: {
        email: 'delivered+hacker1@resend.dev',
        emailVerified: true,
        role: HibiscusRole.HACKER,
        firstName: 'Hack',
        lastName: 'SC',
      },
    });

    const hackerSession = await auth.createSession({
      userId: hacker.userId,
      attributes: {},
    });
    accessToken = hackerSession.sessionId;

    // Logout
    const res = await request(app)
      .post('/logout')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toEqual(200);

    // Test access token validity
    await expect(auth.getSession(accessToken)).rejects.toThrow(LuciaError);
  });

  test('returns error when invalid access token is provided', async () => {
    const res = await request(app)
      .post('/logout')
      .set('Authorization', `Bearer abcdef`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(401);
  });
});

describe('/verify-email', () => {
  let unverifiedAccessToken = '';
  let unverifiedUserId = '';
  let i = 0;

  beforeEach(async () => {
    // Set up unverified account
    const hacker = await auth.createUser({
      key: null,
      attributes: {
        email: `delivered+unverified${i}@resend.dev`,
        emailVerified: true,
        role: HibiscusRole.HACKER,
        firstName: 'Hack',
        lastName: 'SC',
      },
    });

    const hackerSession = await auth.createSession({
      userId: hacker.userId,
      attributes: {},
    });
    unverifiedAccessToken = hackerSession.sessionId;
    unverifiedUserId = hacker.userId;

    i++;
  });

  test('verifies email when given OTP', async () => {
    // Generate OTP
    const otp = await generateEmailVerificationToken(
      unverifiedUserId,
      6,
      30,
      5
    );

    const res = await request(app)
      .post('/verify-email')
      .send({
        pin: otp,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${unverifiedAccessToken}`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.accessToken).not.toBe('');
  });

  test('does not verify email when given incorrect OTP', async () => {
    // Generate OTP
    await generateEmailVerificationToken(unverifiedUserId, 6, 30, 5);

    const res = await request(app)
      .post('/verify-email')
      .send({
        pin: 'abcdef',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${unverifiedAccessToken}`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(400);
  });

  test('does not verify email when given expired OTP', async () => {
    // Generate OTP
    await generateEmailVerificationToken(unverifiedUserId, 6, -1, 5);

    const res = await request(app)
      .post('/verify-email')
      .send({
        pin: 'abcdef',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${unverifiedAccessToken}`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(400);
  });

  test('does not verify email if session is invalid', async () => {
    // Generate OTP
    await generateEmailVerificationToken(unverifiedUserId, 6, 30, 5);

    const res = await request(app)
      .post('/verify-email')
      .send({
        pin: 'abcdef',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer abc`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(401);
  });
});
