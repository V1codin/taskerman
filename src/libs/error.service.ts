export type TServerMessages<TCode extends TServerResponseCodes> =
  TCode extends 500
    ? TServerErrorMessages
    : TCode extends 403
    ? TAuthErrorMessages
    : TCode extends 404
    ? TNotFoundMessages
    : TCode extends 400
    ? TBadRequestMessages
    : TUnexpectedErrorMessage;

export class ServerResponseError<T extends TServerResponseCodes> extends Error {
  code: TServerResponseCodes;

  constructor({ message, code }: { message: TServerMessages<T>; code: T }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerResponseError);
    }

    this.name = 'ServerResponseError';
    this.message = message;
    this.code = code;
  }
}

export class BadRequestError extends ServerResponseError<400> {
  override code: 400;

  constructor() {
    super({
      message: 'Error: Bad request',
      code: 400,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerResponseError);
    }

    this.name = 'BadRequestError';
    this.message = 'Error: Bad request';
    this.code = 400;
  }
}
