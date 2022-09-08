import { ValueObject } from '../../../../libs/building-blocks/domain/value-objects/value-object.base';
import { ArgumentInvalidException } from '../../../../libs/exceptions/generic/argument-invalid.exception';
import { ArgumentOutOfRangeException } from '../../../../libs/exceptions/generic/argument-out-of-range.exception';

interface IUserName {
  firstName: string;
  lastName: string;
}

export class UserName extends ValueObject<IUserName> {
  private static readonly _minLength = 2;
  private static readonly _maxLength = 50;

  constructor(value: IUserName) {
    const props = UserName._format(value);
    super(props);
  }

  public get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  protected validate({ firstName, lastName }: IUserName): void {
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      throw new ArgumentInvalidException(
        'First name and last name should be of a string type'
      );
    }

    if (
      UserName._hasNumberDigit(firstName) ||
      UserName._hasNumberDigit(lastName)
    ) {
      throw new ArgumentInvalidException(
        'First name or Last name cannot contain a number digit'
      );
    }

    this._checkNameLength(firstName);
    this._checkNameLength(lastName);
  }

  private _checkNameLength(name: string) {
    const nameLength = name.length;

    if (nameLength < UserName._minLength || nameLength > UserName._maxLength) {
      throw new ArgumentOutOfRangeException(
        `First name and last name length should be from ${UserName._minLength} to ${UserName._maxLength} chars`
      );
    }
  }

  private static _format(value: IUserName): IUserName {
    const firstName = UserName._capitilizeFirstLetter(
      UserName._toTrimedLowercase(value.firstName)
    );

    const lastName = UserName._capitilizeFirstLetter(
      UserName._toTrimedLowercase(value.lastName)
    );

    return { firstName, lastName };
  }

  private static _toTrimedLowercase(value: string): string {
    return value.trim().toLowerCase();
  }

  private static _capitilizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  private static _hasNumberDigit(value: string): boolean {
    return /\d/.test(value);
  }
}
