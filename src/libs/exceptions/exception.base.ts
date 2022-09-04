import { ISerializedException } from './exception.interface';

export abstract class ExceptionBase extends Error {
  readonly message: string;
  readonly metadata?: unknown;
  abstract readonly code: number;
  abstract readonly status: string;

  constructor(message: string, metadata?: unknown) {
    super(message);
    this.message = message;
    if (metadata) this.metadata = metadata;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    Error.captureStackTrace(this);
  }

  public toJSON(): ISerializedException {
    return {
      message: this.message,
      stack: this.stack,
      code: this.code,
      status: this.status,
      name: this.name,
      metadata: this.metadata
    };
  }
}
