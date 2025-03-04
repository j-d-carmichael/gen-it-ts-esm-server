import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class ConflictException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.CONFLICT, message);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}
