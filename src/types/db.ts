import { TypeOf, z } from 'zod';

import type {
  TUser,
  TEditableUserProps,
} from '@/libs/db/postgres/schemas/types';
import type {
  BoardServiceCreate,
  BoardServiceGetUserBoards,
} from '@/libs/boards.service';
import type {
  TBoard,
  TBoardMember,
  TUserBoardRoles,
} from '@/libs/db/postgres/schemas/types';
import type { RequireAtLeastOne } from './utils';
import type { AuthClient } from './state';

/*
  | 'cards'
  | 'lists'
  */

const notePriorityEnum = ['conflict', 'warning', 'notification'] as const;
const noteActionsEnum = ['board_invite'] as const;
const noteTypesEnum = ['option', 'info'] as const;

export interface IDbCollections {
  users: TUser;
}

export const creatingBoardSchema = z.object({
  bg: z.string(),
  owner: z.string(),
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

export const updatingBoardMembersSchema = z.object({
  members: z.array(z.string().min(24)),
  boardId: z.string().min(24),
  type: z.string(),
});

const notePriority = z.enum(notePriorityEnum);
const noteActions = z.enum(noteActionsEnum);
const noteTypes = z.enum(noteTypesEnum);

export const creatingNotificationSchema = z.object({
  text: z.string().min(4),
  recipient: z.string().min(24),
  type: noteTypes,
  priority: notePriority,
  action: noteActions,
  actionData: z
    .object({
      boardId: z.string().min(24).optional(),
    })
    .partial(),
});

export namespace TBoardNS {
  type UpdateAvailableProps = Pick<TBoard, 'bg' | 'title'>;
  export type TUpdating = RequireAtLeastOne<
    UpdateAvailableProps,
    'bg' | 'title'
  >;

  export type TDeleting = TypeOf<typeof deletingBoardSchema>;
  export type TCreating = TypeOf<typeof creatingBoardSchema>;
  export type TGetting =
    | {
        boardId: string;
      }
    | {
        userId: string;
      };

  export interface TBoardMember {
    role: TUserBoardRoles;
    member: Pick<
      SessionUser,
      'displayName' | 'imageURL' | 'email' | 'username'
    >;
  }

  export interface ISingleBoard {
    board: TBoard | null;
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
    nameAlias: string;
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

export namespace TNotificationNS {
  export type TCreating = TypeOf<typeof creatingNotificationSchema>;
  export type TGetting = null;
  export type TDeleting = {
    id: string;
  };
}

export type SessionUser = {
  id: string;
  displayName?: string;
  imageURL?: string;
  email: string;
  username: string;
};

export interface DataBaseProvider<
  ParticularDBType extends unknown,
  TBoardQuery extends unknown,
  TUserByName extends unknown,
  TUserById extends unknown,
  TUserIdByUserName extends unknown,
  TPatchedUser extends unknown,
  TUsersByAlias extends unknown,
  TBoardBackgroundById extends unknown,
  TBoardTitleById extends unknown,
  TBoardDById extends unknown,
  TBoardMembers extends unknown,
  TUserBoards extends unknown,
  TCreatedBoard extends unknown,
  TDeletedBoard extends unknown,
  TUnsubedUserFromBoard extends unknown,
  TCreatedNotification extends unknown,
  TNotificationsByUserId extends unknown,
  TNotificationById extends unknown,
  TDeletedNotification extends unknown,
  TDeclinedInvite extends unknown,
  TAddBoardMember extends unknown,
  TAddBoardInvite extends unknown,
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
  getUsersByAlias(alias: string): TUsersByAlias;

  getBoardBackgroundById(
    boardId: string | ParticularDBType,
  ): TBoardBackgroundById;
  getBoardTitleById(boardId: string | ParticularDBType): TBoardTitleById;
  getBoardById(boardId: string | ParticularDBType): TBoardDById;
  getBoardMembers(boardId: string | ParticularDBType): TBoardMembers;
  getUserBoards(userId: string | ParticularDBType): Promise<TUserBoards>;
  createBoard(board: TBoardNS.TCreating): TCreatedBoard;
  deleteBoard(boardId: string | ParticularDBType): TDeletedBoard;
  unsubscribeFromBoard(userId: string, board: unknown): TUnsubedUserFromBoard;
  declineBoardInvite(userId: string, boardId: string): TDeclinedInvite;
  addBoardMember(
    boardId: string,
    members: Record<keyof Pick<TBoardMember, 'role' | 'user'>, string>[],
  ): TAddBoardMember;
  addBoardInviteToUser(
    boardId: string,
    members: Record<keyof Pick<TBoardMember, 'role' | 'user'>, string>[],
  ): TAddBoardInvite;

  createNotification(note: TNotificationNS.TCreating): TCreatedNotification;
  getSafeNotificationsByUserId(userId: string): TNotificationsByUserId;
  getSafeNotificationById(id: string): TNotificationById;
  deleteNotification(id: string): TDeletedNotification;
}

export type DB_TYPES = 'postgressql';
