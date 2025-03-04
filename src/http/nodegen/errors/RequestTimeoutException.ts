import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class RequestTimeoutException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.REQUEST_TIMEOUT, message);
    Object.setPrototypeOf(this, RequestTimeoutException.prototype);
  }
}
