type TServerResponseCodes = 500 | 403 | 404 | 400;

/*
type TMessages = {
  500: 'Error: Server does not response';
  403: 'Error: Unauthorized';
  404: 'Error: Document was not found';
  400: 'Error: Bad request';
};
*/

type TServerMessages<TCode extends TServerResponseCodes> = TCode extends 500
  ? 'Error: Server does not response'
  : TCode extends 403
  ? 'Error: Unauthorized'
  : TCode extends 404
  ? 'Error: Document was not found'
  : TCode extends 400
  ? 'Error: Bad request'
  : 'Unexpected error';

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
