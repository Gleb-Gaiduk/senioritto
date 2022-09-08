import { ISerializedException } from './exception.interface';

export abstract class ExceptionBase extends Error {
  abstract readonly status: string;
  readonly message: string;
  readonly metadata?: unknown;

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
      status: this.status,
      name: this.name,
      metadata: this.metadata
    };
  }
}
