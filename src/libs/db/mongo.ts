import {
  BoardModel,
  UserModel,
  ListModel,
  PasswordModel,
} from '@/models/middlewares';
import { Types } from 'mongoose';

import type { IBoard } from '@/models/boards';
import type { FilterQuery } from 'mongoose';
import type { DataBaseProvider, TBoardNS, TListNS } from '@/types/db';
import type { TEditableUserProps } from '@/models/users';

interface MongoDbProvider
  extends DataBaseProvider<
    Types.ObjectId,
    FilterQuery<IBoard>,
    ReturnType<typeof UserModel.findOne>,
    ReturnType<typeof UserModel.findOne>,
    ReturnType<typeof UserModel.findOne>,
    Awaited<ReturnType<typeof UserModel.findOne>>,
    ReturnType<typeof BoardModel.findOne>,
    ReturnType<typeof BoardModel.find>,
    // ? unknown because Boards.create is overloading function
    // ? and ReturnType is not compatible
    unknown,
    ReturnType<typeof BoardModel.deleteOne>,
    ReturnType<typeof ListModel.find>
  > {}

export class MongoDataBaseProvider implements MongoDbProvider {
  constructor() {}

  /*
  ? Util methods for changing DataProvider but save request data API
  ? example: 
  *  class YourDataBaseProvider {
  *  getBoardsQueryUtils(): YourDataBaseQuery
  *  getUserBoards(query): Boards -> makes request to db relies YourDataBaseQuery
  * }
  */
  getAllBoardsByUserQueryUtils(
    userId: string | ParticularDBType,
  ): FilterQuery<IBoard> {
    const userObj = this.getObjectIdFromStringUtils(userId);
    return {
      $or: [
        {
          owner: userObj,
        },
        { members: userObj },
      ],
    };
  }

  isEqualUtils(
    str1: string | ParticularDBType,
    str2: string | ParticularDBType,
  ) {
    return new Types.ObjectId(str1).equals(str2);
  }

  private getObjectIdFromStringUtils(id: string | ParticularDBType) {
    if (typeof id === 'string') {
      return new Types.ObjectId(id);
    }

    return id;
  }

  getUserByIdWithPopulatedSubs(userId: string) {
    return this.getUserById(userId).populate('subs');
  }

  async patchUser(userId: string, data: TEditableUserProps) {
    try {
      const { acknowledged } = await UserModel.updateOne(
        {
          _id: userId,
        },
        data,
      );

      if (acknowledged) {
        return this.getUserByIdWithPopulatedSubs(userId);
      }

      throw new Error('Update is failed');
    } catch (e) {
      return null;
    }
  }

  async isValidUserForGettingBoardUtils(userId: string, boardId: string) {
    const userObj = this.getObjectIdFromStringUtils(userId);
    const boardObj = this.getObjectIdFromStringUtils(boardId);

    const result = await BoardModel.find({
      $or: [
        {
          _id: boardObj,
          owner: userObj,
        },
        {
          _id: boardObj,
          members: userObj,
        },
      ],
    });

    return result.length > 0;
  }

  getListsByBoardId(boardId: string | ParticularDBType) {
    return ListModel.find({
      boardId: this.getObjectIdFromStringUtils(boardId),
    });
  }

  async getUserHashedPassword(username: string) {
    try {
      const user = await this.getUserByUserName(username);
      if (!user) {
        return '';
      }
      const obj = user.toObject();
      const result = await PasswordModel.findOne({
        user: obj,
      });

      return result?.pw || '';
    } catch (e) {
      return '';
    }
  }

  getUserByUserName(username: string) {
    return UserModel.findOne({
      username,
    }).populate('subs');
  }

  getUserById(userId: string | ParticularDBType) {
    return UserModel.findOne({
      _id: this.getObjectIdFromStringUtils(userId),
    });
  }

  getUserIdByUserName(username: string) {
    return UserModel.findOne({
      username,
    });
  }

  getBoardById(boardId: string | ParticularDBType) {
    return BoardModel.findOne({
      _id: this.getObjectIdFromStringUtils(boardId),
    })
      .populate('owner')
      .populate('members');
  }

  getUserBoards(query: FilterQuery<IBoard>) {
    return BoardModel.find(query);
  }

  async createBoard(board: TBoardNS.TCreatingBoard) {
    const ownerObj = this.getObjectIdFromStringUtils(board.owner);

    const boardToCreate = {
      ...board,
      owner: ownerObj,
    };

    const createdBoard = await BoardModel.create(boardToCreate);
    await UserModel.updateOne(
      {
        _id: ownerObj,
      },
      {
        $push: {
          subs: new Types.ObjectId(createdBoard._id),
        },
      },
    );

    return createdBoard;
  }

  createList(list: TListNS.TCreatingList) {
    return ListModel.create(list);
  }

  deleteBoard(
    boardId: string | ParticularDBType,
  ): ReturnType<typeof BoardModel.deleteOne> {
    return BoardModel.deleteOne({
      _id: boardId,
    });
  }
}

const mongoProvider = new MongoDataBaseProvider();
// TODO TDb type as global type and assign to it current DB provider
export type TDb = MongoDataBaseProvider;
export type ParticularDBType = Types.ObjectId;

export default mongoProvider;
