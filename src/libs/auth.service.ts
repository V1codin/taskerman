import encrypt from '@/libs/encrypt.service';

import { dbProvider } from './db/provider';
import { ServerResponseError } from './error.service';
import { cookies } from 'next/headers';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { TEncryptService } from './encrypt.service';
import { dbAdapter } from './db/adapter';

import type { TEditableUserProps } from '@/libs/db/postgres/schemas/types';

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
      const isRemoved = await dbAdapter._removeExpiredSessionToken(token);

      if (isRemoved) {
        return null;
      }
    }

    return sessionAndUser?.user;
  }

  getTokenByReaquestHeaders(requestHeaders: Headers): string {
    const rawToken = requestHeaders.get('authorization')?.split(' ').pop();
    const token =
      (rawToken === 'Bearer' ? '' : rawToken) ||
      cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value;

    return token || '';
  }

  async getUserIdByRequest(incomingToken?: string): Promise<string> {
    const token = incomingToken || cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      throw new ServerResponseError({
        code: 403,
        message: 'Error: Unauthorized',
      });
    }

    try {
      const user = await this.getSessionUser(token);

      if (!user?.id) {
        throw new Error();
      }

      return user.id;
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

    return Object.assign(Object.create(null), userFromBD);
  }

  getUsersByAlias(alias: string) {
    return this.db.getUsersByAlias(alias);
  }

  getUserById(userId: string) {
    return this.db.getUserById(userId);
  }

  getUserIdByUserName(username: string) {
    return this.db.getUserIdByUserName(username);
  }
}

export const authService = new AuthService({
  db: dbProvider,
  encrypter: encrypt,
});
