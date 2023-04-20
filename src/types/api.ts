import type { NextApiRequest } from 'next';
import { TBoardNS } from './db';

export type TMethods = 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH';

export type TBoardReducerBody = {
  POST: TBoardNS.TCreatingBoard;
  DELETE: TBoardNS.TDeletingBoard;

  PUT: null;
  GET: null;
};

type TBoardReturnType = {
  GET: TBoardNS.TRawUserBoards;
  POST: TBoardNS.TCreatedBoard;
  DELETE: TBoardNS.TDeletingBoard;

  PUT: null;
};

type TMethodReturnMap = Record<TMethods, TBoardReturnType[TMethods]>;
export type TGetBoardReturnByMethod<T extends TMethods> = {
  data: TMethodReturnMap[T];
};

export interface BoardsRequest extends NextApiRequest {
  body: TBoardReducerBody[TMethods];
}
