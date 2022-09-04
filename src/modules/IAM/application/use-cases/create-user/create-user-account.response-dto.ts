import { Either } from '../../../../../libs/building-blocks/application/failure-success.monad';
import { UnexpectedErrorException } from '../../../../../libs/exceptions/unexpected-error.exception';
import { CreateUserAccountExceptions } from './create-user-account.exceptions';

export type TCreateUserResponseDTO = Either<
  | CreateUserAccountExceptions.EmailExistsException
  | CreateUserAccountExceptions.InvalidEmailException
  | UnexpectedErrorException,
  void
>;
