import { HibiscusUserId } from '../types/user';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { prismaClient } from './prisma';
import { Prisma } from '@prisma/client';
import { Resend } from 'resend';
// import { getEnv } from '@hibiscus/env'; <-- TODO broken import
import {
  MissingEnvError,
  OTPGenerationError,
  OTPValidationResult,
  ResendError,
} from '../types/errors';
import { auth } from './lucia';
import { AuditLogAction, AuditableEntity, createAuditLog } from './audit-logs';

const MAX_REPEATS_OTP = 5;

/**
 * Creates a PIN and a verification record and send it to user email
 *
 * @param to email address to send the OTP to
 * @param userId user ID
 * @param pinLength number of digits in the OTP
 * @param expirationMins number of minutes by which the OTP would expire
 */
export const sendEmailVerificationViaPIN = async (
  to: string,
  userId: HibiscusUserId,
  pinLength: number,
  expirationMins = 30
) => {
  const otp = await generateEmailVerificationToken(
    userId,
    pinLength,
    expirationMins,
    MAX_REPEATS_OTP
  );

  // Send email through Resend
  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.RESEND_EMAIL_FROM;

  if (apiKey === undefined) {
    throw new MissingEnvError('RESEND_API_KEY');
  }

  if (emailFrom === undefined) {
    throw new MissingEnvError('RESEND_EMAIL_FROM');
  }

  let resend: Resend;
  try {
    resend = new Resend(apiKey);
  } catch (e) {
    throw new ResendError('Failed to initialize email service');
  }

  try {
    await resend.emails.send({
      from: emailFrom,
      to: [to],
      subject: 'HackSC OTP',
      html: `${otp}`,
    });
  } catch (e) {
    throw new ResendError('Failed to send verification email');
  }
};

export const resendEmailVerificationViaPIN = async (
  to: string,
  userId: HibiscusUserId,
  pinLength: number,
  expirationMins = 30
) => {
  // get the last verificationsa d
};

/**
 * Validates the provided email verification token
 *
 * @param pin OTP
 * @param targetUserId the target user for this vsdasdfication
 * @returns whether the verification has been successful
 */
export const verifyEmail = async (
  pin: string,
  targetUserId: HibiscusUserId
): Promise<OTPValidationResult> => {
  // check if there's an unexpired verification record in the database
  // compare PIN
  const token = await prismaClient.emailVerificationToken.findFirst({
    where: { id: pin, user_id: targetUserId },
  });

  if (token === null) {
    // Token does not exist or is not associated with this user
    return OTPValidationResult.INVALID_OTP;
  }

  if (!isWithinExpiration(token.expires)) {
    // Token has expired
    return OTPValidationResult.EXPIRED_OTP;
  }

  // Delete all OTPs associated with user
  await prismaClient.emailVerificationToken.deleteMany({
    where: { user_id: targetUserId },
  });

  // Update DB verification status
  const user = await auth.getUser(targetUserId);
  await auth.invalidateAllUserSessions(user.userId);
  await auth.updateUserAttributes(user.userId, { emailVerified: true });

  await createAuditLog({
    action: AuditLogAction.VERIFY_USER,
    entity: AuditableEntity.HibiscusUser,
    entityId: user.userId,
  });

  return OTPValidationResult.VALIDATION_SUCCESS;
};

/**
 * Generates OTP for email verification
 * If the user previously has an OTP generated and it is still within half of the expiration time,
 * the function returns that previous OTP
 *
 * @param userId user ID
 * @param pinLength number of digits in the OTP
 * @param expirationMins number of minutes after which the OTP should expire
 * @param maxRepeats number of times to retry generating OTP if collisions occur
 * @returns the OTP
 */
const generateEmailVerificationToken = async (
  userId: HibiscusUserId,
  pinLength: number,
  expirationMins: number,
  maxRepeats: 5
): Promise<string> => {
  const storedUserTokens = await prismaClient.emailVerificationToken.findMany({
    where: { user_id: userId },
  });

  if (storedUserTokens.length > 0) {
    // Clear expired tokens
    const expiredTokens = storedUserTokens
      .filter((token) => !isWithinExpiration(Number(token.expires)))
      .map((token) => token.user_id);
    await prismaClient.emailVerificationToken.deleteMany({
      where: { id: { in: expiredTokens } },
    });

    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(Number(token.expires) - expirationMins / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }

  for (let i = 0; i <= maxRepeats; i++) {
    try {
      // Generate OTP (6-digit PIN)
      const token = generateRandomString(pinLength, '0123456789');
      // Expiry time in milliseconds
      const expires = new Date().getTime() + expirationMins * 60 * 1000;

      await prismaClient.emailVerificationToken.create({
        data: { id: token, user_id: userId, expires },
      });

      return token;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          // Unique constraint violation (OTP already exists)
          // Loop again to generate another OTP
          continue;
        }
      }

      // Unknown error occured
      throw e;
    }
  }

  // Throw error if we failed to generate a unique OTP
  throw new OTPGenerationError();
};
