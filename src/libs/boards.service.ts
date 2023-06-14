import dbProvider from '@/db/mongo';

import type { TDb } from '@/db/mongo';
import type { IBoard, IBoardMember } from '@/models/boards';
import type { TBoardNS } from '@/types/db';
import type { ParticularDBType } from '@/db/mongo';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  async getSafeUserBoards(
    userId: string | ParticularDBType,
  ): Promise<IBoard[]> {
    try {
      const boardsQuery = this.db.getAllBoardsByUserQueryUtils(userId);
      const boards = await this.db.getUserBoards(boardsQuery);

      return boards;
    } catch (e) {
      return [];
    }
  }

  isValidUser(userId: string, boardId: string) {
    return this.db.isValidUserForGettingBoardUtils(userId, boardId);
  }

  isUserBoardSubscriber(userId: string, board: IBoard) {
    return this.db.isUserBoardSubscriberUtils(userId, board);
  }

  isValidIssuer(issuerId: string, board: IBoard) {
    return (
      this.db.isEqualUtils(issuerId, board.owner._id) ||
      this.isUserBoardSubscriber(issuerId, board)
    );
  }

  getUserRole(boardId: string, userId: string) {
    return this.db.getUserRole(boardId, userId);
  }

  getSafeBoardById(boardId: string | ParticularDBType) {
    return this.db.getBoardById(boardId);
  }

  getBoardTitleById(boardId: string | ParticularDBType) {
    return this.db.getBoardTitleById(boardId);
  }

  getBoardMembers(boardId: string | ParticularDBType) {
    return this.db.getBoardMembers(boardId);
  }

  getBoardBackgroundById(boardId: string | ParticularDBType) {
    return this.db.getBoardBackgroundById(boardId);
  }

  async create(board: TBoardNS.TCreating): Promise<IBoard> {
    const createdBoard = await this.db.createBoard(board);

    return createdBoard;
  }

  async unsubscribe(userId: string, board: IBoard) {
    const result = await this.db.unsubscribeFromBoard(userId, board);
    return {
      acknowledged: result,
    };
  }

  delete(
    boardId: string | ParticularDBType,
  ): ReturnType<typeof dbProvider.deleteBoard> {
    const result = this.db.deleteBoard(boardId);

    return result;
  }

  addBoardMember(
    boardId: string,
    members: Record<keyof Pick<IBoardMember, 'role' | 'user'>, string>[],
  ) {
    return this.db.addBoardMember(boardId, members);
  }
}

export type TBoardsService = BoardsService;

export const boardService = new BoardsService(dbProvider);
export type BoardServiceCreate = typeof boardService.create;
export type BoardServiceGetUserBoards = typeof boardService.getSafeUserBoards;
