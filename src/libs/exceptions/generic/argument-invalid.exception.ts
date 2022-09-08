import { ExceptionBase } from '../exception.base';
import { GenericExceptionStatuses } from './generic-exception-statuses.enum';

export class ArgumentInvalidException extends ExceptionBase {
  readonly status = GenericExceptionStatuses.ARGUMENT_INVALID;
}
