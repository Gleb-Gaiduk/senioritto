export class HttpRequestException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpRequestException.prototype);

    this.status = status;
    this.message = message;
  }
}
