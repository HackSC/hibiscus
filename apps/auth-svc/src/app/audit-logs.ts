import { HibiscusUserId } from '../types/user';
import { KeyId } from './keys';
import { prismaClient } from './prisma';
import { DatabaseSchemaError } from '../types/errors';

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

  if (auditLog.meta !== null && !isRecord(auditLog.meta)) {
    const message =
      'Failed to create audit log: meta field is not a JSON object';
    throw new DatabaseSchemaError(message);
  }

  const auditLogConverted = {
    id: auditLog.id,
    action: auditLog.action as AuditLogAction,
    createdAt: auditLog.createdAt,
    entityId: auditLog.keyId ?? undefined,
    meta: auditLog.meta ?? undefined,
  };

  return auditLogConverted;
};

function isRecord(obj: unknown): obj is Record<string, string> {
  if (obj === null) return false;

  if (typeof obj !== 'object') return false;

  if (Array.isArray(obj)) return false;

  if (Object.getOwnPropertySymbols(obj).length > 0) return false;

  return Object.getOwnPropertyNames(obj).every(
    (prop) => typeof (obj as Record<string, unknown>)[prop] === 'string'
  );
}
