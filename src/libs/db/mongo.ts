import { BoardModel, UserModel, PasswordModel } from '@/models/middlewares';
import { Types } from 'mongoose';

import type { IUser } from '@/models/users';
import type { IBoard } from '@/models/boards';
import type { FilterQuery } from 'mongoose';
import type { DataBaseProvider, TBoardNS } from '@/types/db';
import type { TEditableUserProps } from '@/models/users';

interface MongoDbProvider
  extends DataBaseProvider<
    Types.ObjectId,
    FilterQuery<IBoard>,
    Promise<IUser | null>,
    ReturnType<typeof UserModel.findOne>,
    ReturnType<typeof UserModel.findOne>,
    Awaited<ReturnType<typeof UserModel.findOne>>,
    Promise<string | null>,
    Promise<IBoard | null>,
    IBoard[],
    // ? unknown because Boards.create is overloading function
    // ? and ReturnType is not compatible
    unknown,
    ReturnType<typeof BoardModel.deleteOne>,
    Promise<true | null>
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

  isUserBoardSubscriberUtils(userId: string, board: IBoard) {
    return (
      board.members.findIndex(({ _id }) => this.isEqualUtils(userId, _id)) > -1
    );
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

  async unsubscribeFromBoard(userId: string, board: IBoard) {
    try {
      await BoardModel.updateOne(
        {
          _id: board._id,
        },
        {
          $pull: {
            members: {
              $in: [userId],
            },
          },
        },
      );

      await UserModel.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            subs: {
              $in: [board._id],
            },
          },
        },
      );

      return true;
    } catch (e) {
      return null;
    }
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

    // TODO Check for roles. Could be role that allows to get particular board
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

  async getUserHashedPassword(username: string) {
    try {
      const user = await this.getUserByUserName(username);

      if (!user) {
        return '';
      }
      const result = await PasswordModel.findOne({
        user: new Types.ObjectId(user._id),
      });

      return result?.pw || '';
    } catch (e) {
      return '';
    }
  }

  async getUserByUserName(username: string) {
    const user = await UserModel.findOne({
      username,
    }).populate('subs');

    if (!user) {
      return null;
    }

    const obj = user.toObject();
    try {
      const result = JSON.parse(JSON.stringify(obj)) as IUser;

      return result;
    } catch (e) {
      return null;
    }
  }

  async getBoardTitleById(boardId: string | ParticularDBType) {
    const board = await BoardModel.findOne({
      _id: this.getObjectIdFromStringUtils(boardId),
    });

    if (!board) return null;

    return board.title;
  }

  async getBoardById(boardId: string | ParticularDBType) {
    try {
      const board = await BoardModel.findOne({
        _id: this.getObjectIdFromStringUtils(boardId),
      })
        .populate('owner')
        .populate('members');

      if (!board) {
        return null;
      }

      const obj = board.toObject();
      const result = JSON.parse(JSON.stringify(obj)) as IBoard;

      return result;
    } catch (e) {
      console.error('', e);

      return null;
    }
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

  /**
   * UNSAFE.
   * Uses JSON.parse
   * So wrap the function call into try/catch
   */
  async getUserBoards(query: FilterQuery<IBoard>) {
    const found = await BoardModel.find(query).populate('owner');
    const result = JSON.parse(JSON.stringify(found)) as IBoard[];

    return result;
  }

  async createBoard(board: TBoardNS.TCreating) {
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

    return createdBoard.populate('owner');
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
