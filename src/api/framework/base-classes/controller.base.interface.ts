import { Response, Router } from 'express';
export interface IControllerBase {
  path: string;
  router: Router;
  badRequest(res: Response, message?: string): void;
  notFound(res: Response, message?: string): void;
  created(res: Response): void;
  unauthorized(res: Response, message?: string): void;
  forbidden(res: Response, message?: string): void;
  paymentRequired(res: Response, message?: string): void;
  serverFail(res: Response, message?: string): void;
}

export type TBaseControllerRequestHandlersNames = keyof Omit<
  IControllerBase,
  'path' | 'router'
>;
