import type {
  TUserBoardRoles,
  TUser,
  TBoard,
  TBoardMember,
  TBoardPermissions,
  TNotification,
} from '@/libs/db/postgres/schemas/types';
import type {
  SessionUser,
  TBoardNS,
  TNotificationNS,
  TRecordNS,
  TUserNS,
} from './db';
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
    POST: TBoard;
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
  export type TPagination = [number, number?] | null;
  export type TActions = 'create' | 'delete' | 'update' | 'read';

  export type TGetData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TGetting
    : T extends 'user'
    ? TUserNS.TGetting
    : T extends 'record'
    ? TRecordNS.TGetting
    : null;

  export type TCreateData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TCreating
    : T extends 'user'
    ? TUserNS.TCreating
    : T extends 'board_members'
    ? TBoardMembersNS.TCreating
    : null;

  export type TDeleteData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TDeleting
    : T extends 'notification'
    ? TNotificationNS.TDeleting
    : T extends 'notification_decline'
    ? TNotificationNS.TDeleting
    : T extends 'notification_confirm'
    ? TNotificationNS.TDeleting
    : null;

  export type TUpdateData<T extends TEntities> = T extends 'board'
    ? TBoardNS.TUpdating
    : T extends 'user'
    ? TUserNS.TUpdating
    : null;

  interface IBoardReturn extends Record<keyof TActions, unknown> {
    read: {
      data: TBoard[];
    };
    create: {
      data: TBoard;
    };
    delete: {
      data: string;
    };
    update: {
      // ! NOT IMPLEMENTED
      data: null;
    };
  }

  interface IRecordReturn extends Record<keyof TActions, unknown> {
    read: {
      data: TBoard[];
    };
    create: {
      data: TBoard;
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
      data: TUser[];
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
  interface IBoardMembersReturn extends Record<keyof TActions, unknown> {
    read: {
      data: TBoardMember[];
    };
    create: { message: string; addedMembersIds: string[] };
    update: TBoardMember;

    // TODO set type
    delete: {
      data: null;
    };
  }
  interface INotificationReturn extends Record<keyof TActions, unknown> {
    read: {
      data: TNotification[];
    };
    create: TNotification;
    update: TNotification;

    delete: {
      removedNoteId: string;
    };
  }

  interface INotificationOptionReturn extends Record<keyof TActions, unknown> {
    read: {
      data: null;
    };
    create: null;
    update: null;

    delete: {
      removedNoteId: string;
    };
  }

  export interface IReturnType extends Record<TEntities, unknown> {
    board: IBoardReturn;
    user: IUserReturn;
    board_members: IBoardMembersReturn;
    notification: INotificationReturn;
    notification_decline: INotificationOptionReturn;
    notification_confirm: INotificationOptionReturn;
    record: IRecordReturn;
  }
}

export namespace TBoardMembersNS {
  export type TCreating = {
    boardId: string;
    type: keyof TBoardPermissions;
    members: string[];
    role?: TUserBoardRoles;
    invitationText?: string;
  };
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
    user: TUrl;
    board_members: TUrl;
    notification: TUrl;
    notification_decline: TUrl;
    notification_confirm: TUrl;
    record: TUrl;
  }
}

// * CurrentAuthProps could be null if it is not needed in another protocol impl
export type CurrentAuthProps = HttpNS.TAuthProps;
export interface RequestConfig {
  authProps?: CurrentAuthProps;
  pagination?: ApiNS.TPagination;
  additionalPath?: string;
}

export type HttpProtocol = Protocol;
export type CurrentProtocol = HttpProtocol;

export interface Protocol {
  revalidateData<TResult extends unknown>(path: string): Promise<TResult>;
  read<TResult extends unknown, TEntity extends TEntities>(
    type: TEntity,
    data: ApiNS.TGetData<TEntity>,
    getConfig: RequestConfig,
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
