import mongoose from 'mongoose';
import {
  RedirectableProviderType,
  OAuthProviderType,
} from 'next-auth/providers/index';

type TAuthUnion = RedirectableProviderType & OAuthProviderType;

declare global {
  var _mongoClientPromise: Promise<any> | undefined;

  interface IMongoose {
    conn: null | Awaited<Promise<typeof mongoose>>;
    promise: null | Promise<typeof mongoose>;
  }

  var _mongoose: IMongoose;

  type TSignUp = 'credentials' | 'google';

  type TServerResponseCodes = 500 | 403 | 404 | 400;

  type TBoardAuthErrorMessages =
    | 'Error: User with the email already exists'
    | 'Error: User with the username already exists'
    | 'Error: Only board OWNER can delete the board. Or only SUBSCRIBER can unsubscribe from the board';

  type TServerErrorMessages = 'Error: Server does not response';
  type TAuthErrorMessages = 'Error: Unauthorized' | TBoardAuthErrorMessages;

  type TBoardNotFoundMessages = 'Error: The requested board was not found';
  type TNotFoundMessages =
    | 'Error: Document was not found'
    | TBoardNotFoundMessages;

  type TBadRequestMessages = 'Error: Bad request';
  type TUnexpectedErrorMessage = 'Unexpected error';

  type TSignUpProviders = TSignUp extends TAuthUnion ? TSignUp : never;

  type TError = {
    message: TServerMessages<TServerResponseCodes>;
    code: TServerResponseCodes;
  };

  type TAuthTypes = OAuthProviderType;
}
