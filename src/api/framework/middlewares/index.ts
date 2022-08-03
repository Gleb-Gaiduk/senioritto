import { CorsMiddleware } from './cors.moddleware';
import {
  deletePoweredByHeader,
  DeletePoweredByMiddleware
} from './deletePoweredBy.middleware';
import { HelmetMiddleware } from './helmet.middleware';
import { JsonMiddleware } from './json.middleware';
import { RateLimiterMiddleware } from './rateLimiter.middleware';
import { SpeedLimiterMiddleware } from './speedLimiter.middleware';

export const middlewareInstances = [
  new JsonMiddleware(),
  new CorsMiddleware(),
  new HelmetMiddleware(),
  new RateLimiterMiddleware(),
  new SpeedLimiterMiddleware(),
  new DeletePoweredByMiddleware(deletePoweredByHeader)
];
