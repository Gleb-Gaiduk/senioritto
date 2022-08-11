import express, { Request, Response, Router } from 'express';
import { NotFoundError } from '../../../libs/exceptions/not-found.exception';

export abstract class ControllerBase {
  public readonly router: Router;
  public readonly path: string;

  constructor(path: string) {
    this.router = express.Router();
    this.path = path;

    this.initRoutes(this.router);
  }

  protected abstract initRoutes(router: Router): void;

  protected abstract handleUseCase(req: Request, res: Response): Promise<void>;

  public async handleRequest(req: Request, res: Response): Promise<void> {
    try {
      await this.handleUseCase(req, res);
    } catch (err) {
      console.log(`[Base Controller]: Unexpected error`, err);
      this.serverFail(res, 'An unexpected error occurred');
    }
  }

  public ok<TResponseDto>(res: Response, responseDto?: TResponseDto): void {
    if (responseDto) {
      res.type('application/json');
      res.status(200).json(responseDto);
      return;
    }

    res.sendStatus(200);
  }

  public badRequest(res: Response, message?: string): void {
    const responseMessage = message ? message : '400 Bad Request';
    res.status(400).json({ message: responseMessage });
  }

  public notFound(res: Response, entityName: string, message?: string): void {
    const errorInstance = message
      ? NotFoundError.createWithMessage(message, entityName)
      : NotFoundError.createDefault(entityName);

    res.status(404).json(errorInstance);
  }

  public created(res: Response): void {
    res.sendStatus(201);
  }

  public unauthorized(res: Response, message?: string): void {
    const responseMessage = message ? message : '401 Unauthorized';
    res.status(401).json({ message: responseMessage });
  }

  public forbidden(res: Response, message?: string): void {
    const responseMessage = message ? message : '403 Forbidden';
    res.status(403).json({ message: responseMessage });
  }

  public paymentRequired(res: Response, message?: string): void {
    const responseMessage = message ? message : '402 Payment required';
    res.status(402).json({ message: responseMessage });
  }

  public serverFail(res: Response, error: Error | string): void {
    console.log(error);
    res.status(500).json({
      status: error.toString()
    });
  }
}
