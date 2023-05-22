import { TypeOf, z } from 'zod';
import { IUser, TEditableUserProps } from '@/models/users';
import {
  BoardServiceCreate,
  BoardServiceGetUserBoards,
} from '@/libs/boards.service';
import { IBoard } from '@/models/boards';
import { ListServiceGetBoardLists } from '@/libs/lists.service';
import { RequireAtLeastOne } from './utils';
import { AuthClient } from './state';

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

export const updateUserSchema = z
  .object({
    displayName: z.string(),
    imageURL: z.string(),
  })
  .partial()
  .refine(
    ({ displayName, imageURL }) =>
      displayName !== undefined || imageURL !== undefined,
    {
      message: 'One of the fields must be defined',
    },
  );

export namespace TBoardNS {
  // !NOT IMPLEMENTED
  export type TUpdating = null;

  export type TDeleting = TypeOf<typeof deletingBoardSchema>;
  export type TCreating = TypeOf<typeof creatingBoardSchema>;
  export type TGetting =
    | {
        boardId: string;
      }
    | {
        userId: string;
      };

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

  export type TCreatedBoard = Awaited<ReturnType<BoardServiceCreate>>;
  export type TRawUserBoards = Awaited<ReturnType<BoardServiceGetUserBoards>>;
}

export const creatingListSchema = z.object({
  title: z.string(),
  board: z.string(),
});
export const deletingListSchema = z.object({
  listId: z.string(),
  boardId: z.string().optional(),
});

export namespace TListNS {
  // !NOT IMPLEMENTED
  export type TUpdating = null;

  export type TCreating = TypeOf<typeof creatingListSchema>;
  export type TDeleting = TypeOf<typeof deletingListSchema>;
  export type TGetting = {
    boardId: string;
  };

  export type TList = {
    _id: string;
    title: string;
    board: string;
    cards: TCardNS.TCard[];
  };

  export type TRawBoardLists = Awaited<ReturnType<ListServiceGetBoardLists>>;
}

export namespace TCardNS {
  export type TCard = {
    _id: string;
    text: string;
  };
}

// TODO move all user relative types to the namespace
export namespace TUserNS {
  type TUserPropToSearch = {
    id: string;
    username: string;
    displayName: string;
    email: string;
  };

  export type TCreating = {
    authType: TSignUp;
    userData: AuthClient.TSignUpBodyReducer<TSignUp>;
  };

  type UpdateAvailableProps = Pick<SessionUser, 'imageURL' | 'displayName'>;
  export type TUpdating = RequireAtLeastOne<
    UpdateAvailableProps,
    'imageURL' | 'displayName'
  >;
  export type TGetting = RequireAtLeastOne<
    TUserPropToSearch,
    keyof TUserPropToSearch
  >;
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
  TUnsubedUserFromBoard extends unknown,
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
  createBoard(board: TBoardNS.TCreating): TCreatedBoard;
  deleteBoard(boardId: string | ParticularDBType): TDeletedBoard;
  unsubscribeFromBoard(userId: string, board: IBoard): TUnsubedUserFromBoard;

  getListsByBoardId(boardId: string | ParticularDBType): TListsByBoardId;
}
