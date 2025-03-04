import { NextFunction, Request, Response } from 'express';

/**
 * Utility function to handle async errors automatically
 */
export const asyncRouteHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
