import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class ServiceUnavailableException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.SERVICE_UNAVAILABLE, message);
    Object.setPrototypeOf(this, ServiceUnavailableException.prototype);
  }
}
