import { dbProvider } from './db/provider';

import type { TBoardNS } from '@/types/db';
import type { TBoard, TBoardMember } from './db/postgres/schemas/types';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  async getSafeUserBoards(userId: string | ParticularDBType) {
    try {
      const boards = await this.db.getUserBoards(userId);

      return boards;
    } catch (e) {
      return [];
    }
  }

  isValidUser(userId: string, boardId: string) {
    return this.db.isValidUserForGettingBoardUtils(userId, boardId);
  }

  isUserBoardSubscriber(userId: string, board: TBoard) {
    return this.db.isUserBoardSubscriberUtils(userId, board);
  }

  isValidIssuer(issuerId: string, board: TBoard) {
    return (
      this.db.isEqualUtils(issuerId, board.owner.id) ||
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

  async create(board: TBoardNS.TCreating) {
    const createdBoard = await this.db.createBoard(board);

    return createdBoard;
  }

  async unsubscribe(userId: string, board: TBoard) {
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
    members: Record<keyof Pick<TBoardMember, 'role' | 'user'>, string>[],
  ) {
    return this.db.addBoardMember(boardId, members);
  }

  declineBoardInvite(userId: string, boardId: string) {
    return this.db.declineBoardInvite(userId, boardId);
  }

  confirmBoardInvite(userId: string, boardId: string | null) {
    return this.db.confirmBoardInvite(userId, boardId);
  }

  addBoardInviteToUser(
    boardId: string,
    members: Record<keyof Pick<TBoardMember, 'role' | 'user'>, string>[],
  ) {
    return this.db.addBoardInviteToUser(boardId, members);
  }
}

export type TBoardsService = BoardsService;

export const boardService = new BoardsService(dbProvider);
export type BoardServiceCreate = typeof boardService.create;
export type BoardServiceGetUserBoards = typeof boardService.getSafeUserBoards;
