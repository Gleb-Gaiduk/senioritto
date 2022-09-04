import { Middleware } from 'api/framework/middlewares/middleware.base';
import { RequestHandler } from 'express';
import { IController } from '../api/framework/base-classes/controller.base.interface';
import { DomainEventHandler } from '../libs/building-blocks/domain/events/domain-event-handler.base';

export interface IAppConfig {
  port: number;
  controllers: IController[];
  middlewares: Middleware<(config?: any) => RequestHandler>[];
  domainEventHandlers: DomainEventHandler[];
}
