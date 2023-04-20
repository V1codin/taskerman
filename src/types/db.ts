import { TypeOf, z } from 'zod';
import { IUser, TEditableUserProps } from '@/models/users';
import {
  BoardServiceCreate,
  BoardServiceGetUserBoards,
} from '@/libs/boards.service';
import { IBoard } from '@/models/boards';

/*
  | 'cards'
  | 'lists'
  | 'notifications';
  */

export interface IDbCollections {
  users: IUser;
}

export const creatingBoardSchema = z.object({
  bg: z.string(),
  members: z.array(z.string()),
  owner: z.string(),
  pendingMembers: z.array(z.string()),
  title: z.string(),
});
export const deletingBoardSchema = z.object({
  boardId: z.string(),
});

export namespace TBoardNS {
  export interface IBoardMember {
    role: TUserRolesForBoard;
    member: Pick<
      SessionUser,
      'displayName' | 'imageURL' | 'email' | 'username'
    >;
  }

  export interface ISingleBoard {
    board: IBoard | null;
    lists: TListNS.TList[];
  }

  export type TDeletingBoard = TypeOf<typeof deletingBoardSchema>;
  export type TCreatingBoard = TypeOf<typeof creatingBoardSchema>;

  export type TCreatedBoard = Awaited<ReturnType<BoardServiceCreate>>;
  export type TRawUserBoards = Awaited<ReturnType<BoardServiceGetUserBoards>>;
}

const creatingListSchema = z.object({
  title: z.string(),
  boardId: z.string(),
});

export namespace TListNS {
  export type TCreatingList = TypeOf<typeof creatingListSchema>;
  export type TList = {
    _id: string;
    title: string;
    boardId: string;
    cards: string[];
  };
}

export type TUser = {
  id: string;
  username: string;
  displayName?: string;
  email: string;
  subs: IBoard[];
  imageURL?: string;
  nameAlias: string;
};

export type TUserRolesForBoard = 'guest' | 'owner' | 'admin';

export type TUnsafeBoardProps = '_id';

export type SessionUser = {
  _id: string;
  id: string;
  subs: IBoard[];
  displayName?: string;
  imageURL?: string;
  email: string;
  username: string;
};

export type TUserDataClient = TUser;

export interface DataBaseProvider<
  ParticularDBType extends unknown,
  TBoardQuery extends unknown,
  TUserByName extends unknown,
  TUserById extends unknown,
  TUserIdByUserName extends unknown,
  TPatchedUser extends unknown,
  TBoarById extends unknown,
  TUserBoards extends unknown,
  TCreatedBoard extends unknown,
  TDeletedBoard extends unknown,
  TListsByBoardId extends unknown,
> {
  getAllBoardsByUserQueryUtils(userId: string): TBoardQuery;
  isEqualUtils(
    str1: string | ParticularDBType,
    str2: string | ParticularDBType,
  ): boolean;
  isValidUserForGettingBoardUtils(
    userId: string,
    boardId: string,
  ): Promise<boolean>;

  getUserHashedPassword(username: string): Promise<string>;
  getUserByUserName(username: string): TUserByName;
  getUserById(userId: string | ParticularDBType): TUserById;
  getUserIdByUserName(username: string): TUserIdByUserName;
  patchUser(userId: string, patch: TEditableUserProps): TPatchedUser;

  getBoardById(boardId: string | ParticularDBType): TBoarById;
  getUserBoards(
    query: TBoardQuery | null,
    userId?: string | ParticularDBType,
  ): TUserBoards;
  createBoard(board: TBoardNS.TCreatingBoard): TCreatedBoard;
  deleteBoard(boardId: string | ParticularDBType): TDeletedBoard;

  getListsByBoardId(boardId: string | ParticularDBType): TListsByBoardId;
}
