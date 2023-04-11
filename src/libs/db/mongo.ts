import Users from '@/models/users';
import Boards from '@/models/boards';
import Lists from '@/models/lists';

import { Types } from 'mongoose';
import type { IBoard } from '@/models/boards';
import type { FilterQuery } from 'mongoose';
import type { TBoardNS, TListNS } from '@/types/db';

interface DataBaseProvider<
  ParticularDBType extends unknown,
  TBoardQuery,
  TUserByName = unknown,
  TUserById = unknown,
  TUserIdByUserName = unknown,
  TBoarById = unknown,
  TUserBoards = unknown,
  TCreatedBoard = unknown,
  TDeletedBoard = unknown,
  TListsByBoardId = unknown,
> {
  getAllBoardsByUserQueryUtils(userId: string): TBoardQuery;
  isValidUserForGettingBoardUtils(
    userId: string,
    boardId: string,
  ): Promise<boolean>;

  getUserByUserName(username: string): TUserByName;
  getUserById(userId: string | ParticularDBType): TUserById;
  getUserIdByUserName(username: string): TUserIdByUserName;

  getBoardById(boardId: string | ParticularDBType): TBoarById;
  getUserBoards(
    query: TBoardQuery | null,
    userId?: string | ParticularDBType,
  ): TUserBoards;
  createBoard(board: TBoardNS.TCreatingBoard): TCreatedBoard;
  deleteBoard(boardId: string | ParticularDBType): TDeletedBoard;

  getListsByBoardId(boardId: string | ParticularDBType): TListsByBoardId;
}

export class MongoDataBaseProvider
  implements
    DataBaseProvider<
      Types.ObjectId,
      FilterQuery<IBoard>,
      ReturnType<typeof Users.findOne>,
      ReturnType<typeof Users.findOne>,
      ReturnType<typeof Users.findOne>,
      ReturnType<typeof Boards.findOne>,
      ReturnType<typeof Boards.find>,
      // ? unknown because Boards.create is overloading function
      // ? and ReturnType is not compatible
      unknown,
      ReturnType<typeof Boards.deleteOne>,
      ReturnType<typeof Lists.find>
    >
{
  constructor() {}

  /*
  ? Util method for changing DataProvider but save request data API
  ? example: 
  *  class YourDataBaseProvider {
  *  getBoardsQueryUtils(): YourDataBaseQuery
  *  getUserBoards(query): Boards -> makes request to db relies YourDataBaseQuery
  * }
  */
  getAllBoardsByUserQueryUtils(
    userId: string | ParticularDBType,
  ): FilterQuery<IBoard> {
    return {
      $or: [
        {
          ownerId: userId,
        },
        { memberIds: userId },
      ],
    };
  }

  private getObjectIdFromStringUtils(id: string | ParticularDBType) {
    if (typeof id === 'string') {
      return new Types.ObjectId(id);
    }

    return id;
  }

  async isValidUserForGettingBoardUtils(userId: string, boardId: string) {
    const userObj = this.getObjectIdFromStringUtils(userId);
    const boardObj = this.getObjectIdFromStringUtils(boardId);

    const result = await Boards.find({
      $or: [
        {
          _id: boardObj,
          ownerId: userObj,
        },
        {
          _id: boardObj,
          memberIds: userId,
        },
      ],
    });

    return result.length > 0;
  }

  getListsByBoardId(boardId: string | ParticularDBType) {
    const result = Lists.find({
      boardId: this.getObjectIdFromStringUtils(boardId),
    });

    return result;
  }

  getUserByUserName(username: string) {
    const user = Users.findOne({
      username,
    });

    return user;
  }

  getUserById(userId: string | ParticularDBType) {
    const result = Users.findOne({
      _id: this.getObjectIdFromStringUtils(userId),
    });

    return result;
  }

  getUserIdByUserName(username: string) {
    const result = Users.findOne({
      username,
    });

    return result;
  }

  getBoardById(boardId: string | ParticularDBType) {
    const result = Boards.findOne({
      _id: this.getObjectIdFromStringUtils(boardId),
    });

    return result;
  }

  getUserBoards(query: FilterQuery<IBoard>) {
    return Boards.find(query);
  }

  createBoard(board: TBoardNS.TCreatingBoard) {
    const result = Boards.create(board);

    return result;
  }

  createList(list: TListNS.TCreatingList) {
    const result = Lists.create(list);

    return result;
  }

  deleteBoard(
    boardId: string | ParticularDBType,
  ): ReturnType<typeof Boards.deleteOne> {
    const result = Boards.deleteOne({
      _id: boardId,
    });

    return result;
  }
}

const mongoProvider = new MongoDataBaseProvider();
export type TDb = MongoDataBaseProvider;
export type ParticularDBType = Types.ObjectId;

export default mongoProvider;
