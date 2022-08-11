import { ErrorBase } from './exception.base';

export class NotFoundError extends ErrorBase {
  private readonly _entityName: string;

  private constructor(entityName: string, message: string) {
    super(404, message);
    this._entityName = entityName;
  }

  public static createDefault(entityName: string) {
    const message = `Property ${entityName || ''} not found.`;
    return new NotFoundError(message, entityName);
  }

  public static createWithMessage(message: string, entityName: string) {
    return new NotFoundError(message, entityName);
  }
}
