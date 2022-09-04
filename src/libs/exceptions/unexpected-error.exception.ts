import { ExceptionStatuses } from './exception-statuses.enum';
import { ExceptionBase } from './exception.base';
import { ExceptionUtils } from './exception.utils';

export class UnexpectedErrorException extends ExceptionBase {
  readonly code = 500;
  readonly status = ExceptionStatuses.INTERNAL_SERVER_ERROR;

  constructor(error: unknown) {
    const { message } = ExceptionUtils.toErrorWithMessage(error);
    super(message);
  }
}
