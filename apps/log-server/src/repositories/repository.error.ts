import {
  MeiliSearchApiError,
  MeiliSearchCommunicationError,
} from 'meilisearch';

/**
 * Error class for when the client fails to connect to the database
 */
export class ConnectionError extends Error {
  constructor() {
    super('Connection to database was refused');
    this.name = 'ConnectionError';
  }
}

/**
 * Error class for client authorization errors
 */
export class AuthorizationError extends Error {
  constructor() {
    super('Missing or invalid API key');
    this.name = 'AuthorizationError';
  }
}

/**
 * Error class for when the requested schema is not found in the database
 */
export class SchemaNotFoundError extends Error {
  type: string;

  constructor(type: string) {
    super(`Could not find schema for type "${type}"`);
    this.name = 'SchemaNotFoundError';
    this.type = type;
  }
}

/**
 * Error class for when the user attempts to add an invalid schema type
 * Note: Schema type names must only contain alphanumeric characters, dashes, and underscores.
 */
export class InvalidSchemaTypeError extends Error {
  type: string;

  constructor(type: string) {
    super(
      `"${type}" is an invalid schema type - must only contain a-z, A-Z, 0-9, dash and underscore`
    );
    this.name = 'InvalidSchemaTypeError';
    this.type = type;
  }
}

/**
 * Error class for unknown/unhandled errors relating to the repository layer
 */
export class UnknownRepositoryError extends Error {
  baseError: unknown;
  constructor(error: unknown) {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    super(
      `Unknown error occured while accessing/modifying the repository: ${message}`
    );

    this.name = 'UnknownRepositoryError';
    this.baseError = error;
  }
}

/**
 * Error handler for repository errors that are potentially thrown in every function
 *
 * @param e Error object
 */
export function handleRepositoryErrors(e: unknown) {
  if (e instanceof MeiliSearchCommunicationError) {
    throw new ConnectionError();
  } else if (e instanceof MeiliSearchApiError) {
    if (
      e.code === 'missing_authorization_header' ||
      e.code === 'invalid_api_key'
    ) {
      throw new AuthorizationError();
    }
  }

  // else
  throw new UnknownRepositoryError(e);
}
