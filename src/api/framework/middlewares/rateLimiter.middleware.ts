import rateLimiter from 'express-rate-limit';
import { Middleware } from './middleware.base';

export class RateLimiterMiddleware extends Middleware<typeof rateLimiter> {
  constructor() {
    const config = {
      windowMs: 1 * 60 * 1000,
      max: 120 // limit each IP to 120 requests per minute
    };

    super(rateLimiter, config);
  }
}
