import { Request, Response, Router } from 'express';
import { ExceptionUtils } from '../../../../../../libs/exceptions/exception.utils';
import { CreateUserAccountCommand } from '../../../../../../modules/IAM/application/use-cases/commands/create-user-account/create-user-account.command';
import { CreateUserAccountUseCase } from '../../../../../../modules/IAM/application/use-cases/commands/create-user-account/create-user-account.use-case';
import { ControllerBase } from '../../../../base-classes/controller.base';
import { IControllerBase } from '../../../../base-classes/controller.base.interface';
import { exceptionsHandlersMap } from '../../../../exceptions-handlers.map';

export class CreateUserAccountContoller extends ControllerBase {
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
      const createUSerAccountCommand = new CreateUserAccountCommand(req.body);
      const result = await this._useCase.execute(createUSerAccountCommand);

      if (result.isFail()) {
        const error = result.value;
        const controllerMethodName = exceptionsHandlersMap[
          error.status
        ] as keyof Omit<IControllerBase, 'path' | 'router'>;

        return this[controllerMethodName](res, error.message);
      }

      return this.created(res);
    } catch (err) {
      const error = ExceptionUtils.toErrorWithMessage(err);
      return this.serverFail(res, error.message);
    }
  }
}
