export interface ISerializedException {
  message: string;
  code: string | number;
  name: string;
  stack?: string;
  metadata?: unknown;
}
