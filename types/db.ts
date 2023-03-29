import { IUser } from '@/models/users';

export interface IDbCollections {
  users: IUser;
}

export type TBoard = {
  members: OmitedSafeBoardMemebers[];
  pendingMembers: OmitedSafeBoardMemebers[];
  bg: string;
  title: string;
  owner: OmitedSafeBoardMemebers | null;
  _id: string;
};

export type TUser = {
  id: string;
  username: string;
  password: string;
  displayName?: string;
  externalLogin: string;
  email: string;
  subs: TBoardDataClient[];
  imageURL?: string;
  nameAlias: string;
};

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
