export type HibiscusUserId = string;

export enum HibiscusRole {
  ADMIN = 'ADMIN',
  SPONSOR = 'SPONSOR',
  VOLUNTEER = 'VOLUNTEER',
  HACKER = 'HACKER',
  JUDGE = 'JUDGE',
}

export interface HibiscusUser {
  id: HibiscusUserId;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  role: HibiscusRole;
}
