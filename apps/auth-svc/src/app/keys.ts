import { NotImplementedError } from '../types/errors';
import { AuditLogAction, AuditableEntity, createAuditLog } from './audit-logs';

export type KeyId = string;

export interface Key {
  id: KeyId; // ID
  key: string; // key value
  createdAt: Date;
  updatedAt?: Date;
  revokedAt?: Date;
  reactivatedAt?: Date;
  meta?: Record<string, string>;
}

/**
 * Create a key
 * @param name Name of the key
 * @param meta any metadata about the key
 */
export const createKey = async (
  name: string,
  meta?: Record<string, string>
): Promise<Key> => {
  // TODO: insert into db and retrieve ID
  const id = '1';
  // create an audit log for this after
  const auditLog = await createAuditLog({
    action: AuditLogAction.CREATE_KEY,
    entityId: id,
    entity: AuditableEntity.Key,
  });
  throw new NotImplementedError();
};

/**
 * Delete key
 * @param keyId
 * @returns true if the key was deleted
 */
export const deleteKey = async (keyId: KeyId): Promise<boolean> => {
  // create an audit log for this after
  const auditLog = await createAuditLog({
    action: AuditLogAction.DELETE_KEY,
    entityId: keyId,
    entity: AuditableEntity.Key,
  });
  throw new NotImplementedError();
};

/**
 * Revoke a key; any consequent validations to this key will return invalid until reactivated.
 * @param keyId
 * @returns updated Key object
 */
export const revokeKey = async (keyId: KeyId): Promise<Key> => {
  const auditLog = await createAuditLog({
    action: AuditLogAction.REVOKE_KEY,
    entityId: keyId,
    entity: AuditableEntity.Key,
  });
  throw new NotImplementedError();
};

/**
 * Reactivate key
 * @param keyId key ID
 * @returns updated key object
 */
export const reactivateKey = async (keyId: KeyId): Promise<Key> => {
  const auditLog = await createAuditLog({
    action: AuditLogAction.REACTIVATE_KEY,
    entityId: keyId,
    entity: AuditableEntity.Key,
  });
  throw new NotImplementedError();
};

/**
 * Update a key
 * @param keyId Key ID
 * @param update Update object
 * @returns updated key object
 */
export const editKey = async (
  keyId: KeyId,
  update: Partial<Key>
): Promise<Key> => {
  const auditLog = await createAuditLog({
    action: AuditLogAction.UPDATE_KEY,
    entity: AuditableEntity.Key,
    entityId: keyId,
  });
  throw new NotImplementedError();
};

/**
 * Get the key value and all related data
 * @param keyId key ID
 * @returns Key object or null if not found
 */
export const getKey = async (keyId: KeyId): Promise<Key | null> => {
  throw new NotImplementedError();
};
