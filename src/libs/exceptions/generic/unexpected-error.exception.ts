import { GenericExceptionStatuses } from './generic-exception-statuses.enum';
import { ExceptionBase } from '../exception.base';

export class UnexpectedErrorException extends ExceptionBase {
  readonly status = GenericExceptionStatuses.UNEXPECTED_ERROR;
}
