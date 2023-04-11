import { TypeOf, z } from 'zod';
import { IUser } from '@/models/users';
import { TOmitedGeneric } from './utils';
import {
  BoardServiceCreate,
  BoardServiceGetUserBoards,
} from '@/libs/boards.service';

export interface IDbCollections {
  users: IUser;
}

// export type TList = {
//   title: string;
//   boardId: mongoose.Types.ObjectId;
//   cards: mongoose.Types.ObjectId;
// };

export const creatingBoardSchema = z.object({
  bg: z.string(),
  members: z.array(z.string()),
  ownerId: z.string().or(z.null()),
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

  export type TBoardDataClient = TOmitedGeneric<TBoard, TUnsafeBoardProps>;

  export type TBoard<T extends unknown = OmitedSafeBoardMemebers> = {
    members: T[];
    pendingMembers: T[];
    bg: string;
    title: string;
    ownerId: T | null;
    _id: string;
  };

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
  password: string;
  displayName?: string;
  externalLogin: TLoginType;
  email: string;
  subs: TBoardNS.TBoardDataClient[];
  imageURL?: string;
  nameAlias: string;
};

export type TLoginType = 'credentials' | 'google';
export type TUserRolesForBoard = 'guest' | 'owner' | 'admin';

export type TUnsafeUserProps = 'password';
export type TUnsafeBoardProps = '_id';

export type SessionUser = {
  id: string;
  subs: string[] | TBoardNS.TBoardDataClient[];
  displayName?: string;
  imageURL?: string;
  email: string;
  username: string;
};

export type TUserDataClient = TOmitedGeneric<TUser, TUnsafeUserProps>;

export type OmitedSafeBoardMemebers = TOmitedGeneric<SessionUser, 'subs'>;

/*
  | 'cards'
  | 'lists'
  | 'notifications';
  */
