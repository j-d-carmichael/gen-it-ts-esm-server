import { HttpStatusMessage } from '@/http/nodegen/errors/index.js';

export class HttpException extends Error {
  public status: number;
  public body: string | Record<string, never>;

  constructor(status: number, body?: string | any) {
    super();
    this.name = 'HttpException';
    this.status = status;
    this.message = HttpStatusMessage[status];
    this.body = body || this.message;

    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      body: this.body,
    }
  }
}
