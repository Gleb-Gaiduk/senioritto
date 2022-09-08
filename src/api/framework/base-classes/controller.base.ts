import express, { Request, Response, Router } from 'express';
import { BadRequestException } from '../../../libs/exceptions/http/bad-request.exception';
import { ExceptionUtils } from '../../../libs/exceptions/exception.utils';
import { NotFoundException } from '../../../libs/exceptions/http/not-found.exception';
import { InternalServerErrorException } from '../../../libs/exceptions/http/server-error.exception';
import { IControllerBase } from './controller.base.interface';

export abstract class ControllerBase implements IControllerBase {
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
      const error = ExceptionUtils.toErrorWithMessage(err);
      console.log(`[Base Controller]: Unexpected error`, error);

      this.serverFail(res, error.message);
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
    const badRequestException = new BadRequestException(message);
    res.status(badRequestException.code).json(badRequestException.toJSON());
  }

  public notFound(res: Response, message?: string): void {
    const notFoundException = new NotFoundException(message);
    res.status(notFoundException.code).json(notFoundException.toJSON());
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

  public serverFail(res: Response, message?: string): void {
    const serverErrorException = new InternalServerErrorException(message);
    res.status(serverErrorException.code).json(serverErrorException.toJSON());
  }
}
