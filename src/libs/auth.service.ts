import { boardService, TBoardsService } from './boards.service';
import mongoProvider from '@/db/mongo';
import encrypt from '@/libs/encrypt.service';

import { Types } from 'mongoose';
import {
  OmitedSafeBoardMemebers,
  OmitedSafeUser,
  SessionUser,
  TBoardDataClient,
} from '@/types/db';
import { TDb } from '@/db/mongo';
import { TEncryptService } from './encrypt.service';
import { dbConnect } from '@/db/connect';
import { IUser } from '@/models/users';
import { IBoard } from '@/models/boards';

type TSafeUser<T extends boolean> = T extends true
  ? OmitedSafeUser
  : SessionUser;

interface IAuth {
  db: TDb;
  encrypter: TEncryptService;
  boards: TBoardsService;
}

export class AuthService {
  private readonly db: TDb;
  private readonly encrypter: TEncryptService;
  private readonly boards: TBoardsService;

  constructor({ db, encrypter, boards }: IAuth) {
    this.db = db;
    this.encrypter = encrypter;
    this.boards = boards;
  }

  async getSafeBoardData(board: IBoard) {
    const ownerBoardUser = await this.db.getUserById(board.ownerId);

    const ownerId = !ownerBoardUser
      ? null
      : await this.getSafeUser(ownerBoardUser);

    const members: OmitedSafeBoardMemebers[] = [];
    const pendingMembers: OmitedSafeBoardMemebers[] = [];

    for (let i = 0; i < board.memberIds.length; i++) {
      const memberId = board.memberIds[i];
      if (!memberId) continue;

      const member = await this.db.getUserById(memberId);

      if (!member) continue;
      const safeMemberData = await this.getSafeUser(member);
      members.push(safeMemberData);
    }

    for (let i = 0; i < board.pendingMemberIds.length; i++) {
      const pendingMemberId = board.pendingMemberIds[i];
      if (!pendingMemberId) continue;

      const pendingMember = await this.db.getUserById(pendingMemberId);
      if (!pendingMember) continue;
      const safePendingMemberData = await this.getSafeUser(pendingMember);
      pendingMembers.push(safePendingMemberData);
    }

    const result: TBoardDataClient = {
      bg: board.bg,
      members,
      ownerId,
      pendingMembers,
      title: board.title,
    };

    return result;
  }

  private async getSubscribedBoardsData(userSubs: Types.ObjectId[]) {
    const subs: TBoardDataClient[] = [];

    for (let i = 0; i < userSubs.length; i++) {
      const item = userSubs[i];
      if (!item) continue;

      const board = await this.boards.getBoardById(item);
      if (!board) continue;

      const safeBoard = await this.getSafeBoardData(board);
      subs.push(safeBoard);
    }

    return subs;
  }

  private async getSafeUser<T extends boolean = false>(
    user: IUser,
    isSubsIncluded?: T,
  ) {
    const subs = isSubsIncluded
      ? await this.getSubscribedBoardsData(user.subs)
      : user.subs.map((item) => String(item));

    const result = {
      id: user._id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      imageURL: user.imageURL,
      subs,
    } as TSafeUser<T>;

    return result;
  }

  async authorizeWithCredentials(credentials: {
    username: string;
    password: string;
  }) {
    await dbConnect();

    const userFromBD = await this.db.getUserByUserName(credentials.username!);

    if (!userFromBD) {
      throw new Error('Wrong username or password');
    }

    const pw = userFromBD.password;
    const isValidPw = await this.encrypter.compare(credentials.password!, pw);

    if (!isValidPw) {
      throw new Error('Wrong username or password');
    }
    const user = await this.getSafeUser(userFromBD);

    return {
      id: user.id,
      subs: user.subs,
      displayName: user.displayName,
      imageURL: user.imageURL,
      email: user.email,
      username: user.username,
    };
  }
}

export const authService = new AuthService({
  db: mongoProvider,
  encrypter: encrypt,
  boards: boardService,
});
