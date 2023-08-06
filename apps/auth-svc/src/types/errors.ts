export class RoleError extends Error {
  constructor(public readonly httpCode: number, message: string) {
    super(message);
  }
}

export enum KeyError {
  KeyNotFound = 'KeyNotFound',
}

export class AppError extends Error {
  type: KeyError;
  constructor(type: KeyError, message: string, options?: ErrorOptions) {
    super(message, options);
    this.type = type;
  }
}

export class NotImplementedError extends Error {
  constructor() {
    super('Not implemented');
  }
}

export enum UnauthorizedCause {
  PROTECTED_BY_POLICIES = 'PROTECTED_BY_POLICIES', // e.g when user tries to create an admin role
  NO_ACCESS_TOKEN = 'NO_ACCESS_TOKEN',
  INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
}

export class UnauthorizedError extends Error {
  cause: UnauthorizedCause;
  constructor(
    cause: UnauthorizedCause,
    message: string,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.cause = cause;
  }
}

export class OTPGenerationError extends Error {
  constructor() {
    super('Failed to generate a unique OTP');
  }
}

export enum OTPValidationResult {
  INVALID_OTP = 'INVALID_OTP',
  EXPIRED_OTP = 'EXPIRED_OTP',
  VALIDATION_SUCCESS = 'VALIDATION_SUCCESS',
}

export class InvalidEmailError extends Error {
  constructor() {
    super('Email provided is invalid');
  }
}

export class DuplicateEmailError extends Error {
  constructor() {
    super('This email is already registered with another user');
  }
}

export class LoginError extends Error {
  constructor() {
    super('Incorrect email or password');
  }
}
