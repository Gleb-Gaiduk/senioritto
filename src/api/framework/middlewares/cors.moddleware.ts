import { Middleware } from './middleware.base';
import cors from 'cors';

export class CorsMiddleware extends Middleware<typeof cors> {
  constructor() {
    super(cors);
  }
}
