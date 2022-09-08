import { ExceptionBase } from '../exception.base';
import { GenericExceptionStatuses } from './generic-exception-statuses.enum';

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly status = GenericExceptionStatuses.AGRUMENT_OUT_OF_RANGE;
}
