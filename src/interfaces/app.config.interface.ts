import { Middleware } from 'api/framework/middlewares/middleware.base';
import { RequestHandler } from 'express';
import { IController } from './controller.base.interface';

export interface IAppConfig {
  port: number;
  controllers: IController[];
  middlewares: Middleware<(config?: any) => RequestHandler>[];
}
