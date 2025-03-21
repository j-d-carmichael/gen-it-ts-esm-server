import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class PreconditionFailedException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.PRECONDITION_FAILED, message);
    Object.setPrototypeOf(this, PreconditionFailedException.prototype);
  }
}
