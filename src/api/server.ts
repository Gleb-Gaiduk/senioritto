import { App } from './framework/app';
import { appDomainEventHandlers } from './framework/domain-event-handlers';
import { middlewareInstances } from './framework/middlewares';
import { userAccessControllers } from './framework/modules/IAM/controllers';

const app = new App({
  port: 8000,
  middlewares: middlewareInstances,
  controllers: userAccessControllers,
  domainEventHandlers: appDomainEventHandlers
});

app.listen();
