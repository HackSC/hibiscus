import { HibiscusRole } from './roles';

export interface HibiscusUser {
  id: string;
  firstName: string;
  lastName: string;
  role: HibiscusRole;
  tag: string;
  applicationId: string;
}
