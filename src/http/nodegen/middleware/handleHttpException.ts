import express from 'express';
import { createHttpExceptionFromErr } from '@/http/nodegen/utils/createHttpExceptionFromErr.js';
import { HttpException } from '../errors/index.js';
import config from '@/config.js';
import NodegenRequest from '@/http/interfaces/NodegenRequest.js';

export interface HttpExceptionOptions {
  errorHook?: (error: Error) => void,
  errorLogger?: (error: Error) => void,
}

/**
 * Http Exception handler
 */
export default (options: HttpExceptionOptions = {}) => {
  let errorLogger = (error: HttpException) => {
    console.error(error.stack || error);
  };

  if (typeof options.errorLogger === 'function') {
    errorLogger = options.errorLogger;
  }

  return (err: HttpException, req: NodegenRequest, res: express.Response) => {
    if (!(err instanceof HttpException)) {
      err = createHttpExceptionFromErr(err);
    }

    errorLogger(err);

    if (options.errorHook) {
      options.errorHook(err);
    }

    if (err.status === 500 && config.env === 'production') {
      return res.status(err.status).json({ message: 'Internal server error' });
    } else {
      return res.status(err.status).json(err);
    }
  };
};
