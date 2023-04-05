import { TypeOf, z } from 'zod';
import { IUser } from '@/models/users';

export interface IDbCollections {
  users: IUser;
}

export type TBoard<T extends unknown = OmitedSafeBoardMemebers> = {
  members: T[];
  pendingMembers: T[];
  bg: string;
  title: string;
  ownerId: T | null;
  _id: string;
};

export const creatingBoardSchema = z.object({
  bg: z.string(),
  members: z.array(z.string()),
  ownerId: z.string().or(z.null()),
  pendingMembers: z.array(z.string()),
  title: z.string(),
});
export const deletingBoardSchema = z.object({
  boardId: z.string(),
  boardOwnerId: z.string().or(z.null()),
});

export type TDeletingBoard = TypeOf<typeof deletingBoardSchema>;
export type TCreatingBoard = TypeOf<typeof creatingBoardSchema>;

export type TUser = {
  id: string;
  username: string;
  password: string;
  displayName?: string;
  externalLogin: TLoginType;
  email: string;
  subs: TBoardDataClient[];
  imageURL?: string;
  nameAlias: string;
  roles: TUserRoles[];
};

export type TLoginType = 'credentials' | 'google';
export type TUserRoles = 'user';

export type TUnsafeUserProps = 'password';
export type TUnsafeBoardProps = '_id';

export type TOmitedGeneric<
  TBase extends unknown,
  OmitedTypes extends string | number,
> = Omit<Pick<TBase, keyof TBase>, OmitedTypes>;

export type TBoardDataClient = TOmitedGeneric<TBoard, TUnsafeBoardProps>;
export type TUserDataClient = TOmitedGeneric<TUser, TUnsafeUserProps>;

export type OmitedSafeUser = TOmitedGeneric<
  TUserDataClient,
  'externalLogin' | 'nameAlias'
>;

export type OmitedSafeBoardMemebers = TOmitedGeneric<OmitedSafeUser, 'subs'>;

export type SessionUser = {
  id: string;
  subs: string[];
  displayName?: string;
  imageURL?: string;
  email: string;
  username: string;
};

/*
  | 'cards'
  | 'lists'
  | 'notifications';
  */
