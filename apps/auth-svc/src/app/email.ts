import { HibiscusUserId } from '../types/user';

export const sendEmailVerificationViaPIN = async (
  to: string,
  pinLength: number,
  expirationMins = 30
) => {
  // create a PIN and a verification record `expirationMins`
  // send it to user email
};

export const resendEmailVerificationViaPIN = async (
  to: string,
  pinLength: number,
  expirationMins = 30
) => {
  // get the last verificationsa d
};

/**
 *
 * @param pin PIN
 * @param targetUserEmail the target user for this vsdasdfication
 */
export const verifyEmail = (pin: string, targetUserId: HibiscusUserId) => {
  // check if there's an unexpired verification record in the database
  // compare PIN
};
