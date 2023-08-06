import { HibiscusUserId } from '../types/user';
import { KeyId } from './keys';
import { prismaClient } from './prisma';

export type AuditLogId = string;

export enum AuditableEntity {
  HibiscusUser = 'HibiscusUser',
  Key = 'Key',
}

export enum AuditLogAction {
  CREATE_KEY = 'CREATE_KEY',
  UPDATE_KEY = 'UPDATE_KEY',
  DELETE_KEY = 'DELETE_KEY',
  REVOKE_KEY = 'REVOKE_KEY',
  REACTIVATE_KEY = 'REACTIVATE_KEY',
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  VERIFY_USER = 'VERIFY_USER',
}

export interface AuditLog {
  id: AuditLogId;
  action: AuditLogAction;
  // entity: AuditableEntity;
  entityId?: KeyId | HibiscusUserId;
  createdAt: Date;
  meta?: Record<string, string>;
}

/**
 * Create an audit log for an action on the key
 * @param action action on the key
 * @param relatedKeyId related key ID for this action
 * @param meta any metadata
 * @returns the created audit log (with its ID)
 */
export const createAuditLog = async (details: {
  action: AuditLogAction;
  entity: AuditableEntity;
  entityId: KeyId | HibiscusUserId;
  meta?: Record<string, string>;
}): Promise<AuditLog> => {
  const auditLog = await prismaClient.auditLog.create({
    data: {
      action: details.action,
      keyId: details.entityId,
      meta: details.meta,
    },
  });

  const auditLogConverted = {
    id: auditLog.id,
    action: auditLog.action as AuditLogAction,
    createdAt: auditLog.createdAt,
    entityId: auditLog.keyId ?? undefined,
    meta: auditLog.meta ? JSON.parse(auditLog.meta.toString()) : undefined,
  };

  return auditLogConverted;
};
