import { Either } from '../../../../../../libs/building-blocks/application/failure-success.monad';
import { UnexpectedErrorException } from '../../../../../../libs/exceptions/generic/unexpected-error.exception';
import { CreateUserAccountExceptions } from './create-user-account.exceptions';

export type TCreateUserResponseDTO = Either<
  | CreateUserAccountExceptions.EmailExistsException
  | CreateUserAccountExceptions.InvalidEmailException
  | CreateUserAccountExceptions.UnderagePersonException
  | UnexpectedErrorException,
  void
>;
