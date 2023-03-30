export class ServerResponseError extends Error {
  code: number;

  constructor({ message, code }: { message?: string; code: number }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerResponseError);
    }

    this.name = 'ServerResponseError';
    this.message = this.reducer(code);
    this.code = code;
  }

  reducer(code: number) {
    switch (code) {
      case 500: {
        return this.message || 'Error: Server does not response';
      }

      case 403: {
        return this.message || 'Error: Unauthorized';
      }

      case 404: {
        return this.message || 'Error: Document was not found';
      }

      case 400: {
        return this.message || 'Error: Bad request';
      }

      default: {
        return 'Unexpected error';
      }
    }
  }
}
