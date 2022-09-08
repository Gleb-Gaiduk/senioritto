import { ExceptionBase } from '../exception.base';
import { IHTTPSerializedException } from '../exception.interface';

export abstract class HTTPException extends ExceptionBase {
  abstract readonly code: number;
  abstract readonly status: string;

  public toJSON(): IHTTPSerializedException {
    return {
      message: this.message,
      stack: this.stack,
      status: this.status,
      code: this.code,
      name: this.name,
      metadata: this.metadata
    };
  }
}
