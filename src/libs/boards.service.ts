import dbProvider from '@/db/mongo';

import { TDb } from '@/db/mongo';
import type { TBoardNS } from '@/types/db';
import type { ParticularDBType } from '@/db/mongo';
import { IBoard } from '@/models/boards';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  async getUserBoards(userId: string | ParticularDBType): Promise<IBoard[]> {
    const boardsQuery = this.db.getAllBoardsByUserQueryUtils(userId);
    const boards = await this.db.getUserBoards(boardsQuery);

    return boards;
  }

  isValidUser(userId: string, boardId: string) {
    return this.db.isValidUserForGettingBoardUtils(userId, boardId);
  }

  isValidIssuer(issuerId: string, boardOwnerId: string) {
    return this.db.isEqualUtils(issuerId, boardOwnerId);
  }

  getBoardById(boardId: string | ParticularDBType) {
    return this.db.getBoardById(boardId);
  }

  async create(board: TBoardNS.TCreatingBoard): Promise<IBoard> {
    const createdBoard = await this.db.createBoard(board);

    return createdBoard;
  }

  delete(
    boardId: string | ParticularDBType,
  ): ReturnType<typeof dbProvider.deleteBoard> {
    const result = this.db.deleteBoard(boardId);

    return result;
  }
}

export type TBoardsService = BoardsService;

export const boardService = new BoardsService(dbProvider);
export type BoardServiceCreate = typeof boardService.create;
export type BoardServiceGetUserBoards = typeof boardService.getUserBoards;
