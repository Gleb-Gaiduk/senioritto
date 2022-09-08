import { ArgumentInvalidException } from '../../../../../../libs/exceptions/generic/argument-invalid.exception';
import { ArgumentOutOfRangeException } from '../../../../../../libs/exceptions/generic/argument-out-of-range.exception';
import { ExistingDataConflictException } from '../../../../../../libs/exceptions/generic/existing-data-conflict.exception';

export namespace CreateUserAccountExceptions {
  export class InvalidEmailException extends ArgumentInvalidException {
    constructor(email: string, message?: string) {
      const errMessage =
        typeof message === 'string'
          ? message
          : `The provided email "${email}" is invalid`;
      super(errMessage);
    }
  }

  export class EmailExistsException extends ExistingDataConflictException {
    constructor(email: string) {
      const message = `The email "${email}" for this account already exists`;
      super(message);
    }
  }

  export class UnderagePersonException extends ArgumentOutOfRangeException {
    constructor(message: string) {
      super(message);
    }
  }

  export class IncorrectFirstOrLastNameLengthException extends ArgumentOutOfRangeException {
    constructor(message: string) {
      super(message);
    }
  }

  export class FirstNameOrLastNameContainsNumberException extends ArgumentInvalidException {
    constructor(message: string) {
      super(message);
    }
  }

  export class IncorrectGenderException extends ArgumentInvalidException {
    constructor(message: string) {
      super(message);
    }
  }
}
