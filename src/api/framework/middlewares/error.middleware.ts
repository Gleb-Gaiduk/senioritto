import { Request, Response, NextFunction } from 'express';
import { HTTPException } from '../../../libs/exceptions/http/http-exception.base';

export const errorMiddleware = (
  error: HTTPException,
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
