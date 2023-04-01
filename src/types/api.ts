import type { NextApiRequest } from 'next';
import { TCreatingBoard } from './db';
import { TCreatedBoard, TUserBoards } from '@/libs/boards.service';

export type TMethods = 'POST' | 'PUT' | 'DELETE' | 'GET';

export type TBoardReducerBody = {
  POST: TCreatingBoard;

  PUT: null;
  DELETE: null;
  GET: null;
};

type TBoardReturnType = {
  GET: TUserBoards;
  POST: TCreatedBoard;

  PUT: null;
  DELETE: null;
};

type TMethodReturnMap = Record<TMethods, TBoardReturnType[TMethods]>;
export type TGetBoardReturnByMethod<T extends TMethods> = {
  data: TMethodReturnMap[T];
};

export interface BoardsRequest extends NextApiRequest {
  body: TBoardReducerBody[TMethods];
}
