import mongoProvider from '@/db/mongo';
import encrypt from '@/libs/encrypt.service';

import { BoardModel, SessionModel } from '@/models/middlewares';
import { TEncryptService } from './encrypt.service';
import { IBoard } from '@/models/boards';
import { dbAdapter } from '@/pages/api/auth/[...nextauth]';
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

  patchUser(
    userId: string,
    userProps: TEditableUserProps,
  ): ReturnType<TDb['patchUser']> {
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

    // TODO move logic to db provider
    // ? toObj is mongo method
    const result = userFromBD.toObject();

    const subs = result.subs as IBoard[];

    result._id = String(result._id);

    return {
      id: result._id,
      _id: result._id,
      username: result.username,
      subs,
      displayName: result.displayName,
      email: result.email,
      imageURL: result.imageURL,
    };
  }
  // TODO move getting the query to db provider
  // ? getUserBoards(userId) -> db.getQueryForUserBoards(userId) -> db.getUserBoards
  getUserBoards(userId: string) {
    return BoardModel.find({
      $or: [
        {
          ownerId: userId,
        },
        {
          memberId: userId,
        },
      ],
    }).populate('ownerId');
  }

  getUserIdByUserName(username: string) {
    return this.db.getUserIdByUserName(username);
  }
}

export const authService = new AuthService({
  db: mongoProvider,
  encrypter: encrypt,
});
