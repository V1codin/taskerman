import {
  BoardModel,
  UserModel,
  PasswordModel,
  NotificationModel,
} from '@/models/middlewares';
import { ServerResponseError } from '../error.service';
import { Types } from 'mongoose';

import type { IUser } from '@/models/users';
import type { IBoard, IBoardMember } from '@/models/boards';
import type { FilterQuery } from 'mongoose';
import type { DataBaseProvider, TBoardNS, TNotificationNS } from '@/types/db';
import type { TEditableUserProps } from '@/models/users';
import type { INotification } from '@/models/notifications';

interface MongoDbProvider
  extends DataBaseProvider<
    Types.ObjectId, //  ParticularDBType
    FilterQuery<IBoard>, //   TBoardQuery
    Promise<IUser | null>, //   TUserByName
    ReturnType<typeof UserModel.findOne>, //   TUserById
    ReturnType<typeof UserModel.findOne>, //   TUserIdByUserName
    Awaited<ReturnType<typeof UserModel.findOne>>, //   TPatchedUser
    Promise<IUser[] | null>, //   TUsersByAlias
    Promise<string | null>, //   TBoardBackgroundById
    Promise<string | null>, //   TBoardTitleById
    Promise<IBoard | null>, //   TBoardDById
    Promise<IBoardMember[]>, //   TBoardMembers
    IBoard[], //   TUserBoards
    // ? unknown because Boards.create is overloading function
    // ? and ReturnType is not compatible
    unknown, //   TCreatedBoard
    ReturnType<typeof BoardModel.deleteOne>, //   TDeletedBoard
    Promise<boolean>, //   TUnsubedUserFromBoard
    Promise<boolean>, //   TCreatedNotification
    Promise<INotification[]>, //   TNotificationsByUserId
    Promise<INotification | null>, //   TNotificationById
    Promise<boolean>, //   TDeletedNotification
    Promise<boolean>, //   TDeclinedInvite
    ReturnType<typeof BoardModel.updateOne>, //   TAddBoardMember
    Promise<boolean> //   TAddBoardInvite
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
          members: { $elemMatch: { user: userObj, isPending: false } },
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
              user: this.getObjectIdFromStringUtils(userId),
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
      console.log('e: ', e);
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

  async addBoardInviteToUser(
    boardId: string,
    members: Record<keyof Pick<IBoardMember, 'role' | 'user'>, string>[],
  ) {
    try {
      await Promise.all(
        members.map((member) => {
          return UserModel.updateOne(
            {
              _id: member.user,
            },
            {
              $push: {
                pendingInvites: boardId,
              },
            },
          );
        }),
      );

      return true;
    } catch (e) {
      throw new ServerResponseError({
        code: 500,
        message: 'Error: Server does not response',
      });
    }
  }

  async createNotification(note: TNotificationNS.TCreating) {
    try {
      // ? upsert: true (if there is the note it's gonna only update it)
      // ? if there is no such a note it's gonna create one
      const result = await NotificationModel.updateOne(
        {
          recipient: note.recipient,
          action: note.action,
          'actionData.boardId': note.actionData.boardId,
        },
        note,
        {
          upsert: true,
        },
      );

      if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        return true;
      }

      throw new Error('Something went wrong');
    } catch (e) {
      return false;
    }
  }

  deleteBoard(
    boardId: string | ParticularDBType,
  ): ReturnType<typeof BoardModel.deleteOne> {
    return BoardModel.deleteOne({
      _id: boardId,
    });
  }

  async getSafeNotificationsByUserId(userId: string) {
    try {
      const notes = await NotificationModel.find({
        recipient: this.getObjectIdFromStringUtils(userId),
      }).populate('recipient');

      if (!notes || !notes.length) {
        throw new Error('Document was not found');
      }

      const result = JSON.parse(JSON.stringify(notes)) as INotification[];

      return result;
    } catch (e) {
      return [];
    }
  }

  async getSafeNotificationById(noteId: string) {
    try {
      const note = await NotificationModel.findById(noteId).populate(
        'recipient',
      );

      if (!note) {
        throw new Error('Document was not found');
      }

      const result = JSON.parse(
        JSON.stringify(note.toObject()),
      ) as INotification;

      return result;
    } catch (e) {
      return null;
    }
  }

  async deleteNotification(noteId: string) {
    try {
      const result = await NotificationModel.deleteOne({
        _id: noteId,
      });

      if (result.deletedCount > 0) {
        return true;
      }

      throw new Error('Something went wrong');
    } catch (e) {
      return false;
    }
  }

  async declineBoardInvite(userId: string, boardId: string) {
    try {
      const result = await Promise.all([
        BoardModel.updateOne(
          {
            _id: boardId,
          },
          {
            $pull: {
              members: { user: this.getObjectIdFromStringUtils(userId) },
            },
          },
        ),
        UserModel.updateOne(
          {
            _id: userId,
          },
          {
            $pull: {
              pendingInvites: boardId,
            },
          },
        ),
      ]);

      const modified = result.reduce((acc, item) => {
        return (acc += item.modifiedCount);
      }, 0);

      if (modified > 0) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  async confirmBoardInvite(userId: string, boardId: string) {
    try {
      const result = await Promise.all([
        BoardModel.updateOne(
          {
            $and: [
              { _id: boardId },
              {
                'members.user': this.getObjectIdFromStringUtils(userId),
              },
            ],
          },
          {
            $set: {
              'members.$.isPending': false,
            },
          },
        ),
        UserModel.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              subs: new Types.ObjectId(boardId),
            },
            $pull: {
              pendingInvites: boardId,
            },
          },
        ),
      ]);

      const modified = result.reduce((acc, item) => {
        return (acc += item.modifiedCount);
      }, 0);

      if (modified > 0) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  __TEST() {
    return BoardModel.find({}).populate('owner').populate('members.user');
  }
}

const mongoProvider = new MongoDataBaseProvider();
// TODO TDb type as global type and assign to it current DB provider
export type TDb = MongoDataBaseProvider;
export type ParticularDBType = Types.ObjectId;

export default mongoProvider;
