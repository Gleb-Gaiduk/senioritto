import { Middleware } from './middleware.base';
import express from 'express';

export class JsonMiddleware extends Middleware<typeof express.json> {
  constructor() {
    super(express.json);
  }
}
