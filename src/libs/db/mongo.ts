import Users from '@/models/users';
import Boards from '@/models/boards';

import { Types } from 'mongoose';
import { IBoard } from '@/models/boards';
import { IUser } from '@/models/users';
import {
  TBoardDataClient,
  OmitedSafeUser,
  SessionUser,
  OmitedSafeBoardMemebers,
} from '../../../types/db';

type TSafeUser<T extends boolean> = T extends true
  ? OmitedSafeUser
  : SessionUser;

export class MongoDataBaseProvider {
  constructor() {}

  private async getSafeBoardData(board: IBoard) {
    const ownerBoardUser = await this.getUserById(board.ownerId);

    const owner = !ownerBoardUser
      ? null
      : await this.getSafeUser(ownerBoardUser);

    const members: OmitedSafeBoardMemebers[] = [];
    const pendingMembers: OmitedSafeBoardMemebers[] = [];

    for (let i = 0; i < board.memberIds.length; i++) {
      const memberId = board.memberIds[i];
      if (!memberId) continue;

      const member = await this.getUserById(memberId);

      if (!member) continue;
      const safeMemberData = await this.getSafeUser(member);
      members.push(safeMemberData);
    }

    for (let i = 0; i < board.pendingMemberIds.length; i++) {
      const pendingMemberId = board.pendingMemberIds[i];
      if (!pendingMemberId) continue;

      const pendingMember = await this.getUserById(pendingMemberId);
      if (!pendingMember) continue;
      const safePendingMemberData = await this.getSafeUser(pendingMember);
      pendingMembers.push(safePendingMemberData);
    }

    const result: TBoardDataClient = {
      bg: board.bg,
      members,
      owner,
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

      const board = await this.getBoardById(item);
      if (!board) continue;

      const safeBoard = await this.getSafeBoardData(board);
      subs.push(safeBoard);
    }

    return subs;
  }

  getUserByUserName(username: string) {
    const user = Users.findOne({
      username,
    });

    return user;
  }

  getUserById(userId: string | Types.ObjectId) {
    const result = Users.findOne({
      _id: typeof userId === 'string' ? new Types.ObjectId(userId) : userId,
    });

    return result;
  }

  getBoardById(boerdId: string | Types.ObjectId) {
    const result = Boards.findOne({
      _id: typeof boerdId === 'string' ? new Types.ObjectId(boerdId) : boerdId,
    });

    return result;
  }

  async getSafeUser<T extends boolean = false>(
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

  getUserBoards(userId: string | Types.ObjectId) {
    const _id =
      typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

    const boards = Boards.find({
      ownerId: _id,
    });

    return boards;
  }

  /*
  create(user: TUserLogin): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  */
}

export type TDb = MongoDataBaseProvider;
const mongoProvider = new MongoDataBaseProvider();

export default mongoProvider;
