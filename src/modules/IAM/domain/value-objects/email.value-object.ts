import {
  IDefaultValueObjectProps,
  ValueObject
} from '../../../../libs/building-blocks/domain/value-objects/value-object.base';
import { ArgumentInvalidException } from '../../../../libs/exceptions/generic/argument-invalid.exception';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = Email.format(value);
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate({
    value
  }: IDefaultValueObjectProps<string>): void | never {
    if (typeof value !== 'string') {
      throw new ArgumentInvalidException(
        'Email address should be of a string type'
      );
    }

    const isValidEmail = value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!isValidEmail) {
      throw new ArgumentInvalidException('Email address is not valid');
    }
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
