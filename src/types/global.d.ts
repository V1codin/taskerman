import mongoose from 'mongoose';
import {
  RedirectableProviderType,
  OAuthProviderType,
} from 'next-auth/providers/index';

import { CURRENT_DB } from '../utils/constants';

import type { MongoDataBaseProvider } from '../libs/db/mongo/api/mongo';
import type { PostgresSqlDataBaseProvider } from '../libs/db/postgres/api/prisma';
import type { DB_TYPES } from './db';

type TAuthUnion = RedirectableProviderType & OAuthProviderType;

declare global {
  var _mongoClientPromise: Promise<any> | undefined;

  type ParticularDBType = typeof CURRENT_DB extends 'mongo'
    ? Types.ObjectId
    : string;

  type TEntities =
    | 'board'
    | 'user'
    | 'board_members'
    | 'notification'
    | 'notification_decline'
    | 'notification_confirm';

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
    | 'Error: Only board OWNER can delete the board. Or only SUBSCRIBER can unsubscribe from the board'
    | 'Error: You have no permission to perform this action';

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

  type TGetDbProvider<T extends DB_TYPES> = T extends 'mongo'
    ? MongoDataBaseProvider
    : T extends 'postgressql'
    ? PostgresSqlDataBaseProvider
    : never;

  type TDb = PostgresSqlDataBaseProvider;
}
