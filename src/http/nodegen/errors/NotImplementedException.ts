import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class NotImplementedException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.NOT_IMPLEMENTED, message);
    Object.setPrototypeOf(this, NotImplementedException.prototype);
  }
}
