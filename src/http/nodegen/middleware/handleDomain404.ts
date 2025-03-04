import express from 'express';
import { HttpException } from '@/http/nodegen/errors/index.js';

export default () => (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (/^http4\d\d$/.test(err?.name)) {
    const statusCode = parseInt(err.name.replace('http', ''));

    return next(new HttpException(statusCode));
  }

  return next(err);
};
