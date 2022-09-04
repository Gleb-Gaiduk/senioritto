export interface ISerializedException {
  message: string;
  code: number;
  status: string;
  name: string;
  stack?: string;
  metadata?: unknown;
}
