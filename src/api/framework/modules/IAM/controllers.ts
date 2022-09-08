import { createUserAccountUseCase } from '../../../../modules/IAM/application/use-cases/commands/create-user-account';
import { CreateUserAccountContoller } from './application/create-user-account/createUserAccount.controller';

const createUserAccountController = new CreateUserAccountContoller(
  createUserAccountUseCase
);
export type TBaseControllerMethods = Pick<
  typeof createUserAccountController,
  'badRequest' | 'serverFail'
>;

export const IAMControllers = [createUserAccountController];
