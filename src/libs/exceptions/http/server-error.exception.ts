import { HTTPExceptionStatuses } from './http-exception-statuses.enum';
import { HTTPException } from './http-exception.base';

export class InternalServerErrorException extends HTTPException {
  readonly code = 500;
  readonly status = HTTPExceptionStatuses.INTERNAL_SERVER_ERROR;

  constructor(message?: string) {
    const errorMessage = message || 'Internal server error';
    super(errorMessage);
  }
}
