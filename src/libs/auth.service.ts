import dbProvider from '@/db/mongo';
import encrypt from '@/libs/encrypt.service';

import { ServerResponseError } from './error.service';
import { cookies } from 'next/headers';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { SessionModel } from '@/models/middlewares';
import { TEncryptService } from './encrypt.service';
import { dbAdapter } from './db/adapter';

import type { TDb } from '@/db/mongo';
import type { TEditableUserProps } from '@/models/users';

interface IAuth {
  db: TDb;
  encrypter: TEncryptService;
}

export class AuthService {
  private readonly db: TDb;
  private readonly encrypter: TEncryptService;

  constructor({ db, encrypter }: IAuth) {
    this.db = db;
    this.encrypter = encrypter;
  }

  isExpired(date?: string | Date) {
    if (!date) return false;

    const dateToCheck = new Date(date);
    const now = new Date();
    return dateToCheck < now;
  }

  isValidUserForGettingBoard(
    issuerId?: string,
    boardId?: string,
  ): Promise<boolean> {
    if (!issuerId || !boardId) return Promise.resolve(false);

    return this.db.isValidUserForGettingBoardUtils(issuerId, boardId);
  }

  patchUser(userId: string, userProps: TEditableUserProps) {
    return this.db.patchUser(userId, userProps);
  }

  async getSessionUser(token?: string) {
    if (!token) {
      return null;
    }

    const sessionAndUser = await dbAdapter._getSessionAndUser(token);

    if (!sessionAndUser) {
      return null;
    }

    const isExpired = this.isExpired(sessionAndUser?.session.expires);

    if (isExpired) {
      await SessionModel.deleteOne({
        sessionToken: token,
      });
      return null;
    }

    return sessionAndUser?.user;
  }

  async getUserByRequest(incomingToken?: string): Promise<string> {
    const token = incomingToken || cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      throw new ServerResponseError({
        code: 403,
        message: 'Error: Unauthorized',
      });
    }

    try {
      const userAndSession = await dbAdapter.getSessionAndUser(token as string);

      if (!userAndSession?.user.id) {
        throw new Error();
      }

      return userAndSession.user.id;
    } catch (e) {
      throw new ServerResponseError({
        code: 403,
        message: 'Error: Unauthorized',
      });
    }
  }

  async authorizeWithCredentials(credentials: {
    username: string;
    password: string;
  }) {
    const pw = await this.db.getUserHashedPassword(credentials.username!);

    if (!pw) {
      throw new Error('Wrong username or password');
    }

    const isValidPw = await this.encrypter.compare(credentials.password!, pw);

    if (!isValidPw) {
      throw new Error('Wrong username or password');
    }

    const userFromBD = await this.db.getUserByUserName(credentials.username!);

    if (!userFromBD) {
      throw new Error('Wrong username or password');
    }
    return {
      id: userFromBD._id,
      ...userFromBD,
    };
  }

  getUserIdByUserName(username: string) {
    return this.db.getUserIdByUserName(username);
  }
}

export const authService = new AuthService({
  db: dbProvider,
  encrypter: encrypt,
});
