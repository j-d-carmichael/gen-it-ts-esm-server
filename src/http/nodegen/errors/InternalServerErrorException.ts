import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class InternalServerErrorException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
