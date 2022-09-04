import { Request, Response, Router } from 'express';
import { ExceptionUtils } from '../../../../../../libs/exceptions/exception.utils';
import { CreateUserAccountUseCase } from '../../../../../../modules/IAM/application/use-cases/create-user/create-user-account.use-case';
import { ControllerBase } from '../../../../base-classes/controller.base';

export class CreateUserContoller extends ControllerBase {
  private _useCase: CreateUserAccountUseCase;

  constructor(useCase: CreateUserAccountUseCase) {
    super('/users');
    this._useCase = useCase;
  }

  protected initRoutes(router: Router): void {
    router.post(this.path, this.handleRequest.bind(this));
  }

  protected async handleUseCase(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, password, email, gender, dateOfBirth } =
        req.body;
      const createUserArgs = {
        firstName,
        lastName,
        password,
        email,
        gender,
        dateOfBirth
      };

      const result = await this._useCase.execute(createUserArgs);

      if (result.isFail()) {
        const error = result.value;

        // TO DO consider passing the whole error object, not the message only
        this.badRequest(res, error.message);
      } else {
        return this.ok(res);
      }
    } catch (err) {
      const error = ExceptionUtils.toErrorWithMessage(err);
      this.serverFail(res, error);
    }
  }
}
