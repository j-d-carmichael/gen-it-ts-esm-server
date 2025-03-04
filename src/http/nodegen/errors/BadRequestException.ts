import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class BadRequestException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.BAD_REQUEST, message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
