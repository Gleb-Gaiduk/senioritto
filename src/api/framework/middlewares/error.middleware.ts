import { Request, Response, NextFunction } from 'express';
import { ExceptionBase } from '../../../libs/exceptions/exception.base';

export const errorMiddleware = (
  error: ExceptionBase,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.code || 500;
  const message = error.message || '500 Internal Server Error';

  res.status(status).send({
    message,
    status
  });
};
