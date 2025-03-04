import express from 'express';

import NodegenRequest from '@/http/interfaces/NodegenRequest.js';
import CacheService from '@/services/CacheService.js';

/**
 * Express middleware to control the http headers for caching only
 * @returns {Function}
 */
export default (transformOutputMap: any) => {
  return (req: NodegenRequest, res: express.Response, next: express.NextFunction) => {
    CacheService.middleware(req, res, next, transformOutputMap);
  }
}
