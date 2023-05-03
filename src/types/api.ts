import type { IBoard } from '@/models/boards';
import type { TBoardNS, TListNS } from './db';
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

export namespace TListsApiNS {
  export type TListReducerBody = {
    POST: TListNS.TCreating;

    DELETE: null;
    PUT: null;
    GET: null;
    PATCH: null;
  };

  type TListReturnType = {
    GET: TListNS.TRawBoardLists;
    POST: TListNS.TList;

    DELETE: null;
    PUT: null;
    PATCH: null;
  };

  type TListsMethodReturnMap = Record<TMethods, TListReturnType[TMethods]>;
  export type ResponseType<T extends TMethods> = {
    data: TListsMethodReturnMap[T];
  };

  export interface Request extends NextApiRequest {
    body: TListReducerBody[TMethods];
  }
}
