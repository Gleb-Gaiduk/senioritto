import { HTTPExceptionStatuses } from './http-exception-statuses.enum';
import { HTTPException } from './http-exception.base';

export class NotFoundException extends HTTPException {
  readonly code = 404;
  readonly status = HTTPExceptionStatuses.NOT_FOUND;

  constructor(message?: string) {
    const errMessage = message || '404 Not Found';
    super(errMessage);
  }
}
