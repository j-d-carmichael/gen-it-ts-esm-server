import express from 'express';
import { NotFoundException } from '@/http/nodegen/errors/index.js';
import NodegenRequest from '@/http/interfaces/NodegenRequest.js';

/**
 * Default 404 handler for the express app
 */
export default () => {
  return (req: NodegenRequest, res: express.Response, next: express.NextFunction) => {
    return next(new NotFoundException('Route not found'));
  };
}
