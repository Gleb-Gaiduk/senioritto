import {
  fail,
  success
} from '../../../../../libs/building-blocks/application/failure-success.monad';
import { IUseCase } from '../../../../../libs/building-blocks/application/use-case.interface';
import { DomainEvents } from '../../../../../libs/building-blocks/domain/events/domain-events';
import { DateVO } from '../../../../../libs/building-blocks/domain/value-objects/date.value-object';
import { ExceptionUtils } from '../../../../../libs/exceptions/exception.utils';
import { UnexpectedErrorException } from '../../../../../libs/exceptions/unexpected-error.exception';
import { UserAccount } from '../../../domain/entities/user-account.entity';
import { Email } from '../../../domain/value-objects/email.value-object';
import { CreateUserAccountExceptions } from './create-user-account.exceptions';
import { ICreateUserRequestDTO } from './create-user-account.request-dto';
import { TCreateUserResponseDTO } from './create-user-account.response-dto';

export class CreateUserAccountUseCase
  implements IUseCase<ICreateUserRequestDTO, TCreateUserResponseDTO>
{
  // TO DO : temp any solution
  // private userRepo: any;

  async execute(
    requset: ICreateUserRequestDTO
  ): Promise<TCreateUserResponseDTO> {
    const { email, firstName, lastName, password, dateOfBirth, gender } =
      requset;

    try {
      const emailOrError = Email.create(email);
      const birthDate = new DateVO(dateOfBirth);

      const userAccountOrError = UserAccount.create({
        firstName,
        lastName,
        dateOfBirth: birthDate,
        gender
      });

      if (userAccountOrError.isSuccess()) {
        const aggregateId = userAccountOrError.value.id;
        await DomainEvents.publishAllForAggrigate(aggregateId);
      }
    } catch (err) {
      const error = ExceptionUtils.toErrorWithMessage(err);
      return fail(
        new CreateUserAccountExceptions.InvalidEmailException(
          email,
          error.message
        )
      );
    }

    try {
      return success(undefined);
    } catch (error) {
      return fail(new UnexpectedErrorException(error));
    }
  }
}
