import mongoProvider from '@/db/mongo';

import { Types } from 'mongoose';
import { TDb } from '@/db/mongo';
import { TCreatingBoard } from '@/types/db';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  getUserBoards(userId: string | Types.ObjectId) {
    const result = this.db.getUserBoards(userId);

    return result;
  }

  getBoardById(boerdId: string | Types.ObjectId) {
    return this.db.getBoardById(boerdId);
  }

  createBoard(board: TCreatingBoard) {
    const result = this.db.createBoard(board);

    return result;
  }
}

export type TBoardsService = BoardsService;

export const boardService = new BoardsService(mongoProvider);
export type TCreatedBoard = Awaited<
  ReturnType<typeof boardService.createBoard>
>;
export type TUserBoards = Awaited<
  ReturnType<typeof boardService.getUserBoards>
>;
