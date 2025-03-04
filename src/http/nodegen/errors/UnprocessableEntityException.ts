import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class UnprocessableEntityException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.UNPROCESSABLE_ENTITY, message);
    Object.setPrototypeOf(this, UnprocessableEntityException.prototype);
  }
}
