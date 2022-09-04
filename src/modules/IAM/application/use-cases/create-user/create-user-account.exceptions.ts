import { BadRequestException } from '../../../../../libs/exceptions/bad-request.exception';

export namespace CreateUserAccountExceptions {
  export class InvalidEmailException extends BadRequestException {
    constructor(email: string, message?: string) {
      const errMessage =
        typeof message === 'string'
          ? message
          : `The provided email "${email}" is invalid`;
      super(errMessage);
    }
  }

  export class EmailExistsException extends BadRequestException {
    constructor(email: string) {
      const message = `The email "${email}" for this account already exists`;
      super(message);
    }
  }
}
