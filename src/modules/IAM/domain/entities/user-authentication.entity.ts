import { Entity } from '../../../../libs/building-blocks/domain/entities/entity.base';
import { ID } from '../../../../libs/building-blocks/domain/value-objects/id.value-object';
import { UUID } from '../../../../libs/building-blocks/domain/value-objects/uuid.value-object';
import { EmailValidationStatuses } from '../enums/email-validation-statuses.enum';
import { AccessJWT } from '../value-objects/access-jwt.value-object';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';

export interface IUserAuthenticationProps {
  email: Email;
  // emailConfirmationToken: EmailConfirmationToken;
  emailValidationStatus: EmailValidationStatuses;
  passwordHash: Password;
  // passwordRecoveryToken: PasswordRecoveryToken;
  accessJWT: AccessJWT;
  // refreshJWT:RefreshJWT;
}

export interface ICreateUserAuthenticationProps {
  password: string;
}

export class UserAuthentication extends Entity<IUserAuthenticationProps> {
  protected _id: ID;

  public static create(
    props: ICreateUserAuthenticationProps
  ): UserAuthentication {
    const id = UUID.generate();

    return new UserAuthentication({
      id,
      props
    });
  }

  public validateInvariant(): void {
    throw new Error('Method not implemented.');
  }
}
