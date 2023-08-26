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
import { TNotification } from '@/libs/db/postgres/api/prisma';

/*
  | 'cards'
  | 'lists'
  */

export const notePriorityEnum = [
  'conflict',
  'warning',
  'notification',
] as const;
export const noteActionsEnum = ['board_invite'] as const;
export const noteTypesEnum = ['option', 'info'] as const;

export interface IDbCollections {
  users: TUser;
}

const idSchema = z.string().min(24);

const boardIdSchema = z.object({
  boardId: idSchema,
});

export const updateBoardSchema = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal('update_bg'),
      bg: z.string().min(4),
    }),
    z.object({
      type: z.literal('update_header'),
      title: z.string().min(1),
    }),
  ])
  .and(boardIdSchema);

export const creatingBoardSchema = z.object({
  bg: z.string(),
  owner: idSchema,
  title: z.string(),
});
export const deletingBoardSchema = boardIdSchema;

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

export const updatingBoardMembersSchema = z
  .object({
    members: z.array(z.string().min(24)),
    type: z.string(),
  })
  .and(boardIdSchema);

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
      boardId: z.string().min(24),
    })
    .or(z.null()),
});

export namespace TBoardNS {
  export type TUpdating = TypeOf<typeof updateBoardSchema>;
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
  export type TCreating<
    TAction extends TNotification['action'] = 'board_invite',
  > = {
    type: 'info' | 'option';
    text: string;
    recipient: string;
    priority: 'conflict' | 'warning' | 'notification';
    action: TAction;
    actionData: TAction extends 'board_invite' ? { boardId: string } : null;
  };
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

export const createRecordSchema = z
  .object({
    heading: z.string().min(1).max(32),
    userId: idSchema,
  })
  .and(boardIdSchema);

export namespace TRecordNS {
  export type TGetting = {
    boardId: string;
  };

  export type TCreating = TypeOf<typeof createRecordSchema>;
}

// ? generic types were for type mongo provider
// ? for prisma those could be removed
export interface DataBaseProvider<
  ParticularDBType extends unknown = unknown,
  TUserByName extends unknown = unknown,
  TUserById extends unknown = unknown,
  TUserIdByUserName extends unknown = unknown,
  TPatchedUser extends unknown = unknown,
  TUsersByAlias extends unknown = unknown,
  TBoardBackgroundById extends unknown = unknown,
  TBoardTitleById extends unknown = unknown,
  TBoardDById extends unknown = unknown,
  TBoardMembers extends unknown = unknown,
  TUserBoards extends unknown = unknown,
  TCreatedBoard extends unknown = unknown,
  TDeletedBoard extends unknown = unknown,
  TUnsubedUserFromBoard extends unknown = unknown,
  TCreatedNotification extends unknown = unknown,
  TNotificationsByUserId extends unknown = unknown,
  TNotificationById extends unknown = unknown,
  TDeletedNotification extends unknown = unknown,
  TDeclinedInvite extends unknown = unknown,
  TConfirmedInvite extends unknown = unknown,
  TAddBoardMember extends unknown = unknown,
  TAddBoardInvite extends unknown = unknown,
> {
  isEqualUtils(
    str1: string | ParticularDBType,
    str2: string | ParticularDBType,
  ): boolean;

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
  confirmBoardInvite(userId: string, boardId: string | null): TConfirmedInvite;
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
