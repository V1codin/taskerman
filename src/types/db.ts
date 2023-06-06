import { TypeOf, z } from 'zod';
import type { IUser, TEditableUserProps } from '@/models/users';
import type {
  BoardServiceCreate,
  BoardServiceGetUserBoards,
} from '@/libs/boards.service';
import type { IBoard, TUserBoardRoles } from '@/models/boards';
import type { RequireAtLeastOne } from './utils';
import type { AuthClient } from './state';

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
    role: TUserBoardRoles;
    member: Pick<
      SessionUser,
      'displayName' | 'imageURL' | 'email' | 'username'
    >;
  }

  export interface ISingleBoard {
    board: IBoard | null;
  }

  export type TCreatedBoard = Awaited<ReturnType<BoardServiceCreate>>;
  export type TRawUserBoards = Awaited<ReturnType<BoardServiceGetUserBoards>>;
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
  TBoardBackgroundById extends unknown,
  TBoardTitleById extends unknown,
  TBoardDById extends unknown,
  TUserBoards extends unknown,
  TCreatedBoard extends unknown,
  TDeletedBoard extends unknown,
  TUnsubedUserFromBoard extends unknown,
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

  getBoardBackgroundById(
    boardId: string | ParticularDBType,
  ): TBoardBackgroundById;
  getBoardTitleById(boardId: string | ParticularDBType): TBoardTitleById;
  getBoardById(boardId: string | ParticularDBType): TBoardDById;
  getUserBoards(
    query: TBoardQuery | null,
    userId?: string | ParticularDBType,
  ): Promise<TUserBoards>;
  createBoard(board: TBoardNS.TCreating): TCreatedBoard;
  deleteBoard(boardId: string | ParticularDBType): TDeletedBoard;
  unsubscribeFromBoard(userId: string, board: IBoard): TUnsubedUserFromBoard;
}
