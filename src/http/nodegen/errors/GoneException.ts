import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class GoneException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.GONE, message);
    Object.setPrototypeOf(this, GoneException.prototype);
  }
}
