import { ValueObject } from '../../../../libs/building-blocks/domain/value-objects/value-object.base';
import * as bcrypt from 'bcrypt';
import { UnexpectedErrorException } from '../../../../libs/exceptions/generic/unexpected-error.exception';
import { ExceptionUtils } from '../../../../libs/exceptions/exception.utils';
import { ArgumentInvalidException } from '../../../../libs/exceptions/generic/argument-invalid.exception';

export class Password extends ValueObject<string> {
  private constructor(hash: string) {
    super({ value: hash });
  }

  public static async create(plainPassword: string): Promise<Password> {
    const hash = await Password._hash(plainPassword);
    return new Password(hash);
  }

  public async isValid(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.props.value);
  }

  private static async _hash(plainPassword: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(plainPassword, salt);
      return hash;
    } catch (err) {
      throw new UnexpectedErrorException(
        ExceptionUtils.toErrorWithMessage(err).message
      );
    }
  }

  protected validate(props: unknown): void {
    if (typeof props !== 'string') {
      throw new ArgumentInvalidException('Password should be of a string type');
    }

    // The Password must not contain any whitespaces
    // The Password must contain at least one Uppercase character
    // The Password must contain at least one Lowercase character
    // The Password must contain at least one digit
    // The Password must have at least one Special Symbol
    // The Password must be 10-16 characters long

    const validationRegex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

    if (!validationRegex.test(props)) {
      throw new ArgumentInvalidException(
        'Password does not comply with the security policy'
      );
    }
  }
}
