class AuthError extends Error {
  code?: number;

  constructor({ message, code }: { message?: string; code?: number }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }

    this.name = 'AuthError';
    this.code = code;
  }
}

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

      case 401: {
        return this.message || 'Error: Unauthorized';
      }

      default: {
        return 'Unexpected error';
      }
    }
  }
}
