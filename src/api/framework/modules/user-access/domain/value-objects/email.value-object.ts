import {
  Either,
  success
} from '../../../../../../libs/building-blocks/application/failure-success.monad';
import {
  IDefaultValueObjectProps,
  ValueObject
} from '../../../../../../libs/building-blocks/domain/value-object.base';

export class Email extends ValueObject<string> {
  private constructor(value: string) {
    super({ value });
    this.props.value = Email.format(value);
  }

  static create(email: string): Either<{ message: string }, Email> {
    return success(new Email(email));
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate({ value }: IDefaultValueObjectProps<string>): void {
    if (typeof value !== 'string') {
      throw new Error('Email address should be of a string type');
    }

    const isValidEmail = value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!isValidEmail) {
      throw new Error('Email address is not valid');
    }
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
