import Users from '@/models/users';
import Boards from '@/models/boards';

import { Types } from 'mongoose';
import type { IBoard } from '@/models/boards';
import type { FilterQuery } from 'mongoose';
import type { TCreatingBoard } from '@/types/db';

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
> {
  getBoardsQueryUtils(userId: string): TBoardQuery;

  getUserByUserName(username: string): TUserByName;
  getUserById(userId: string | ParticularDBType): TUserById;
  getUserIdByUserName(username: string): TUserIdByUserName;
  getBoardById(boerdId: string | ParticularDBType): TBoarById;
  getUserBoards(
    query: TBoardQuery | null,
    userId?: string | ParticularDBType,
  ): TUserBoards;
  createBoard(board: TCreatingBoard): TCreatedBoard;
  deleteBoard(boardId: string | ParticularDBType): TDeletedBoard;
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
      ReturnType<typeof Boards.deleteOne>
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
  getBoardsQueryUtils(userId: string | Types.ObjectId): FilterQuery<IBoard> {
    return {
      $or: [
        {
          ownerId: userId,
        },
        { memberIds: userId },
      ],
    };
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

  getUserIdByUserName(username: string) {
    const result = Users.findOne({
      username,
    });

    return result;
  }

  getBoardById(boerdId: string | Types.ObjectId) {
    const result = Boards.findOne({
      _id: typeof boerdId === 'string' ? new Types.ObjectId(boerdId) : boerdId,
    });

    return result;
  }

  getUserBoards(
    query: FilterQuery<IBoard> | null,
    userId?: string | Types.ObjectId,
  ) {
    if (query) {
      return Boards.find(query);
    }

    const _id =
      typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

    const boards = Boards.find({ ownerId: _id });

    return boards;
  }

  createBoard(board: TCreatingBoard) {
    const result = Boards.create(board);

    return result;
  }

  deleteBoard(
    boardId: string | Types.ObjectId,
  ): ReturnType<typeof Boards.deleteOne> {
    const result = Boards.deleteOne({
      _id: boardId,
    });

    return result;
  }
}

const mongoProvider = new MongoDataBaseProvider();
export type TDb = MongoDataBaseProvider;

export default mongoProvider;
