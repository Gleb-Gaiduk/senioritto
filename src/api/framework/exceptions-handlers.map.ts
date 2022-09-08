import { GenericExceptionStatuses } from '../../libs/exceptions/generic/generic-exception-statuses.enum';
import { TBaseControllerRequestHandlersNames } from './base-classes/controller.base.interface';

type TExceptionsHandlersMap = {
  [key in GenericExceptionStatuses]: TBaseControllerRequestHandlersNames;
};

export const exceptionsHandlersMap: TExceptionsHandlersMap = {
  [GenericExceptionStatuses.ARGUMENT_INVALID]: 'badRequest',
  [GenericExceptionStatuses.AGRUMENT_OUT_OF_RANGE]: 'badRequest',
  [GenericExceptionStatuses.EXISTING_DATA_CONFLICT]: 'badRequest',
  [GenericExceptionStatuses.ARGUMENT_NOT_PROVIDED]: 'badRequest',
  [GenericExceptionStatuses.UNEXPECTED_ERROR]: 'serverFail'
};
