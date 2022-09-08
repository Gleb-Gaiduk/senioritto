import {
  fail,
  success
} from '../../../../../../libs/building-blocks/application/failure-success.monad';
import { IUseCase } from '../../../../../../libs/building-blocks/application/use-case.interface';
import { DomainEvents } from '../../../../../../libs/building-blocks/domain/events/domain-events';
import { ExceptionUtils } from '../../../../../../libs/exceptions/exception.utils';
import { ArgumentInvalidException } from '../../../../../../libs/exceptions/generic/argument-invalid.exception';
import { ArgumentOutOfRangeException } from '../../../../../../libs/exceptions/generic/argument-out-of-range.exception';
import { UnexpectedErrorException } from '../../../../../../libs/exceptions/generic/unexpected-error.exception';
import {
  EGender,
  UserAccount
} from '../../../../domain/entities/user-account.entity';
import { BirthDate } from '../../../../domain/value-objects/birth-date.value-object';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Gender } from '../../../../domain/value-objects/gender.value-object';
import { UserName } from '../../../../domain/value-objects/user-name.value-object';
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

    let userEmail = null;
    let birthDate = null;
    let userFirstName = null;
    let userLastName = null;
    let userGender = null;

    try {
      try {
        userEmail = new Email(email);
      } catch (err) {
        if (err instanceof ArgumentInvalidException) {
          return fail(
            new CreateUserAccountExceptions.InvalidEmailException(
              email,
              err.message
            )
          );
        }
        throw err;
      }

      try {
        birthDate = new BirthDate(dateOfBirth);
      } catch (err) {
        if (err instanceof ArgumentOutOfRangeException) {
          return fail(
            new CreateUserAccountExceptions.UnderagePersonException(err.message)
          );
        }
        throw err;
      }

      try {
        const userName = new UserName({ firstName, lastName });
        userFirstName = userName.rawProps().firstName;
        userLastName = userName.rawProps().lastName;
      } catch (err) {
        if (err instanceof ArgumentOutOfRangeException) {
          return fail(
            new CreateUserAccountExceptions.IncorrectFirstOrLastNameLengthException(
              err.message
            )
          );
        }

        if (err instanceof ArgumentInvalidException) {
          return fail(
            new CreateUserAccountExceptions.FirstNameOrLastNameContainsNumberException(
              err.message
            )
          );
        }
        throw err;
      }

      try {
        userGender = new Gender(gender).rawProps() as EGender;
      } catch (err) {
        if (err instanceof ArgumentInvalidException) {
          return fail(
            new CreateUserAccountExceptions.IncorrectGenderException(
              err.message
            )
          );
        }

        throw err;
      }

      const userAccountOrError = UserAccount.create({
        firstName: userFirstName,
        lastName: userLastName,
        dateOfBirth: birthDate,
        gender: userGender
      });

      if (userAccountOrError.isSuccess()) {
        const aggregateId = userAccountOrError.value.id;
        await DomainEvents.publishAllForAggrigate(aggregateId);
      }

      return success(undefined);
    } catch (err) {
      const error = ExceptionUtils.toErrorWithMessage(err);
      return fail(new UnexpectedErrorException(error.message));
    }
  }
}
