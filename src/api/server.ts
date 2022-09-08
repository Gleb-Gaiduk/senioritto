import { App } from './framework/app';
import { appDomainEventHandlers } from './framework/domain-event-handlers';
import { middlewareInstances } from './framework/middlewares';
import { IAMControllers } from './framework/modules/IAM/controllers';

const app = new App({
  port: 8000,
  middlewares: middlewareInstances,
  controllers: IAMControllers,
  domainEventHandlers: appDomainEventHandlers
});

app.listen();
