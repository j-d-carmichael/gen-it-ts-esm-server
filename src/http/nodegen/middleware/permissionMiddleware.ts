import express from 'express';
import NodegenRequest from '../../interfaces/NodegenRequest.js';
import PermissionService from '@/services/PermissionService.js';

/**
 * Express middleware to control the http headers for caching only
 * @returns {Function}
 */
export default (permission: string) => {
  return (req: NodegenRequest, res: express.Response, next: express.NextFunction) => {
    PermissionService.middleware(req, res, next, permission)
  }
}
