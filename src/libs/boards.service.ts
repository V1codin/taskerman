import { Types } from 'mongoose';
import mongoProvider from './db/mongo';

import { TDb } from './db/mongo';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  getBoardById(boerdId: string | Types.ObjectId) {
    return this.db.getBoardById(boerdId);
  }
}

export type TBoardsService = BoardsService;

export const boardService = new BoardsService(mongoProvider);
