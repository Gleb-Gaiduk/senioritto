import { errorMiddleware } from './middlewares/error.middleware';
import express, { Application } from 'express';
import { IAppConfig } from '../../interfaces/app.config.interface';
import { IController } from '../../interfaces/controller.base.interface';

export class App {
  private _app: Application;
  private _appConfig: IAppConfig;

  constructor(appConfig: IAppConfig) {
    this._app = express();
    this._appConfig = appConfig;

    this._initMiddlewares();
    this._initControllers(this._appConfig.controllers);
    this._initErrorHandling();
  }

  public listen(): void {
    this._app.listen(this._appConfig.port, () => {
      console.log(`Listening on the port ${this._appConfig.port}`);
    });
  }

  public getServer(): Application {
    return this._app;
  }

  private _initMiddlewares(): void {
    this._appConfig.middlewares.forEach((middleware) => {
      this._app.use(middleware.init());
    });
  }

  private _initErrorHandling(): void {
    this._app.use(errorMiddleware);
  }

  private _initControllers(controllers: IController[]): void {
    controllers.forEach((controller) => {
      this._app.use('/', controller.router);
    });
  }
}
