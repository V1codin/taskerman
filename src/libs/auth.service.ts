import mongoProvider from '@/db/mongo';
import encrypt from '@/libs/encrypt.service';

import { BoardModel } from '@/models/middlewares';
import { TEncryptService } from './encrypt.service';
import type { TDb } from '@/db/mongo';
import { IBoard } from '@/models/boards';

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

    const userFromBD = await this.db
      .getUserByUserName(credentials.username!)
      .populate('subs');

    if (!userFromBD) {
      throw new Error('Wrong username or password');
    }

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
}

export const authService = new AuthService({
  db: mongoProvider,
  encrypter: encrypt,
});
