import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class UnauthorizedException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.UNAUTHORIZED, message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
