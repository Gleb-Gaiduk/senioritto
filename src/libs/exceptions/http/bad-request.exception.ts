import { HTTPExceptionStatuses } from './http-exception-statuses.enum';
import { HTTPException } from './http-exception.base';

export class BadRequestException extends HTTPException {
  readonly code = 400;
  readonly status = HTTPExceptionStatuses.BAD_REQUEST;

  constructor(message?: string) {
    const errMessage = message || '400 Bad Request';
    super(errMessage);
  }
}
