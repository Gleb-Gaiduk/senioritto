import slowDown from 'express-slow-down';
import { Middleware } from './middleware.base';

export class SpeedLimiterMiddleware extends Middleware<typeof slowDown> {
  constructor() {
    const config = {
      windowMs: 1 * 60 * 1000,
      delayAfter: 100, // allow 100 requests per minute
      delayMs: 1000 // adding 1000ms of delay per request above 100
      // request #101 is delayed by 1000ms
      // request #102 is delayed by 2000ms etc.
    };

    super(slowDown, config);
  }
}
