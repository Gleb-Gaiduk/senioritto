import { ExceptionStatuses } from './exception-statuses.enum';
import { ExceptionBase } from './exception.base';

export class NotFoundException extends ExceptionBase {
  readonly code = 404;
  readonly status = ExceptionStatuses.NOT_FOUND;

  constructor(message?: string) {
    const errMessage = message || '404 Not Found';
    super(errMessage);
  }
}
