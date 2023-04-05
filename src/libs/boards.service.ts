import mongoProvider from '@/db/mongo';

import { Types } from 'mongoose';
import { TDb } from '@/db/mongo';
import { TBoard, TCreatingBoard } from '@/types/db';

export class BoardsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  async getUserBoards(
    userId: string | Types.ObjectId,
  ): Promise<TBoard<string>[]> {
    const boardsQuery = this.db.getBoardsQueryUtils(userId);
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

  getBoardById(boerdId: string | Types.ObjectId) {
    return this.db.getBoardById(boerdId);
  }

  async create(board: TCreatingBoard): Promise<TBoard<string>> {
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
    boardId: string | Types.ObjectId,
  ): ReturnType<typeof mongoProvider.deleteBoard> {
    const result = this.db.deleteBoard(boardId);

    return result;
  }
}

export type TBoardsService = BoardsService;

export const boardService = new BoardsService(mongoProvider);
export type TCreatedBoard = Awaited<ReturnType<typeof boardService.create>>;
export type TRawUserBoards = Awaited<
  ReturnType<typeof boardService.getUserBoards>
>;
export type TRawUserBoard = TBoard<string>;
