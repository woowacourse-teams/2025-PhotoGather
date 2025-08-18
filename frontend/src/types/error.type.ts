export class HttpError extends Error {
  status: number;
  body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}
