export interface IErrorWithMessage {
  message: string;
}

export class ExceptionUtils {
  private static _isErrorWithMessage(
    error: unknown
  ): error is IErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as Record<string, unknown>).message === 'string'
    );
  }

  static toErrorWithMessage(mayBeError: unknown): IErrorWithMessage {
    if (this._isErrorWithMessage(mayBeError)) return mayBeError;

    try {
      return new Error(JSON.stringify(mayBeError));
    } catch (error) {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(mayBeError));
    }
  }
}
