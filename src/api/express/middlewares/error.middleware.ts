import { HttpRequestException } from '../../../exceptions/http.exception';
import { Request, Response, RequestHandler, NextFunction } from 'express';

export const errorMiddleware = (
  error: HttpRequestException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || '500 Internal Server Error';

  res.status(status).send({
    message,
    status
  });
};
