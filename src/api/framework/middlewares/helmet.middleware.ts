import { Middleware } from './middleware.base';
import helmet from 'helmet';

export class HelmetMiddleware extends Middleware<typeof helmet> {
  constructor() {
    // example of helmet config, read more in docs
    const config = {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://cdn/jsdelivr.net',
            'https://code.jquery.com'
          ]
        }
      }
    };

    super(helmet, config);
  }
}
