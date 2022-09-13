import {
  Either,
  fail,
  success
} from '../../../../libs/building-blocks/application/failure-success.monad';
import { AggregateRoot } from '../../../../libs/building-blocks/domain/entities/aggregate-root.base';
import { IBaseEntityProps } from '../../../../libs/building-blocks/domain/entities/entity.base';
import { DateVO } from '../../../../libs/building-blocks/domain/value-objects/date.value-object';
import { ID } from '../../../../libs/building-blocks/domain/value-objects/id.value-object';
import { UUID } from '../../../../libs/building-blocks/domain/value-objects/uuid.value-object';
import { UserAccountCreatedDomainEvent } from '../events/user-account-created.domain-event';
import { BirthDate } from '../value-objects/birth-date.value-object';
import { UserName } from '../value-objects/user-name.value-object';
import { UserAuthentication } from './user-authentication.entity';

export enum EGender {
  MALE = 'm',
  FEMALE = 'f'
}

export interface IUserAccountProps {
  userName: UserName;
  gender: EGender;
  dateOfBirth: BirthDate;
  authentication: UserAuthentication;
  // roles: UserRole[];
}

export type ICreateUserAccountProps = IUserAccountProps;

export class UserAccount extends AggregateRoot<IUserAccountProps> {
  protected readonly _id: UUID;

  public static create(
    props: ICreateUserAccountProps
  ): Either<Error, UserAccount> {
    const id = UUID.generate();

    const userAccount = new UserAccount({
      id,
      props
    });

    if (!userAccount) return fail(new Error('Error in user account creating'));

    const { firstName, lastName } = props.userName.rawProps();

    userAccount.addDomainEvent(
      new UserAccountCreatedDomainEvent({
        aggregateId: id.value,
        firstName,
        lastName
      })
    );
    return success(userAccount);
  }

  public validateInvariant(): void {
    console.log('Invariant validated');
  }
}
