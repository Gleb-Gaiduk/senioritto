import { App } from './framework/app';
import { middlewareInstances } from './framework/middlewares';
import { userAccessControllers } from './framework/modules/user-access/controllers';

const app = new App({
  port: 8000,
  middlewares: middlewareInstances,
  controllers: [...userAccessControllers]
});

app.listen();