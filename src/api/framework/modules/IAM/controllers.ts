import { createUserAccountUseCase } from '../../../../modules/IAM/application/use-cases/create-user';
import { CreateUserContoller } from './application/create-user/createUser.controller';

export const userAccessControllers = [
  new CreateUserContoller(createUserAccountUseCase)
];
