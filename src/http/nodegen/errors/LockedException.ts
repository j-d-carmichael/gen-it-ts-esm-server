import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class LockedException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.LOCKED, message);
    Object.setPrototypeOf(this, LockedException.prototype);
  }
}
