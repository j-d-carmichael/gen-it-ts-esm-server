import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class NotAcceptableException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.NOT_ACCEPTABLE, message);
    Object.setPrototypeOf(this, NotAcceptableException.prototype);
  }
}
