import { BoardModel, UserModel, PasswordModel } from '@/models/middlewares';
import { ServerResponseError } from '../error.service';
import { Types } from 'mongoose';

import type { IUser } from '@/models/users';
import type { IBoard, IBoardMember } from '@/models/boards';
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
    Promise<IUser[] | null>,
    Promise<string | null>,
    Promise<string | null>,
    Promise<IBoard | null>,
    Promise<IBoardMember[]>,
    IBoard[],
    // ? unknown because Boards.create is overloading function
    // ? and ReturnType is not compatible
    unknown,
    ReturnType<typeof BoardModel.deleteOne>,
    Promise<boolean>
  > {}

export class MongoDataBaseProvider implements MongoDbProvider {
  constructor() {}

  getUserAliasRegexQueryUtils(alias: string): FilterQuery<IUser> {
    return {
      nameAlias: { $regex: alias, $options: 'i' },
    };
  }

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
        {
          $and: [
            { 'members.user': { $in: [userObj] } },
            { members: { $in: [{ isPending: false }] } },
          ],
        },
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
      board.members.findIndex(({ user: { _id } }) =>
        this.isEqualUtils(userId, _id),
      ) > -1
    );
  }

  private getObjectIdFromStringUtils(id: string | ParticularDBType) {
    if (typeof id === 'string') {
      const strSize = id.length;
      if (strSize === 24) {
        return new Types.ObjectId(id);
      }

      return null;
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
      return false;
    }
  }

  async patchUser(userId: string, data: TEditableUserProps) {
    try {
      const { modifiedCount } = await UserModel.updateOne(
        {
          _id: userId,
        },
        data,
      );

      if (modifiedCount > 0) {
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

  async getUsersByAlias(alias: string) {
    try {
      const query = this.getUserAliasRegexQueryUtils(alias);

      const result = await UserModel.find(query);

      return result;
    } catch (e) {
      return [];
    }
  }

  async getBoardTitleById(boardId: string | ParticularDBType) {
    const board = await BoardModel.findOne({
      _id: this.getObjectIdFromStringUtils(boardId),
    });

    if (!board) return null;

    return board.title;
  }

  async getBoardBackgroundById(boardId: string | ParticularDBType) {
    const board = await BoardModel.findOne({
      _id: this.getObjectIdFromStringUtils(boardId),
    });

    if (!board) return null;

    return board.bg;
  }

  async getBoardById(boardId: string | ParticularDBType) {
    try {
      const board = await BoardModel.findOne({
        _id: this.getObjectIdFromStringUtils(boardId),
      })
        .populate('owner')
        .populate('members.user');

      if (!board) {
        return null;
      }

      const obj = board.toObject();
      const result = JSON.parse(JSON.stringify(obj)) as IBoard;

      return result;
    } catch (e) {
      return null;
    }
  }

  async getBoardMembers(boardId: string | ParticularDBType) {
    try {
      const board = await BoardModel.findOne({
        _id: this.getObjectIdFromStringUtils(boardId),
      }).populate('members');

      if (!board) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      return board.members;
    } catch (e) {
      if (e instanceof ServerResponseError) {
        throw e;
      }
      throw new ServerResponseError({
        code: 500,
        message: 'Error: Server does not response',
      });
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

  async getUserRole(boardId: string, userId: string) {
    try {
      const result = await BoardModel.findOne({
        _id: boardId,
      });

      if (!result) {
        return '';
      }

      const member = result.members.find(
        (member) => String(member.user._id) === userId,
      );

      const role = member?.role || '';

      return role;
    } catch (e) {
      return '';
    }
  }

  addBoardMember(
    boardId: string,
    members: Record<keyof Pick<IBoardMember, 'role' | 'user'>, string>[],
  ) {
    const mappedMembers = members.map((member) => {
      const user = this.getObjectIdFromStringUtils(member.user);
      return {
        ...member,
        user,
      };
    });
    return BoardModel.updateOne(
      {
        _id: boardId,
      },
      {
        $push: {
          members: {
            $each: mappedMembers,
          },
        },
      },
    );
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
