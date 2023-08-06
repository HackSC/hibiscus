import { HibiscusRole } from '../types/user';
import { sendEmailVerificationViaPIN } from './email';
import { createUser } from './user';

const OTP_LENGTH = 6;

/**
 * Creates a user and sends verification email
 *
 * @param details details about the user e.g first/last name, email, role etc...
 * @param password unhashed password
 */
export const signup = async (
  details: {
    firstName: string;
    lastName: string;
    role: HibiscusRole;
    email: string;
  },
  password: string
): Promise<void> => {
  const user = await createUser(details, password);
  await sendEmailVerificationViaPIN(user.email, user.id, OTP_LENGTH);
};
