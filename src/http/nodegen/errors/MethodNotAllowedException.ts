import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class MethodNotAllowedException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.METHOD_NOT_ALLOWED, message);
    Object.setPrototypeOf(this, MethodNotAllowedException.prototype);
  }
}
