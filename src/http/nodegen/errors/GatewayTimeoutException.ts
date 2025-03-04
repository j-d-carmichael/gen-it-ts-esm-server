import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class GatewayTimeoutException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.GATEWAY_TIMEOUT, message);
    Object.setPrototypeOf(this, GatewayTimeoutException.prototype);
  }
}
