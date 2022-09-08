export interface ISerializedException {
  message: string;
  code?: number;
  status: string;
  name: string;
  stack?: string;
  metadata?: unknown;
}

export type IHTTPSerializedException = ISerializedException & { code: number };
