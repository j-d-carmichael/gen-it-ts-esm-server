import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class ForbiddenException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.FORBIDDEN, message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
