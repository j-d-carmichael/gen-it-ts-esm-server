import express from 'express';
import HttpHeadersCacheService from '@/services/HttpHeadersCacheService.js';
import NodegenRequest from '@/http/interfaces/NodegenRequest.js';

/**
 * Express middleware to control the http headers for caching only
 * @returns {Function}
 */
export default () => {
  return (req: NodegenRequest, res: express.Response, next: express.NextFunction) => {
    HttpHeadersCacheService.middleware(req, res, next);
  }
}
