type TServerResponseCodes = 500 | 403 | 404 | 400;

type TBoardErrorMessages = 'Error: Only board OWNER can delete the board ';
type TServerErrorMessages = 'Error: Server does not response';
type TAuthErrorMessages = 'Error: Unauthorized' | TBoardErrorMessages;

export type TServerMessages<TCode extends TServerResponseCodes> =
  TCode extends 500
    ? TServerErrorMessages
    : TCode extends 403
    ? TAuthErrorMessages
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
