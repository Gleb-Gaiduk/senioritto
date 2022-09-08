import { ExceptionBase } from '../exception.base';
import { GenericExceptionStatuses } from './generic-exception-statuses.enum';

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly status = GenericExceptionStatuses.ARGUMENT_NOT_PROVIDED;
}
