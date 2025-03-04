import { HttpStatusCode } from './http-status.enum.js';
import { HttpException } from './HttpException.js';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message?: string | { [key: string]: any }) {
    super(HttpStatusCode.UNSUPPORTED_MEDIA_TYPE, message);
    Object.setPrototypeOf(this, UnsupportedMediaTypeException.prototype);
  }
}
