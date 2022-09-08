import { ExceptionBase } from '../exception.base';
import { GenericExceptionStatuses } from './generic-exception-statuses.enum';

export class ExistingDataConflictException extends ExceptionBase {
  readonly status = GenericExceptionStatuses.EXISTING_DATA_CONFLICT;
}
