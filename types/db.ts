import { IUser } from '@/libs/db/schemas/users';

export type TMongoConnectOptions = {
  uri: string;
};

export interface IDbCollections {
  users: IUser;
}

export type TBoard = {
  members: OmitedSafeUser[];
  pendingMembers: OmitedSafeUser[];
  bg: string;
  title: string;
  owner: OmitedSafeUser | null;
};

export type TUser = {
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

/*
  | 'cards'
  | 'lists'
  | 'notifications';
  */
