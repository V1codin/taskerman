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

  type TSignUpProviders = TSignUp extends TAuthUnion ? TSignUp : never;

  type TError = {
    message: string;
    code: number;
  };

  type TAuthTypes = OAuthProviderType;
}
