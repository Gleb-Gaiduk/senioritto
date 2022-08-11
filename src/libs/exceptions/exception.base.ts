import { ISerializedException } from './exception.interface';

export abstract class ErrorBase extends Error {
  readonly message: string;
  readonly metadata?: unknown;
  abstract statusCode: string | number;

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
      code: this.statusCode,
      name: this.name,
      metadata: this.metadata
    };
  }
}
