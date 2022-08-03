import { RequestHandler } from 'express';
import { IObject } from 'interfaces/object.interface';

export abstract class Middleware<
  TMiddlewareFn extends (config?: any) => RequestHandler
> {
  private readonly _middlewareFn: TMiddlewareFn;
  private readonly config: IObject | null;

  constructor(_middlewareFn: TMiddlewareFn, config: IObject | null = null) {
    this._middlewareFn = _middlewareFn;
    this.config = config;
  }

  public init(): RequestHandler {
    if (this.config) {
      return this._middlewareFn(this.config);
    } else {
      return this._middlewareFn();
    }
  }
}
