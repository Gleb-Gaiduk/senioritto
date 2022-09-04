import { ExceptionStatuses } from './exception-statuses.enum';
import { ExceptionBase } from './exception.base';

export class BadRequestException extends ExceptionBase {
  readonly code = 400;
  readonly status = ExceptionStatuses.BAD_REQUEST;

  constructor(message?: string) {
    const errMessage = message || '400 Bad Request';
    super(errMessage);
  }
}
