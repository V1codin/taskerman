import { TypeOf, z } from 'zod';
import { IUser } from '@/models/users';
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
  externalLogin: TLoginType;
  email: string;
  subs: IBoard[];
  imageURL?: string;
  nameAlias: string;
};

export type TLoginType = 'credentials' | 'google';
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
