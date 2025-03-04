import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class PayloadTooLargeException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.PAYLOAD_TOO_LARGE, message);
    Object.setPrototypeOf(this, PayloadTooLargeException.prototype);
  }
}
