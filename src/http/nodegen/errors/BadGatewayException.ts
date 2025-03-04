import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class BadGatewayException extends HttpException {
  constructor(message?: string | { [key: string]: never }) {
    super(HttpStatusCode.BAD_GATEWAY, message);
    Object.setPrototypeOf(this, BadGatewayException.prototype);
  }
}
