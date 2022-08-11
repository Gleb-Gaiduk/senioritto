import { Request, Response, Router } from 'express';
import { ControllerBase } from '../../../../base-classes/controller.base';

export class CreateUserContoller extends ControllerBase {
  constructor() {
    super('/users');
  }

  protected initRoutes(router: Router): void {
    router.post(this.path, this.handleRequest.bind(this));
  }

  protected async handleUseCase(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, password, email } = req.body;

      // TODO: use value objects for body params here.

      // TEMP: temp implementation for testing
      if (!firstName || !password || !email) {
        this.badRequest(res, 'Create user arguments are incorrect');
        return;
      }

      const user = { id: 1, firstName, password, email };
      console.log('User created', user);

      this.ok<typeof user>(res);
    } catch (err) {
      if (err instanceof Error) {
        this.serverFail(res, err);
      } else {
        this.serverFail(res, JSON.stringify(err));
      }
    }
  }
}
