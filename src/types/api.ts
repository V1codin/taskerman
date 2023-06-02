import type { IBoard } from '@/models/boards';
import type { SessionUser, TBoardNS, TUserNS } from './db';
import type { NextApiRequest } from 'next';

export type TMethods = 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH';

export namespace TBoardsApiNS {
  export type TBoardReducerBody = {
    POST: TBoardNS.TCreating;
    DELETE: TBoardNS.TDeleting;

    PUT: null;
    GET: null;
    PATCH: null;
  };

  type TBoardReturnType = {
    GET: TBoardNS.TRawUserBoards;
    POST: IBoard;
    DELETE: TBoardNS.TDeleting;

    PUT: null;
    PATCH: null;
  };

  type TBoardsMethodReturnMap = Record<TMethods, TBoardReturnType[TMethods]>;
  export type ResponseType<T extends TMethods> = {
    data: TBoardsMethodReturnMap[T];
  };

  export interface Request extends NextApiRequest {
    body: TBoardReducerBody[TMethods];
  }
}

export namespace ApiNS {
  export type TPagination = [number, number] | null;
  export type TActions = 'create' | 'delete' | 'update' | 'read';

  export type TGetData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TGetting
    : T extends 'user'
    ? TUserNS.TGetting
    : null;

  export type TCreateData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TCreating
    : T extends 'user'
    ? TUserNS.TCreating
    : null;

  export type TDeleteData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TDeleting
    : null;

  export type TUpdateData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TUpdating
    : T extends 'user'
    ? TUserNS.TUpdating
    : null;

  interface IBoardReturn extends Record<keyof TActions, unknown> {
    read: {
      data: IBoard[];
    };
    create: {
      data: IBoard;
    };
    delete: {
      data: string;
    };
    update: {
      // ! NOT IMPLEMENTED
      data: null;
    };
  }

  interface IUserReturn extends Record<keyof TActions, unknown> {
    read: {
      data: SessionUser;
    };
    create: {
      message: string;
    };
    update: { updatedUser: SessionUser };

    // TODO set type for deleted user
    delete: {
      data: null;
    };
  }

  export interface IReturnType extends Record<TEntities, unknown> {
    board: IBoardReturn;
    user: IUserReturn;
  }
}

export interface Protocol<TAuthProps extends unknown> {
  read<TResult extends unknown, TEntity extends TEntities>(
    type: TEntity,
    data: ApiNS.TGetData<TEntity>,
    pagination: ApiNS.TPagination,
    authProps: TAuthProps,
  ): Promise<TResult>;

  create<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TCreateData<TEntities>,
  ): Promise<TResult>;

  delete<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TDeleteData<TEntities>,
  ): Promise<TResult>;

  update<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TUpdateData<TEntities>,
  ): Promise<TResult>;
}

export namespace HttpNS {
  export type TAuthProps = {
    token: string;
  };
  export type TGetUrls = {
    single: string;
    paginated?: string;
  };

  export type TUrl = {
    POST: string;
    DELETE: string;
    GET: TGetUrls;
    PATCH: string;

    PUT?: string;
  };

  export interface IUrls {
    board: TUrl;
    list: TUrl;
    user: TUrl;
  }
}
