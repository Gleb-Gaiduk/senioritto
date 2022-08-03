import { Middleware } from './middleware.base';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const deletePoweredByHeader =
  () => (req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('X-Powered-By');
    next();
  };

type TDeletePoweredByHeader = typeof deletePoweredByHeader;

export class DeletePoweredByMiddleware extends Middleware<TDeletePoweredByHeader> {
  constructor(deletePoweredByFn: TDeletePoweredByHeader) {
    super(deletePoweredByFn);
  }
}
