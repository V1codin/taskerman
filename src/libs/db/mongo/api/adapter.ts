import encrypt from '@/libs/encrypt.service';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MONGO_DB_NAME } from '@/utils/constants';
import { PasswordModel, SessionModel, UserModel } from '../schemas/middlewares';
import { clientPromise, dbConnect } from '@/libs/db/connect';
import { ServerResponseError } from '@/libs/error.service';
import { AuthClient } from '@/types/state';

import type { AdapterSession } from 'next-auth/adapters';
import type { WithOptional } from '@/types/utils';
import type { MyAdapter } from '../../adapter';
import type { SessionUser } from '@/types/db';
import type { TUser } from '../schemas/types';

export const mongoAdapter: MyAdapter = {
  ...MongoDBAdapter(clientPromise, {
    databaseName: MONGO_DB_NAME,
    collections: {
      Users: 'users',
      VerificationTokens: 'verification_tokens',
      Sessions: 'sessions',
      Accounts: 'accounts',
    },
  }),

  async _removeExpiredSessionToken(token) {
    try {
      await SessionModel.deleteOne({
        sessionToken: token,
      });

      return true;
    } catch (e) {
      console.error('', e);
      return false;
    }
  },

  async _getSessionAndUser(sessionToken: string) {
    await dbConnect();

    try {
      const result = await SessionModel.findOne({ sessionToken }).populate({
        path: 'userId',
      });

      if (!result) {
        return null;
      }

      const objectedResult = result.toJSON();

      const session: AdapterSession = {
        expires: objectedResult.expires,
        sessionToken: objectedResult.sessionToken,

        userId: objectedResult.id,
      };

      const populatedUser = objectedResult.userId as WithOptional<
        TUser,
        'subs' | 'pendingInvites' | '_id'
      >;

      delete populatedUser.subs;
      delete populatedUser.pendingInvites;
      delete populatedUser._id;

      const user: SessionUser = {
        ...populatedUser,
        id: populatedUser.id,
      };

      return {
        user,
        session,
      };
    } catch (e) {
      return null;
    }
  },

  async _createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession> {
    await dbConnect();
    await SessionModel.create(session);

    return session;
  },

  async _createUser(user: AuthClient.TSignUpBodyReducer<TSignUp>) {
    try {
      await dbConnect();

      const { password, username, displayName, email } = user;

      const isUserExist = await UserModel.findOne({
        username,
      });

      if (isUserExist) {
        throw new ServerResponseError({
          code: 403,
          message: 'Error: User with the username already exists',
        });
      }

      const isEmailExist = await UserModel.findOne({
        email,
      });

      if (isEmailExist) {
        throw new ServerResponseError({
          code: 403,
          message: 'Error: User with the email already exists',
        });
      }

      const createdUser = await UserModel.create({
        username,
        displayName,
        email,
        nameAlias: `${displayName} ${email}`,
      });

      const safePW = await encrypt.hash(password);

      await PasswordModel.create({
        user: createdUser.id,
        pw: safePW,
      });

      return {
        data: 'User was successfully created',
      };
    } catch (e) {
      if (e instanceof ServerResponseError) {
        return {
          data: null,
          error: e,
        };
      }

      return {
        data: null,
        error: new ServerResponseError({
          code: 400,
          message: 'Error: Bad request',
        }),
      };
    }
  },
};
