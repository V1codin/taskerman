import type { NextApiRequest } from 'next';
import { TCreatingBoard, TDeletingBoard } from './db';
import { TCreatedBoard, TRawUserBoards } from '@/libs/boards.service';

export type TMethods = 'POST' | 'PUT' | 'DELETE' | 'GET';

export type TBoardReducerBody = {
  POST: TCreatingBoard;
  DELETE: TDeletingBoard;

  PUT: null;
  GET: null;
};

type TBoardReturnType = {
  GET: TRawUserBoards;
  POST: TCreatedBoard;
  DELETE: TDeletingBoard;

  PUT: null;
};

type TMethodReturnMap = Record<TMethods, TBoardReturnType[TMethods]>;
export type TGetBoardReturnByMethod<T extends TMethods> = {
  data: TMethodReturnMap[T];
};

export interface BoardsRequest extends NextApiRequest {
  body: TBoardReducerBody[TMethods];
}
