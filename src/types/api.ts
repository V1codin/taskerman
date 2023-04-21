import { IBoard } from '@/models/boards';
import { TBoardNS } from './db';
import type { NextApiRequest } from 'next';

export type TMethods = 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH';

export type TBoardReducerBody = {
  POST: TBoardNS.TCreatingBoard;
  DELETE: TBoardNS.TDeletingBoard;

  PUT: null;
  GET: null;
  PATCH: null;
};

type TBoardReturnType = {
  GET: TBoardNS.TRawUserBoards;
  POST: IBoard;
  DELETE: TBoardNS.TDeletingBoard;

  PUT: null;
  PATCH: null;
};

type TMethodReturnMap = Record<TMethods, TBoardReturnType[TMethods]>;
export type TGetBoardReturnByMethod<T extends TMethods> = {
  data: TMethodReturnMap[T];
};

export interface BoardsRequest extends NextApiRequest {
  body: TBoardReducerBody[TMethods];
}
