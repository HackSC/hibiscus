export class SchemaNotFoundError extends Error {
  type: string;

  constructor(type: string) {
    super(`Could not find schema for type "${type}"`);
    this.type = type;
  }
}

export class InvalidSchemaTypeError extends Error {
  type: string;

  constructor(type: string) {
    super(
      `"${type}" is an invalid schema type - must only contain a-z, A-Z, 0-9, dash and underscore`
    );
    this.type = type;
  }
}

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

    this.baseError = error;
  }
}
