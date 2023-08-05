import { NotImplementedError } from '../types/errors';
import { HibiscusRole, HibiscusUser } from '../types/user';
import { AuditLogAction, AuditableEntity, createAuditLog } from './audit-logs';
import { verifyToken } from './token';

/**
 * Creates a user and return its data; will raise errors if not authorized
 *
 * @param details details about the user e.g first/last name, email, role etc...
 * @param authorization optional metadata to perform this action if requires authorization e.g only admins can create Judge + Sponsor + Volunteer account
 */
export const createUser = async (
  details: {
    firstName: string;
    lastName: string;
    role: HibiscusRole;
    email: string;
  },
  authorization?: { accessToken: string }
): Promise<HibiscusUser> => {
  const createdUserId = '1'; // TODO: implement
  if (details.role === HibiscusRole.HACKER) {
    // check if user already exists via email uniqueness, else create the user
    const log = await createAuditLog({
      action: AuditLogAction.CREATE_USER,
      entity: AuditableEntity.HibiscusUser,
      entityId: createdUserId,
    });
    throw new NotImplementedError();
  }
};
