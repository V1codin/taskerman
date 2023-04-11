import dbProvider from '@/db/mongo';

import { TDb } from '@/db/mongo';
import type { TBoardNS } from '@/types/db';
import type { ParticularDBType } from '@/db/mongo';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  async getUserBoards(
    userId: string | ParticularDBType,
  ): Promise<TBoardNS.TBoard<string>[]> {
    const boardsQuery = this.db.getAllBoardsByUserQueryUtils(userId);
    const boards = await this.db.getUserBoards(boardsQuery);

    const result = boards.map((item) => {
      return {
        _id: item._id,
        bg: item.bg,
        members: item.memberIds,
        ownerId: String(item.ownerId),
        pendingMembers: item.pendingMemberIds,
        title: item.title,
      };
    });

    return result;
  }

  isValidUser(userId: string, boardId: string) {
    return this.db.isValidUserForGettingBoardUtils(userId, boardId);
  }

  getBoardById(boardId: string | ParticularDBType) {
    return this.db.getBoardById(boardId);
  }

  /*
  async getBoardByIdWithSubs(boardId: string | ParticularDBType) {
    const board = await this.db.getBoardById(boardId);

    if (!board) return null;

    const result: TBoardNS.TBoard = {
      _id: board._id,
      bg: board.bg,
      ownerId: board.ownerId,
    };

    return result;
  }
  */

  async create(
    board: TBoardNS.TCreatingBoard,
  ): Promise<TBoardNS.TBoard<string>> {
    const createdBoard = await this.db.createBoard(board);

    const result = {
      _id: createdBoard._id,
      bg: createdBoard.bg,
      members: createdBoard.memberIds,
      ownerId: String(createdBoard.ownerId),
      pendingMembers: createdBoard.pendingMemberIds,
      title: createdBoard.title,
    };

    return result;
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

export type TRawUserBoard = TBoardNS.TBoard<string>;
