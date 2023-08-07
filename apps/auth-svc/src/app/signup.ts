import { HibiscusRole, HibiscusUser } from '../types/user';
import { sendEmailInvite, sendEmailVerificationViaPIN } from './email';
import { createUser } from './user';

const OTP_LENGTH = 6;
const INVITE_OTP_LENGTH = 40;
const INVITE_EXPIRY_MINUTES = 7 * 24 * 60;

/**
 * Creates a user with password and sends verification email
 *
 * @param details details about the user e.g first/last name, email, role etc...
 * @param password unhashed password
 * @returns newly-created user object
 */
export const signup = async (
  details: {
    firstName: string;
    lastName: string;
    role: HibiscusRole;
    email: string;
  },
  password: string
): Promise<HibiscusUser> => {
  const user = await createUser(details, password);
  await sendEmailVerificationViaPIN(user.email, user.id, OTP_LENGTH);

  return user;
};

/**
 * Creates a user without and sends invitation email
 *
 * @param details details about the user e.g first/last name, email, role etc...
 * @param authorization object containing admin access token
 * @returns newly-created user object
 */
export const invite = async (
  details: {
    firstName: string;
    lastName: string;
    role: HibiscusRole;
    email: string;
  },
  authorization?: { accessToken: string }
): Promise<HibiscusUser> => {
  const newUser = await createUser(details, undefined, authorization);
  await sendEmailInvite(
    newUser.email,
    newUser.id,
    INVITE_OTP_LENGTH,
    INVITE_EXPIRY_MINUTES
  );

  return newUser;
};
